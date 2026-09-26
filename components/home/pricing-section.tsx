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
    <section id="pricing" className="unify-light-section py-24 bg-slate-50/50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-xs font-semibold text-[#743CFF] tracking-wider uppercase mb-4">
            Free 30-Day Trial · No Credit Card Required
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            Transparent pricing that scales with your subscribers
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            No expensive server appliances, no annual Linux license fees. Pay only for the active subscribers you manage.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {tiers.map((tier, idx) => (
            <div
              key={idx}
              className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                tier.popular
                  ? 'bg-white border-2 border-[#743CFF] shadow-2xl relative scale-105 z-10'
                  : 'bg-white border border-slate-200 shadow-sm hover:shadow-lg'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#743CFF] text-white text-xs font-bold tracking-wide uppercase px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Most Popular
                </div>
              )}

              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">{tier.name}</h3>
                <div className="text-sm font-semibold text-[#743CFF] mb-2">{tier.subscribers}</div>
                <p className="text-xs text-slate-500 mb-6">{tier.priceNote}</p>

                <div className="pt-4 border-t border-slate-100 space-y-3 mb-8">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Included capabilities:
                  </div>
                  {tier.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-sm text-slate-700">
                      <div className="w-4 h-4 rounded-full bg-purple-100 text-[#743CFF] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3" />
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
