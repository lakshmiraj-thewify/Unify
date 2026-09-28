'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Sparkles } from 'lucide-react'
import confetti from 'canvas-confetti'
import { Switch } from '@/components/ui/switch'
import { InteractiveHoverButton } from '@/registry/magicui/interactive-hover-button'
import { useMediaQuery } from '@/hooks/use-media-query'
import { cn } from '@/lib/utils'

interface PricingTier {
  name: string
  subscribers: string
  monthlyPrice: string
  annualPrice: string
  period: string
  isCustom?: boolean
  priceNote: string
  ctaLabel: string
  popular: boolean
  features: string[]
}

export function PricingSection() {
  const [isMonthly, setIsMonthly] = useState(true)
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const switchRef = useRef<HTMLButtonElement>(null)

  const tiers: PricingTier[] = [
    {
      name: 'Starter',
      subscribers: 'Up to 500 subscribers',
      monthlyPrice: '2,499',
      annualPrice: '1,999',
      period: '/mo',
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
      monthlyPrice: '5,999',
      annualPrice: '4,799',
      period: '/mo',
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
      monthlyPrice: 'Custom',
      annualPrice: 'Custom',
      period: 'volume',
      isCustom: true,
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

  const handleToggle = (checked: boolean) => {
    setIsMonthly(!checked)

    if (checked && switchRef.current) {
      const rect = switchRef.current.getBoundingClientRect()
      const x = (rect.left + rect.width / 2) / window.innerWidth
      const y = (rect.top + rect.height / 2) / window.innerHeight

      confetti({
        particleCount: 60,
        spread: 70,
        origin: { x, y },
        colors: ['#743CFF', '#5EE7E4', '#9061FF', '#38BDF8', '#EC4899'],
        ticks: 220,
        gravity: 1.1,
        decay: 0.94,
        startVelocity: 28,
        shapes: ['circle'],
      })
    }
  }

  return (
    <section
      id="pricing"
      className="unify-light-section overflow-hidden border-b border-slate-200 bg-slate-50/50 py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-purple-100 px-3.5 py-1 text-xs font-semibold tracking-wider text-[#743CFF] uppercase">
            <Sparkles className="h-3.5 w-3.5" /> Free 30-Day Trial · No Credit Card Required
          </div>
          <h2 className="mb-4 text-3xl leading-tight font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Transparent pricing that scales with your subscribers
          </h2>
          <p className="text-base text-slate-600 sm:text-lg">
            No expensive server appliances, no annual Linux license fees. Pay only for the active
            subscribers you manage.
          </p>

          {/* Billing Switch Toggle */}
          <div className="mt-8 inline-flex items-center justify-center gap-3 rounded-full border border-slate-200 bg-white px-5 py-2.5 shadow-sm">
            <span
              className={cn(
                'cursor-pointer text-sm font-semibold transition-colors',
                isMonthly ? 'text-[#743CFF]' : 'text-slate-500 hover:text-slate-800',
              )}
              onClick={() => handleToggle(false)}
            >
              Monthly
            </span>
            <Switch
              ref={switchRef}
              checked={!isMonthly}
              onCheckedChange={handleToggle}
              aria-label="Toggle annual billing"
            />
            <span
              className={cn(
                'cursor-pointer text-sm font-semibold transition-colors',
                !isMonthly ? 'text-[#743CFF]' : 'text-slate-500 hover:text-slate-800',
              )}
              onClick={() => handleToggle(true)}
            >
              Annual
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-[#743CFF]/10 px-2.5 py-0.5 text-xs font-bold text-[#743CFF]">
              Save 20%
            </span>
          </div>
        </div>

        {/* 3D Perspective Cards Container */}
        <div className="relative mx-auto max-w-6xl [perspective:1400px]">
          <div className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-3">
            {tiers.map((tier, idx) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={
                  isDesktop
                    ? {
                        y: tier.popular ? -16 : 0,
                        opacity: 1,
                        x: idx === 2 ? -18 : idx === 0 ? 18 : 0,
                        scale: idx === 1 ? 1.05 : 0.97,
                      }
                    : { y: 0, opacity: 1, scale: 1, x: 0 }
                }
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: 0.9,
                  type: 'spring',
                  stiffness: 90,
                  damping: 20,
                  delay: idx * 0.1,
                }}
                className={cn(
                  'relative flex flex-col justify-between rounded-3xl bg-white p-8 transition-all duration-500 [transform-style:preserve-3d]',
                  tier.popular
                    ? 'z-20 border-2 border-[#743CFF] shadow-2xl ring-1 shadow-[#743CFF]/20 ring-[#743CFF]/20'
                    : 'border border-slate-200 shadow-md hover:shadow-xl',
                  idx === 0 && 'origin-right hover:scale-100 hover:rotate-y-0 md:-rotate-y-[8deg]',
                  idx === 1 && 'z-20',
                  idx === 2 && 'origin-left hover:scale-100 hover:rotate-y-0 md:rotate-y-[8deg]',
                )}
              >
                {/* Popular Pill */}
                {tier.popular && (
                  <div className="absolute -top-3.5 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-gradient-to-r from-[#743CFF] to-[#9061FF] px-3.5 py-1 text-xs font-bold tracking-wide text-white uppercase shadow-lg shadow-[#743CFF]/30">
                    <Sparkles className="h-3.5 w-3.5 fill-white" /> Most Popular
                  </div>
                )}

                <div>
                  {/* Plan Name & Tag */}
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-slate-900">{tier.name}</h3>
                    <span className="rounded-full bg-purple-50 px-2.5 py-0.5 text-xs font-semibold text-[#743CFF]">
                      {tier.subscribers}
                    </span>
                  </div>

                  <p className="mt-2 text-xs text-slate-500">{tier.priceNote}</p>

                  {/* Animated Rolling Price */}
                  <div className="my-6 border-y border-slate-100 py-5">
                    <div className="flex items-baseline gap-1">
                      {tier.isCustom ? (
                        <span className="text-3xl font-extrabold tracking-tight text-slate-900">
                          Custom
                        </span>
                      ) : (
                        <>
                          <span className="text-2xl font-bold text-slate-500">₹</span>
                          <span className="relative inline-block overflow-hidden text-4xl font-extrabold tracking-tight text-slate-900">
                            <AnimatePresence mode="popLayout" initial={false}>
                              <motion.span
                                key={isMonthly ? tier.monthlyPrice : tier.annualPrice}
                                initial={{ y: -18, opacity: 0, filter: 'blur(3px)' }}
                                animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                                exit={{ y: 18, opacity: 0, filter: 'blur(3px)' }}
                                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                                className="inline-block tabular-nums"
                              >
                                {isMonthly ? tier.monthlyPrice : tier.annualPrice}
                              </motion.span>
                            </AnimatePresence>
                          </span>
                        </>
                      )}
                      <span className="ml-1 text-sm font-medium text-slate-500">{tier.period}</span>
                    </div>
                    <div className="mt-1 text-xs text-slate-400">
                      {tier.isCustom
                        ? 'Custom SLA & private dedicated cluster'
                        : isMonthly
                          ? 'Billed monthly per active subscriber'
                          : 'Billed annually (save 20%)'}
                    </div>
                  </div>

                  {/* Included features */}
                  <div className="mb-8 space-y-3">
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

                {/* CTA Button */}
                <InteractiveHoverButton
                  href="/contact"
                  variant={tier.popular ? 'primary' : 'dark'}
                  className="w-full py-3.5 text-sm font-semibold"
                >
                  {tier.ctaLabel}
                </InteractiveHoverButton>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
