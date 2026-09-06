import type { Metadata } from 'next'
import { site } from '@/content/site'

/**
 * Metadata helper.
 *
 * Phase 1 establishes canonical URLs, titles and Open Graph text only.
 * Deliberately absent until the assets and copy exist:
 *   - `openGraph.images` / `twitter.images` — PENDING(Q1), no OG artwork supplied,
 *     and a card pointing at a 404 is worse than no card.
 *   - JSON-LD (`Organization`, `SoftwareApplication`, `FAQPage`, …) — Phase 10,
 *     once the facts each schema needs are signed off. Partial structured data
 *     is a liability, not a head start.
 */

export const SITE_ORIGIN = site.url

type PageMetadataInput = {
  title: string
  description?: string
  /** Root-relative path, e.g. `/pricing`. Used for the canonical URL. */
  path: string
  /** Set for pages that must never be indexed (scaffolding, internal tooling). */
  noIndex?: boolean
}

export function pageMetadata({
  title,
  description = site.description,
  path,
  noIndex = false,
}: PageMetadataInput): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: site.name,
      type: 'website',
      locale: 'en_IN',
    },
    twitter: {
      // `summary` rather than `summary_large_image`: there is no card image yet.
      card: 'summary',
      title,
      description,
    },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
  }
}
