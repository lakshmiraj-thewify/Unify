/**
 * The type scale, as class strings.
 *
 * Sizes live here rather than being sprinkled across sections so the scale is
 * one file to audit and one file to change. Components import from here; pages
 * import components. Nothing should hand-roll a `text-4xl font-extrabold ...`
 * stack outside this file.
 *
 * Headings use `font-heading` (Sora), body text uses `font-sans` (Inter).
 */

export const heading = {
  /** Page-level H1. 36 -> 48 -> 56px. */
  display:
    'font-heading text-[2.25rem] leading-[1.08] font-bold tracking-[-0.02em] sm:text-5xl lg:text-[3.5rem]',
  /** Section H2. 30 -> 36px. */
  h2: 'font-heading text-[1.875rem] leading-[1.15] font-bold tracking-[-0.015em] lg:text-[2.25rem]',
  /** Card / sub-section H3. 20 -> 24px. */
  h3: 'font-heading text-xl leading-snug font-semibold tracking-[-0.01em] lg:text-2xl',
  /** Dense label heading. 16px. */
  h4: 'font-heading text-base leading-snug font-semibold',
} as const

export const bodyText = {
  /** Sub-headline under a display or H2. 18 -> 20px. */
  lead: 'text-lg leading-[1.6] lg:text-xl',
  base: 'text-base leading-[1.6]',
  small: 'text-sm leading-[1.6]',
  micro: 'text-xs leading-normal',
} as const

export const label = {
  /** Uppercase section eyebrow. */
  eyebrow: 'text-xs font-semibold uppercase tracking-[0.1em]',
  /** Mono micro-label used on console tiles and data rows. */
  mono: 'font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.08em]',
} as const

export type HeadingSize = keyof typeof heading
export type BodySize = keyof typeof bodyText
