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
      className="border border-slate-200 rounded-2xl overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-slate-50 transition-colors"
      >
        <span className="font-semibold text-slate-900 text-sm">{q}</span>
        {open ? <ChevronUp className="w-4 h-4 text-violet-500 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
      </button>
      {open && (
        <div className="px-6 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100">
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
      <section className="relative overflow-hidden pt-32 pb-24" style={{background: 'radial-gradient(ellipse 80% 100% at 50% 0%, #9061FF 0%, #6332F6 35%, #2A115E 72%, #150833 100%)'}}>
        {/* Dot grid overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px] opacity-10 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(116,60,255,0.28)_0%,transparent_70%)]" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-cyan-400 tracking-wider uppercase mb-6">
              <Zap className="w-3 h-3" />
              {pricingMeta.badge}
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight mb-5">
              {pricingMeta.heading}
            </h1>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              {pricingMeta.lead}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing cards */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingTiers.map((tier, i) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                className={`relative rounded-3xl flex flex-col overflow-hidden ${
                  tier.popular
                    ? 'bg-gradient-to-b from-violet-700 to-indigo-800 text-white shadow-2xl shadow-violet-900/40 scale-105'
                    : 'bg-white border border-slate-200 text-slate-900 shadow-sm'
                }`}
              >
                {tier.popular && (
                  <div className="absolute top-0 inset-x-0 flex justify-center">
                    <span className="inline-flex items-center gap-1 -translate-y-1/2 bg-cyan-400 text-[#0D0F17] text-[10px] font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full shadow">
                      <Zap className="w-3 h-3" /> Most Popular
                    </span>
                  </div>
                )}

                <div className="p-7 pt-10 flex flex-col flex-1 gap-6">
                  {/* Tier name + subscribers */}
                  <div>
                    <div className={`text-xs font-bold uppercase tracking-widest mb-1 ${tier.popular ? 'text-violet-200' : 'text-violet-600'}`}>
                      {tier.name}
                    </div>
                    <div className={`text-sm font-medium ${tier.popular ? 'text-white/70' : 'text-slate-500'}`}>
                      {tier.subscribers}
                    </div>
                  </div>

                  {/* Price */}
                  <div>
                    {tier.monthlyPrice === null ? (
                      <div className={`text-4xl font-extrabold ${tier.popular ? 'text-white' : 'text-slate-900'}`}>
                        {tier.name === 'Scale' ? 'Custom' : 'Contact us'}
                      </div>
                    ) : (
                      <div className={`text-4xl font-extrabold ${tier.popular ? 'text-white' : 'text-slate-900'}`}>
                        ₹{tier.monthlyPrice}<span className="text-base font-medium opacity-60">/mo</span>
                      </div>
                    )}
                    <div className={`text-xs mt-1 ${tier.popular ? 'text-white/50' : 'text-slate-400'}`}>
                      {tier.priceNote}
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="flex flex-col gap-3 flex-1">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm">
                        <Check className={`w-4 h-4 mt-0.5 shrink-0 ${tier.popular ? 'text-cyan-300' : 'text-violet-500'}`} />
                        <span className={tier.popular ? 'text-white/85' : 'text-slate-700'}>{f}</span>
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
          <p className="text-center text-xs text-slate-400 mt-10">
            Exact pricing amounts are being finalised. Contact us for current rates — the 30-day free trial is available with no credit card required.
          </p>
        </div>
      </section>

      {/* All-plan comparison note */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Every plan includes</h2>
          <p className="text-slate-500 text-sm mb-10">No plan charges extra for these — they are core to every Unify subscription.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
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
              <div key={feature} className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 bg-slate-50">
                <Check className="w-4 h-4 text-violet-500 shrink-0" />
                <span className="text-sm text-slate-700 font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-10">Pricing questions</h2>
          <div className="flex flex-col gap-3">
            {pricingFaqs.map((faq, i) => (
              <FaqItem key={faq.question} q={faq.question} a={faq.answer} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[#0D0F17] py-20 text-center">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-white mb-3">Start your free 30-day trial</h2>
          <p className="text-white/60 text-sm mb-8">No credit card. No hardware changes. Live in 10 minutes.</p>
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
