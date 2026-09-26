import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { label } from './typography'

/**
 * Eyebrow tones:
 * - dark: purple/brand accent — for dark and mid sections
 * - light: purple accent on white — for light sections
 */
const tones = {
  light: 'text-[#743CFF]',
  dark: 'text-[#A78BFA]',
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
export function Eyebrow({ children, tone = 'dark', className, live = false }: EyebrowProps) {
  return (
    <p className={cn('inline-flex items-center gap-2', label.eyebrow, tones[tone], className)}>
      {live ? (
        <span
          aria-hidden="true"
          className="animate-pulse-dot size-1.5 shrink-0 rounded-full bg-[#5EE7E4]"
        />
      ) : null}
      {children}
    </p>
  )
}
