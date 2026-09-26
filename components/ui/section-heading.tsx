import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Eyebrow } from './eyebrow'
import { bodyText, heading } from './typography'

/**
 * SectionHeading tone controls text colour.
 * dark  → white heading, muted white lead (for dark/mid sections)
 * light → near-black heading, muted dark lead (for white/subtle sections)
 */
const headingTones = {
  dark:  'text-white',
  light: 'text-[#0D1B21]',
} as const

const leadTones = {
  dark:  'text-[#8899A6]',
  light: 'text-[#4A5568]',
} as const

type SectionHeadingProps = {
  eyebrow?:   string
  title:      ReactNode
  lead?:      ReactNode
  align?:     'left' | 'center'
  tone?:      'light' | 'dark'
  as?:        'h1' | 'h2' | 'h3'
  size?:      'display' | 'h2' | 'h3'
  id?:        string
  className?: string
  children?:  ReactNode
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = 'center',
  tone = 'dark',
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
