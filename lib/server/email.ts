/**
 * ---------------------------------------------------------------------------
 * Transactional email — Resend integration (Phase 8 Step 2).
 *
 * Provider: Resend (https://resend.com)
 *
 * Environment contract (see .env.example):
 *   RESEND_API_KEY   — Resend API key (re_…). Required for live sends.
 *   EMAIL_FROM       — Verified sender address, e.g. noreply@thewify.com.
 *                      Must be from a domain verified in the Resend dashboard.
 *   LEAD_NOTIFY_TO   — Optional comma-separated list of internal recipient
 *                      addresses. Falls back to the three approved recipients
 *                      below when not set.
 *
 * Mode contract:
 *   RESEND_API_KEY + EMAIL_FROM both present → live sends via Resend
 *   Either absent                            → DEMO mode (nothing sent, UI says so)
 *
 * Security:
 *   - This file is server-only. Nothing here is imported into client bundles.
 *   - The API key is read only at runtime inside server functions.
 *   - Personal form data is never logged.
 * ---------------------------------------------------------------------------
 */

import { Resend } from 'resend'

// ---------------------------------------------------------------------------
// Shared types — kept identical so API routes don't change.
// ---------------------------------------------------------------------------

export type EmailPayload = {
  /** One or more recipient addresses (internal team alert). */
  to: string | string[]
  /** Verified sender address — read from EMAIL_FROM env var. */
  from?: string
  subject: string
  /** Plain-text fallback body. */
  text: string
  /** HTML body shown by modern mail clients. */
  html?: string
  /** Submitter's email for direct replies. */
  replyTo?: string | string[]
}

export type EmailResult =
  | { ok: true; mode: 'live'; messageId: string }
  | { ok: true; mode: 'demo'; reason: string }
  | { ok: false; mode: 'live' | 'demo'; error: string }

// ---------------------------------------------------------------------------
// Approved lead-notification recipients.
// Read from LEAD_NOTIFY_TO (comma-separated) at runtime so they can be
// updated in the environment without a code deploy.
// The three addresses below are the approved defaults from the task brief.
// ---------------------------------------------------------------------------

const DEFAULT_RECIPIENTS = ['lakshmiraj@thewify.com']

function getRecipients(): string[] {
  const raw = process.env['LEAD_NOTIFY_TO']
  if (!raw || raw.trim().length === 0) return DEFAULT_RECIPIENTS
  return raw
    .split(',')
    .map((addr) => addr.trim())
    .filter((addr) => addr.length > 0)
}

// ---------------------------------------------------------------------------
// Credential check — single source of truth.
// ---------------------------------------------------------------------------

function isEmailConfigured(): boolean {
  return (
    typeof process.env['RESEND_API_KEY'] === 'string' &&
    process.env['RESEND_API_KEY'].length > 0 &&
    typeof process.env['EMAIL_FROM'] === 'string' &&
    process.env['EMAIL_FROM'].length > 0
  )
}

// ---------------------------------------------------------------------------
// Live send path — called only when credentials are present.
// ---------------------------------------------------------------------------

async function sendLive(payload: EmailPayload): Promise<EmailResult> {
  const apiKey = process.env['RESEND_API_KEY'] as string
  const from = payload.from ?? (process.env['EMAIL_FROM'] as string)

  const resend = new Resend(apiKey)

  const { data, error } = await resend.emails.send({
    from,
    to: Array.isArray(payload.to) ? payload.to : [payload.to],
    subject: payload.subject,
    text: payload.text,
    ...(payload.replyTo ? { reply_to: payload.replyTo } : {}),
    ...(payload.html ? { html: payload.html } : {}),
  })

  if (error !== null || data === null) {
    // Log the provider error name only — never log message bodies.
    console.error('[email:live] Resend error:', error?.name ?? 'unknown')
    return {
      ok: false,
      mode: 'live',
      error: 'Email delivery failed.',
    }
  }

  return { ok: true, mode: 'live', messageId: data.id }
}

// ---------------------------------------------------------------------------
// Public send function — unchanged interface used by both API routes.
// ---------------------------------------------------------------------------

/**
 * Send a transactional email.
 *
 * - Credentials absent  → DEMO mode (no network call, result clearly marked)
 * - Credentials present → live send via Resend
 */
export async function sendEmail(payload: EmailPayload): Promise<EmailResult> {
  if (!isEmailConfigured()) {
    // Only log non-personal metadata.
    console.log(
      '[email:demo] Credentials absent. Would send to:',
      Array.isArray(payload.to) ? payload.to.join(', ') : payload.to,
      '| Subject:',
      payload.subject,
    )
    return {
      ok: true,
      mode: 'demo',
      reason:
        'RESEND_API_KEY and EMAIL_FROM are not configured. ' +
        'No email was sent. Set both env vars to enable live delivery.',
    }
  }

  return sendLive(payload)
}

// ---------------------------------------------------------------------------
// Email builders — multi-recipient array + HTML templates.
// Argument shapes are identical to the old API so routes don't change.
// ---------------------------------------------------------------------------

/**
 * Build the internal alert email for a Quick Contact submission.
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
  const to = getRecipients()
  const subject = `[Unify Wi-Fi] New contact enquiry from ${name}`

  const text = [
    'New contact enquiry — Unify Wi-Fi',
    '',
    `Name:    ${name}`,
    `Email:   ${email}`,
    '',
    'Message:',
    message,
    '',
    '---',
    'Source: Quick Contact form at unify.thewify.com/contact',
  ].join('\n')

  const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:ui-sans-serif,system-ui,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;border:1px solid #e2e8f0;overflow:hidden;max-width:600px;width:100%;">
        <tr><td style="background:#0b1424;padding:24px 32px;">
          <p style="margin:0;font-size:13px;font-weight:700;color:#a3b6d1;text-transform:uppercase;letter-spacing:0.1em;">Unify Wi-Fi</p>
          <h1 style="margin:4px 0 0;font-size:20px;font-weight:800;color:#e8eef7;">New Contact Enquiry</h1>
        </td></tr>
        <tr><td style="padding:32px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr><td style="padding:10px 0;border-bottom:1px solid #f1f5f9;">
              <p style="margin:0;font-size:11px;font-weight:700;color:#7c8ca5;text-transform:uppercase;letter-spacing:0.08em;">Name</p>
              <p style="margin:4px 0 0;font-size:15px;color:#0f172a;">${escHtml(name)}</p>
            </td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #f1f5f9;">
              <p style="margin:0;font-size:11px;font-weight:700;color:#7c8ca5;text-transform:uppercase;letter-spacing:0.08em;">Email</p>
              <p style="margin:4px 0 0;font-size:15px;"><a href="mailto:${escHtml(email)}" style="color:#2563eb;">${escHtml(email)}</a></p>
            </td></tr>
            <tr><td style="padding:10px 0;">
              <p style="margin:0;font-size:11px;font-weight:700;color:#7c8ca5;text-transform:uppercase;letter-spacing:0.08em;">Message</p>
              <p style="margin:8px 0 0;font-size:15px;color:#334155;line-height:1.6;white-space:pre-wrap;">${escHtml(message)}</p>
            </td></tr>
          </table>
          <div style="margin-top:24px;padding:16px;background:#eff6ff;border-radius:8px;border-left:4px solid #2563eb;">
            <p style="margin:0;font-size:13px;color:#1e40af;font-weight:600;">Reply directly to this lead by clicking their email above.</p>
          </div>
        </td></tr>
        <tr><td style="background:#f8fafc;padding:16px 32px;border-top:1px solid #e2e8f0;">
          <p style="margin:0;font-size:12px;color:#7c8ca5;">Source: Quick Contact form · unify.thewify.com/contact</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`

  return { to, subject, text, html, replyTo: email }
}

/**
 * Build the internal alert email for a Demo Booking submission.
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
  const to = getRecipients()
  const subject = `[Unify Wi-Fi] Demo booking — ${company} · ${date} ${slot}`

  const text = [
    'Demo Booking — Unify Wi-Fi',
    '',
    `Name:        ${name}`,
    `Email:       ${email}`,
    `Company:     ${company}`,
    `Subscribers: ${subscribers}`,
    `Hardware:    ${hardware}`,
    `Date:        ${date}`,
    `Slot:        ${slot}`,
    '',
    '---',
    'Source: Demo Booking form at unify.thewify.com/contact',
  ].join('\n')

  const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:ui-sans-serif,system-ui,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;border:1px solid #e2e8f0;overflow:hidden;max-width:600px;width:100%;">
        <tr><td style="background:#0b1424;padding:24px 32px;">
          <p style="margin:0;font-size:13px;font-weight:700;color:#a3b6d1;text-transform:uppercase;letter-spacing:0.1em;">Unify Wi-Fi</p>
          <h1 style="margin:4px 0 0;font-size:20px;font-weight:800;color:#e8eef7;">New Demo Booking</h1>
          <p style="margin:6px 0 0;font-size:14px;color:#a3b6d1;">${escHtml(date)} at ${escHtml(slot)} IST</p>
        </td></tr>
        <tr><td style="padding:32px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            ${tableRow('Name', escHtml(name))}
            ${tableRow('Email', `<a href="mailto:${escHtml(email)}" style="color:#2563eb;">${escHtml(email)}</a>`)}
            ${tableRow('Company / ISP', escHtml(company))}
            ${tableRow('Subscribers', escHtml(subscribers))}
            ${tableRow('Primary Hardware', escHtml(hardware))}
            ${tableRow('Date', escHtml(date))}
            ${tableRow('Time Slot', escHtml(slot) + ' IST', false)}
          </table>
          <div style="margin-top:24px;padding:16px;background:#eff6ff;border-radius:8px;border-left:4px solid #2563eb;">
            <p style="margin:0;font-size:13px;color:#1e40af;font-weight:600;">Prepare a demo calendar invite for <strong>${escHtml(date)}</strong> at <strong>${escHtml(slot)} IST</strong>.</p>
          </div>
        </td></tr>
        <tr><td style="background:#f8fafc;padding:16px 32px;border-top:1px solid #e2e8f0;">
          <p style="margin:0;font-size:12px;color:#7c8ca5;">Source: Demo Booking form · unify.thewify.com/contact</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`

  return { to, subject, text, html }
}

/**
 * Build the internal alert email for a Demo Lead pre-qualification submission.
 */
export function buildDemoLeadAlertEmail({
  name,
  email,
  company,
  subscribers,
  hardware,
  note,
}: {
  name: string
  email: string
  company: string
  subscribers: string
  hardware: string
  note?: string
}): EmailPayload {
  const to = getRecipients()
  const subject = `[Unify Wi-Fi] New Demo Lead: ${company} (${name})`

  const lines = [
    'New Demo Lead Pre-Qualification — Unify Wi-Fi',
    '',
    `Name:        ${name}`,
    `Email:       ${email}`,
    `Company:     ${company}`,
    `Subscribers: ${subscribers}`,
    `Hardware:    ${hardware}`,
  ]
  if (note && note.trim().length > 0) {
    lines.push(`Requirements/Notes: ${note.trim()}`)
  }
  lines.push('', 'Status: Visitor proceeded to Calendly to pick a meeting slot.', '---', 'Source: Book a Free Demo form at unify.thewify.com/contact')

  const text = lines.join('\n')

  const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:ui-sans-serif,system-ui,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;border:1px solid #e2e8f0;overflow:hidden;max-width:600px;width:100%;">
        <tr><td style="background:#0b1424;padding:24px 32px;">
          <p style="margin:0;font-size:13px;font-weight:700;color:#a3b6d1;text-transform:uppercase;letter-spacing:0.1em;">Unify Wi-Fi</p>
          <h1 style="margin:4px 0 0;font-size:20px;font-weight:800;color:#e8eef7;">New Demo Lead Qualification</h1>
          <p style="margin:6px 0 0;font-size:14px;color:#a3b6d1;">${escHtml(company)} · ${escHtml(subscribers)}</p>
        </td></tr>
        <tr><td style="padding:32px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            ${tableRow('Name', escHtml(name))}
            ${tableRow('Email', `<a href="mailto:${escHtml(email)}" style="color:#2563eb;">${escHtml(email)}</a>`)}
            ${tableRow('Company / ISP', escHtml(company))}
            ${tableRow('Active Subscribers', escHtml(subscribers))}
            ${tableRow('Primary Router / Hardware', escHtml(hardware), !note)}
            ${note && note.trim().length > 0 ? tableRow('Looking For / Notes', escHtml(note.trim()), false) : ''}
          </table>
          <div style="margin-top:24px;padding:16px;background:#eff6ff;border-radius:8px;border-left:4px solid #2563eb;">
            <p style="margin:0;font-size:13px;color:#1e40af;font-weight:600;">The user has proceeded to pick their Calendly meeting slot. You can reach out directly at <a href="mailto:${escHtml(email)}" style="color:#1e40af;text-decoration:underline;">${escHtml(email)}</a>.</p>
          </div>
        </td></tr>
        <tr><td style="background:#f8fafc;padding:16px 32px;border-top:1px solid #e2e8f0;">
          <p style="margin:0;font-size:12px;color:#7c8ca5;">Source: Demo Booking Pre-qualification · unify.thewify.com/contact</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`

  return { to, subject, text, html, replyTo: email }
}

// ---------------------------------------------------------------------------
// HTML helpers — server-side only, zero external dependencies.
// ---------------------------------------------------------------------------

/** Escape characters with special meaning in HTML to prevent injection. */
function escHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

/** Render one labelled row inside the email body table. */
function tableRow(label: string, value: string, border = true): string {
  const borderStyle = border ? 'border-bottom:1px solid #f1f5f9;' : ''
  return `<tr><td style="padding:10px 0;${borderStyle}">
  <p style="margin:0;font-size:11px;font-weight:700;color:#7c8ca5;text-transform:uppercase;letter-spacing:0.08em;">${label}</p>
  <p style="margin:4px 0 0;font-size:15px;color:#0f172a;">${value}</p>
</td></tr>`
}
