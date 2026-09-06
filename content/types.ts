import type { LinkHref } from '@/lib/links'

/**
 * A fact the approved blueprint *references* but does not *specify* — a phone
 * number, a per-vendor setup time, a price. `null` is the only representation
 * allowed: it must never be replaced with a plausible-looking value.
 *
 * Components branch on `isProvided` and render a `pending` Badge instead, so an
 * unresolved value is always visible as unresolved on the page.
 */
export type Provided<T> = T | null

export function isProvided<T>(value: Provided<T>): value is T {
  return value !== null
}

export type NavItem = {
  label: string
  href: LinkHref
  /** Off-site, `tel:` or `mailto:` destination — rendered as a plain anchor. */
  external?: boolean
}

export type NavGroup = {
  heading: string
  items: NavItem[]
}
