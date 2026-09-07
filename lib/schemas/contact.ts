import { z } from 'zod'

/**
 * ---------------------------------------------------------------------------
 * Server-side Zod schema for the Option B "Quick Contact" form.
 *
 * Fields match contact-content.tsx exactly:
 *   - quickName   → name
 *   - quickEmail  → email
 *   - quickMessage → message
 *
 * Validation rules are intentionally lenient on format but strict on presence
 * and length, so operators with unusual email domains (e.g. internal ISP
 * tooling) are not rejected.
 * ---------------------------------------------------------------------------
 */

export const contactSchema = z.object({
  /** Submitter's full name. Required; 1–120 characters. */
  name: z
    .string({ required_error: 'Name is required.' })
    .trim()
    .min(1, 'Name is required.')
    .max(120, 'Name must be 120 characters or fewer.'),

  /** Work or personal email address. */
  email: z
    .string({ required_error: 'Email is required.' })
    .trim()
    .min(1, 'Email is required.')
    .max(254, 'Email must be 254 characters or fewer.')
    .email('A valid email address is required.'),

  /**
   * Free-form message / router configuration description.
   * Minimum of 10 characters to filter empty or accidental submissions.
   */
  message: z
    .string({ required_error: 'Message is required.' })
    .trim()
    .min(10, 'Message must be at least 10 characters.')
    .max(5000, 'Message must be 5,000 characters or fewer.'),
})

export type ContactPayload = z.infer<typeof contactSchema>
