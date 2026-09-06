/**
 * The type scale, as class strings.
 *
 * Sizes live here rather than being sprinkled across sections so the scale is
 * one file to audit and one file to change. Components import from here; pages
 * import components. Nothing should hand-roll a `text-4xl font-extrabold ...`
 * stack outside this file.
 */

export const heading = {
  /** Page-level H1. 36 -> 48 -> 56px. */
  display:
    'text-[2.25rem] leading-[1.05] font-extrabold tracking-[-0.03em] sm:text-5xl lg:text-[3.5rem]',
  /** Section H2. 30 -> 40px. */
  h2: 'text-3xl leading-[1.12] font-extrabold tracking-[-0.025em] lg:text-[2.5rem]',
  /** Card / sub-section H3. 18 -> 20px. */
  h3: 'text-lg leading-snug font-bold tracking-[-0.01em] lg:text-xl',
  /** Dense label heading. 16px. */
  h4: 'text-base leading-snug font-bold',
} as const

export const bodyText = {
  /** Sub-headline under a display or H2. 18 -> 20px. */
  lead: 'text-lg leading-relaxed lg:text-xl',
  base: 'text-base leading-relaxed',
  small: 'text-sm leading-relaxed',
  micro: 'text-xs leading-normal',
} as const

export const label = {
  /** Uppercase section eyebrow. */
  eyebrow: 'text-xs font-bold uppercase tracking-[0.1em]',
  /** Mono micro-label used on console tiles and data rows. */
  mono: 'font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.08em]',
} as const

export type HeadingSize = keyof typeof heading
export type BodySize = keyof typeof bodyText
