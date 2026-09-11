import Link from 'next/link'
import type { ElementType, HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'
import type { LinkHref } from '@/lib/links'

const tones = {
  light: 'bg-white border-line text-ink shadow-card',
  subtle: 'bg-surface border-line/60 text-ink shadow-card',
  visp: 'bg-white border-line text-ink shadow-card',
  dark: 'bg-navy-800 border-dark-line text-dark-fg',
} as const

/** Applied on top of the tone when the card is hoverable or is a link. */
const interactiveTones = {
  light: 'hover:border-primary-400 hover:shadow-lift hover:-translate-y-0.5',
  subtle: 'hover:border-primary-400 hover:shadow-lift hover:-translate-y-0.5',
  visp: 'hover:border-primary-400 hover:shadow-lift hover:-translate-y-0.5',
  dark: 'hover:border-primary-400/50 hover:bg-navy-700/90 hover:-translate-y-0.5',
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
    'group relative flex flex-col overflow-hidden rounded-[16px] border',
    tones[tone],
    paddings[padding],
    hoverable && ['transition-[background-color,border-color,box-shadow,transform] duration-300', 'ease-std'],
    hoverable && interactiveTones[tone],
    isLink && 'focus-visible:outline-offset-4',
    className,
  )
}

/**
 * The container every content block sits in. Radius is 16px by the token
 * scale, giving cards a consistent, modern shape.
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
