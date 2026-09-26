'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, ChevronDown, ChevronUp, Zap } from 'lucide-react'
import { InteractiveHoverButton } from '@/registry/magicui/interactive-hover-button'
import { pricingTiers, pricingFaqs, pricingMeta } from '@/content/pricing'

function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.45 }}
      className="overflow-hidden rounded-2xl border border-slate-200"
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors hover:bg-slate-50"
      >
        <span className="text-sm font-semibold text-slate-900">{q}</span>
        {open ? (
          <ChevronUp className="h-4 w-4 shrink-0 text-violet-500" />
        ) : (
          <ChevronDown className="h-4 w-4 shrink-0 text-slate-400" />
        )}
      </button>
      {open && (
        <div className="border-t border-slate-100 px-6 pb-5 text-sm leading-relaxed text-slate-600">
          {a}
        </div>
      )}
    </motion.div>
  )
}

export function PricingContent() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section
        className="relative overflow-hidden pt-32 pb-24"
        style={{
          background:
            'radial-gradient(ellipse 80% 100% at 50% 0%, #9061FF 0%, #6332F6 35%, #2A115E 72%, #150833 100%)',
        }}
      >
        {/* Dot grid overlay */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px] opacity-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(116,60,255,0.28)_0%,transparent_70%)]" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
            }}
          >
            <div className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold tracking-wider text-cyan-400 uppercase">
              <Zap className="h-3 w-3" />
              {pricingMeta.badge}
            </div>
            <h1 className="mb-5 text-4xl leading-tight font-extrabold tracking-tight text-white sm:text-6xl">
              {pricingMeta.heading}
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-white/60">{pricingMeta.lead}</p>
          </motion.div>
        </div>
      </section>

      {/* Pricing cards */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {pricingTiers.map((tier, i) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: i * 0.1,
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                }}
                className={`relative flex flex-col overflow-hidden rounded-3xl ${
                  tier.popular
                    ? 'scale-105 bg-gradient-to-b from-violet-700 to-indigo-800 text-white shadow-2xl shadow-violet-900/40'
                    : 'border border-slate-200 bg-white text-slate-900 shadow-sm'
                }`}
              >
                {tier.popular && (
                  <div className="absolute inset-x-0 top-0 flex justify-center">
                    <span className="inline-flex -translate-y-1/2 items-center gap-1 rounded-full bg-cyan-400 px-4 py-1.5 text-[10px] font-extrabold tracking-widest text-[#0D0F17] uppercase shadow">
                      <Zap className="h-3 w-3" /> Most Popular
                    </span>
                  </div>
                )}

                <div className="flex flex-1 flex-col gap-6 p-7 pt-10">
                  {/* Tier name + subscribers */}
                  <div>
                    <div
                      className={`mb-1 text-xs font-bold tracking-widest uppercase ${tier.popular ? 'text-violet-200' : 'text-violet-600'}`}
                    >
                      {tier.name}
                    </div>
                    <div
                      className={`text-sm font-medium ${tier.popular ? 'text-white/70' : 'text-slate-500'}`}
                    >
                      {tier.subscribers}
                    </div>
                  </div>

                  {/* Price */}
                  <div>
                    {tier.monthlyPrice === null ? (
                      <div
                        className={`text-4xl font-extrabold ${tier.popular ? 'text-white' : 'text-slate-900'}`}
                      >
                        {tier.name === 'Scale' ? 'Custom' : 'Contact us'}
                      </div>
                    ) : (
                      <div
                        className={`text-4xl font-extrabold ${tier.popular ? 'text-white' : 'text-slate-900'}`}
                      >
                        ₹{tier.monthlyPrice}
                        <span className="text-base font-medium opacity-60">/mo</span>
                      </div>
                    )}
                    <div
                      className={`mt-1 text-xs ${tier.popular ? 'text-white/50' : 'text-slate-400'}`}
                    >
                      {tier.priceNote}
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="flex flex-1 flex-col gap-3">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm">
                        <Check
                          className={`mt-0.5 h-4 w-4 shrink-0 ${tier.popular ? 'text-cyan-300' : 'text-violet-500'}`}
                        />
                        <span className={tier.popular ? 'text-white/85' : 'text-slate-700'}>
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <InteractiveHoverButton
                    href={tier.ctaHref}
                    variant={tier.popular ? 'white' : 'primary'}
                    className="w-full py-3 text-sm font-semibold"
                  >
                    {tier.ctaLabel}
                  </InteractiveHoverButton>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Price pending note */}
          <p className="mt-10 text-center text-xs text-slate-400">
            Exact pricing amounts are being finalised. Contact us for current rates — the 30-day
            free trial is available with no credit card required.
          </p>
        </div>
      </section>

      {/* All-plan comparison note */}
      <section className="border-t border-slate-100 bg-white py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="mb-3 text-2xl font-bold text-slate-900">Every plan includes</h2>
          <p className="mb-10 text-sm text-slate-500">
            No plan charges extra for these — they are core to every Unify subscription.
          </p>
          <div className="grid grid-cols-1 gap-4 text-left sm:grid-cols-2">
            {[
              'Geo-redundant Cloud RADIUS cluster',
              '99.99% uptime SLA with automated failover',
              'Zero on-premise Linux servers or maintenance',
              'MikroTik native setup in under 10 minutes',
              'GST-compliant tax invoice generation',
              'WhatsApp & SMS subscriber notifications',
              'Razorpay + Stripe + UPI payment support',
              'API access for CRM / webhook integrations',
            ].map((feature) => (
              <div
                key={feature}
                className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3"
              >
                <Check className="h-4 w-4 shrink-0 text-violet-500" />
                <span className="text-sm font-medium text-slate-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <h2 className="mb-10 text-center text-2xl font-bold text-slate-900">Pricing questions</h2>
          <div className="flex flex-col gap-3">
            {pricingFaqs.map((faq, i) => (
              <FaqItem key={faq.question} q={faq.question} a={faq.answer} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[#0D0F17] py-20 text-center">
        <div className="mx-auto max-w-xl px-4">
          <h2 className="mb-3 text-3xl font-extrabold text-white">Start your free 30-day trial</h2>
          <p className="mb-8 text-sm text-white/60">
            No credit card. No hardware changes. Live in 10 minutes.
          </p>
          <InteractiveHoverButton
            href="/contact"
            variant="primary"
            className="px-7 py-3.5 text-base shadow-lg shadow-violet-900/30"
          >
            Book a demo
          </InteractiveHoverButton>
        </div>
      </section>
    </main>
  )
}
