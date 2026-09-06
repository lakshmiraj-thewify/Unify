import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { label } from './typography'

const tones = {
  light: 'text-primary-600',
  dark: 'text-signal-300',
} as const

export type EyebrowTone = keyof typeof tones

type EyebrowProps = {
  children: ReactNode
  tone?: EyebrowTone
  className?: string
  /** Renders a small pulsing dot before the label — reserved for live/real-time context. */
  live?: boolean
}

/**
 * The small uppercase label that sits above a section heading. Plain text, not
 * a pill — pills are `<Badge>`, and mixing the two flattens the hierarchy.
 */
export function Eyebrow({ children, tone = 'light', className, live = false }: EyebrowProps) {
  return (
    <p className={cn('inline-flex items-center gap-2', label.eyebrow, tones[tone], className)}>
      {live ? (
        <span
          aria-hidden="true"
          className="size-1.5 shrink-0 animate-pulse-dot rounded-full bg-ok-500"
        />
      ) : null}
      {children}
    </p>
  )
}
