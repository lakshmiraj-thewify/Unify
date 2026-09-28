import { type NextRequest, NextResponse } from 'next/server'
import { ZodError } from 'zod'
import { demoLeadSchema } from '@/lib/schemas'
import { sendEmail, buildDemoLeadAlertEmail } from '@/lib/server/email'
import { checkDemoRatelimit } from '@/lib/server/ratelimit'

/**
 * ---------------------------------------------------------------------------
 * POST /api/demo-lead
 *
 * Saves and emails the pre-qualification questions when a visitor fills out
 * their details before proceeding to Calendly.
 * ---------------------------------------------------------------------------
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  // 0. Rate limiting
  const ratelimit = await checkDemoRatelimit(request)
  if (ratelimit.limited) {
    return NextResponse.json(
      { ok: false, error: 'Too many requests. Please wait a moment before trying again.' },
      {
        status: 429,
        headers: { 'Retry-After': String(ratelimit.retryAfter) },
      },
    )
  }

  // 1. Parse and validate request body
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Request body must be valid JSON.' },
      { status: 400 },
    )
  }

  let payload: {
    name: string
    email: string
    company: string
    subscribers: string
    hardware: string
    note?: string
  }
  try {
    payload = demoLeadSchema.parse(body)
  } catch (err) {
    if (err instanceof ZodError) {
      const firstIssue = err.issues[0]
      return NextResponse.json(
        {
          ok: false,
          error: firstIssue?.message ?? 'Validation failed.',
          field: firstIssue?.path[0] ?? null,
        },
        { status: 422 },
      )
    }
    return NextResponse.json({ ok: false, error: 'Invalid request payload.' }, { status: 400 })
  }

  // 2. Send internal notification email to the team
  try {
    const emailPayload = buildDemoLeadAlertEmail({
      name: payload.name,
      email: payload.email,
      company: payload.company,
      subscribers: payload.subscribers,
      hardware: payload.hardware,
      note: payload.note,
    })
    await sendEmail(emailPayload)
  } catch (err) {
    console.error(
      '[api/demo-lead] Unexpected error in sendEmail:',
      err instanceof Error ? err.message : 'unknown',
    )
    // Non-blocking for the user: we still allow them to proceed to Calendly
  }

  return NextResponse.json({ ok: true })
}
