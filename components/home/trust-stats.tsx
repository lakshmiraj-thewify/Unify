'use client'

import { useEffect, useRef, useState } from 'react'

const stats = [
  { numericTarget: 200, suffix: '+', label: 'Active ISPs & WISPs', hint: 'Running in production' },
  { numericTarget: 50000, suffix: '+', label: 'Subscribers Managed', hint: 'PPPoE & Hotspot' },
  { numericTarget: 99.99, suffix: '%', decimals: 2, label: 'Cloud RADIUS Uptime', hint: 'SLA' },
  { numericTarget: 10, suffix: ' min', label: 'MikroTik Setup Time', hint: 'Zero firmware changes' },
]

function AnimatedNumber({ target, suffix, decimals = 0 }: { target: number; suffix: string; decimals?: number }) {
  const [value, setValue] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && !started.current) {
          started.current = true
          const steps = 60
          const increment = target / steps
          let current = 0
          const timer = setInterval(() => {
            current = Math.min(current + increment, target)
            setValue(current)
            if (current >= target) clearInterval(timer)
          }, 1800 / steps)
        }
      },
      { threshold: 0.3 },
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  return (
    <span ref={ref} className="tabular-nums">
      {decimals > 0 ? value.toFixed(decimals) : Math.round(value).toLocaleString()}
      {suffix}
    </span>
  )
}

export function TrustStats() {
  return (
    <section className="py-14 relative z-10" aria-label="Platform trust statistics">
      {/* Thin gradient divider line to visually anchor the stats row */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <dl className="grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center text-center gap-1">
              <dt className="sr-only">{stat.label}</dt>
              <dd className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-[#5EE7E4] to-[#743CFF] bg-clip-text text-transparent">
                <AnimatedNumber target={stat.numericTarget} suffix={stat.suffix} decimals={stat.decimals} />
              </dd>
              <span className="text-sm font-semibold text-white mt-1">{stat.label}</span>
              {stat.hint && <span className="text-xs text-white/40">{stat.hint}</span>}
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
