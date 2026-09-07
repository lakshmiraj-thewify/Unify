import type { LinkHref } from '@/lib/links'
import { site } from './site'

/**
 * ---------------------------------------------------------------------------
 * Hero copy — Section 1 of the approved blueprint.
 *
 * Every string below is transcribed from the blueprint, not written here. The
 * three trust claims in particular are approved copy and are reproduced
 * verbatim: `99.99%` is not rounded to `99.9%`, and no fourth claim is added.
 * ---------------------------------------------------------------------------
 */

type HeroCta = {
  label: string
  href: LinkHref
}

/** Semantic weight of a trust claim. Maps to a Badge variant at render time. */
export type TrustTone = 'signal' | 'primary' | 'ok'

export type TrustClaim = {
  label: string
  tone: TrustTone
  /** Contains a figure — rendered in mono with tabular numerals. */
  numeric: boolean
}

type HeroContent = {
  badge: string
  /** Split so a single word can carry the gradient emphasis. */
  headline: { before: string; emphasis: string; after: string }
  subheadline: string
  primaryCta: HeroCta
  secondaryCta: HeroCta
  trustClaims: TrustClaim[]
}

export const hero: HeroContent = {
  badge: 'Cloud RADIUS Platform · Built for ISPs, WISPs & MikroTik Operators',

  // Blueprint headline: "Your ISP. Unified. In the Cloud."
  headline: { before: 'Your ISP.', emphasis: 'Unified.', after: 'In the Cloud.' },

  // Identical to the blueprint sub-headline, which is also the site description.
  subheadline: site.description,

  /*
   * Booking lives on /contact per blueprint Section 13. The route is built in
   * Phase 7; until then this resolves to the 404 page, which is the established
   * convention here — the alternative is inventing a destination.
   */
  primaryCta: { label: 'Book a Demo', href: '/contact' },

  // Anchors the "How Unify Wi-Fi Works" pipeline — blueprint Section 5, Phase 3.
  secondaryCta: { label: 'See How It Works', href: '/#how-it-works' },

  trustClaims: [
    { label: '99.99% RADIUS Uptime', tone: 'signal', numeric: true },
    /*
     * PENDING(Q9): reproduced from the approved blueprint, but the underlying
     * certification has not been evidenced. Flagged for sign-off; NOT softened
     * or removed here, because the blueprint is the approved source of truth.
     */
    { label: 'MikroTik Certified', tone: 'primary', numeric: false },
    { label: '200+ ISPs Active', tone: 'ok', numeric: true },
  ],
}
