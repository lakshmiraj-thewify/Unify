/**
 * ---------------------------------------------------------------------------
 * lib/ratelimit.ts — Server-side form submission rate limiter.
 *
 * Uses @upstash/ratelimit (sliding window algorithm) backed by @upstash/redis.
 * This file is server-only — never imported into client components.
 *
 * Mode contract (consistent with lib/notify/email.ts and lib/calendar/provider.ts):
 *   UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN both set → live rate limiting.
 *   Either credential absent → DEMO mode: all requests pass through, a console
 *   warning is emitted so developers know rate limiting is inactive.
 *
 * Limits (sliding window, per IP):
 *   Contact form   : 5 submissions per 60 seconds
 *   Demo booking   : 3 submissions per 60 seconds
 *
 * These are conservative limits appropriate for a marketing-site contact form.
 * Adjust via the exported constants if the team decides to tune them.
 *
 * IP extraction:
 *   Reads x-forwarded-for (set by Vercel/proxies) with a fallback to
 *   x-real-ip. Falls back to the string "unknown" rather than throwing —
 *   a missing IP should not break the form for legitimate users.
 *
 * Security:
 *   - Redis credentials are read server-side only.
 *   - The IP is used as the rate-limit key; it is never logged.
 *   - No personal form data (name, email, message) is stored in Redis.
 * ---------------------------------------------------------------------------
 */

import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'
import type { NextRequest } from 'next/server'

// ---------------------------------------------------------------------------
// Credential check — mirrors the pattern used throughout this codebase.
// ---------------------------------------------------------------------------

function isRatelimitConfigured(): boolean {
  return (
    typeof process.env['UPSTASH_REDIS_REST_URL'] === 'string' &&
    process.env['UPSTASH_REDIS_REST_URL'].length > 0 &&
    typeof process.env['UPSTASH_REDIS_REST_TOKEN'] === 'string' &&
    process.env['UPSTASH_REDIS_REST_TOKEN'].length > 0
  )
}

// ---------------------------------------------------------------------------
// Rate limit configuration constants (easy to adjust).
// ---------------------------------------------------------------------------

/** Max contact form submissions per IP within the window. */
const CONTACT_LIMIT = 5

/** Max demo booking submissions per IP within the window. */
const DEMO_LIMIT = 3

/** Sliding window duration in seconds. */
const WINDOW_SECONDS = 60

// ---------------------------------------------------------------------------
// Lazily-initialized Ratelimit instances (one per endpoint).
// Created once on first use; not at module evaluation time so cold starts
// don't pay a connection cost when credentials are absent.
// ---------------------------------------------------------------------------

let _contactLimiter: Ratelimit | null = null
let _demoLimiter: Ratelimit | null = null

function getContactLimiter(): Ratelimit {
  if (!_contactLimiter) {
    const redis = new Redis({
      url: process.env['UPSTASH_REDIS_REST_URL'] as string,
      token: process.env['UPSTASH_REDIS_REST_TOKEN'] as string,
    })
    _contactLimiter = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(CONTACT_LIMIT, `${WINDOW_SECONDS} s`),
      prefix: 'ratelimit:contact',
    })
  }
  return _contactLimiter
}

function getDemoLimiter(): Ratelimit {
  if (!_demoLimiter) {
    const redis = new Redis({
      url: process.env['UPSTASH_REDIS_REST_URL'] as string,
      token: process.env['UPSTASH_REDIS_REST_TOKEN'] as string,
    })
    _demoLimiter = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(DEMO_LIMIT, `${WINDOW_SECONDS} s`),
      prefix: 'ratelimit:demo',
    })
  }
  return _demoLimiter
}

// ---------------------------------------------------------------------------
// IP extraction helper.
// ---------------------------------------------------------------------------

/**
 * Extract the client IP address from the request headers.
 * Returns "unknown" if no IP can be determined — this is safe for use as
 * a rate-limit key (it still rate-limits "unknown" clients rather than
 * crashing or skipping the check).
 */
function getIp(request: NextRequest): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'unknown'
  )
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export type RatelimitResult = { limited: false } | { limited: true; retryAfter: number }

/**
 * Check whether the contact form rate limit is exceeded for this request.
 *
 * @returns `{ limited: false }` if the request should proceed.
 *          `{ limited: true, retryAfter }` if the caller should return 429.
 */
export async function checkContactRatelimit(request: NextRequest): Promise<RatelimitResult> {
  if (!isRatelimitConfigured()) {
    console.warn(
      '[ratelimit] UPSTASH credentials absent — contact form rate limiting is INACTIVE (DEMO mode).',
    )
    return { limited: false }
  }

  const ip = getIp(request)
  const { success, reset } = await getContactLimiter().limit(ip)

  if (!success) {
    const retryAfter = Math.ceil((reset - Date.now()) / 1000)
    return { limited: true, retryAfter }
  }

  return { limited: false }
}

/**
 * Check whether the demo booking rate limit is exceeded for this request.
 *
 * @returns `{ limited: false }` if the request should proceed.
 *          `{ limited: true, retryAfter }` if the caller should return 429.
 */
export async function checkDemoRatelimit(request: NextRequest): Promise<RatelimitResult> {
  if (!isRatelimitConfigured()) {
    console.warn(
      '[ratelimit] UPSTASH credentials absent — demo booking rate limiting is INACTIVE (DEMO mode).',
    )
    return { limited: false }
  }

  const ip = getIp(request)
  const { success, reset } = await getDemoLimiter().limit(ip)

  if (!success) {
    const retryAfter = Math.ceil((reset - Date.now()) / 1000)
    return { limited: true, retryAfter }
  }

  return { limited: false }
}
