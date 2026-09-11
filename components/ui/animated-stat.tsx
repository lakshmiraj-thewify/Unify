'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/cn'
import { label, bodyText } from './typography'

const valueTones = {
  light: 'text-ink',
  dark: 'text-dark-fg',
} as const

const labelTones = {
  light: 'text-ink-muted',
  dark: 'text-dark-fg-muted',
} as const

const valueSizes = {
  sm: 'text-xl',
  md: 'text-3xl',
  lg: 'text-4xl lg:text-[2.75rem]',
} as const

type AnimatedStatProps = {
  numericTarget: number
  suffix?: string
  hint?: string
  label: string
  size?: keyof typeof valueSizes
  tone?: 'light' | 'dark'
  align?: 'left' | 'center'
  className?: string
  decimals?: number
  duration?: number
}

/**
 * Animated count-up stat — counts from 0 to `numericTarget` when the element
 * first enters the viewport.
 *
 * Reduced-motion users see the final value immediately with no animation.
 * Initial state is the final value (not 0) to avoid hydration mismatch and
 * to ensure no-JS visitors see the real number immediately.
 */
export function AnimatedStat({
  numericTarget,
  suffix = '',
  hint,
  label: labelText,
  size = 'md',
  tone = 'light',
  align = 'left',
  className,
  decimals = 0,
  duration = 1800,
}: AnimatedStatProps) {
  // Start at the final value — correct for SSR, no-JS, and reduced-motion users.
  const [displayValue, setDisplayValue] = useState(numericTarget)
  const hasAnimatedRef = useRef(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    if (hasAnimatedRef.current) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    // For reduced-motion users, the value is already correct — nothing to do.
    if (prefersReduced) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue

          hasAnimatedRef.current = true
          observer.disconnect()

          const startTime = performance.now()

          function tick(now: number) {
            const elapsed = now - startTime
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            const current = numericTarget * eased

            setDisplayValue(current)

            if (progress < 1) {
              requestAnimationFrame(tick)
            } else {
              setDisplayValue(numericTarget)
            }
          }

          // Start from 0
          setDisplayValue(0)
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.2 },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [numericTarget, duration])

  const formatted =
    decimals > 0 ? displayValue.toFixed(decimals) : Math.floor(displayValue).toLocaleString('en-IN')

  return (
    <div
      ref={ref}
      className={cn(
        'flex flex-col gap-1',
        align === 'center' && 'items-center text-center',
        className,
      )}
    >
      <span
        data-numeric=""
        aria-label={`${numericTarget}${suffix} ${labelText}`}
        className={cn(
          'leading-none font-bold tracking-tight tabular-nums',
          valueSizes[size],
          valueTones[tone],
        )}
      >
        {formatted}
        {suffix}
      </span>
      <span className={cn(label.eyebrow, labelTones[tone])}>{labelText}</span>
      {hint ? (
        <span className={cn(bodyText.micro, labelTones[tone], 'opacity-80')}>{hint}</span>
      ) : null}
    </div>
  )
}
