'use client'

import { useState } from 'react'
import { 
  ShieldCheck, 
  ReceiptText, 
  Gauge, 
  Building2, 
  Check, 
  Send, 
  Sliders 
} from 'lucide-react'
import {
  AnimatedSpan,
  Terminal,
} from '@/registry/magicui/terminal'
import { InteractiveHoverButton } from '@/registry/magicui/interactive-hover-button'

export function TabbedShowcase() {
  const [activeTab, setActiveTab] = useState<'radius' | 'billing' | 'fup' | 'reseller'>('radius')

  return (
    <section id="tabs-showcase" className="py-24 relative z-10">
      {/* Background glow — oversized to bleed beyond this section */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[700px] bg-[#743CFF]/[0.08] blur-[180px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-[#5EE7E4] tracking-wider uppercase mb-4">
            Unified Core Platform
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Four core capabilities. One seamless cloud engine.
          </h2>
          <p className="text-white/60 text-base sm:text-lg">
            Everything your ISP needs to authenticate, bill, and scale — hosted in the cloud, connected to the MikroTik hardware you already operate.
          </p>
        </div>

        {/* Tab category indicator lines */}
        <div className="grid grid-cols-2 max-w-4xl mx-auto mb-3 text-xs font-medium tracking-wider uppercase">
          <div className="text-white/50 pl-4 border-l-2 border-[#5EE7E4]">
            For Network Engineers
          </div>
          <div className="text-white/50 pl-4 border-l-2 border-[#743CFF]">
            For ISP Business Owners
          </div>
        </div>

        {/* 4-Tab Button Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 p-1.5 rounded-2xl bg-[#121620] border border-white/10 max-w-4xl mx-auto mb-12 shadow-xl">
          <button
            onClick={() => setActiveTab('radius')}
            className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'radius'
                ? 'bg-[#1D2230] text-white shadow-md border border-white/10 border-b-2 border-b-[#5EE7E4]'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <ShieldCheck className={`w-4 h-4 ${activeTab === 'radius' ? 'text-[#5EE7E4]' : 'text-white/40'}`} />
            <span>Cloud RADIUS</span>
          </button>

          <button
            onClick={() => setActiveTab('billing')}
            className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'billing'
                ? 'bg-[#1D2230] text-white shadow-md border border-white/10 border-b-2 border-b-[#743CFF]'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <ReceiptText className={`w-4 h-4 ${activeTab === 'billing' ? 'text-[#743CFF]' : 'text-white/40'}`} />
            <span>Automated Billing</span>
          </button>

          <button
            onClick={() => setActiveTab('fup')}
            className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'fup'
                ? 'bg-[#1D2230] text-white shadow-md border border-white/10 border-b-2 border-b-[#5EE7E4]'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <Gauge className={`w-4 h-4 ${activeTab === 'fup' ? 'text-[#5EE7E4]' : 'text-white/40'}`} />
            <span>Bandwidth & FUP</span>
          </button>

          <button
            onClick={() => setActiveTab('reseller')}
            className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'reseller'
                ? 'bg-[#1D2230] text-white shadow-md border border-white/10 border-b-2 border-b-[#743CFF]'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <Building2 className={`w-4 h-4 ${activeTab === 'reseller' ? 'text-[#743CFF]' : 'text-white/40'}`} />
            <span>Reseller Portal</span>
          </button>
        </div>

        {/* 2-Column Tab Content Stage */}
        <div className="rounded-3xl border border-white/10 bg-[#121622]/80 backdrop-blur-xl p-6 sm:p-10 shadow-2xl">
          {/* TAB 1: CLOUD RADIUS */}
          {activeTab === 'radius' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-6">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#5EE7E4]/10 border border-[#5EE7E4]/20 text-xs font-semibold text-[#5EE7E4]">
                  Geo-Redundant AAA Cluster
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  High-Availability Cloud RADIUS & AAA
                </h3>
                <p className="text-white/70 text-sm sm:text-base leading-relaxed">
                  Authenticate every PPPoE and Hotspot session through a geo-redundant cloud RADIUS cluster. No on-premise Linux servers, power backups, or manual FreeRADIUS configurations needed.
                </p>
                <ul className="space-y-3 text-sm text-white/80">
                  <li className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-[#5EE7E4]/10 flex items-center justify-center text-[#5EE7E4]">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>Sub-15ms RADIUS authentication response time</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-[#5EE7E4]/10 flex items-center justify-center text-[#5EE7E4]">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>Full support for PPPoE framed sessions & captive portals</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-[#5EE7E4]/10 flex items-center justify-center text-[#5EE7E4]">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>99.99% Cloud RADIUS Uptime SLA with automated failover</span>
                  </li>
                </ul>
                <div className="pt-2">
                  <InteractiveHoverButton
                    href="/contact"
                    variant="outline"
                    className="text-xs font-semibold px-4 py-2"
                  >
                    Connect your MikroTik in 10 minutes
                  </InteractiveHoverButton>
                </div>
              </div>

              {/* Right column: Interactive UI Preview */}
              <Terminal
                sequence={false}
                className="lg:col-span-7 rounded-2xl border-white/10 bg-[#0A0D14] shadow-2xl"
                header={
                  <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#121620]">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                      <span className="text-xs font-mono text-white/50 ml-2">Live PPPoE Sessions · MikroTik CCR1009</span>
                    </div>
                    <span className="flex items-center gap-1.5 text-[11px] font-mono text-[#5EE7E4] bg-[#5EE7E4]/10 px-2 py-0.5 rounded">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#5EE7E4] animate-ping" />
                      RADIUS Active
                    </span>
                  </div>
                }
              >
                <AnimatedSpan delay={0} className="w-full">
                  <div className="grid grid-cols-4 pb-2 border-b border-white/10 text-white/40 uppercase tracking-wider text-[10px]">
                    <div>Subscriber</div>
                    <div>IP / NAS</div>
                    <div>Plan / Rate</div>
                    <div className="text-right">Session Uptime</div>
                  </div>
                </AnimatedSpan>

                <AnimatedSpan delay={300} className="w-full">
                  <div className="grid grid-cols-4 py-2 text-white items-center hover:bg-white/5 px-2 rounded transition-colors">
                    <div className="font-semibold text-white flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-emerald-400" />
                      sub_98412
                    </div>
                    <div className="text-white/70">10.40.12.84</div>
                    <div className="text-[#A78BFA]">100 Mbps (FUP)</div>
                    <div className="text-right text-[#5EE7E4]">14d 06h 22m</div>
                  </div>
                </AnimatedSpan>

                <AnimatedSpan delay={650} className="w-full">
                  <div className="grid grid-cols-4 py-2 text-white items-center hover:bg-white/5 px-2 rounded transition-colors">
                    <div className="font-semibold text-white flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-emerald-400" />
                      sub_98413
                    </div>
                    <div className="text-white/70">10.40.12.85</div>
                    <div className="text-[#A78BFA]">50 Mbps Unltd</div>
                    <div className="text-right text-[#5EE7E4]">02d 18h 40m</div>
                  </div>
                </AnimatedSpan>

                <AnimatedSpan delay={1000} className="w-full">
                  <div className="grid grid-cols-4 py-2 text-white items-center hover:bg-white/5 px-2 rounded transition-colors">
                    <div className="font-semibold text-white flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-emerald-400" />
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
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-6">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#743CFF]/10 border border-[#743CFF]/20 text-xs font-semibold text-[#9061FF]">
                  Zero Manual Invoicing
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Automated ISP Billing & GST Invoices
                </h3>
                <p className="text-white/70 text-sm sm:text-base leading-relaxed">
                  Auto-generate invoices, send WhatsApp renewal reminders, and accept UPI, Razorpay & Stripe payments — all without manual intervention. Subscribers renew before expiry without calling your support staff.
                </p>
                <ul className="space-y-3 text-sm text-white/80">
                  <li className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-[#743CFF]/10 flex items-center justify-center text-[#9061FF]">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>WhatsApp renewal dispatch 3 days before plan expiry</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-[#743CFF]/10 flex items-center justify-center text-[#9061FF]">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>Direct UPI Auto-Pay, QR code & Razorpay payment links</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-[#743CFF]/10 flex items-center justify-center text-[#9061FF]">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>Instant account renewal & RADIUS quota reset upon payment</span>
                  </li>
                </ul>
              </div>

              {/* Right column: WhatsApp + Invoice Mock */}
              <div className="lg:col-span-7 rounded-2xl border border-white/10 bg-[#0A0D14] overflow-hidden shadow-2xl p-6">
                <div className="max-w-md mx-auto rounded-2xl bg-[#151C24] border border-white/10 p-5 space-y-4 shadow-xl">
                  <div className="flex items-center gap-3 pb-3 border-b border-white/10">
                    <div className="w-9 h-9 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                      <Send className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white">WhatsApp Business Alert</div>
                      <div className="text-[11px] text-white/50">Automated Dispatch · 3 Days to Expiry</div>
                    </div>
                  </div>
                  <div className="bg-[#0C1217] p-3.5 rounded-xl text-xs space-y-2 text-white/80 border border-white/5">
                    <p className="text-white font-medium">Hello Rajesh Kumar,</p>
                    <p>Your 100 Mbps Fiber Broadband plan expires in 3 days on 28th Sep.</p>
                    <p className="text-[#5EE7E4] font-semibold">Amount Due: ₹799 (incl. GST)</p>
                    <div className="pt-2">
                      <div className="w-full text-center py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold cursor-pointer transition-colors">
                        Pay via UPI (GPay / PhonePe / Paytm)
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-white/50 pt-1">
                    <span className="flex items-center gap-1 text-emerald-400">
                      <Check className="w-3 h-3" /> Delivered
                    </span>
                    <span>Automated by Unify Wi-Fi</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: BANDWIDTH & FUP ENGINE */}
          {activeTab === 'fup' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-6">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#5EE7E4]/10 border border-[#5EE7E4]/20 text-xs font-semibold text-[#5EE7E4]">
                  Zero-Disconnect Throttling
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Bandwidth & Fair Usage Policy (FUP) Engine
                </h3>
                <p className="text-white/70 text-sm sm:text-base leading-relaxed">
                  Set per-subscriber speed limits, data caps, and dynamic Fair Usage Policy throttling directly from the dashboard. Unify uses standard RADIUS CoA (Change of Authorization) to adjust speeds in real time without dropping active sessions.
                </p>
                <ul className="space-y-3 text-sm text-white/80">
                  <li className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-[#5EE7E4]/10 flex items-center justify-center text-[#5EE7E4]">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>CoA-based live bandwidth adjustment on MikroTik</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-[#5EE7E4]/10 flex items-center justify-center text-[#5EE7E4]">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>Daily & monthly quotas with automatic speed reduction</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-[#5EE7E4]/10 flex items-center justify-center text-[#5EE7E4]">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>No MikroTik scripting or queue tree management required</span>
                  </li>
                </ul>
              </div>

              {/* Right column: FUP Speed Regulator Mock */}
              <div className="lg:col-span-7 rounded-2xl border border-white/10 bg-[#0A0D14] overflow-hidden shadow-2xl p-6">
                <div className="max-w-md mx-auto space-y-4">
                  <div className="p-4 rounded-xl bg-[#141A24] border border-white/10">
                    <div className="flex justify-between items-center text-xs text-white/60 mb-2">
                      <span>Base Plan Speed</span>
                      <span className="text-white font-bold text-sm">100 Mbps (Tx / Rx)</span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-white/10 overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-r from-[#5EE7E4] to-[#743CFF]" />
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#141A24] border border-white/10">
                    <div className="flex justify-between items-center text-xs text-white/60 mb-2">
                      <span>Monthly Data Quota Used</span>
                      <span className="text-amber-400 font-bold text-sm">502 GB / 500 GB (Cap Hit)</span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-white/10 overflow-hidden">
                      <div className="w-full h-full bg-amber-400" />
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#1E162A] border border-[#743CFF]/30 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#743CFF]/20 flex items-center justify-center text-[#9061FF]">
                        <Sliders className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-white">Dynamic CoA Active</div>
                        <div className="text-[11px] text-white/50">Throttled to 10 Mbps · Session Kept Alive</div>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono text-[#5EE7E4] bg-[#5EE7E4]/10 px-2 py-1 rounded">
                      Zero Disconnect
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: WHITE-LABEL RESELLER PORTAL */}
          {activeTab === 'reseller' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-6">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#743CFF]/10 border border-[#743CFF]/20 text-xs font-semibold text-[#9061FF]">
                  Multi-Tenant LCO Architecture
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  White-Label Reseller & LCO Portal
                </h3>
                <p className="text-white/70 text-sm sm:text-base leading-relaxed">
                  Give your LCO partners their own branded dashboard, subscriber management, and billing under their own domain — fully isolated. Expand your network coverage without taking on the operational overhead of retail subscriber collection.
                </p>
                <ul className="space-y-3 text-sm text-white/80">
                  <li className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-[#743CFF]/10 flex items-center justify-center text-[#9061FF]">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>Custom domain & branded portal for each LCO partner</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-[#743CFF]/10 flex items-center justify-center text-[#9061FF]">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>Isolated subscriber database and collection reports</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-[#743CFF]/10 flex items-center justify-center text-[#9061FF]">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>LCOs never see your main infrastructure credentials</span>
                  </li>
                </ul>
              </div>

              {/* Right column: Multi-tenant LCO preview */}
              <div className="lg:col-span-7 rounded-2xl border border-white/10 bg-[#0A0D14] overflow-hidden shadow-2xl p-6">
                <div className="max-w-md mx-auto space-y-3">
                  <div className="p-3.5 rounded-xl bg-[#141A24] border border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#5EE7E4]/10 text-[#5EE7E4] flex items-center justify-center font-bold text-xs">
                        LCO 1
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-white">City Cable & Broadband</div>
                        <div className="text-[11px] text-white/50">portal.citycable.in · 420 Subscribers</div>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded">
                      Active
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#141A24] border border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#743CFF]/10 text-[#9061FF] flex items-center justify-center font-bold text-xs">
                        LCO 2
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-white">Apex Digital Networks</div>
                        <div className="text-[11px] text-white/50">billing.apexdigital.com · 890 Subscribers</div>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded">
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
