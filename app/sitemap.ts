/**
 * ---------------------------------------------------------------------------
 * sitemap.ts — Next.js Metadata API sitemap.xml generator.
 *
 * Serves `/sitemap.xml` at runtime. Includes the 6 public routes only.
 * /design-system and /api/* are intentionally excluded.
 *
 * changeFrequency and priority are set conservatively — a marketing site
 * changes infrequently. Adjust once a CMS or blog detail pages are added.
 *
 * Uses the canonical SITE_ORIGIN from lib/seo.ts, which reads
 * NEXT_PUBLIC_SITE_URL in production and falls back to the hardcoded domain.
 * ---------------------------------------------------------------------------
 */

import type { MetadataRoute } from 'next'
import { SITE_ORIGIN } from '@/lib/seo'
import { featureDetails } from '@/content/feature-details'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const featurePages: MetadataRoute.Sitemap = featureDetails.map((f) => ({
    url: `${SITE_ORIGIN}/features/${f.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [
    {
      url: `${SITE_ORIGIN}/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${SITE_ORIGIN}/pricing`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_ORIGIN}/blog`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_ORIGIN}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...featurePages,
    {
      url: `${SITE_ORIGIN}/legal/privacy`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${SITE_ORIGIN}/legal/terms`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${SITE_ORIGIN}/legal/cookies`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]
}
