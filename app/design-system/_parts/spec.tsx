import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { label } from '@/components/ui/typography'

/**
 * Layout chrome for the design-system page only. Not part of the public
 * component library — nothing outside `app/design-system` should import it.
 */
export function Spec({
  title,
  note,
  children,
  tone = 'light',
  className,
}: {
  title: string
  note?: ReactNode
  children: ReactNode
  tone?: 'light' | 'dark'
  className?: string
}) {
  return (
    <section
      className={cn(
        'rounded-2xl border',
        tone === 'dark'
          ? 'border-dark-line bg-navy-900 [--focus-ring:var(--color-signal-300)]'
          : 'border-line bg-surface',
        className,
      )}
    >
      <header
        className={cn(
          'flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b px-5 py-3',
          tone === 'dark' ? 'border-dark-line' : 'border-line',
        )}
      >
        <h2
          className={cn(
            label.mono,
            tone === 'dark' ? 'text-signal-300' : 'text-primary-700',
            'not-italic',
          )}
        >
          {title}
        </h2>
        {note ? (
          <p className={cn('text-xs', tone === 'dark' ? 'text-dark-fg-muted' : 'text-ink-muted')}>
            {note}
          </p>
        ) : null}
      </header>
      <div className="p-5">{children}</div>
    </section>
  )
}

/** A labelled row inside a Spec. */
export function SpecRow({
  label: rowLabel,
  children,
  tone = 'light',
}: {
  label: string
  children: ReactNode
  tone?: 'light' | 'dark'
}) {
  return (
    <div className="flex flex-col gap-2 py-3 first:pt-0 last:pb-0">
      <p
        className={cn(
          'font-mono text-[0.6875rem] tracking-[0.06em] uppercase',
          tone === 'dark' ? 'text-dark-fg-muted' : 'text-ink-faint',
        )}
      >
        {rowLabel}
      </p>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  )
}
