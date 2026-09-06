import Link from 'next/link'
import { LoaderCircle } from 'lucide-react'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'
import type { LinkHref } from '@/lib/links'

const base =
  'group/btn inline-flex items-center justify-center gap-2 rounded-lg font-bold whitespace-nowrap ' +
  'select-none transition-[background-color,border-color,color,box-shadow,transform] duration-200 ' +
  'ease-std active:translate-y-px [&_svg]:shrink-0 ' +
  'disabled:pointer-events-none disabled:opacity-55 aria-disabled:pointer-events-none aria-disabled:opacity-55'

const variants = {
  /** The one high-emphasis action per view. */
  primary: 'bg-primary-600 text-white shadow-primary hover:bg-primary-700',
  /** Paired with primary. Reads as a real button, not a link. */
  secondary:
    'bg-surface text-ink border border-line-strong shadow-card hover:border-primary-300 hover:text-primary-700',
  /** Low emphasis, e.g. nav items and Sign In. */
  ghost: 'text-ink-soft hover:bg-surface-subtle hover:text-primary-700',
  /** Secondary action inside a navy band. */
  dark: 'bg-white/10 text-dark-fg border border-dark-line-strong backdrop-blur-sm hover:bg-white/[0.16] hover:border-signal-400/50',
  /** Inline text action. Underlined so it is not colour-only. */
  link: 'text-primary-600 decoration-primary-300 rounded-sm font-bold underline decoration-2 underline-offset-4 hover:text-primary-800 hover:decoration-primary-600',
} as const

const sizes = {
  sm: 'h-9 px-3.5 text-sm [&_svg]:size-4',
  md: 'h-11 px-5 text-sm [&_svg]:size-4',
  lg: 'h-12 px-6 text-base [&_svg]:size-[1.125rem]',
} as const

/** The link variant is inline text: it takes the size but not the box. */
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
    /** Disables the button, sets aria-busy, and swaps in a spinner. */
    loading?: boolean
    /** Replacement label while loading, e.g. "Sending…". Announced, not just shown. */
    loadingLabel?: string
  }

type AnchorRest = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'children' | 'href'>

type InternalLinkProps = SharedProps &
  AnchorRest & {
    /** Internal route, routed through next/link. See lib/links.ts for how
     *  strictly this is type-checked at the current phase. */
    href: LinkHref
    external?: false
  }

type ExternalLinkProps = SharedProps &
  AnchorRest & {
    href: string
    /** Required for any off-site, `tel:` or `mailto:` destination. */
    external: true
    /** Defaults to true. Set false for `tel:` / `mailto:` / WhatsApp handoffs. */
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
 * routes, and a plain `<a>` for anything off-site. The split is enforced by the
 * type union so an external URL can never be handed to the client router, and
 * `rel="noopener noreferrer"` cannot be forgotten.
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
