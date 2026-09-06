import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

/**
 * Semantic pill. The colour carries meaning — `pending` is the one used for
 * facts that are not yet signed off, and it is deliberately dashed and muted so
 * an unresolved value can never be mistaken for a confirmed one.
 */
const lightVariants = {
  neutral: 'bg-surface-subtle text-ink-muted border-line',
  primary: 'bg-primary-50 text-primary-800 border-primary-200',
  signal: 'bg-signal-50 text-signal-700 border-signal-200',
  ok: 'bg-ok-50 text-ok-700 border-ok-200',
  warn: 'bg-warn-50 text-warn-700 border-warn-200',
  danger: 'bg-danger-50 text-danger-700 border-danger-200',
  pending: 'bg-surface-subtle text-ink-faint border-line-strong border-dashed',
} as const

const darkVariants = {
  neutral: 'bg-white/[0.08] text-dark-fg-muted border-dark-line-strong',
  primary: 'bg-primary-500/15 text-primary-200 border-primary-400/30',
  signal: 'bg-signal-400/15 text-signal-200 border-signal-400/35',
  ok: 'bg-ok-500/15 text-ok-200 border-ok-500/30',
  warn: 'bg-warn-500/15 text-warn-200 border-warn-500/30',
  danger: 'bg-danger-500/15 text-danger-200 border-danger-500/30',
  pending: 'bg-white/[0.04] text-dark-fg-muted border-dark-line-strong border-dashed',
} as const

const sizes = {
  sm: 'h-6 gap-1 px-2 text-[0.6875rem] [&_svg]:size-3',
  md: 'h-7 gap-1.5 px-2.5 text-xs [&_svg]:size-3.5',
} as const

const dotColours = {
  neutral: 'bg-ink-faint',
  primary: 'bg-primary-500',
  signal: 'bg-signal-400',
  ok: 'bg-ok-500',
  warn: 'bg-warn-500',
  danger: 'bg-danger-500',
  pending: 'bg-ink-faint',
} as const

export type BadgeVariant = keyof typeof lightVariants
export type BadgeSize = keyof typeof sizes

type BadgeProps = {
  children: ReactNode
  variant?: BadgeVariant
  size?: BadgeSize
  tone?: 'light' | 'dark'
  /** Small leading dot. `live` makes it pulse — reserve that for real-time state. */
  dot?: boolean
  live?: boolean
  /** Renders the label in mono. Use for counts, versions and identifiers. */
  mono?: boolean
  icon?: ReactNode
  className?: string
}

export function Badge({
  children,
  variant = 'neutral',
  size = 'md',
  tone = 'light',
  dot = false,
  live = false,
  mono = false,
  icon,
  className,
}: BadgeProps) {
  const palette = tone === 'dark' ? darkVariants : lightVariants

  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center rounded-full border font-bold whitespace-nowrap',
        palette[variant],
        sizes[size],
        mono && 'font-mono tabular tracking-[0.04em]',
        className,
      )}
    >
      {dot || live ? (
        <span
          aria-hidden="true"
          className={cn(
            'size-1.5 shrink-0 rounded-full',
            dotColours[variant],
            live && 'animate-pulse-dot',
          )}
        />
      ) : null}
      {icon}
      {children}
    </span>
  )
}
