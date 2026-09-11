import { cn } from '@/lib/cn'
import { site } from '@/content/site'

/**
 * ---------------------------------------------------------------------------
 * Logo placeholder — awaiting real brand assets from the client.
 *
 * This renders a clean text-only lockup: "Unify Wi-Fi" + "by TheWiFy".
 * When the real logo file is provided, replace this component with an
 * <Image> or inline SVG. This is a single-file change.
 * ---------------------------------------------------------------------------
 */

const sizes = {
  sm: 'text-base',
  md: 'text-lg',
  lg: 'text-xl',
} as const

export type MarkSize = keyof typeof sizes

/** Text-only mark used in nav and footer until real logo is provided. */
export function UnifyMark({ size = 'md', className }: { size?: MarkSize; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'inline-flex shrink-0 items-center font-bold tracking-tight text-primary-600',
        sizes[size],
        className,
      )}
    >
      U
    </span>
  )
}

/** Text wordmark + parent-brand attribution. */
export function UnifyLogo({
  tone = 'light',
  className,
}: {
  size?: MarkSize
  tone?: 'light' | 'dark'
  className?: string
}) {
  return (
    <span className={cn('inline-flex items-center gap-1.5', className)}>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            'text-[1.125rem] font-bold tracking-[-0.02em]',
            tone === 'dark' ? 'text-dark-fg' : 'text-ink',
          )}
        >
          {site.name}
        </span>
        <span
          className={cn(
            'mt-0.5 text-[0.625rem] font-semibold tracking-[0.06em] uppercase',
            tone === 'dark' ? 'text-dark-fg-muted' : 'text-ink-faint',
          )}
        >
          {site.attribution}
        </span>
      </span>
    </span>
  )
}
