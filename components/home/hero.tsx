'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Copy, Check, ShieldCheck, Activity, HelpCircle } from 'lucide-react'

import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from '@/registry/magicui/terminal'
import { AuroraText } from '@/registry/magicui/aurora-text'
import { InteractiveHoverButton } from '@/registry/magicui/interactive-hover-button'

export function HeroSection() {
  const [copied, setCopied] = useState(false)
  const [showInfoModal, setShowInfoModal] = useState(false)

  const routerCommand = `/radius add address=radius.thewify.com secret="unify_secret_key" service=ppp,hotspot timeout=3000ms authentication-port=1812 accounting-port=1813`

  const handleCopy = () => {
    navigator.clipboard.writeText(routerCommand)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 unify-hero-bg overflow-hidden">
      {/* Background radial glow orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-[#743CFF]/25 to-[#6C8DFF]/15 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] bg-[#5EE7E4]/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Glowing Announcement Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full unify-pill-badge mb-8 cursor-pointer group transition-all">
          <span className="w-2 h-2 rounded-full bg-[#5EE7E4] animate-pulse" />
          <span className="text-xs sm:text-sm font-medium text-white/90">
            Cloud RADIUS Platform · Built for ISPs & MikroTik Operators
          </span>
          <ArrowRight className="w-3.5 h-3.5 text-white/60 group-hover:translate-x-0.5 group-hover:text-white transition-all" />
        </div>

        {/* Display Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.1] mb-6">
          Your ISP.{' '}
          <AuroraText
            colors={['#6C8DFF', '#9061FF', '#C084FC', '#5EE7E4']}
            speed={1.2}
          >
            Unified.
          </AuroraText>{' '}
          In the Cloud.
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto font-normal leading-relaxed mb-10">
          Connect MikroTik in 10 minutes. Automate PPPoE & Hotspot billing. Manage every subscriber from one dashboard — no servers required.
        </p>

        {/* Dual Pill Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
          <InteractiveHoverButton
            href="/contact"
            variant="primary"
            className="px-7 py-3.5 text-base shadow-xl shadow-[#743CFF]/30 hover:shadow-[#743CFF]/50 hover:scale-105"
          >
            Book a demo
          </InteractiveHoverButton>

          <Link
            href="#tabs-showcase"
            className="px-7 py-3.5 rounded-full bg-white hover:bg-white/90 text-[#0D0F17] font-semibold text-base shadow-lg shadow-white/10 hover:scale-105 transition-all"
          >
            See how it works
          </Link>
        </div>

        {/* Micro Explainer Link */}
        <div className="mb-14">
          <button
            onClick={() => setShowInfoModal(!showInfoModal)}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-white/50 hover:text-white/80 transition-colors"
          >
            <HelpCircle className="w-3.5 h-3.5 text-[#5EE7E4]" />
            <span>What is a Cloud RADIUS platform?</span>
          </button>

          {showInfoModal && (
            <div className="mt-4 max-w-md mx-auto p-4 rounded-xl bg-[#151922]/95 border border-white/10 text-left text-xs text-white/80 shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-top-2">
              <p className="font-semibold text-white mb-1 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#5EE7E4]" />
                Cloud RADIUS vs On-Premise
              </p>
              <p className="text-white/70 leading-relaxed">
                Traditional ISPs run physical Linux servers with FreeRADIUS inside their office. Unify replaces that server with an enterprise geo-redundant cloud cluster. You point your MikroTik to Unify, and authentication, bandwidth rules, and billing sync automatically.
              </p>
            </div>
          )}
        </div>

        {/* Interactive Terminal / Quick Connect Stage */}
        <Terminal
          sequence={false}
          className="max-w-4xl mx-auto mb-16 shadow-2xl shadow-[#743CFF]/15 text-left"
          header={
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#0A0D14]/80">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FF5F56]/80" />
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]/80" />
                <div className="w-3 h-3 rounded-full bg-[#27C93F]/80" />
                <span className="text-xs font-mono text-white/40 ml-2">RouterOS v7 · RADIUS Configuration</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#5EE7E4]/10 border border-[#5EE7E4]/20 text-[11px] font-mono text-[#5EE7E4]">
                  <Activity className="w-3 h-3 animate-pulse" />
                  <span>Response: Sub-15ms</span>
                </div>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 text-xs text-white/60 hover:text-white bg-white/5 hover:bg-white/10 px-2.5 py-1 rounded transition-colors"
                  title="Copy MikroTik command"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-[#5EE7E4]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span className="font-mono text-[11px]">{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>
          }
        >
          <AnimatedSpan delay={0} className="text-white/40">
            # 1-step MikroTik RADIUS connection command:
          </AnimatedSpan>

          <div className="text-white font-medium flex items-start gap-2">
            <span className="text-[#5EE7E4] select-none">$</span>
            <TypingAnimation
              delay={500}
              duration={32}
              showCursor={true}
              className="text-[#A78BFA] leading-relaxed break-all font-mono"
            >
              {routerCommand}
            </TypingAnimation>
          </div>

          <AnimatedSpan delay={5200} className="pt-2">
            <div className="flex flex-wrap items-center gap-4 text-[11px] text-white/50 border-t border-white/5 pt-3">
              <span className="flex items-center gap-1 text-[#5EE7E4]">
                <Check className="w-3.5 h-3.5" /> 99.99% Cloud RADIUS Uptime SLA
              </span>
              <span className="flex items-center gap-1 text-white/70">
                <Check className="w-3.5 h-3.5 text-[#5EE7E4]" /> 10-Minute Zero-Downtime Setup
              </span>
              <span className="flex items-center gap-1 text-white/70">
                <Check className="w-3.5 h-3.5 text-[#5EE7E4]" /> Works on hEX, CCR, and CHR
              </span>
            </div>
          </AnimatedSpan>
        </Terminal>

        {/* Social Proof Bar (Monochrome logo ticker) */}
        <div className="pt-4 pb-2 border-t border-white/5">
          <p className="text-xs uppercase tracking-widest font-semibold text-white/40 mb-6">
            Trusted by 200+ ISPs and network operators across India & Southeast Asia
          </p>

          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 opacity-60 grayscale hover:grayscale-0 transition-all">
            <div className="flex items-center gap-2 text-white font-bold tracking-wider text-sm sm:text-base">
              <span className="text-lg">⚡</span> MIKROTIK ROUTEROS
            </div>
            <div className="flex items-center gap-2 text-white font-bold tracking-wider text-sm sm:text-base">
              <span className="text-lg">☁️</span> MIKROTIK CHR
            </div>
            <div className="flex items-center gap-2 text-white font-bold tracking-wider text-sm sm:text-base">
              <span className="text-lg">🔒</span> RFC 2865 RADIUS
            </div>
            <div className="flex items-center gap-2 text-white font-bold tracking-wider text-sm sm:text-base">
              <span className="text-lg">📡</span> PPPoE & HOTSPOT
            </div>
            <div className="flex items-center gap-2 text-white font-bold tracking-wider text-sm sm:text-base">
              <span className="text-lg">💳</span> RAZORPAY & UPI
            </div>
          </div>
        </div>
      </div>

      {/* Seamless gradient fade into next dark section */}
      <div className="absolute bottom-0 inset-x-0 h-48 pointer-events-none" style={{background: 'linear-gradient(to bottom, transparent 0%, #0A0D14 100%)'}} />
    </section>
  )
}
