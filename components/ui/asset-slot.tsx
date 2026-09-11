import { cn } from '@/lib/cn'

type AssetSlotProps = {
  /** A precise commissioning brief; this is intentionally visible until supplied. */
  requirement: string
  /** Optional placement identifier for the eventual asset handoff. */
  id?: string
  tone?: 'light' | 'dark'
  className?: string
}

/**
 * Deliberate empty media location. This is not an illustration substitute: it
 * records the exact commissioned asset required while preserving the intended
 * composition until the approved photography or topology artwork is supplied.
 */
export function AssetSlot({ requirement, id, tone = 'light', className }: AssetSlotProps) {
  const dark = tone === 'dark'

  return (
    <div
      id={id}
      role="note"
      aria-label={`Required visual asset: ${requirement}`}
      className={cn(
        'asset-slot relative flex min-h-56 items-end border p-5 sm:min-h-72',
        dark
          ? 'border-dark-line bg-navy-950 text-dark-fg-muted'
          : 'border-line-strong bg-surface-subtle text-ink-muted',
        className,
      )}
    >
      <div className="max-w-xs border-l-2 border-primary-500 pl-3">
        <p className="font-mono text-[0.625rem] font-bold tracking-[0.12em] uppercase">
          Commissioned asset required
        </p>
        <p className="mt-1 text-sm leading-relaxed">{requirement}</p>
      </div>
    </div>
  )
}
