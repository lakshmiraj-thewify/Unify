import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { bodyText, label } from './typography'

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

export type StatSize = keyof typeof valueSizes

type StatProps = {
  /** Pre-formatted display value. Formatting belongs to lib/format.ts, not here. */
  value: ReactNode
  label: string
  /** Optional qualifier shown under the label, e.g. a measurement window. */
  hint?: ReactNode
  size?: StatSize
  tone?: 'light' | 'dark'
  align?: 'left' | 'center'
  className?: string
}

/**
 * A single figure with its label. Purely presentational — the value arrives
 * already formatted, and animated counting is a separate concern layered on top
 * later so this stays a server component.
 *
 * `data-numeric` switches the figure to mono + tabular numerals via globals.css,
 * which keeps digit widths stable when a value changes.
 */
export function Stat({
  value,
  label: labelText,
  hint,
  size = 'md',
  tone = 'light',
  align = 'left',
  className,
}: StatProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-1',
        align === 'center' && 'items-center text-center',
        className,
      )}
    >
      <span
        data-numeric=""
        className={cn('leading-none font-bold tracking-tight', valueSizes[size], valueTones[tone])}
      >
        {value}
      </span>
      <span className={cn(label.eyebrow, labelTones[tone])}>{labelText}</span>
      {hint ? (
        <span className={cn(bodyText.micro, labelTones[tone], 'opacity-80')}>{hint}</span>
      ) : null}
    </div>
  )
}
