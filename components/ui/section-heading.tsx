import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Eyebrow } from './eyebrow'
import { bodyText, heading } from './typography'

const headingTones = {
  light: 'text-ink',
  dark: 'text-dark-fg',
} as const

const leadTones = {
  light: 'text-ink-muted',
  dark: 'text-dark-fg-muted',
} as const

type SectionHeadingProps = {
  /** Uppercase label above the heading. */
  eyebrow?: string
  /** ReactNode so callers can emphasise a fragment, e.g. with `text-brand-gradient`. */
  title: ReactNode
  lead?: ReactNode
  align?: 'left' | 'center'
  tone?: 'light' | 'dark'
  /** Heading level. Defaults to h2 — only the hero should use h1. */
  as?: 'h1' | 'h2' | 'h3'
  /** Size of the heading text. Defaults to match `as`. */
  size?: 'display' | 'h2' | 'h3'
  /** Set this and point the parent `<section aria-labelledby>` at it. */
  id?: string
  className?: string
  children?: ReactNode
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = 'center',
  tone = 'light',
  as = 'h2',
  size,
  id,
  className,
  children,
}: SectionHeadingProps) {
  const Tag = as
  const resolvedSize = size ?? (as === 'h1' ? 'display' : as === 'h3' ? 'h3' : 'h2')

  return (
    <div
      className={cn(
        'flex flex-col',
        align === 'center' ? 'mx-auto max-w-readable items-center text-center' : 'items-start',
        className,
      )}
    >
      {eyebrow ? (
        <Eyebrow tone={tone} className="mb-3">
          {eyebrow}
        </Eyebrow>
      ) : null}

      <Tag id={id} className={cn(heading[resolvedSize], headingTones[tone], 'text-balance')}>
        {title}
      </Tag>

      {lead ? (
        <p className={cn('mt-4 max-w-readable text-pretty', bodyText.lead, leadTones[tone])}>
          {lead}
        </p>
      ) : null}

      {children}
    </div>
  )
}
