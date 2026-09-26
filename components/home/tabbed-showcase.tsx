'use client'

import { useState } from 'react'
import { ShieldCheck, ReceiptText, Gauge, Building2, Check, Send, Sliders } from 'lucide-react'
import { AnimatedSpan, Terminal } from '@/registry/magicui/terminal'
import { InteractiveHoverButton } from '@/registry/magicui/interactive-hover-button'

export function TabbedShowcase() {
  const [activeTab, setActiveTab] = useState<'radius' | 'billing' | 'fup' | 'reseller'>('radius')

  return (
    <section id="tabs-showcase" className="relative z-10 py-24">
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
        <div className="mx-auto mb-3 grid max-w-4xl grid-cols-2 text-xs font-medium tracking-wider uppercase">
          <div className="border-l-2 border-[#5EE7E4] pl-4 text-white/50">
            For Network Engineers
          </div>
          <div className="border-l-2 border-[#743CFF] pl-4 text-white/50">
            For ISP Business Owners
          </div>
        </div>

        {/* 4-Tab Button Bar */}
        <div className="mx-auto mb-12 grid max-w-4xl grid-cols-2 gap-2 rounded-2xl border border-white/10 bg-[#121620] p-1.5 shadow-xl md:grid-cols-4">
          <button
            onClick={() => setActiveTab('radius')}
            className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-xs font-semibold transition-all sm:text-sm ${
              activeTab === 'radius'
                ? 'border border-b-2 border-white/10 border-b-[#5EE7E4] bg-[#1D2230] text-white shadow-md'
                : 'text-white/60 hover:bg-white/5 hover:text-white'
            }`}
          >
            <ShieldCheck
              className={`h-4 w-4 ${activeTab === 'radius' ? 'text-[#5EE7E4]' : 'text-white/40'}`}
            />
            <span>Cloud RADIUS</span>
          </button>

          <button
            onClick={() => setActiveTab('billing')}
            className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-xs font-semibold transition-all sm:text-sm ${
              activeTab === 'billing'
                ? 'border border-b-2 border-white/10 border-b-[#743CFF] bg-[#1D2230] text-white shadow-md'
                : 'text-white/60 hover:bg-white/5 hover:text-white'
            }`}
          >
            <ReceiptText
              className={`h-4 w-4 ${activeTab === 'billing' ? 'text-[#743CFF]' : 'text-white/40'}`}
            />
            <span>Automated Billing</span>
          </button>

          <button
            onClick={() => setActiveTab('fup')}
            className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-xs font-semibold transition-all sm:text-sm ${
              activeTab === 'fup'
                ? 'border border-b-2 border-white/10 border-b-[#5EE7E4] bg-[#1D2230] text-white shadow-md'
                : 'text-white/60 hover:bg-white/5 hover:text-white'
            }`}
          >
            <Gauge
              className={`h-4 w-4 ${activeTab === 'fup' ? 'text-[#5EE7E4]' : 'text-white/40'}`}
            />
            <span>Bandwidth & FUP</span>
          </button>

          <button
            onClick={() => setActiveTab('reseller')}
            className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-xs font-semibold transition-all sm:text-sm ${
              activeTab === 'reseller'
                ? 'border border-b-2 border-white/10 border-b-[#743CFF] bg-[#1D2230] text-white shadow-md'
                : 'text-white/60 hover:bg-white/5 hover:text-white'
            }`}
          >
            <Building2
              className={`h-4 w-4 ${activeTab === 'reseller' ? 'text-[#743CFF]' : 'text-white/40'}`}
            />
            <span>Reseller Portal</span>
          </button>
        </div>

        {/* 2-Column Tab Content Stage */}
        <div className="rounded-3xl border border-white/10 bg-[#121622]/80 p-6 shadow-2xl backdrop-blur-xl sm:p-10">
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
                  Authenticate every PPPoE and Hotspot session through a geo-redundant cloud RADIUS
                  cluster. No on-premise Linux servers, power backups, or manual FreeRADIUS
                  configurations needed.
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
                  Auto-generate invoices, send WhatsApp renewal reminders, and accept UPI, Razorpay
                  & Stripe payments — all without manual intervention. Subscribers renew before
                  expiry without calling your support staff.
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
              </div>

              {/* Right column: WhatsApp + Invoice Mock */}
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0A0D14] p-6 shadow-2xl lg:col-span-7">
                <div className="mx-auto max-w-md space-y-4 rounded-2xl border border-white/10 bg-[#151C24] p-5 shadow-xl">
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
                  <div className="space-y-2 rounded-xl border border-white/5 bg-[#0C1217] p-3.5 text-xs text-white/80">
                    <p className="font-medium text-white">Hello Rajesh Kumar,</p>
                    <p>Your 100 Mbps Fiber Broadband plan expires in 3 days on 28th Sep.</p>
                    <p className="font-semibold text-[#5EE7E4]">Amount Due: ₹799 (incl. GST)</p>
                    <div className="pt-2">
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
                  throttling directly from the dashboard. Unify uses standard RADIUS CoA (Change of
                  Authorization) to adjust speeds in real time without dropping active sessions.
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
              </div>

              {/* Right column: FUP Speed Regulator Mock */}
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0A0D14] p-6 shadow-2xl lg:col-span-7">
                <div className="mx-auto max-w-md space-y-4">
                  <div className="rounded-xl border border-white/10 bg-[#141A24] p-4">
                    <div className="mb-2 flex items-center justify-between text-xs text-white/60">
                      <span>Base Plan Speed</span>
                      <span className="text-sm font-bold text-white">100 Mbps (Tx / Rx)</span>
                    </div>
                    <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/10">
                      <div className="h-full w-full bg-gradient-to-r from-[#5EE7E4] to-[#743CFF]" />
                    </div>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-[#141A24] p-4">
                    <div className="mb-2 flex items-center justify-between text-xs text-white/60">
                      <span>Monthly Data Quota Used</span>
                      <span className="text-sm font-bold text-amber-400">
                        502 GB / 500 GB (Cap Hit)
                      </span>
                    </div>
                    <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/10">
                      <div className="h-full w-full bg-amber-400" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between rounded-xl border border-[#743CFF]/30 bg-[#1E162A] p-4">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#743CFF]/20 text-[#9061FF]">
                        <Sliders className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-white">Dynamic CoA Active</div>
                        <div className="text-[11px] text-white/50">
                          Throttled to 10 Mbps · Session Kept Alive
                        </div>
                      </div>
                    </div>
                    <span className="rounded bg-[#5EE7E4]/10 px-2 py-1 font-mono text-[11px] text-[#5EE7E4]">
                      Zero Disconnect
                    </span>
                  </div>
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
                  Give your LCO partners their own branded dashboard, subscriber management, and
                  billing under their own domain — fully isolated. Expand your network coverage
                  without taking on the operational overhead of retail subscriber collection.
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
              </div>

              {/* Right column: Multi-tenant LCO preview */}
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0A0D14] p-6 shadow-2xl lg:col-span-7">
                <div className="mx-auto max-w-md space-y-3">
                  <div className="flex items-center justify-between rounded-xl border border-white/10 bg-[#141A24] p-3.5">
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

                  <div className="flex items-center justify-between rounded-xl border border-white/10 bg-[#141A24] p-3.5">
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
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
