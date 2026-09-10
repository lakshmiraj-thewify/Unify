/**
 * ---------------------------------------------------------------------------
 * robots.ts — Next.js Metadata API robots.txt generator.
 *
 * Serves `/robots.txt` at runtime. Uses the canonical site URL from
 * content/site.ts (respects NEXT_PUBLIC_SITE_URL in production).
 *
 * Rules:
 *   - Public website pages: allow all crawlers.
 *   - /design-system: disallow — internal tooling, not for public indexing.
 *   - /api/*: no explicit disallow — crawlers do not follow API routes and
 *     adding a blanket disallow could confuse some bots more than help them.
 * ---------------------------------------------------------------------------
 */

import type { MetadataRoute } from 'next'
import { SITE_ORIGIN } from '@/lib/seo'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/design-system', '/design-system/'],
      },
    ],
    sitemap: `${SITE_ORIGIN}/sitemap.xml`,
    host: SITE_ORIGIN,
  }
}
