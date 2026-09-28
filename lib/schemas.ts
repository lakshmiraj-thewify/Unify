import { z } from 'zod'
import { hardwareOptions, subscriberRanges, demoTimeSlots } from '@/content/contact'

/**
 * ---------------------------------------------------------------------------
 * Server-side Zod schema for the Quick Contact form.
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

  /** Message or router configuration description. */
  message: z
    .string({ required_error: 'Message is required.' })
    .trim()
    .min(10, 'Message must be at least 10 characters.')
    .max(5000, 'Message must be 5,000 characters or fewer.'),
})

export type ContactPayload = z.infer<typeof contactSchema>

/**
 * ---------------------------------------------------------------------------
 * Server-side Zod schema for the Live Demo Booking form.
 * ---------------------------------------------------------------------------
 */
const subscriberRangeEnum = z.enum(subscriberRanges)
const hardwareOptionEnum = z.enum(hardwareOptions)
const timeSlotEnum = z.enum(demoTimeSlots)

export const validDateLabels = ['Tomorrow', 'In 2 Days', 'Next Monday'] as const
const dateLabelEnum = z.enum(validDateLabels)

export const demoBookingSchema = z.object({
  name: z
    .string({ required_error: 'Full name is required.' })
    .trim()
    .min(1, 'Full name is required.')
    .max(120, 'Name must be 120 characters or fewer.'),

  email: z
    .string({ required_error: 'Work email is required.' })
    .trim()
    .min(1, 'Work email is required.')
    .max(254, 'Email must be 254 characters or fewer.')
    .email('A valid email address is required.'),

  company: z
    .string({ required_error: 'Company or ISP name is required.' })
    .trim()
    .min(1, 'Company or ISP name is required.')
    .max(200, 'Company name must be 200 characters or fewer.'),

  subscribers: subscriberRangeEnum,
  hardware: hardwareOptionEnum,
  date: dateLabelEnum,
  slot: timeSlotEnum,
})

export type DemoBookingPayload = z.infer<typeof demoBookingSchema>

/**
 * ---------------------------------------------------------------------------
 * Server-side Zod schema for pre-meeting questions before Calendly.
 * ---------------------------------------------------------------------------
 */
export const demoLeadSchema = z.object({
  name: z
    .string({ required_error: 'Full name is required.' })
    .trim()
    .min(1, 'Full name is required.')
    .max(120, 'Name must be 120 characters or fewer.'),

  email: z
    .string({ required_error: 'Work email is required.' })
    .trim()
    .min(1, 'Work email is required.')
    .max(254, 'Email must be 254 characters or fewer.')
    .email('A valid email address is required.'),

  company: z
    .string({ required_error: 'Company or ISP name is required.' })
    .trim()
    .min(1, 'Company or ISP name is required.')
    .max(200, 'Company name must be 200 characters or fewer.'),

  subscribers: z
    .string({ required_error: 'Please select your subscriber range.' })
    .trim()
    .min(1, 'Please select your subscriber range.'),

  hardware: z
    .string({ required_error: 'Please select your router / hardware.' })
    .trim()
    .min(1, 'Please select your router / hardware.'),

  note: z.string().trim().max(1000).optional(),
})

export type DemoLeadPayload = z.infer<typeof demoLeadSchema>
