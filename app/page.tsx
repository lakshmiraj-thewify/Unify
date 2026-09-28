import type { Metadata } from 'next'
import { HeroSection } from '@/components/home/hero'
import { HardwareRibbon } from '@/components/home/hardware-ribbon'
import { FourPillars } from '@/components/home/four-pillars'
import { TrustStats } from '@/components/home/trust-stats'
import { HowItWorks } from '@/components/home/how-it-works'
import { TabbedShowcase } from '@/components/home/tabbed-showcase'
import { FeatureModules } from '@/components/home/feature-modules'
import { IspSolutions } from '@/components/home/isp-solutions'
import { RevenueCalculator } from '@/components/home/revenue-calculator'
import { BusinessModel } from '@/components/home/business-model'
import { FeatureStack } from '@/components/home/feature-stack'
import { PlatformArchitecture } from '@/components/home/platform-architecture'
import { EcosystemTransition } from '@/components/home/ecosystem-transition'
import { AboutSection } from '@/components/home/about-section'
import { HomeBlogTeaser } from '@/components/home/home-blog-teaser'
import { FaqSection } from '@/components/home/faq'
import { CtaBanner } from '@/components/home/cta-banner'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
}

export default function HomePage() {
  return (
    /**
     * Single aurora canvas — all dark sections sit on top of this
     * unified gradient background, just like Nexos.
     * Blobs are positioned at key scroll zones so colour flows naturally
     * through the page without rectangular section boundaries.
     */
    <div className="relative overflow-hidden bg-[#07050E]">
      {/* ── Aurora Zone 1: Hero + Hardware + Pillars ─────────────────────────
          Deep indigo-purple radial centred at the top — matches hero aurora */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 h-[90vh] w-[140vw] -translate-x-1/2 rounded-full opacity-70"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(116,60,255,0.45) 0%, rgba(69,25,165,0.20) 45%, transparent 72%)',
        }}
      />

      {/* ── Aurora Zone 2: Trust Stats → HowItWorks → Tabbed Showcase ────────
          Wide violet blob centred at ~35% scroll depth */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 h-[70vh] w-[110vw] -translate-x-1/2 rounded-full"
        style={{
          top: '28%',
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(104,40,240,0.30) 0%, rgba(60,20,160,0.10) 55%, transparent 75%)',
        }}
      />

      {/* ── Aurora Zone 3: Feature Modules → ISP Solutions → Calculator ──────
          Slightly cyan-shifted blob creates visual variety mid-page */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[55%] h-[60vh] w-[90vw] rounded-full"
        style={{
          top: '50%',
          background:
            'radial-gradient(ellipse at 40% 50%, rgba(116,60,255,0.22) 0%, rgba(94,231,228,0.06) 60%, transparent 80%)',
        }}
      />

      {/* ── Aurora Zone 4: Business Model → Feature Stack → Architecture ─────
          Rich purple bloom — densest zone of the page */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[30%] h-[65vh] w-[100vw] rounded-full"
        style={{
          top: '66%',
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(120,50,255,0.28) 0%, rgba(80,30,200,0.12) 50%, transparent 75%)',
        }}
      />

      {/* ── Aurora Zone 5: Blog → FAQ → CTA ───────────────────────
          Fades back out — smaller, cooler tone */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 h-[50vh] w-[80vw] -translate-x-1/2 rounded-full"
        style={{
          top: '84%',
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(100,60,220,0.20) 0%, transparent 70%)',
        }}
      />

      {/* ── Sections ─────────────────────────────────────────────────────── */}
      <HeroSection />
      <HardwareRibbon />
      <FourPillars />
      <TrustStats />
      <HowItWorks />
      <TabbedShowcase />
      <FeatureModules />
      <IspSolutions />
      <RevenueCalculator />
      <BusinessModel />
      <FeatureStack />
      <PlatformArchitecture />
      <EcosystemTransition />
      <AboutSection />
      <HomeBlogTeaser />
      <FaqSection />
      <CtaBanner />
    </div>
  )
}
