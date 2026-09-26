'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, animate } from 'framer-motion'
import { Clock, TrendingDown, IndianRupee, AlertTriangle } from 'lucide-react'
import { calculatorSection } from '@/content/home'

/* ─── Animated number counter using Framer Motion spring ─────────────────── */
function AnimatedNumber({
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
}: {
  value: number
  prefix?: string
  suffix?: string
  decimals?: number
}) {
  const nodeRef = useRef<HTMLSpanElement>(null)
  const prevValue = useRef(value)

  useEffect(() => {
    const node = nodeRef.current
    if (!node) return

    const from = prevValue.current
    prevValue.current = value

    const controls = animate(from, value, {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      onUpdate(v) {
        node.textContent =
          prefix +
          (decimals > 0 ? v.toFixed(decimals) : Math.round(v).toLocaleString('en-IN')) +
          suffix
      },
    })
    return controls.stop
  }, [value, prefix, suffix, decimals])

  return (
    <span ref={nodeRef}>
      {prefix}
      {decimals > 0 ? value.toFixed(decimals) : Math.round(value).toLocaleString('en-IN')}
      {suffix}
    </span>
  )
}

/* ─── Slider fill track calculation ─────────────────────────────────────── */
function getTrackPercent(value: number, min: number, max: number) {
  return ((value - min) / (max - min)) * 100
}

/* ─── Card variants for staggered entrance ───────────────────────────────── */
function cardVariant(i: number) {
  return {
    hidden: { opacity: 0, y: 28, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { delay: i * 0.12, duration: 0.55, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
  }
}

export function RevenueCalculator() {
  const {
    sliderMin,
    sliderMax,
    sliderDefault,
    sliderLabel,
    hoursPerSubscriberMonth,
    automationSavingRate,
    onPremFixedCostINR,
    onPremPerSubscriberINR,
  } = calculatorSection

  const [subscribers, setSubscribers] = useState(sliderDefault)
  const [inView, setInView] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  /* Derived estimates (directional only — approved rationale in content/home.ts) */
  const hoursSaved = Math.round(
    subscribers * hoursPerSubscriberMonth * automationSavingRate
  )
  const onPremCostINR =
    onPremFixedCostINR + subscribers * onPremPerSubscriberINR
  const churnReductionPct = Math.min(
    Math.round(15 + (subscribers / sliderMax) * 25),
    40
  )

  /* Intersection observer for entrance animation */
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => { if (entries[0]?.isIntersecting) setInView(true) },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const trackPct = getTrackPercent(subscribers, sliderMin, sliderMax)

  const resultCards = [
    {
      icon: Clock,
      accent: '#5EE7E4',
      label: 'Staff hours saved',
      sublabel: 'per month on manual billing & reminders',
      value: hoursSaved,
      unit: 'hrs',
      prefix: '',
      suffix: ' hrs',
      description: `Estimated ${Math.round(automationSavingRate * 100)}% reduction in manual follow-up time`,
    },
    {
      icon: IndianRupee,
      accent: '#9061FF',
      label: 'On-premise cost replaced',
      sublabel: 'vs. running a local RADIUS server',
      value: onPremCostINR,
      unit: '₹/mo',
      prefix: '₹',
      suffix: '/mo',
      description: 'Directional estimate based on server + maintenance overhead',
    },
    {
      icon: TrendingDown,
      accent: '#5EE7E4',
      label: 'Subscriber churn reduction',
      sublabel: 'via automated WhatsApp renewal alerts',
      value: churnReductionPct,
      unit: '%',
      prefix: '',
      suffix: '%',
      description: 'Based on automated 3-day pre-expiry renewal dispatch',
    },
  ]

  return (
    <section
      id="savings-calculator"
      ref={sectionRef}
      className="py-24 bg-[#0A0D14] relative overflow-hidden"
    >
      {/* Background aurora */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-[#743CFF]/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-[#9061FF] tracking-wider uppercase mb-4">
            Impact Calculator
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            See what Unify can save you.
          </h2>
          <p className="text-white/60 text-base sm:text-lg">
            Drag the slider to your subscriber count. Numbers update in real time.
            These are directional estimates — exact savings depend on your setup.
          </p>
        </motion.div>

        {/* Slider Card */}
        <motion.div
          className="max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="rounded-3xl bg-[#131722]/90 border border-white/10 backdrop-blur-xl p-8 sm:p-10 shadow-2xl">
            {/* Subscriber count display */}
            <div className="flex items-end justify-between mb-8">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-1">
                  {sliderLabel}
                </div>
                <div className="text-4xl sm:text-5xl font-extrabold font-mono text-white">
                  <AnimatedNumber value={subscribers} suffix="" />
                  <span className="text-xl text-white/50 font-semibold ml-2">subscribers</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-white/40 mb-1">Plan tier</div>
                <div
                  className="text-sm font-bold px-3 py-1 rounded-full border"
                  style={{
                    color: subscribers <= 500 ? '#5EE7E4' : subscribers <= 5000 ? '#9061FF' : '#F59E0B',
                    borderColor: subscribers <= 500 ? 'rgba(94,231,228,0.3)' : subscribers <= 5000 ? 'rgba(144,97,255,0.3)' : 'rgba(245,158,11,0.3)',
                    background: subscribers <= 500 ? 'rgba(94,231,228,0.08)' : subscribers <= 5000 ? 'rgba(144,97,255,0.08)' : 'rgba(245,158,11,0.08)',
                  }}
                >
                  {subscribers <= 500 ? 'Starter' : subscribers <= 5000 ? 'Growth' : 'Scale'}
                </div>
              </div>
            </div>

            {/* Custom Slider */}
            <div className="relative mb-4">
              {/* Track background */}
              <div className="w-full h-2 rounded-full bg-white/10 relative">
                {/* Filled portion */}
                <div
                  className="absolute inset-y-0 left-0 rounded-full transition-none"
                  style={{
                    width: `${trackPct}%`,
                    background: 'linear-gradient(90deg, #5EE7E4 0%, #743CFF 100%)',
                  }}
                />
              </div>
              {/* Native range input overlaid */}
              <input
                type="range"
                min={sliderMin}
                max={sliderMax}
                step={100}
                value={subscribers}
                onChange={(e) => setSubscribers(Number(e.target.value))}
                className="absolute inset-0 w-full opacity-0 cursor-pointer h-2"
                aria-label={sliderLabel}
              />
              {/* Custom thumb */}
              <div
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-white shadow-lg shadow-[#743CFF]/50 border-2 border-[#743CFF] pointer-events-none transition-none"
                style={{ left: `${trackPct}%` }}
              />
            </div>

            {/* Min / Max labels */}
            <div className="flex justify-between text-xs text-white/40 font-mono mt-3">
              <span>{sliderMin.toLocaleString('en-IN')}</span>
              <span>{sliderMax.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </motion.div>

        {/* 3 Result Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {resultCards.map((card, i) => {
            const Icon = card.icon
            return (
              <motion.div
                key={card.label}
                variants={cardVariant(i)}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                className="rounded-3xl bg-[#131722]/90 border border-white/10 backdrop-blur-xl p-7 shadow-xl flex flex-col gap-4 hover:border-white/20 transition-colors"
              >
                {/* Icon + Label */}
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${card.accent}15`, color: card.accent }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-sm font-semibold text-white/80">{card.label}</div>
                </div>

                {/* Big Animated Number */}
                <div
                  className="text-4xl sm:text-5xl font-extrabold font-mono"
                  style={{ color: card.accent }}
                >
                  <AnimatedNumber
                    value={card.value}
                    prefix={card.prefix}
                    suffix={card.suffix}
                  />
                </div>

                {/* Sub-label */}
                <div className="text-xs text-white/50 leading-relaxed border-t border-white/8 pt-4">
                  <span className="block text-white/70 font-medium mb-0.5">{card.sublabel}</span>
                  {card.description}
                </div>

                {/* Estimate badge */}
                <div className="flex items-center gap-1.5 text-[10px] text-amber-400/80 font-medium">
                  <AlertTriangle className="w-3 h-3" />
                  <span>Directional estimate</span>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Disclosure */}
        <motion.p
          className="text-center text-xs text-white/35 mt-10 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          These figures are directional estimates based on industry rule-of-thumb ratios.
          Exact savings depend on your current billing process, staff structure, and RADIUS
          infrastructure costs. PENDING(Q5): Exact calculation assumptions are awaiting
          business approval.
        </motion.p>
      </div>
    </section>
  )
}
