import type { Metadata } from 'next'
import { BusinessModel } from '@/components/sections/business-model'
import { FaqSection } from '@/components/sections/faq-section'
import { FeatureModules } from '@/components/sections/feature-modules'
import { FourPillars } from '@/components/sections/four-pillars'
import { HardwareRibbon } from '@/components/sections/hardware-ribbon'
import { Hero } from '@/components/sections/hero'
import { HomeBlogTeaser } from '@/components/sections/home-blog-teaser'
import { HomeContactCta } from '@/components/sections/home-contact-cta'
import { HomePricingBand } from '@/components/sections/home-pricing-band'
import { HowItWorks } from '@/components/sections/how-it-works'
import { IspSolutions } from '@/components/sections/isp-solutions'
import { PlatformArchitecture } from '@/components/sections/platform-architecture'
import { RevenueCalculator } from '@/components/sections/revenue-calculator'
import { TrustStats } from '@/components/sections/trust-stats'

/*
 * ---------------------------------------------------------------------------
 * Homepage — Sections 1–14 (complete per approved blueprint).
 *
 *  1.  Hero                  — dark navy band, live console widget
 *  2.  HardwareRibbon        — vendor compatibility grid
 *  3.  FourPillars           — Cloud RADIUS · Billing · FUP · White-Label
 *  4.  TrustStats            — 200+ ISPs · 50k Subscribers · 99.99% · 10 min
 *  5.  HowItWorks            — 5-step pipeline  (#how-it-works)
 *  6.  FeatureModules        — 8 feature cards  (#features)
 *  7.  IspSolutions          — 5 segment cards  (#solutions)
 *  8.  RevenueCalculator     — subscriber slider + estimates  (#savings-calculator)
 *  9.  BusinessModel         — You Own · We Run  (#ownership)
 *  10. PlatformArchitecture  — Cloud RADIUS · Isolation · White-Label  (#architecture)
 *  11. HomeBlogTeaser        — first 3 articles  (#blog)
 *  12. FaqSection            — 6-item accordion  (#faq)
 *  13. HomeContactCta        — demo booking band  (#contact)
 *  14. HomePricingBand       — 3 tier preview  (#pricing)
 *
 * All copy comes from the content/ layer. Nothing is invented at this layer.
 * ---------------------------------------------------------------------------
 */

export const metadata: Metadata = {
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
}

export default function HomePage() {
  return (
    <>
      {/* Section 1 */}
      <Hero />
      {/* Section 2 */}
      <HardwareRibbon />
      {/* Section 3 */}
      <FourPillars />
      {/* Section 4 */}
      <TrustStats />
      {/* Section 5 */}
      <HowItWorks />
      {/* Section 6 */}
      <FeatureModules />
      {/* Section 7 */}
      <IspSolutions />
      {/* Section 8 */}
      <RevenueCalculator />
      {/* Section 9 */}
      <BusinessModel />
      {/* Section 10 */}
      <PlatformArchitecture />
      {/* Section 11 */}
      <HomeBlogTeaser />
      {/* Section 12 */}
      <FaqSection />
      {/* Section 13 */}
      <HomeContactCta />
      {/* Section 14 */}
      <HomePricingBand />
    </>
  )
}
