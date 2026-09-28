'use client'

import React from 'react'
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion'
import {
  Building2,
  Server,
  ShieldCheck,
  Mail,
  MessageSquare,
  ArrowRight,
  ExternalLink,
  Zap,
  Globe,
  Radio,
  Clock,
  Phone,
} from 'lucide-react'
import { NoiseTexture } from '@/registry/magicui/noise-texture'
import { InteractiveHoverButton } from '@/registry/magicui/interactive-hover-button'

function SpotlightCard({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-[#0D0F17]/85 backdrop-blur-2xl transition-all duration-300 hover:border-white/20 hover:shadow-2xl hover:shadow-violet-950/30 ${className}`}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              500px circle at ${mouseX}px ${mouseY}px,
              rgba(94, 231, 228, 0.12),
              rgba(116, 60, 255, 0.08),
              transparent 80%
            )
          `,
        }}
      />
      <NoiseTexture className="opacity-20 pointer-events-none" />
      {children}
    </div>
  )
}

export function AboutSection() {
  return (
    <section id="about" className="relative z-10 py-24 sm:py-32 scroll-mt-20">
      {/* Background ambient light */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full bg-gradient-to-r from-[#743CFF]/15 via-[#5EE7E4]/10 to-transparent blur-[140px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1 text-xs font-semibold tracking-wider text-[#5EE7E4] uppercase backdrop-blur-md mb-6 shadow-[0_0_20px_rgba(94,231,228,0.15)]">
            <span className="size-2 rounded-full bg-[#5EE7E4] animate-pulse" />
            About The Company & Platform
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl leading-tight sm:leading-tight mb-6">
            Built & Engineered by{' '}
            <span className="bg-gradient-to-r from-[#5EE7E4] via-[#743CFF] to-[#C084FC] bg-clip-text text-transparent">
              TheWiFy Technologies
            </span>
          </h2>

          <p className="text-base sm:text-lg leading-relaxed text-white/60">
            Unify Wi-Fi is the dedicated cloud networking division of{' '}
            <strong className="text-white font-semibold">TheWiFy Technologies Private Limited</strong>.
            We build carrier-grade cloud RADIUS, captive portal engines, and autonomous billing automation
            for network operators, WISPs, and multi-location venues across India.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid gap-6 lg:grid-cols-12 items-stretch">
          {/* Card 1 (Left 7-col Wide Hero Bento) */}
          <div className="lg:col-span-7 flex flex-col">
            <SpotlightCard className="h-full p-8 sm:p-10 flex flex-col justify-between border-white/15 bg-gradient-to-br from-[#0D0F17]/95 via-[#121524]/90 to-[#0D0F17]/95">
              <div className="relative z-20 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#743CFF] to-[#5EE7E4] shadow-lg shadow-[#743CFF]/30">
                    <Radio className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">
                      TheWiFy Engineering Philosophy
                    </h3>
                    <p className="text-xs text-[#5EE7E4] font-medium tracking-wide">
                      Cloud-Native • Zero Lock-In • Operator Centric
                    </p>
                  </div>
                </div>

                <div className="space-y-4 text-sm sm:text-base leading-relaxed text-white/70">
                  <p>
                    <strong className="text-white">TheWiFy Technologies Private Limited</strong> was founded
                    with a focused mission: to rescue network operators from fragile on-premise Linux servers,
                    manual spreadsheets, and complex billing operations.
                  </p>
                  <p>
                    With <span className="text-white font-medium">Unify Wi-Fi</span>, we bring carrier-grade
                    cloud RADIUS AAA, automated UPI subscriber renewals, WhatsApp notifications, and bandwidth
                    throttling together into one cohesive platform —{' '}
                    <strong className="text-[#5EE7E4]">
                      without forcing you to replace the MikroTik hardware you already own and trust.
                    </strong>
                  </p>
                </div>

                {/* 4 Feature Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5 flex items-start gap-3">
                    <Server className="size-4.5 text-[#5EE7E4] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-white">100% Cloud Managed</h4>
                      <p className="text-[11px] text-white/50 leading-snug">No server maintenance, UPS backups, or MySQL replication headaches.</p>
                    </div>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5 flex items-start gap-3">
                    <ShieldCheck className="size-4.5 text-[#743CFF] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-white">Zero Hardware Lock-In</h4>
                      <p className="text-[11px] text-white/50 leading-snug">Works natively with RouterOS v6/v7, Ubiquiti, Cambium, and Cisco.</p>
                    </div>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5 flex items-start gap-3">
                    <Zap className="size-4.5 text-[#C084FC] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-white">Autonomous Billing</h4>
                      <p className="text-[11px] text-white/50 leading-snug">Automated UPI payment links, instant recharges, and GST invoices.</p>
                    </div>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5 flex items-start gap-3">
                    <Globe className="size-4.5 text-[#5EE7E4] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-white">Active Geo-Redundancy</h4>
                      <p className="text-[11px] text-white/50 leading-snug">Sub-second failover with 99.99% cloud uptime SLA across India.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Key Stats Strip */}
              <div className="relative z-20 mt-8 pt-6 border-t border-white/10 grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-xl sm:text-2xl font-extrabold text-[#5EE7E4]">99.99%</div>
                  <div className="text-[11px] text-white/50 uppercase tracking-wider font-medium">Cloud SLA</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-extrabold text-white">&lt; 10 min</div>
                  <div className="text-[11px] text-white/50 uppercase tracking-wider font-medium">RouterOS Setup</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-extrabold text-[#C084FC]">RFC 2865</div>
                  <div className="text-[11px] text-white/50 uppercase tracking-wider font-medium">Standard AAA</div>
                </div>
              </div>
            </SpotlightCard>
          </div>

          {/* Right Column (2 Stacked Cards - 5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Card 2: Business & Enterprise Sales */}
            <SpotlightCard className="p-7 sm:p-8 flex-1 border-white/15 bg-gradient-to-br from-[#0D0F17] to-[#121627]">
              <div className="relative z-20 flex flex-col h-full justify-between gap-5">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-[#5EE7E4] uppercase">
                      <Building2 className="size-3 text-[#5EE7E4]" />
                      Business & Sales
                    </span>
                    <span className="text-[11px] text-white/40">Direct Enterprise</span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2">
                    Partner with TheWiFy
                  </h3>
                  <p className="text-xs leading-relaxed text-white/60 mb-5">
                    Product enquiries, custom RADIUS integration, high-density venue deployments,
                    and wholesale ISP reseller packages.
                  </p>

                  <div className="space-y-2.5 text-xs text-white/70">
                    <a
                      href="mailto:sales@thewify.com"
                      className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 transition-all hover:bg-white/10 hover:text-white group"
                    >
                      <Mail className="size-4 text-[#5EE7E4]" />
                      <span className="font-semibold text-white">sales@thewify.com</span>
                      <ArrowRight className="size-3.5 ml-auto text-white/40 transition-transform group-hover:translate-x-1 group-hover:text-white" />
                    </a>

                    <a
                      href="tel:+918333963405"
                      className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 transition-all hover:bg-white/10 hover:text-white group"
                    >
                      <Phone className="size-4 text-[#743CFF]" />
                      <span className="font-semibold text-white">+91 83339 63405</span>
                      <span className="ml-auto text-[10px] text-white/40">Mon–Sat</span>
                    </a>
                  </div>
                </div>

                <div className="pt-2">
                  <InteractiveHoverButton
                    href="/contact"
                    className="w-full py-2.5 text-xs font-semibold text-center"
                  >
                    Schedule Enterprise Consultation
                  </InteractiveHoverButton>
                </div>
              </div>
            </SpotlightCard>

            {/* Card 3: Technical Operations & Support */}
            <SpotlightCard className="p-7 sm:p-8 flex-1 border-white/15 bg-gradient-to-br from-[#0D0F17] to-[#121627]">
              <div className="relative z-20 flex flex-col h-full justify-between gap-5">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-[#C084FC] uppercase">
                      <Clock className="size-3 text-[#C084FC]" />
                      Customer Support & NOC
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-mono">
                      <span className="size-1.5 rounded-full bg-emerald-400 animate-ping" />
                      Active
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2">
                    Network Operations Desk
                  </h3>
                  <p className="text-xs leading-relaxed text-white/60 mb-5">
                    Technical troubleshooting, RouterOS script assistance, CoA disconnect debugging,
                    and onboarding support for active network operators.
                  </p>

                  <div className="space-y-2.5 text-xs text-white/70">
                    <a
                      href="mailto:support@thewify.com"
                      className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 transition-all hover:bg-white/10 hover:text-white group"
                    >
                      <Mail className="size-4 text-[#C084FC]" />
                      <span className="font-semibold text-white">support@thewify.com</span>
                      <ArrowRight className="size-3.5 ml-auto text-white/40 transition-transform group-hover:translate-x-1 group-hover:text-white" />
                    </a>

                    <a
                      href="https://wa.me/918333963405"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-2.5 transition-all hover:bg-emerald-500/20 text-emerald-300 group"
                    >
                      <MessageSquare className="size-4 text-emerald-400" />
                      <span className="font-semibold">WhatsApp Desk: +91 83339 63405</span>
                      <ExternalLink className="size-3.5 ml-auto text-emerald-400" />
                    </a>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-[11px] text-white/40 border-t border-white/[0.06]">
                  <span>Emergency NOC Available 24/7</span>
                  <span>Avg reply: &lt; 15 min</span>
                </div>
              </div>
            </SpotlightCard>
          </div>
        </div>

        {/* Corporate Legal & Sister Brand Crosslink Banner */}
        <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <div className="flex items-center gap-3">
            <div className="size-2 rounded-full bg-[#5EE7E4]" />
            <div>
              <strong className="text-white">TheWiFy Technologies Private Limited</strong> • Registered in Hyderabad, India.
              <span className="hidden md:inline ml-2 text-white/40">Compliance: RFC 2865, RFC 3576, Telecom Data Privacy.</span>
            </div>
          </div>

          <a
            href="https://guestwifi.thewify.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-semibold text-[#5EE7E4] hover:text-white transition-colors shrink-0"
          >
            Explore TheWiFy Guest Wi-Fi Platform
            <ExternalLink className="size-3.5" />
          </a>
        </div>
      </div>
    </section>
  )
}
