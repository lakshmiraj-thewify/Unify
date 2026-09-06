import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Container, type ContainerWidth } from './container'

/**
 * Band tones. The page alternates light -> subtle/tint -> dark so long scrolls
 * stay legible; `dark` also re-points the global focus ring at cyan so keyboard
 * focus never disappears into navy.
 */
const tones = {
  light: 'bg-surface text-ink border-line',
  subtle: 'bg-surface-subtle text-ink border-line',
  tint: 'bg-surface-tint text-ink border-line',
  dark: 'bg-navy-900 text-dark-fg border-dark-line [--focus-ring:var(--color-signal-300)]',
} as const

const spacings = {
  default: 'py-20 lg:py-28',
  compact: 'py-12 lg:py-16',
  tight: 'py-8 lg:py-10',
  flush: '',
} as const

const dividers = {
  none: '',
  top: 'border-t',
  bottom: 'border-b',
  y: 'border-y',
} as const

export type SectionTone = keyof typeof tones
export type SectionSpacing = keyof typeof spacings
export type SectionDivider = keyof typeof dividers

type SectionProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode
  tone?: SectionTone
  spacing?: SectionSpacing
  divider?: SectionDivider
  /** Container width. Ignored when `contained` is false. */
  width?: ContainerWidth
  /** Set false for full-bleed content that manages its own gutters. */
  contained?: boolean
  containerClassName?: string
}

export function Section({
  children,
  className,
  containerClassName,
  tone = 'light',
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
