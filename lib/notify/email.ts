/**
 * ---------------------------------------------------------------------------
 * Transactional email abstraction — Phase 8 integration interface.
 *
 * Contract (from .env.example):
 *   EMAIL_PROVIDER_API_KEY present → feature runs live
 *   EMAIL_PROVIDER_API_KEY absent  → DEMO mode: nothing is sent, result is
 *                                    clearly marked as a simulation
 *
 * The specific email provider (Resend, Postmark, SendGrid, etc.) has not yet
 * been approved by the business. This module exposes a stable `sendEmail`
 * interface so that the API routes are written once and the provider is
 * plugged in as a single edit to the `sendLive` function below.
 *
 * Nothing in this file is client-side. All environment reads happen at
 * runtime on the server — no values are exposed to the browser bundle.
 * ---------------------------------------------------------------------------
 */

export type EmailPayload = {
  /** Destination address. Comes from LEAD_NOTIFY_TO env var for internal alerts. */
  to: string
  /** Plain-text sender label. Comes from EMAIL_FROM env var once configured. */
  from?: string
  subject: string
  /** Plain-text body. Used as fallback when html is omitted. */
  text: string
  /** Optional HTML body. If absent the provider renders the text field. */
  html?: string
}

export type EmailResult =
  | { ok: true; mode: 'live'; messageId: string }
  | { ok: true; mode: 'demo'; reason: string }
  | { ok: false; mode: 'live' | 'demo'; error: string }

/**
 * Check whether the required email credentials are present.
 * This is the single place that defines what "configured" means —
 * if the contract in .env.example changes, only this function needs updating.
 */
function isEmailConfigured(): boolean {
  return (
    typeof process.env['EMAIL_PROVIDER_API_KEY'] === 'string' &&
    process.env['EMAIL_PROVIDER_API_KEY'].length > 0 &&
    typeof process.env['EMAIL_FROM'] === 'string' &&
    process.env['EMAIL_FROM'].length > 0
  )
}

/**
 * Live send path — called only when credentials are present.
 *
 * PROVIDER PLUG-IN POINT: replace the body of this function with the
 * provider SDK call once the business approves a provider. The interface
 * (EmailPayload in, EmailResult out) must not change.
 *
 * Example pattern for Resend:
 *   const resend = new Resend(process.env.EMAIL_PROVIDER_API_KEY)
 *   const { data, error } = await resend.emails.send({ ... })
 *
 * Example pattern for Postmark:
 *   const client = new ServerClient(process.env.EMAIL_PROVIDER_API_KEY)
 *   const result = await client.sendEmail({ ... })
 */
async function sendLive(_payload: EmailPayload): Promise<EmailResult> {
  // Provider not yet selected — this branch is intentionally unreachable until
  // a real provider is wired. If credentials are present but the provider
  // hasn't been integrated, surface a clear server-side error.
  return {
    ok: false,
    mode: 'live',
    error:
      'EMAIL_PROVIDER_API_KEY is set but no provider has been integrated. ' +
      'Implement sendLive() in lib/notify/email.ts to complete Phase 8 Step 2.',
  }
}

/**
 * Send a transactional email.
 *
 * Behaviour:
 * - Credentials absent  → returns a DEMO result immediately (no network call)
 * - Credentials present → delegates to sendLive()
 *
 * The recipient address in `to` is determined by the caller from env config
 * (LEAD_NOTIFY_TO for internal alerts). This function never reads env vars
 * for addressing — it only reads them to decide live vs demo mode.
 */
export async function sendEmail(payload: EmailPayload): Promise<EmailResult> {
  if (!isEmailConfigured()) {
    // Safe to log the destination and subject — never log the body to avoid
    // leaking personal data that a lead typed into the form.
    console.log(
      '[email:demo] Credentials absent. Would send to:',
      payload.to,
      '| Subject:',
      payload.subject,
    )
    return {
      ok: true,
      mode: 'demo',
      reason:
        'EMAIL_PROVIDER_API_KEY and EMAIL_FROM are not configured. ' +
        'No email was sent. Set both env vars to enable live delivery.',
    }
  }

  return sendLive(payload)
}

/**
 * Build the internal alert email for a quick-contact submission.
 * The recipient address is read from LEAD_NOTIFY_TO — the same constant
 * already defined in .env.example. Falls back to the empty string if not
 * set, which will surface as a validation error in sendLive when it's wired.
 */
export function buildContactAlertEmail({
  name,
  email,
  message,
}: {
  name: string
  email: string
  message: string
}): EmailPayload {
  const to = process.env['LEAD_NOTIFY_TO'] ?? ''
  return {
    to,
    subject: `[Unify Wi-Fi] New contact enquiry from ${name}`,
    text: [
      `Name:    ${name}`,
      `Email:   ${email}`,
      `Message:\n${message}`,
      '',
      '---',
      'Sent via the Unify Wi-Fi quick contact form.',
    ].join('\n'),
  }
}

/**
 * Build the internal alert email for a demo booking submission.
 */
export function buildDemoAlertEmail({
  name,
  email,
  company,
  subscribers,
  hardware,
  date,
  slot,
}: {
  name: string
  email: string
  company: string
  subscribers: string
  hardware: string
  date: string
  slot: string
}): EmailPayload {
  const to = process.env['LEAD_NOTIFY_TO'] ?? ''
  return {
    to,
    subject: `[Unify Wi-Fi] Demo booking — ${company} · ${date} ${slot}`,
    text: [
      `Name:        ${name}`,
      `Email:       ${email}`,
      `Company:     ${company}`,
      `Subscribers: ${subscribers}`,
      `Hardware:    ${hardware}`,
      `Date:        ${date}`,
      `Slot:        ${slot}`,
      '',
      '---',
      'Sent via the Unify Wi-Fi demo booking form.',
    ].join('\n'),
  }
}
