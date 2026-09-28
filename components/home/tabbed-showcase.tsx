'use client'

import { useState, useEffect, useRef, useSyncExternalStore } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import {
  ShieldCheck,
  ReceiptText,
  Gauge,
  Building2,
  Check,
  Send,
  Sliders,
  DollarSign,
  TrendingUp,
  Activity,
  Users,
  Wallet,
} from 'lucide-react'
import { AnimatedSpan, Terminal } from '@/registry/magicui/terminal'
import { InteractiveHoverButton } from '@/registry/magicui/interactive-hover-button'
import { GooeySvgFilter } from '@/components/ui/gooey-svg-filter'

type TabType = 'radius' | 'billing' | 'fup' | 'reseller'

const TABS: Array<{
  id: TabType
  label: string
  icon: React.ElementType
  accent: string
}> = [
  { id: 'radius', label: 'Cloud RADIUS', icon: ShieldCheck, accent: '#5EE7E4' },
  { id: 'billing', label: 'Automated Billing', icon: ReceiptText, accent: '#743CFF' },
  { id: 'fup', label: 'Bandwidth & FUP', icon: Gauge, accent: '#5EE7E4' },
  { id: 'reseller', label: 'Reseller Portal', icon: Building2, accent: '#743CFF' },
]

function emptySubscribe() {
  return () => {}
}

export function TabbedShowcase() {
  const [activeTab, setActiveTab] = useState<TabType>('radius')
  const [direction, setDirection] = useState(1)
  const [progressKey, setProgressKey] = useState(0)

  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef as React.RefObject<Element>, { once: true, amount: 0.15 })
  const [hashStarted, setHashStarted] = useState(false)
  const hasStarted = isInView || hashStarted

  const isSafari = useSyncExternalStore(
    emptySubscribe,
    () => /^((?!chrome|android).)*safari/i.test(navigator.userAgent),
    () => false,
  )

  // Listen to URL hash deep-links (e.g. /#tab-billing, /#tab-fup, /#tab-reseller, /#tab-radius)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase()
      if (hash.includes('billing') || hash.includes('invoicing')) {
        setActiveTab('billing')
        setProgressKey((k) => k + 1)
        setHashStarted(true)
      } else if (hash.includes('fup') || hash.includes('bandwidth')) {
        setActiveTab('fup')
        setProgressKey((k) => k + 1)
        setHashStarted(true)
      } else if (hash.includes('reseller') || hash.includes('lco')) {
        setActiveTab('reseller')
        setProgressKey((k) => k + 1)
        setHashStarted(true)
      } else if (hash.includes('radius') || hash.includes('aaa')) {
        setActiveTab('radius')
        setProgressKey((k) => k + 1)
        setHashStarted(true)
      }
    }
    handleHash()
    window.addEventListener('hashchange', handleHash)
    return () => window.removeEventListener('hashchange', handleHash)
  }, [])

  // Auto-advance timer (5.5s per tab, starts only when section is entered/scrolled into, continues smoothly without hover pause)
  useEffect(() => {
    if (!hasStarted) return

    const timer = setTimeout(() => {
      setActiveTab((prev) => {
        const currentIndex = TABS.findIndex((t) => t.id === prev)
        const nextIndex = (currentIndex + 1) % TABS.length
        setDirection(1)
        setProgressKey((k) => k + 1)
        return TABS[nextIndex]?.id ?? 'radius'
      })
    }, 5500)

    return () => clearTimeout(timer)
  }, [activeTab, hasStarted, progressKey])

  const handleTabClick = (tabId: TabType) => {
    const currentIndex = TABS.findIndex((t) => t.id === activeTab)
    const newIndex = TABS.findIndex((t) => t.id === tabId)
    if (newIndex !== currentIndex) {
      setDirection(newIndex > currentIndex ? 1 : -1)
      setActiveTab(tabId)
      setProgressKey((k) => k + 1)
      if (!hasStarted) setHashStarted(true)
    }
  }

  const cardVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 30 : -30,
      opacity: 0,
      filter: 'blur(4px)',
      scale: 0.985,
    }),
    center: {
      x: 0,
      opacity: 1,
      filter: 'blur(0px)',
      scale: 1,
      transition: {
        duration: 0.35,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -30 : 30,
      opacity: 0,
      filter: 'blur(4px)',
      scale: 0.985,
      transition: {
        duration: 0.22,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    }),
  }

  return (
    <section ref={sectionRef} id="tabs-showcase" className="relative z-10 py-24 scroll-mt-24">
      {/* Anchor targets for direct tab deep-linking */}
      <span id="tab-radius" className="absolute -top-24 pointer-events-none" />
      <span id="tab-billing" className="absolute -top-24 pointer-events-none" />
      <span id="tab-fup" className="absolute -top-24 pointer-events-none" />
      <span id="tab-reseller" className="absolute -top-24 pointer-events-none" />

      {/* Background glow — oversized to bleed beyond this section */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[700px] w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#743CFF]/[0.08] blur-[180px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold tracking-wider text-[#5EE7E4] uppercase">
            Unified Core Platform
          </div>
          <h2 className="mb-4 text-3xl leading-tight font-extrabold tracking-tight text-white sm:text-5xl">
            Four core capabilities. One seamless cloud engine.
          </h2>
          <p className="text-base text-white/60 sm:text-lg">
            Everything your ISP needs to authenticate, bill, and scale — hosted in the cloud,
            connected to the MikroTik hardware you already operate.
          </p>
        </div>

        {/* Tab category indicator lines */}
        <div className="mx-auto mb-3 grid max-w-5xl grid-cols-2 text-xs font-medium tracking-wider uppercase">
          <div className="border-l-2 border-[#5EE7E4] pl-4 text-white/50">
            For Network Engineers
          </div>
          <div className="border-l-2 border-[#743CFF] pl-4 text-white/50">
            For ISP Business Owners
          </div>
        </div>

        {/* Unified Tabbed Showcase with Gooey Liquid Filter */}
        <div className="relative mx-auto max-w-5xl">
          {/* Gooey Filter Defs */}
          <GooeySvgFilter id="showcase-gooey-filter" strength={isSafari ? 0 : 8} />

          {/* Liquid Gooey background layer */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0"
            style={{ filter: isSafari ? 'none' : 'url(#showcase-gooey-filter)' }}
          >
            {/* Top tab slots row */}
            <div className="grid grid-cols-2 gap-2 px-3 pt-2 md:grid-cols-4">
              {TABS.map((tab) => (
                <div key={tab.id} className="relative h-14">
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="active-showcase-tab-shape"
                      className="absolute inset-x-0 top-0 -bottom-3 rounded-t-2xl bg-[#141A26]"
                      transition={{
                        type: 'spring',
                        stiffness: 380,
                        damping: 32,
                      }}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Main Stage Card Body (melts with active tab above) */}
            <div className="h-[calc(100%-64px)] w-full rounded-3xl bg-[#141A26]" />
          </div>

          {/* Interactive Foreground Layer (No Filter, 100% Crisp) */}
          <div className="relative z-10">
            {/* 4-Tab Button Bar */}
            <div className="grid grid-cols-2 gap-2 px-3 pt-2 md:grid-cols-4">
              {TABS.map((tab) => {
                const Icon = tab.icon
                const isActive = activeTab === tab.id
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabClick(tab.id)}
                    className="group relative flex h-14 items-center justify-center gap-2 rounded-t-2xl px-4 text-xs font-semibold transition-colors sm:text-sm"
                  >
                    <Icon
                      className="h-4 w-4 transition-transform duration-200 group-hover:scale-110"
                      style={{ color: isActive ? tab.accent : 'rgba(255,255,255,0.4)' }}
                    />
                    <span
                      className={
                        isActive ? 'font-bold text-white' : 'text-white/60 group-hover:text-white'
                      }
                    >
                      {tab.label}
                    </span>

                    {/* Animated Progress Timer Line */}
                    {isActive && (
                      <div className="absolute inset-x-4 bottom-0 h-0.5 overflow-hidden rounded-full bg-white/10">
                        <motion.div
                          key={`${tab.id}-${progressKey}`}
                          className="h-full rounded-full"
                          style={{ backgroundColor: tab.accent }}
                          initial={{ width: '0%' }}
                          animate={hasStarted ? { width: '100%' } : { width: '0%' }}
                          transition={{ duration: 5.5, ease: 'linear' }}
                        />
                      </div>
                    )}
                  </button>
                )
              })}
            </div>

            {/* 2-Column Tab Content Stage */}
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#141A26]/90 p-6 shadow-2xl backdrop-blur-xl sm:p-10">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={activeTab}
                  custom={direction}
                  variants={cardVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  {/* TAB 1: CLOUD RADIUS */}
                  {activeTab === 'radius' && (
                    <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
                      <div className="space-y-6 lg:col-span-5">
                        <div className="inline-flex items-center gap-1.5 rounded-full border border-[#5EE7E4]/20 bg-[#5EE7E4]/10 px-3 py-1 text-xs font-semibold text-[#5EE7E4]">
                          Geo-Redundant AAA Cluster
                        </div>
                        <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                          High-Availability Cloud RADIUS & AAA
                        </h3>
                        <p className="text-sm leading-relaxed text-white/70 sm:text-base">
                          Authenticate every PPPoE and Hotspot session through a geo-redundant cloud
                          RADIUS cluster. No on-premise Linux servers, power backups, or manual
                          FreeRADIUS configurations needed.
                        </p>
                        <ul className="space-y-3 text-sm text-white/80">
                          <li className="flex items-center gap-2.5">
                            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#5EE7E4]/10 text-[#5EE7E4]">
                              <Check className="h-3.5 w-3.5" />
                            </div>
                            <span>Sub-15ms RADIUS authentication response time</span>
                          </li>
                          <li className="flex items-center gap-2.5">
                            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#5EE7E4]/10 text-[#5EE7E4]">
                              <Check className="h-3.5 w-3.5" />
                            </div>
                            <span>Full support for PPPoE framed sessions & captive portals</span>
                          </li>
                          <li className="flex items-center gap-2.5">
                            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#5EE7E4]/10 text-[#5EE7E4]">
                              <Check className="h-3.5 w-3.5" />
                            </div>
                            <span>99.99% Cloud RADIUS Uptime SLA with automated failover</span>
                          </li>
                        </ul>
                        <div className="pt-2">
                          <InteractiveHoverButton
                            href="/contact"
                            variant="outline"
                            className="px-4 py-2 text-xs font-semibold"
                          >
                            Connect your MikroTik in 10 minutes
                          </InteractiveHoverButton>
                        </div>
                      </div>

                      {/* Right column: Interactive UI Preview */}
                      <Terminal
                        sequence={false}
                        className="rounded-2xl border-white/10 bg-[#0A0D14] shadow-2xl lg:col-span-7"
                        header={
                          <div className="flex items-center justify-between border-b border-white/10 bg-[#121620] px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                              <div className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                              <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                              <span className="ml-2 font-mono text-xs text-white/50">
                                Live PPPoE Sessions · MikroTik CCR1009
                              </span>
                            </div>
                            <span className="flex items-center gap-1.5 rounded bg-[#5EE7E4]/10 px-2 py-0.5 font-mono text-[11px] text-[#5EE7E4]">
                              <span className="h-1.5 w-1.5 animate-ping rounded-full bg-[#5EE7E4]" />
                              RADIUS Active
                            </span>
                          </div>
                        }
                      >
                        <AnimatedSpan delay={0} className="w-full">
                          <div className="grid grid-cols-4 border-b border-white/10 pb-2 text-[10px] tracking-wider text-white/40 uppercase">
                            <div>Subscriber</div>
                            <div>IP / NAS</div>
                            <div>Plan / Rate</div>
                            <div className="text-right">Session Uptime</div>
                          </div>
                        </AnimatedSpan>

                        <AnimatedSpan delay={300} className="w-full">
                          <div className="grid grid-cols-4 items-center rounded px-2 py-2 text-white transition-colors hover:bg-white/5">
                            <div className="flex items-center gap-1.5 font-semibold text-white">
                              <div className="h-2 w-2 rounded-full bg-emerald-400" />
                              sub_98412
                            </div>
                            <div className="text-white/70">10.40.12.84</div>
                            <div className="text-[#A78BFA]">100 Mbps (FUP)</div>
                            <div className="text-right text-[#5EE7E4]">14d 06h 22m</div>
                          </div>
                        </AnimatedSpan>

                        <AnimatedSpan delay={650} className="w-full">
                          <div className="grid grid-cols-4 items-center rounded px-2 py-2 text-white transition-colors hover:bg-white/5">
                            <div className="flex items-center gap-1.5 font-semibold text-white">
                              <div className="h-2 w-2 rounded-full bg-emerald-400" />
                              sub_98413
                            </div>
                            <div className="text-white/70">10.40.12.85</div>
                            <div className="text-[#A78BFA]">50 Mbps Unltd</div>
                            <div className="text-right text-[#5EE7E4]">02d 18h 40m</div>
                          </div>
                        </AnimatedSpan>

                        <AnimatedSpan delay={1000} className="w-full">
                          <div className="grid grid-cols-4 items-center rounded px-2 py-2 text-white transition-colors hover:bg-white/5">
                            <div className="flex items-center gap-1.5 font-semibold text-white">
                              <div className="h-2 w-2 rounded-full bg-emerald-400" />
                              sub_98414
                            </div>
                            <div className="text-white/70">10.40.12.86</div>
                            <div className="text-[#A78BFA]">300 Mbps Fiber</div>
                            <div className="text-right text-[#5EE7E4]">28d 11h 05m</div>
                          </div>
                        </AnimatedSpan>
                      </Terminal>
                    </div>
                  )}

                  {/* TAB 2: AUTOMATED BILLING */}
                  {activeTab === 'billing' && (
                    <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
                      <div className="space-y-6 lg:col-span-5">
                        <div className="inline-flex items-center gap-1.5 rounded-full border border-[#743CFF]/20 bg-[#743CFF]/10 px-3 py-1 text-xs font-semibold text-[#9061FF]">
                          Zero Manual Invoicing
                        </div>
                        <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                          Automated ISP Billing & GST Invoices
                        </h3>
                        <p className="text-sm leading-relaxed text-white/70 sm:text-base">
                          Auto-generate invoices, send WhatsApp renewal reminders, and accept UPI,
                          Razorpay & Stripe payments — all without manual intervention. Subscribers
                          renew before expiry without calling your support staff.
                        </p>
                        <ul className="space-y-3 text-sm text-white/80">
                          <li className="flex items-center gap-2.5">
                            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#743CFF]/10 text-[#9061FF]">
                              <Check className="h-3.5 w-3.5" />
                            </div>
                            <span>WhatsApp renewal dispatch 3 days before plan expiry</span>
                          </li>
                          <li className="flex items-center gap-2.5">
                            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#743CFF]/10 text-[#9061FF]">
                              <Check className="h-3.5 w-3.5" />
                            </div>
                            <span>Direct UPI Auto-Pay, QR code & Razorpay payment links</span>
                          </li>
                          <li className="flex items-center gap-2.5">
                            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#743CFF]/10 text-[#9061FF]">
                              <Check className="h-3.5 w-3.5" />
                            </div>
                            <span>Instant account renewal & RADIUS quota reset upon payment</span>
                          </li>
                        </ul>
                        <div className="pt-2">
                          <InteractiveHoverButton
                            href="/contact"
                            variant="outline"
                            className="px-4 py-2 text-xs font-semibold"
                          >
                            Explore automated billing
                          </InteractiveHoverButton>
                        </div>
                      </div>

                      {/* Right column: Enhanced Invoicing & WhatsApp Showcase */}
                      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0A0D14] p-5 shadow-2xl lg:col-span-7 space-y-4">
                        {/* KPI Bar */}
                        <div className="grid grid-cols-3 gap-2 border-b border-white/10 pb-3 text-center">
                          <div className="rounded-xl bg-white/[0.03] p-2.5">
                            <div className="text-xs text-white/40 font-mono">Monthly Collections</div>
                            <div className="text-sm sm:text-base font-bold text-white flex items-center justify-center gap-1 mt-0.5">
                              <DollarSign className="size-3.5 text-[#5EE7E4]" />
                              ₹8,45,000
                            </div>
                          </div>
                          <div className="rounded-xl bg-white/[0.03] p-2.5">
                            <div className="text-xs text-white/40 font-mono">Auto-Pay Rate</div>
                            <div className="text-sm sm:text-base font-bold text-emerald-400 flex items-center justify-center gap-1 mt-0.5">
                              <TrendingUp className="size-3.5 text-emerald-400" />
                              98.6%
                            </div>
                          </div>
                          <div className="rounded-xl bg-white/[0.03] p-2.5">
                            <div className="text-xs text-white/40 font-mono">Invoice Engine</div>
                            <div className="text-sm sm:text-base font-bold text-[#A78BFA] mt-0.5">
                              GST Ready
                            </div>
                          </div>
                        </div>

                        {/* WhatsApp Mock Card */}
                        <div className="mx-auto max-w-md space-y-3 rounded-2xl border border-white/10 bg-[#151C24] p-4.5 shadow-xl">
                          <div className="flex items-center gap-3 border-b border-white/10 pb-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                              <Send className="h-4 w-4" />
                            </div>
                            <div>
                              <div className="text-xs font-semibold text-white">
                                WhatsApp Business Alert
                              </div>
                              <div className="text-[11px] text-white/50">
                                Automated Dispatch · 3 Days to Expiry
                              </div>
                            </div>
                          </div>
                          <div className="space-y-2 rounded-xl border border-white/5 bg-[#0C1217] p-3 text-xs text-white/80">
                            <p className="font-medium text-white">Hello Rajesh Kumar,</p>
                            <p>Your 100 Mbps Fiber Broadband plan expires in 3 days on 28th Sep.</p>
                            <p className="font-semibold text-[#5EE7E4]">
                              Amount Due: ₹799 (incl. 18% GST)
                            </p>
                            <div className="pt-1.5">
                              <div className="w-full cursor-pointer rounded-lg bg-emerald-600 py-2 text-center font-semibold text-white transition-colors hover:bg-emerald-500">
                                Pay via UPI (GPay / PhonePe / Paytm)
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between pt-1 text-[11px] text-white/50">
                            <span className="flex items-center gap-1 text-emerald-400">
                              <Check className="h-3 w-3" /> Delivered
                            </span>
                            <span>Automated by Unify Wi-Fi</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 3: BANDWIDTH & FUP ENGINE */}
                  {activeTab === 'fup' && (
                    <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
                      <div className="space-y-6 lg:col-span-5">
                        <div className="inline-flex items-center gap-1.5 rounded-full border border-[#5EE7E4]/20 bg-[#5EE7E4]/10 px-3 py-1 text-xs font-semibold text-[#5EE7E4]">
                          Zero-Disconnect Throttling
                        </div>
                        <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                          Bandwidth & Fair Usage Policy (FUP) Engine
                        </h3>
                        <p className="text-sm leading-relaxed text-white/70 sm:text-base">
                          Set per-subscriber speed limits, data caps, and dynamic Fair Usage Policy
                          throttling directly from the dashboard. Unify uses standard RADIUS CoA
                          (Change of Authorization) to adjust speeds in real time without dropping
                          active sessions.
                        </p>
                        <ul className="space-y-3 text-sm text-white/80">
                          <li className="flex items-center gap-2.5">
                            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#5EE7E4]/10 text-[#5EE7E4]">
                              <Check className="h-3.5 w-3.5" />
                            </div>
                            <span>CoA-based live bandwidth adjustment on MikroTik</span>
                          </li>
                          <li className="flex items-center gap-2.5">
                            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#5EE7E4]/10 text-[#5EE7E4]">
                              <Check className="h-3.5 w-3.5" />
                            </div>
                            <span>Daily & monthly quotas with automatic speed reduction</span>
                          </li>
                          <li className="flex items-center gap-2.5">
                            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#5EE7E4]/10 text-[#5EE7E4]">
                              <Check className="h-3.5 w-3.5" />
                            </div>
                            <span>No MikroTik scripting or queue tree management required</span>
                          </li>
                        </ul>
                        <div className="pt-2">
                          <InteractiveHoverButton
                            href="/contact"
                            variant="outline"
                            className="px-4 py-2 text-xs font-semibold"
                          >
                            Set up CoA throttling
                          </InteractiveHoverButton>
                        </div>
                      </div>

                      {/* Right column: Enhanced FUP Speed Regulator Showcase */}
                      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0A0D14] p-5 shadow-2xl lg:col-span-7 space-y-3.5">
                        {/* Live Queue Header */}
                        <div className="flex items-center justify-between border-b border-white/10 pb-2.5 text-xs text-white/60">
                          <div className="flex items-center gap-2">
                            <Activity className="size-3.5 text-[#5EE7E4] animate-pulse" />
                            <span className="font-mono text-white/80">MikroTik Simple Queue Status</span>
                          </div>
                          <span className="rounded bg-emerald-400/10 px-2 py-0.5 text-[10px] font-mono text-emerald-400">
                            Queue Active
                          </span>
                        </div>

                        <div className="rounded-xl border border-white/10 bg-[#141A24] p-3.5">
                          <div className="mb-2 flex items-center justify-between text-xs text-white/60">
                            <span>Base Plan Speed Provisioned</span>
                            <span className="text-sm font-bold text-white">
                              100 Mbps (Tx / Rx)
                            </span>
                          </div>
                          <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                            <div className="h-full w-full bg-gradient-to-r from-[#5EE7E4] to-[#743CFF]" />
                          </div>
                        </div>

                        <div className="rounded-xl border border-white/10 bg-[#141A24] p-3.5">
                          <div className="mb-2 flex items-center justify-between text-xs text-white/60">
                            <span>Monthly Data Quota Used</span>
                            <span className="text-sm font-bold text-amber-400">
                              502 GB / 500 GB (FUP Cap Hit)
                            </span>
                          </div>
                          <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                            <div className="h-full w-full bg-amber-400" />
                          </div>
                        </div>

                        <div className="flex items-center justify-between rounded-xl border border-[#743CFF]/30 bg-[#1E162A] p-3.5">
                          <div className="flex items-center gap-2.5">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#743CFF]/20 text-[#9061FF]">
                              <Sliders className="h-4 w-4" />
                            </div>
                            <div>
                              <div className="text-xs font-semibold text-white">
                                Dynamic CoA Trigger Engaged
                              </div>
                              <div className="text-[11px] text-white/50">
                                Speed throttled to 10 Mbps · Session Kept Alive
                              </div>
                            </div>
                          </div>
                          <span className="rounded bg-[#5EE7E4]/10 px-2.5 py-1 font-mono text-[11px] text-[#5EE7E4]">
                            Zero Disconnect
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 4: WHITE-LABEL RESELLER PORTAL */}
                  {activeTab === 'reseller' && (
                    <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
                      <div className="space-y-6 lg:col-span-5">
                        <div className="inline-flex items-center gap-1.5 rounded-full border border-[#743CFF]/20 bg-[#743CFF]/10 px-3 py-1 text-xs font-semibold text-[#9061FF]">
                          Multi-Tenant LCO Architecture
                        </div>
                        <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                          White-Label Reseller & LCO Portal
                        </h3>
                        <p className="text-sm leading-relaxed text-white/70 sm:text-base">
                          Give your LCO partners their own branded dashboard, subscriber management,
                          and billing under their own domain — fully isolated. Expand your network
                          coverage without taking on the operational overhead of retail subscriber
                          collection.
                        </p>
                        <ul className="space-y-3 text-sm text-white/80">
                          <li className="flex items-center gap-2.5">
                            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#743CFF]/10 text-[#9061FF]">
                              <Check className="h-3.5 w-3.5" />
                            </div>
                            <span>Custom domain & branded portal for each LCO partner</span>
                          </li>
                          <li className="flex items-center gap-2.5">
                            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#743CFF]/10 text-[#9061FF]">
                              <Check className="h-3.5 w-3.5" />
                            </div>
                            <span>Isolated subscriber database and collection reports</span>
                          </li>
                          <li className="flex items-center gap-2.5">
                            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#743CFF]/10 text-[#9061FF]">
                              <Check className="h-3.5 w-3.5" />
                            </div>
                            <span>LCOs never see your main infrastructure credentials</span>
                          </li>
                        </ul>
                        <div className="pt-2">
                          <InteractiveHoverButton
                            href="/contact"
                            variant="outline"
                            className="px-4 py-2 text-xs font-semibold"
                          >
                            Launch reseller portal
                          </InteractiveHoverButton>
                        </div>
                      </div>

                      {/* Right column: Enhanced Multi-tenant Reseller Showcase */}
                      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0A0D14] p-5 shadow-2xl lg:col-span-7 space-y-3">
                        {/* Master Tenant Overview Strip */}
                        <div className="flex items-center justify-between border-b border-white/10 pb-2.5 text-xs text-white/60">
                          <div className="flex items-center gap-2">
                            <Users className="size-3.5 text-[#743CFF]" />
                            <span className="font-mono text-white/80">Master NOC Account: 3 Active LCO Partners</span>
                          </div>
                          <span className="font-mono text-[11px] text-[#5EE7E4]">1,620 Total Subs</span>
                        </div>

                        {/* LCO 1 Card */}
                        <div className="flex items-center justify-between rounded-xl border border-white/10 bg-[#141A24] p-3 transition-colors hover:border-white/20">
                          <div className="flex items-center gap-2.5">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#5EE7E4]/10 text-xs font-bold text-[#5EE7E4]">
                              LCO 1
                            </div>
                            <div>
                              <div className="text-xs font-semibold text-white">
                                City Cable & Broadband
                              </div>
                              <div className="text-[11px] text-white/50">
                                portal.citycable.in · 420 Subscribers
                              </div>
                            </div>
                          </div>
                          <span className="rounded bg-emerald-400/10 px-2 py-0.5 font-mono text-[11px] text-emerald-400">
                            Active
                          </span>
                        </div>

                        {/* LCO 2 Card */}
                        <div className="flex items-center justify-between rounded-xl border border-white/10 bg-[#141A24] p-3 transition-colors hover:border-white/20">
                          <div className="flex items-center gap-2.5">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#743CFF]/10 text-xs font-bold text-[#9061FF]">
                              LCO 2
                            </div>
                            <div>
                              <div className="text-xs font-semibold text-white">
                                Apex Digital Networks
                              </div>
                              <div className="text-[11px] text-white/50">
                                billing.apexdigital.com · 890 Subscribers
                              </div>
                            </div>
                          </div>
                          <span className="rounded bg-emerald-400/10 px-2 py-0.5 font-mono text-[11px] text-emerald-400">
                            Active
                          </span>
                        </div>

                        {/* LCO 3 Card */}
                        <div className="flex items-center justify-between rounded-xl border border-white/10 bg-[#141A24] p-3 transition-colors hover:border-white/20">
                          <div className="flex items-center gap-2.5">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#C084FC]/10 text-xs font-bold text-[#C084FC]">
                              LCO 3
                            </div>
                            <div>
                              <div className="text-xs font-semibold text-white">
                                Metro Fiber Link
                              </div>
                              <div className="text-[11px] text-white/50">
                                metro.unify.in · 310 Subscribers
                              </div>
                            </div>
                          </div>
                          <span className="rounded bg-emerald-400/10 px-2 py-0.5 font-mono text-[11px] text-emerald-400">
                            Active
                          </span>
                        </div>

                        {/* Settlement Strip */}
                        <div className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-2.5 text-[11px] text-white/50">
                          <div className="flex items-center gap-1.5">
                            <Wallet className="size-3 text-emerald-400" />
                            <span>Partner Wallet Settlement: <strong className="text-white">₹3,18,400 Disbursed</strong></span>
                          </div>
                          <span className="text-[#5EE7E4] font-semibold">Automated UPI</span>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
