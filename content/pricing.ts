type Provided<T> = T | null

/**
 * ---------------------------------------------------------------------------
 * Pricing copy — Section 14 of the approved blueprint.
 *
 * 3 plan tiers:
 *   - Starter: Up to 500 subscribers — ₹X/month — Start Free Trial
 *   - Growth: 500–5,000 subscribers — ₹Y/month — Get Started
 *   - Scale: 5,000+ subscribers — Custom pricing — Talk to Us
 *
 * Amounts are PENDING(Q4): the blueprint specifies the tiers and scale
 * but not the exact currency amounts. Rendered as `Provided<number> = null`.
 * ---------------------------------------------------------------------------
 */

export type PricingTier = {
  name: string
  subscribers: string
  monthlyPrice: Provided<number>
  priceNote: string
  ctaLabel: string
  ctaHref: string
  popular?: boolean
  features: string[]
}

export const pricingTiers: PricingTier[] = [
  {
    name: 'Starter',
    subscribers: 'Up to 500 subscribers',
    monthlyPrice: null, // PENDING(Q4): exact amount not specified in blueprint
    priceNote: 'Billed monthly per active subscriber',
    ctaLabel: 'Start Free Trial',
    ctaHref: '/contact',
    features: [
      'Cloud RADIUS & AAA cluster',
      'PPPoE & Hotspot authentication',
      'Automated billing & GST invoices',
      'UPI, Razorpay & Stripe integration',
      'WhatsApp renewal alerts',
      'Standard email & chat support',
    ],
  },
  {
    name: 'Growth',
    subscribers: '500–5,000 subscribers',
    monthlyPrice: null, // PENDING(Q4): exact amount not specified in blueprint
    priceNote: 'Billed monthly per active subscriber',
    ctaLabel: 'Get Started',
    ctaHref: '/contact',
    popular: true,
    features: [
      'Everything in Starter',
      'Advanced Bandwidth & FUP engine',
      'Fair Usage Policy dynamic throttling',
      'Sub-15ms RADIUS auth SLA',
      'Automated UPI payment links',
      'Priority phone & WhatsApp support',
    ],
  },
  {
    name: 'Scale',
    subscribers: '5,000+ subscribers',
    monthlyPrice: null, // Custom pricing per blueprint
    priceNote: 'Custom volume pricing for large WISPs & LCO networks',
    ctaLabel: 'Talk to Us',
    ctaHref: '/contact',
    features: [
      'Everything in Growth',
      'White-Label LCO reseller portals',
      'Custom domains & brand isolation',
      'Dedicated RADIUS IP & private cluster',
      'Custom accounting & CRM webhooks',
      'Dedicated technical account manager',
    ],
  },
]

export const pricingFaqs = [
  {
    question: 'Can I switch plans as my subscriber count grows?',
    answer:
      'Yes. Unify Wi-Fi scales dynamically with your active subscriber count. You can upgrade or adjust your tier at any time without downtime or service reconfiguration.',
  },
  {
    question: 'What is included in the 30-day free trial?',
    answer:
      'The 30-day free trial gives you full access to all features with no credit card required. You can connect your MikroTik or other RADIUS hardware in 10 minutes and test live auth.',
  },
  {
    question: 'Are there any hardware or setup fees?',
    answer:
      'No. Unify is a 100% cloud platform. There are zero hardware appliance costs, zero server license fees, and zero hidden setup charges.',
  },
]

export const pricingMeta = {
  badge: 'Free 30-day trial · No credit card required',
  heading: 'Transparent pricing that scales with your subscriber base',
  lead: 'No hidden setup fees, no expensive server appliances. Predictable cloud RADIUS and ISP billing tailored for Indian WISPs and LCOs.',
}
