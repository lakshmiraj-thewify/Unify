import { z } from 'zod'
import { hardwareOptions, subscriberRanges, demoTimeSlots } from '@/content/contact'

/**
 * ---------------------------------------------------------------------------
 * Server-side Zod schema for the Option A "Book a Live Demo" form.
 *
 * Fields match contact-content.tsx state exactly:
 *   Step 1: demoName, demoEmail, demoCompany, demoSubscribers, demoHardware
 *   Step 2: selectedDate, selectedSlot
 *
 * Select/enum values are derived directly from the shared content arrays so
 * the server and client always accept exactly the same set — any future change
 * to the content arrays is automatically reflected here.
 * ---------------------------------------------------------------------------
 */

/** Narrow the tuple types for enum validation. */
const subscriberRangeEnum = z.enum(subscriberRanges)
const hardwareOptionEnum = z.enum(hardwareOptions)
const timeSlotEnum = z.enum(demoTimeSlots)

/**
 * The three valid date labels that the slot picker presents.
 * These are deterministic display labels, not real ISO dates — the live
 * Google Calendar integration (future Phase 8 step) will replace them with
 * real date strings. For now we validate only that one of the offered labels
 * was selected.
 */
const validDateLabels = ['Tomorrow', 'In 2 Days', 'Next Monday'] as const
const dateLabelEnum = z.enum(validDateLabels)

export const demoBookingSchema = z.object({
  /** Booker's full name. */
  name: z
    .string({ required_error: 'Full name is required.' })
    .trim()
    .min(1, 'Full name is required.')
    .max(120, 'Name must be 120 characters or fewer.'),

  /** Work email — receives the (future) calendar invite. */
  email: z
    .string({ required_error: 'Work email is required.' })
    .trim()
    .min(1, 'Work email is required.')
    .max(254, 'Email must be 254 characters or fewer.')
    .email('A valid email address is required.'),

  /** Company or ISP name — provides context for the demo session. */
  company: z
    .string({ required_error: 'Company or ISP name is required.' })
    .trim()
    .min(1, 'Company or ISP name is required.')
    .max(200, 'Company name must be 200 characters or fewer.'),

  /** Subscriber count tier — one of the four options shown in the form select. */
  subscribers: subscriberRangeEnum,

  /** Primary router hardware — one of the six options shown in the form select. */
  hardware: hardwareOptionEnum,

  /**
   * Preferred date label from the slot picker.
   * When Google Calendar integration is active this becomes a real ISO date;
   * for now it is one of the three deterministic display labels.
   */
  date: dateLabelEnum,

  /** Selected IST time slot from the four options defined in content/contact.ts. */
  slot: timeSlotEnum,
})

export type DemoBookingPayload = z.infer<typeof demoBookingSchema>

/** The three valid date display labels exported for use by API routes. */
export { validDateLabels }
