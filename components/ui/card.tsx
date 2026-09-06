import Link from 'next/link'
import type { ElementType, HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'
import type { LinkHref } from '@/lib/links'

const tones = {
  light: 'bg-surface border-line shadow-card text-ink',
  subtle: 'bg-surface-subtle border-line text-ink',
  dark: 'bg-navy-800/60 border-dark-line text-dark-fg backdrop-blur-sm',
} as const

/** Applied on top of the tone when the card is hoverable or is a link. */
const interactiveTones = {
  light: 'hover:border-primary-300 hover:shadow-lift',
  subtle: 'hover:border-primary-300 hover:bg-surface hover:shadow-lift',
  dark: 'hover:border-signal-400/40 hover:bg-navy-800/80',
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
  /** Adds hover affordances and a `group` hook without making the card a link. */
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
  tone = 'light',
  padding = 'md',
  interactive,
  className,
  isLink,
}: SharedCardProps & { isLink: boolean }) {
  const hoverable = interactive === true || isLink
  return cn(
    'group relative flex flex-col overflow-hidden rounded-2xl border',
    tones[tone],
    paddings[padding],
    hoverable && ['transition-[background-color,border-color,box-shadow] duration-300', 'ease-std'],
    hoverable && interactiveTones[tone],
    isLink && 'focus-visible:outline-offset-4',
    className,
  )
}

/**
 * The container every content block sits in. Radius is fixed at 16px by the
 * token scale, so cards stay square-shouldered rather than drifting into the
 * pill shapes that read as generic SaaS.
 */
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
    as = 'div',
    href: _href,
    tone,
    padding,
    interactive,
    className,
    children,
    ...rest
  } = props
  const Tag = as as ElementType

  return (
    <Tag
      {...rest}
      className={cardClasses({ tone, padding, interactive, className, children, isLink: false })}
    >
      {children}
    </Tag>
  )
}
