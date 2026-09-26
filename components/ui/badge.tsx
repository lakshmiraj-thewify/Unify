import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

/**
 * Badge — semantic pill. Always on dark-ish background by default.
 *
 * tone="dark" → for dark hero/section backgrounds (glass style)
 * tone="light" → for white/light section backgrounds
 */
const darkVariants = {
  neutral: 'bg-white/[0.08] text-white/70 border-white/10',
  primary: 'bg-[rgba(116,60,255,0.2)] text-[#A78BFA] border-[rgba(116,60,255,0.35)]',
  secondary: 'bg-[rgba(116,60,255,0.2)] text-[#A78BFA] border-[rgba(116,60,255,0.35)]',
  accent: 'bg-[rgba(116,60,255,0.2)] text-[#A78BFA] border-[rgba(116,60,255,0.35)]',
  signal: 'bg-[rgba(94,231,228,0.12)] text-[#5EE7E4] border-[rgba(94,231,228,0.3)]',
  ok: 'bg-[rgba(94,231,228,0.12)] text-[#5EE7E4] border-[rgba(94,231,228,0.3)]',
  warn: 'bg-amber-500/15 text-amber-300 border-amber-400/30',
  danger: 'bg-red-500/15 text-red-300 border-red-400/30',
  pending: 'bg-white/[0.04] text-white/40 border-white/10 border-dashed',
} as const

const lightVariants = {
  neutral: 'bg-[#F7F8FA] text-[#4A5568] border-[#E2E8F0]',
  primary: 'bg-[#EDE9FE] text-[#6D28D9] border-[#C4B5FD]',
  secondary: 'bg-[#EDE9FE] text-[#6D28D9] border-[#C4B5FD]',
  accent: 'bg-[#EDE9FE] text-[#6D28D9] border-[#C4B5FD]',
  signal: 'bg-[rgba(94,231,228,0.1)] text-teal-700 border-teal-200',
  ok: 'bg-[rgba(94,231,228,0.1)] text-teal-700 border-teal-200',
  warn: 'bg-amber-50 text-amber-700 border-amber-200',
  danger: 'bg-red-50 text-red-700 border-red-200',
  pending: 'bg-[#F7F8FA] text-[#A0AEC0] border-[#CBD5E0] border-dashed',
} as const

const sizes = {
  sm: 'h-6 gap-1 px-2 text-[0.6875rem] [&_svg]:size-3',
  md: 'h-7 gap-1.5 px-2.5 text-xs [&_svg]:size-3.5',
} as const

const dotColours = {
  neutral: 'bg-white/40',
  primary: 'bg-[#743CFF]',
  secondary: 'bg-[#743CFF]',
  accent: 'bg-[#743CFF]',
  signal: 'bg-[#5EE7E4]',
  ok: 'bg-[#5EE7E4]',
  warn: 'bg-amber-400',
  danger: 'bg-red-400',
  pending: 'bg-white/30',
} as const

const dotColoursDark = dotColours

const dotColoursLight = {
  neutral: 'bg-[#A0AEC0]',
  primary: 'bg-[#743CFF]',
  secondary: 'bg-[#743CFF]',
  accent: 'bg-[#743CFF]',
  signal: 'bg-teal-500',
  ok: 'bg-teal-500',
  warn: 'bg-amber-500',
  danger: 'bg-red-500',
  pending: 'bg-[#A0AEC0]',
} as const

export type BadgeVariant = keyof typeof darkVariants
export type BadgeSize = keyof typeof sizes

type BadgeProps = {
  children: ReactNode
  variant?: BadgeVariant
  size?: BadgeSize
  tone?: 'light' | 'dark'
  dot?: boolean
  live?: boolean
  mono?: boolean
  icon?: ReactNode
  className?: string
}

export function Badge({
  children,
  variant = 'neutral',
  size = 'md',
  tone = 'dark',
  dot = false,
  live = false,
  mono = false,
  icon,
  className,
}: BadgeProps) {
  const palette = tone === 'dark' ? darkVariants : lightVariants
  const dotPalette = tone === 'dark' ? dotColoursDark : dotColoursLight

  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center rounded-full border font-medium whitespace-nowrap',
        palette[variant],
        sizes[size],
        mono && 'tabular font-mono tracking-[0.04em]',
        className,
      )}
    >
      {dot || live ? (
        <span
          aria-hidden="true"
          className={cn(
            'size-1.5 shrink-0 rounded-full',
            dotPalette[variant],
            live && 'animate-pulse-dot',
          )}
        />
      ) : null}
      {icon}
      {children}
    </span>
  )
}
