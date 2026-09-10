import { type NextRequest, NextResponse } from 'next/server'
import { ZodError } from 'zod'
import { demoBookingSchema } from '@/lib/schemas/demo-booking'
import { sendEmail, buildDemoAlertEmail } from '@/lib/notify/email'
import { bookDemoSlot } from '@/lib/calendar/provider'
import { checkDemoRatelimit } from '@/lib/ratelimit'

/**
 * ---------------------------------------------------------------------------
 * POST /api/demo-booking
 *
 * Handles Option A "Book a Live Demo" form submissions from contact-content.tsx.
 *
 * Security contract:
 * - Input validated server-side with Zod before any processing.
 * - No credentials, API keys, or stack traces are exposed in responses.
 * - Personal data is never logged.
 * - The endpoint is server-only: no env vars reach the browser bundle.
 *
 * Mode contract (from .env.example):
 * - Credentials absent → demo mode for both email and calendar.
 *   The response clearly states that no calendar event was created and
 *   no Google Meet link was generated. The UI must not claim otherwise.
 * - Credentials present → live mode (email + calendar integration active).
 *   The live path is implemented in Phase 8 Steps 2 and 3.
 * ---------------------------------------------------------------------------
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  // 0. Rate limiting — checked before any body parsing.
  //    Credentials absent → DEMO mode (pass through with a server-side warning).
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

  let payload: {
    name: string
    email: string
    company: string
    subscribers: string
    hardware: string
    date: string
    slot: string
  }
  try {
    payload = demoBookingSchema.parse(body)
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

  // 2. Attempt to create a calendar booking (or enter demo mode).
  let calendarResult: Awaited<ReturnType<typeof bookDemoSlot>>
  try {
    calendarResult = await bookDemoSlot({
      name: payload.name,
      email: payload.email,
      company: payload.company,
      date: payload.date,
      slot: payload.slot,
    })
  } catch (err) {
    console.error(
      '[api/demo-booking] Unexpected error in bookDemoSlot:',
      err instanceof Error ? err.message : 'unknown',
    )
    return NextResponse.json(
      { ok: false, error: 'An unexpected error occurred. Please try again.' },
      { status: 500 },
    )
  }

  if (!calendarResult.ok) {
    console.error('[api/demo-booking] Calendar booking failed:', calendarResult.error)
    return NextResponse.json(
      {
        ok: false,
        error: 'Could not create your demo booking. Please try again or email us directly.',
      },
      { status: 502 },
    )
  }

  // 3. Attempt to send the internal alert email.
  let emailResult: Awaited<ReturnType<typeof sendEmail>>
  try {
    const emailPayload = buildDemoAlertEmail({
      name: payload.name,
      email: payload.email,
      company: payload.company,
      subscribers: payload.subscribers,
      hardware: payload.hardware,
      date: payload.date,
      slot: payload.slot,
    })
    emailResult = await sendEmail(emailPayload)
  } catch (err) {
    // Email failure must not prevent the booker from getting a response.
    // Log and continue — the booking itself succeeded (or is in demo mode).
    console.error(
      '[api/demo-booking] Unexpected error in sendEmail:',
      err instanceof Error ? err.message : 'unknown',
    )
    emailResult = { ok: false, mode: 'demo', error: 'Notification email failed unexpectedly.' }
  }

  // 4. Return a structured response.
  //    The overall mode is 'demo' if either integration ran in demo mode.
  const overallMode =
    calendarResult.mode === 'demo' || emailResult.mode === 'demo' ? 'demo' : 'live'

  return NextResponse.json(
    {
      ok: true,
      mode: overallMode,
      // Pass back the selected slot details so the frontend can render them.
      booking: {
        name: payload.name,
        email: payload.email,
        date: payload.date,
        slot: payload.slot,
      },
      // meetUrl is only present in live mode. In demo mode it is null.
      meetUrl: calendarResult.mode === 'live' ? calendarResult.meetUrl : null,
      // In demo mode: surface a reason so the UI shows a clear notice.
      ...(overallMode === 'demo'
        ? {
            demoReason:
              'No real calendar event was created and no Google Meet link was generated. ' +
              'Live integrations (Google Calendar + email) are configured in Phase 8 Steps 2–3.',
          }
        : {}),
    },
    { status: 200 },
  )
}
