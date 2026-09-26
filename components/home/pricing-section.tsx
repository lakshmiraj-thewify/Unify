'use client'

import { Check, Sparkles } from 'lucide-react'
import { InteractiveHoverButton } from '@/registry/magicui/interactive-hover-button'

export function PricingSection() {
  const tiers = [
    {
      name: 'Starter',
      subscribers: 'Up to 500 subscribers',
      priceNote: 'Predictable cloud pricing billed per active subscriber',
      ctaLabel: 'Start Free Trial',
      popular: false,
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
      priceNote: 'Ideal for expanding WISPs & multi-site cable operators',
      ctaLabel: 'Get Started',
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
      priceNote: 'Custom volume pricing for large WISPs & LCO networks',
      ctaLabel: 'Talk to Us',
      popular: false,
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

  return (
    <section
      id="pricing"
      className="unify-light-section border-b border-slate-200 bg-slate-50/50 py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold tracking-wider text-[#743CFF] uppercase">
            Free 30-Day Trial · No Credit Card Required
          </div>
          <h2 className="mb-4 text-3xl leading-tight font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Transparent pricing that scales with your subscribers
          </h2>
          <p className="text-base text-slate-600 sm:text-lg">
            No expensive server appliances, no annual Linux license fees. Pay only for the active
            subscribers you manage.
          </p>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-3">
          {tiers.map((tier, idx) => (
            <div
              key={idx}
              className={`flex flex-col justify-between rounded-3xl p-8 transition-all duration-300 ${
                tier.popular
                  ? 'relative z-10 scale-105 border-2 border-[#743CFF] bg-white shadow-2xl'
                  : 'border border-slate-200 bg-white shadow-sm hover:shadow-lg'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3.5 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-[#743CFF] px-3 py-1 text-xs font-bold tracking-wide text-white uppercase shadow-md">
                  <Sparkles className="h-3 w-3" /> Most Popular
                </div>
              )}

              <div>
                <h3 className="mb-1 text-xl font-bold text-slate-900">{tier.name}</h3>
                <div className="mb-2 text-sm font-semibold text-[#743CFF]">{tier.subscribers}</div>
                <p className="mb-6 text-xs text-slate-500">{tier.priceNote}</p>

                <div className="mb-8 space-y-3 border-t border-slate-100 pt-4">
                  <div className="text-xs font-bold tracking-wider text-slate-400 uppercase">
                    Included capabilities:
                  </div>
                  {tier.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-sm text-slate-700">
                      <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-purple-100 text-[#743CFF]">
                        <Check className="h-3 w-3" />
                      </div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <InteractiveHoverButton
                href="/contact"
                variant={tier.popular ? 'primary' : 'dark'}
                className="w-full py-3.5 text-sm font-semibold"
              >
                {tier.ctaLabel}
              </InteractiveHoverButton>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
