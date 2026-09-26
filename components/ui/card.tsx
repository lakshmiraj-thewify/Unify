import Link from 'next/link'
import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'
import type { LinkHref } from '@/lib/links'

/**
 * Card tones:
 * - dark: glassmorphism card for dark backgrounds (hero, stats, dark sections)
 * - light: clean white card for light sections
 * - subtle: slightly off-white card
 * - visp: alias for light (legacy compat)
 */
const tones = {
  light: 'bg-white border-[#E2E8F0] text-[#0D1B21] shadow-[0_1px_3px_rgba(0,0,0,0.08)]',
  subtle: 'bg-[#F7F8FA] border-[#E2E8F0] text-[#0D1B21] shadow-[0_1px_3px_rgba(0,0,0,0.06)]',
  visp: 'bg-white border-[#E2E8F0] text-[#0D1B21] shadow-[0_1px_3px_rgba(0,0,0,0.08)]',
  dark: 'bg-[rgba(13,27,33,0.6)] backdrop-blur-md border-[rgba(255,255,255,0.08)] text-white',
} as const

const interactiveTones = {
  light:
    'hover:border-[#743CFF]/40 hover:shadow-[0_4px_20px_rgba(0,0,0,0.12)] hover:-translate-y-0.5',
  subtle:
    'hover:border-[#743CFF]/40 hover:shadow-[0_4px_20px_rgba(0,0,0,0.10)] hover:-translate-y-0.5',
  visp: 'hover:border-[#743CFF]/40 hover:shadow-[0_4px_20px_rgba(0,0,0,0.12)] hover:-translate-y-0.5',
  dark: 'hover:border-[rgba(116,60,255,0.4)] hover:shadow-[0_0_0_1px_rgba(116,60,255,0.25),0_0_20px_rgba(116,60,255,0.15)] hover:-translate-y-0.5',
} as const

const paddings = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-6 lg:p-8',
} as const

export type CardTone = keyof typeof tones
export type CardPadding = keyof typeof paddings

type SharedCardProps = {
  children: ReactNode
  tone?: CardTone
  padding?: CardPadding
  interactive?: boolean
  className?: string
}

type StaticCardProps = SharedCardProps &
  Omit<HTMLAttributes<HTMLElement>, 'className' | 'children'> & {
    href?: undefined
    as?: 'div' | 'article' | 'li' | 'section'
  }

type LinkCardProps = SharedCardProps &
  Omit<HTMLAttributes<HTMLElement>, 'className' | 'children'> & {
    href: LinkHref
    as?: undefined
  }

export type CardProps = StaticCardProps | LinkCardProps

function cardClasses({
  tone = 'dark',
  padding = 'md',
  interactive,
  className,
  isLink,
}: SharedCardProps & { isLink: boolean }) {
  const hoverable = interactive === true || isLink
  return cn(
    'group relative flex flex-col overflow-hidden rounded-xl border',
    tones[tone],
    paddings[padding],
    hoverable && [
      'transition-[background-color,border-color,box-shadow,transform] duration-300',
      'ease-std',
    ],
    hoverable && interactiveTones[tone],
    isLink && 'focus-visible:outline-offset-4',
    className,
  )
}

export function Card(props: CardProps) {
  if (props.href !== undefined) {
    const { href, tone, padding, interactive, className, children, ...rest } = props
    return (
      <Link
        {...rest}
        href={href}
        className={cardClasses({ tone, padding, interactive, className, children, isLink: true })}
      >
        {children}
      </Link>
    )
  }

  const {
    as: Tag = 'div',
    href: _href,
    tone,
    padding,
    interactive,
    className,
    children,
    ...rest
  } = props

  return (
    <Tag
      {...rest}
      className={cardClasses({ tone, padding, interactive, className, children, isLink: false })}
    >
      {children}
    </Tag>
  )
}
