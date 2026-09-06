import type { Provided } from './types'

/**
 * ---------------------------------------------------------------------------
 * Site-level facts.
 *
 * Every string below is taken from the approved blueprint. Values the blueprint
 * refers to but never supplies are `null` and carry a PENDING marker naming the
 * open question they belong to. Grep for `PENDING(` to find everything still
 * waiting on the business.
 * ---------------------------------------------------------------------------
 */

type Address = {
  locality: string
  country: string
  street: Provided<string>
  postalCode: Provided<string>
}

type SiteConfig = {
  name: string
  /** Nav + footer attribution, per the blueprint: "Unify Wi-Fi (by TheWiFy)". */
  attribution: string
  legalEntity: string
  domain: string
  url: string
  /** Product category line from the blueprint header. */
  category: string
  /** Hero sub-headline; also the default meta description until SEO copy is signed off. */
  description: string
  contact: {
    email: string
    phone: Provided<string>
    whatsapp: Provided<string>
    address: Address
  }
  family: {
    parentBrand: string
    parentUrl: string
    guestWifiLabel: string
    guestWifiUrl: string
  }
  signInUrl: Provided<string>
}

export const site: SiteConfig = {
  name: 'Unify Wi-Fi',
  attribution: 'by TheWiFy',
  legalEntity: 'TheWiFy Technologies Private Limited',

  domain: 'unify.thewify.com',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://unify.thewify.com',

  category: 'Cloud RADIUS & ISP Management Platform for MikroTik Operators, WISPs & LCOs',

  description:
    'Connect MikroTik in 10 minutes. Automate PPPoE & Hotspot billing. Manage every subscriber from one dashboard — no servers required.',

  contact: {
    /** The only contact detail the blueprint actually specifies. */
    email: 'charan@thewify.com',
    /** PENDING(Q10): the blueprint says a phone number is shown but never gives one. */
    phone: null,
    /** PENDING(Q10): the blueprint says a WhatsApp number is shown but never gives one. */
    whatsapp: null,
    address: {
      locality: 'Hyderabad',
      country: 'India',
      /** PENDING(Q10): the blueprint supplies "Hyderabad, India" and nothing more. */
      street: null,
      postalCode: null,
    },
  },

  /** Sibling products in the TheWiFy family. The guest-WiFi cross-link is in the approved footer. */
  family: {
    parentBrand: 'TheWiFy',
    parentUrl: 'https://thewify.com',
    guestWifiLabel: 'guestwifi.thewify.com',
    guestWifiUrl: 'https://guestwifi.thewify.com',
  },

  /**
   * PENDING(Q6): the blueprint specifies a `Sign In` CTA for existing subscribers
   * but not where it points. Until it is supplied the nav renders the control in
   * a clearly unavailable state rather than guessing a URL.
   */
  signInUrl: null,
}

export type Site = SiteConfig
