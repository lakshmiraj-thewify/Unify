import { cn } from '@/lib/cn'
import { site } from '@/content/site'

/*
 * ---------------------------------------------------------------------------
 * PROVISIONAL ASSET — see open question Q1 (brand assets).
 *
 * The official Unify Wi-Fi logo has not been supplied. This is a geometric
 * stand-in built only from tokens already in the system: the family gradient
 * tile plus a converging-signal glyph. It is deliberately plain so it cannot be
 * mistaken for a finished identity, and it is isolated in this one file so
 * dropping in the real SVG is a single-file change.
 * ---------------------------------------------------------------------------
 */

const sizes = {
  sm: 'size-8 rounded-lg',
  md: 'size-9 rounded-xl',
  lg: 'size-11 rounded-xl',
} as const

export type MarkSize = keyof typeof sizes

/** The gradient tile on its own. Used for the favicon, nav and footer lockups. */
export function UnifyMark({ size = 'md', className }: { size?: MarkSize; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'inline-flex shrink-0 items-center justify-center bg-brand-gradient shadow-primary',
        sizes[size],
        className,
      )}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.2}
        strokeLinecap="round"
        className="size-[62%] text-white"
      >
        <path d="M4.6 10.4a10.4 10.4 0 0 1 14.8 0" />
        <path d="M8.4 14.3a5.2 5.2 0 0 1 7.2 0" />
        <circle cx="12" cy="18.4" r="1.6" fill="currentColor" stroke="none" />
      </svg>
    </span>
  )
}

/** Mark + wordmark + parent-brand attribution, as specified in the blueprint nav. */
export function UnifyLogo({
  size = 'md',
  tone = 'light',
  className,
}: {
  size?: MarkSize
  tone?: 'light' | 'dark'
  className?: string
}) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <UnifyMark size={size} />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            'text-[0.9375rem] font-extrabold tracking-[-0.02em]',
            tone === 'dark' ? 'text-dark-fg' : 'text-ink',
          )}
        >
          {site.name}
        </span>
        <span
          className={cn(
            'mt-0.5 text-[0.625rem] font-bold tracking-[0.06em] uppercase',
            tone === 'dark' ? 'text-dark-fg-muted' : 'text-ink-faint',
          )}
        >
          {site.attribution}
        </span>
      </span>
    </span>
  )
}
