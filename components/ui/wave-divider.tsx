/**
 * Wave SVG divider for smooth transitions between dark and light sections.
 *
 * Usage:
 *   <WaveDivider from="dark" /> — dark-to-light transition
 *   <WaveDivider from="light" /> — light-to-dark transition
 */

import { cn } from '@/lib/cn'

type WaveDividerProps = {
  /** The section above this divider. Determines fill color. */
  from: 'dark' | 'light'
  className?: string
}

export function WaveDivider({ from, className }: WaveDividerProps) {
  const fill = from === 'dark' ? 'fill-surface' : 'fill-navy-900'
  const bg = from === 'dark' ? 'bg-navy-900' : 'bg-surface'

  return (
    <div className={cn('relative -mt-px', bg, className)} aria-hidden="true">
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className={cn('block h-12 w-full sm:h-16 md:h-20', fill)}
      >
        <path d="M0,0 C360,80 1080,0 1440,60 L1440,80 L0,80 Z" />
      </svg>
    </div>
  )
}
