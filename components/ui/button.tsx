import Link from 'next/link'
import { LoaderCircle } from 'lucide-react'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'
import type { LinkHref } from '@/lib/links'

const base =
  'group/btn inline-flex items-center justify-center gap-2 rounded-[10px] font-semibold whitespace-nowrap ' +
  'select-none transition-[background-color,border-color,color,box-shadow,transform] duration-200 ' +
  'ease-std active:translate-y-px [&_svg]:shrink-0 ' +
  'disabled:pointer-events-none disabled:opacity-55 aria-disabled:pointer-events-none aria-disabled:opacity-55'

const variants = {
  /** Primary CTA: brand purple with glow */
  primary:
    'bg-[#743CFF] text-white hover:bg-[#5E2EE0] shadow-[0_0_20px_rgba(116,60,255,0.35)] hover:shadow-[0_0_28px_rgba(116,60,255,0.5)]',
  /** Outline on dark backgrounds */
  secondary:
    'bg-transparent text-white border border-white/20 hover:border-[#743CFF]/60 hover:text-[#A78BFA]',
  /** Outline on light backgrounds */
  outline:
    'bg-transparent text-[#0D1B21] border border-[#E2E8F0] hover:border-[#743CFF] hover:text-[#743CFF]',
  /** White solid — for use on dark hero */
  white: 'bg-white text-[#0D1B21] hover:bg-white/90 shadow-sm',
  /** Ghost nav link */
  ghost: 'text-white/70 hover:text-white hover:bg-white/8 rounded-lg',
  /** Ghost on light backgrounds */
  'ghost-light': 'text-[#4A5568] hover:text-[#0D1B21] hover:bg-[#F7F8FA] rounded-lg',
  /** Dark band outlined ghost */
  dark: 'bg-transparent text-white border border-white/20 hover:bg-white/10 hover:border-white/40',
  /** Inline text action */
  link: 'text-[#A78BFA] decoration-[#743CFF]/40 rounded-sm font-semibold underline decoration-2 underline-offset-4 hover:text-[#743CFF] hover:decoration-[#743CFF]',
} as const

const sizes = {
  sm: 'h-9 px-3.5 text-sm [&_svg]:size-4',
  md: 'h-11 px-5 text-sm [&_svg]:size-4',
  lg: 'h-12 px-6 text-base [&_svg]:size-[1.125rem]',
} as const

const linkSizes = {
  sm: 'text-sm [&_svg]:size-4',
  md: 'text-sm [&_svg]:size-4',
  lg: 'text-base [&_svg]:size-[1.125rem]',
} as const

export type ButtonVariant = keyof typeof variants
export type ButtonSize = keyof typeof sizes

type SharedProps = {
  children: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  className?: string
  leadingIcon?: ReactNode
  trailingIcon?: ReactNode
}

type NativeButtonProps = SharedProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> & {
    href?: undefined
    loading?: boolean
    loadingLabel?: string
  }

type AnchorRest = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'children' | 'href'>

type InternalLinkProps = SharedProps &
  AnchorRest & {
    href: LinkHref
    external?: false
  }

type ExternalLinkProps = SharedProps &
  AnchorRest & {
    href: string
    external: true
    newTab?: boolean
  }

export type ButtonProps = NativeButtonProps | InternalLinkProps | ExternalLinkProps

function classesFor({ variant = 'primary', size = 'md', fullWidth, className }: SharedProps) {
  return cn(
    base,
    variants[variant],
    variant === 'link' ? linkSizes[size] : sizes[size],
    fullWidth === true && 'w-full',
    className,
  )
}

/**
 * One button, three renderings: a native `<button>`, a `next/link` for internal
 * routes, and a plain `<a>` for anything off-site.
 */
export function Button(props: ButtonProps) {
  if (props.href !== undefined && props.external === true) {
    const {
      href,
      external: _external,
      newTab = true,
      variant,
      size,
      fullWidth,
      className,
      leadingIcon,
      trailingIcon,
      children,
      ...rest
    } = props

    return (
      <a
        {...rest}
        href={href}
        className={classesFor({ variant, size, fullWidth, className, children })}
        {...(newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {leadingIcon}
        {children}
        {trailingIcon}
        {newTab ? <span className="visually-hidden"> (opens in a new tab)</span> : null}
      </a>
    )
  }

  if (props.href !== undefined) {
    const {
      href,
      external: _external,
      variant,
      size,
      fullWidth,
      className,
      leadingIcon,
      trailingIcon,
      children,
      ...rest
    } = props

    return (
      <Link
        {...rest}
        href={href}
        className={classesFor({ variant, size, fullWidth, className, children })}
      >
        {leadingIcon}
        {children}
        {trailingIcon}
      </Link>
    )
  }

  const {
    href: _href,
    loading = false,
    loadingLabel,
    type = 'button',
    variant,
    size,
    fullWidth,
    className,
    leadingIcon,
    trailingIcon,
    children,
    disabled,
    ...rest
  } = props

  return (
    <button
      {...rest}
      type={type}
      disabled={disabled === true || loading}
      aria-busy={loading || undefined}
      className={classesFor({ variant, size, fullWidth, className, children })}
    >
      {loading ? <LoaderCircle aria-hidden="true" className="animate-spin" /> : leadingIcon}
      {loading && loadingLabel !== undefined ? loadingLabel : children}
      {loading ? null : trailingIcon}
    </button>
  )
}
