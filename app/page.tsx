import type { Metadata } from 'next'
import { HardwareRibbon } from '@/components/sections/hardware-ribbon'
import { Hero } from '@/components/sections/hero'

/*
 * ---------------------------------------------------------------------------
 * Homepage — Phase 2.
 *
 * Sections:
 *   1. Hero          (blueprint Section 1) — dark navy band with live console preview.
 *   2. HardwareRibbon (blueprint Section 2) — subtle band, vendor compatibility grid.
 *
 * All marketing copy is sourced from content/hero.ts and content/hardware.ts,
 * which transcribe the approved blueprint verbatim. Nothing is written at
 * this layer; nothing is invented here.
 * ---------------------------------------------------------------------------
 */

export const metadata: Metadata = {
  // Title and description are inherited from the root layout template.
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <HardwareRibbon />
    </>
  )
}
