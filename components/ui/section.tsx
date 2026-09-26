import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Container, type ContainerWidth } from './container'

/**
 * Section tones — controls the background, text and border colour of an entire band.
 *
 * dark:   Deep obsidian (#071013) — hero, stats, architecture, CTA, footer
 * mid:    Mid-dark (#0D1B21) — alternating dark sections
 * light:  Pure white (#FFFFFF) — feature cards, pillars, how-it-works on white
 * subtle: Off-white (#F7F8FA) — alternating light sections
 *
 * All text colours are derived from the tone so content is always readable.
 */
const tones = {
  dark: 'bg-[#071013] text-white [--focus-ring:var(--color-brand)]',
  mid: 'bg-[#0D1B21] text-white [--focus-ring:var(--color-brand)]',
  light: 'bg-white text-[#0D1B21]',
  subtle: 'bg-[#F7F8FA] text-[#0D1B21]',
  /** Legacy aliases kept so existing section call sites don't break */
  tint: 'bg-[#F7F8FA] text-[#0D1B21]',
} as const

const spacings = {
  default: 'py-16 lg:py-24',
  compact: 'py-10 lg:py-16',
  tight: 'py-8 lg:py-10',
  flush: '',
} as const

const dividers = {
  none: '',
  top: 'border-t border-[rgba(255,255,255,0.06)]',
  bottom: 'border-b border-[rgba(255,255,255,0.06)]',
  y: 'border-y border-[rgba(255,255,255,0.06)]',
} as const

export type SectionTone = keyof typeof tones
export type SectionSpacing = keyof typeof spacings
export type SectionDivider = keyof typeof dividers

type SectionProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode
  tone?: SectionTone
  spacing?: SectionSpacing
  divider?: SectionDivider
  width?: ContainerWidth
  contained?: boolean
  containerClassName?: string
}

export function Section({
  children,
  className,
  containerClassName,
  tone = 'dark',
  spacing = 'default',
  divider = 'none',
  width = 'page',
  contained = true,
  ...rest
}: SectionProps) {
  return (
    <section
      {...rest}
      className={cn(
        'relative isolate',
        tones[tone],
        spacings[spacing],
        dividers[divider],
        className,
      )}
    >
      {contained ? (
        <Container width={width} className={containerClassName}>
          {children}
        </Container>
      ) : (
        children
      )}
    </section>
  )
}
