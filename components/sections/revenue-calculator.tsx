'use client'

import { useId, useState } from 'react'
import { AlertTriangle } from 'lucide-react'
import { Section } from '@/components/ui/section'
import { SectionHeading } from '@/components/ui/section-heading'
import { Button } from '@/components/ui/button'
import { calculatorSection } from '@/content/home'
import { sectionIds } from '@/content/nav'

/**
 * Directional estimates only — see PENDING(Q5) in content/home.ts.
 * All three output figures are clearly labelled as "estimates" in the UI.
 */
function calcResults(subscribers: number) {
  const {
    hoursPerSubscriberMonth,
    automationSavingRate,
    onPremFixedCostINR,
    onPremPerSubscriberINR,
  } = calculatorSection

  const hoursSaved = Math.round(subscribers * hoursPerSubscriberMonth * automationSavingRate)
  // Churn reduction estimate: each reminder catches ~2% of at-risk subscribers
  const churnReductionPct = Math.min(35, Math.round(subscribers * 0.02))
  const onPremCostINR = onPremFixedCostINR + subscribers * onPremPerSubscriberINR

  return { hoursSaved, churnReductionPct, onPremCostINR }
}

function formatINR(value: number): string {
  if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`
  if (value >= 1000) return `₹${(value / 1000).toFixed(0)}K`
  return `₹${value}`
}

export function RevenueCalculator() {
  const sliderId = useId()
  const [subscribers, setSubscribers] = useState(calculatorSection.sliderDefault)
  const { hoursSaved, churnReductionPct, onPremCostINR } = calcResults(subscribers)

  return (
    <Section
      id={sectionIds.calculator}
      tone="subtle"
      divider="y"
      aria-labelledby="calculator-heading"
    >
      <SectionHeading
        id="calculator-heading"
        eyebrow={calculatorSection.eyebrow}
        title={calculatorSection.heading}
        lead={calculatorSection.lead}
      />

      <div className="mx-auto mt-12 max-w-2xl">
        {/* Slider */}
        <div className="flex flex-col gap-3">
          <label htmlFor={sliderId} className="text-sm font-semibold text-ink">
            {calculatorSection.sliderLabel}
          </label>

          <div className="flex items-center gap-4">
            <input
              id={sliderId}
              type="range"
              min={calculatorSection.sliderMin}
              max={calculatorSection.sliderMax}
              step={100}
              value={subscribers}
              onChange={(e) => setSubscribers(Number(e.target.value))}
              className="w-full accent-primary-500"
            />
            <span
              data-numeric=""
              className="min-w-[5rem] rounded-[10px] border border-line bg-white px-3 py-1.5 text-center text-sm font-bold text-ink"
            >
              {subscribers.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="flex justify-between text-xs text-ink-faint">
            <span>{calculatorSection.sliderMin.toLocaleString('en-IN')}</span>
            <span>{calculatorSection.sliderMax.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {/* Results grid */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            {
              value: `${hoursSaved} hrs`,
              label: 'Monthly billing hours saved',
              color: 'text-primary-500',
            },
            {
              value: `~${churnReductionPct}%`,
              label: 'Estimated churn reduction',
              color: 'text-signal-600',
            },
            {
              value: formatINR(onPremCostINR),
              label: 'On-prem RADIUS cost avoided',
              color: 'text-primary-500',
            },
          ].map((result) => (
            <div
              key={result.label}
              className="flex flex-col items-center gap-1 rounded-[16px] border border-line bg-white p-5 text-center shadow-card"
            >
              <span
                data-numeric=""
                className={`text-3xl font-bold tracking-tight ${result.color}`}
              >
                {result.value}
              </span>
              <span className="text-xs font-semibold text-ink-muted">{result.label}</span>
              <span className="mt-1 text-[0.65rem] font-semibold tracking-wider text-ink-faint uppercase">
                Estimate
              </span>
            </div>
          ))}
        </div>

        {/* PENDING(Q5) disclosure */}
        <div className="mt-6 flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
          <AlertTriangle className="mt-0.5 size-4 shrink-0 text-amber-500" />
          <p className="text-xs leading-relaxed text-amber-800">
            These are directional estimates based on typical ISP operator benchmarks. Exact figures
            depend on your current setup.{' '}
            <strong>Calculation assumptions are awaiting final business approval.</strong>
          </p>
        </div>

        <div className="mt-8 flex justify-center">
          <Button href="/contact" size="lg">
            Book a demo &mdash; we&apos;ll show you the real numbers
          </Button>
        </div>
      </div>
    </Section>
  )
}
