import { type NextRequest, NextResponse } from 'next/server'
import { ZodError } from 'zod'
import { contactSchema } from '@/lib/schemas'
import { sendEmail, buildContactAlertEmail } from '@/lib/server/email'
import { checkContactRatelimit } from '@/lib/server/ratelimit'

/**
 * ---------------------------------------------------------------------------
 * POST /api/contact
 *
 * Handles Option B "Quick Contact" form submissions from contact-content.tsx.
 *
 * Security contract:
 * - Input validated server-side with Zod before any processing.
 * - No credentials, API keys, or stack traces are exposed in responses.
 * - Personal data (name, email, message) is never logged.
 * - The endpoint is server-only: no env vars reach the browser bundle.
 *
 * Mode contract (from .env.example and lib/notify/email.ts):
 * - Credentials present → email sent live; response indicates 'live' mode.
 * - Credentials absent  → demo mode; response explicitly says no email was sent.
 * ---------------------------------------------------------------------------
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  // 0. Rate limiting — checked before any body parsing.
  //    Credentials absent → DEMO mode (pass through with a server-side warning).
  const ratelimit = await checkContactRatelimit(request)
  if (ratelimit.limited) {
    return NextResponse.json(
      { ok: false, error: 'Too many requests. Please wait a moment before trying again.' },
      {
        status: 429,
        headers: { 'Retry-After': String(ratelimit.retryAfter) },
      },
    )
  }

  // 1. Parse and validate the request body.
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Request body must be valid JSON.' },
      { status: 400 },
    )
  }

  let payload: { name: string; email: string; message: string }
  try {
    payload = contactSchema.parse(body)
  } catch (err) {
    if (err instanceof ZodError) {
      // Return the first validation message — enough for the client to display.
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
    // Unknown parse error — treat as bad request.
    return NextResponse.json({ ok: false, error: 'Invalid request payload.' }, { status: 400 })
  }

  // 2. Attempt to send the internal notification email.
  let emailResult: Awaited<ReturnType<typeof sendEmail>>
  try {
    const emailPayload = buildContactAlertEmail({
      name: payload.name,
      email: payload.email,
      message: payload.message,
    })
    emailResult = await sendEmail(emailPayload)
  } catch (err) {
    // Unexpected error in the notify layer — don't expose details.
    console.error(
      '[api/contact] Unexpected error in sendEmail:',
      err instanceof Error ? err.message : 'unknown',
    )
    return NextResponse.json(
      { ok: false, error: 'An unexpected error occurred. Please try again.' },
      { status: 500 },
    )
  }

  // 3. Return a structured response. The frontend uses `mode` to decide
  //    whether to show a "demo mode" notice alongside the success state.
  if (!emailResult.ok) {
    // The notify layer returned a provider error — safe to surface a generic message.
    console.error('[api/contact] Email send failed:', emailResult.error)
    return NextResponse.json(
      {
        ok: false,
        error: 'Could not deliver your message. Please try again or email us directly.',
      },
      { status: 502 },
    )
  }

  return NextResponse.json(
    {
      ok: true,
      mode: emailResult.mode,
      // In demo mode: surface the reason so the UI can show a clear notice.
      ...(emailResult.mode === 'demo' ? { demoReason: emailResult.reason } : {}),
    },
    { status: 200 },
  )
}
