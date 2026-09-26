'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Copy, Check, ShieldCheck, Activity, HelpCircle } from 'lucide-react'

import { AnimatedSpan, Terminal, TypingAnimation } from '@/registry/magicui/terminal'
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
    <section className="unify-hero-bg relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      {/* Background radial glow orbs */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 h-[450px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-[#743CFF]/25 to-[#6C8DFF]/15 blur-[120px]" />
      <div className="pointer-events-none absolute top-1/3 left-1/4 h-[350px] w-[350px] rounded-full bg-[#5EE7E4]/10 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        {/* Glowing Announcement Pill */}
        <div className="unify-pill-badge group mb-8 inline-flex cursor-pointer items-center gap-2 rounded-full px-4 py-1.5 transition-all">
          <span className="h-2 w-2 animate-pulse rounded-full bg-[#5EE7E4]" />
          <span className="text-xs font-medium text-white/90 sm:text-sm">
            Cloud RADIUS Platform · Built for ISPs & MikroTik Operators
          </span>
          <ArrowRight className="h-3.5 w-3.5 text-white/60 transition-all group-hover:translate-x-0.5 group-hover:text-white" />
        </div>

        {/* Display Headline */}
        <h1 className="mx-auto mb-6 max-w-4xl text-4xl leading-[1.1] font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
          Your ISP.{' '}
          <AuroraText colors={['#6C8DFF', '#9061FF', '#C084FC', '#5EE7E4']} speed={1.2}>
            Unified.
          </AuroraText>{' '}
          In the Cloud.
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed font-normal text-white/70 sm:text-xl">
          Connect MikroTik in 10 minutes. Automate PPPoE & Hotspot billing. Manage every subscriber
          from one dashboard — no servers required.
        </p>

        {/* Dual Pill Action Buttons */}
        <div className="mb-6 flex flex-wrap items-center justify-center gap-4">
          <InteractiveHoverButton
            href="/contact"
            variant="primary"
            className="px-7 py-3.5 text-base shadow-xl shadow-[#743CFF]/30 hover:scale-105 hover:shadow-[#743CFF]/50"
          >
            Book a demo
          </InteractiveHoverButton>

          <Link
            href="#tabs-showcase"
            className="rounded-full bg-white px-7 py-3.5 text-base font-semibold text-[#0D0F17] shadow-lg shadow-white/10 transition-all hover:scale-105 hover:bg-white/90"
          >
            See how it works
          </Link>
        </div>

        {/* Micro Explainer Link */}
        <div className="mb-14">
          <button
            onClick={() => setShowInfoModal(!showInfoModal)}
            className="inline-flex items-center gap-1.5 text-xs text-white/50 transition-colors hover:text-white/80 sm:text-sm"
          >
            <HelpCircle className="h-3.5 w-3.5 text-[#5EE7E4]" />
            <span>What is a Cloud RADIUS platform?</span>
          </button>

          {showInfoModal && (
            <div className="animate-in fade-in slide-in-from-top-2 mx-auto mt-4 max-w-md rounded-xl border border-white/10 bg-[#151922]/95 p-4 text-left text-xs text-white/80 shadow-2xl backdrop-blur-md">
              <p className="mb-1 flex items-center gap-1.5 font-semibold text-white">
                <ShieldCheck className="h-4 w-4 text-[#5EE7E4]" />
                Cloud RADIUS vs On-Premise
              </p>
              <p className="leading-relaxed text-white/70">
                Traditional ISPs run physical Linux servers with FreeRADIUS inside their office.
                Unify replaces that server with an enterprise geo-redundant cloud cluster. You point
                your MikroTik to Unify, and authentication, bandwidth rules, and billing sync
                automatically.
              </p>
            </div>
          )}
        </div>

        {/* Interactive Terminal / Quick Connect Stage */}
        <Terminal
          sequence={false}
          className="mx-auto mb-16 max-w-4xl text-left shadow-2xl shadow-[#743CFF]/15"
          header={
            <div className="flex items-center justify-between border-b border-white/10 bg-[#0A0D14]/80 px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-[#FF5F56]/80" />
                <div className="h-3 w-3 rounded-full bg-[#FFBD2E]/80" />
                <div className="h-3 w-3 rounded-full bg-[#27C93F]/80" />
                <span className="ml-2 font-mono text-xs text-white/40">
                  RouterOS v7 · RADIUS Configuration
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 rounded-full border border-[#5EE7E4]/20 bg-[#5EE7E4]/10 px-2 py-0.5 font-mono text-[11px] text-[#5EE7E4]">
                  <Activity className="h-3 w-3 animate-pulse" />
                  <span>Response: Sub-15ms</span>
                </div>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 rounded bg-white/5 px-2.5 py-1 text-xs text-white/60 transition-colors hover:bg-white/10 hover:text-white"
                  title="Copy MikroTik command"
                >
                  {copied ? (
                    <Check className="h-3.5 w-3.5 text-[#5EE7E4]" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                  <span className="font-mono text-[11px]">{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>
          }
        >
          <AnimatedSpan delay={0} className="text-white/40">
            # 1-step MikroTik RADIUS connection command:
          </AnimatedSpan>

          <div className="flex items-start gap-2 font-medium text-white">
            <span className="text-[#5EE7E4] select-none">$</span>
            <TypingAnimation
              delay={500}
              duration={32}
              showCursor={true}
              className="font-mono leading-relaxed break-all text-[#A78BFA]"
            >
              {routerCommand}
            </TypingAnimation>
          </div>

          <AnimatedSpan delay={5200} className="pt-2">
            <div className="flex flex-wrap items-center gap-4 border-t border-white/5 pt-3 text-[11px] text-white/50">
              <span className="flex items-center gap-1 text-[#5EE7E4]">
                <Check className="h-3.5 w-3.5" /> 99.99% Cloud RADIUS Uptime SLA
              </span>
              <span className="flex items-center gap-1 text-white/70">
                <Check className="h-3.5 w-3.5 text-[#5EE7E4]" /> 10-Minute Zero-Downtime Setup
              </span>
              <span className="flex items-center gap-1 text-white/70">
                <Check className="h-3.5 w-3.5 text-[#5EE7E4]" /> Works on hEX, CCR, and CHR
              </span>
            </div>
          </AnimatedSpan>
        </Terminal>

        {/* Social Proof Bar (Monochrome logo ticker) */}
        <div className="border-t border-white/5 pt-4 pb-2">
          <p className="mb-6 text-xs font-semibold tracking-widest text-white/40 uppercase">
            Trusted by 200+ ISPs and network operators across India & Southeast Asia
          </p>

          <div className="flex flex-wrap items-center justify-center gap-8 opacity-60 grayscale transition-all hover:grayscale-0 sm:gap-12">
            <div className="flex items-center gap-2 text-sm font-bold tracking-wider text-white sm:text-base">
              <span className="text-lg">⚡</span> MIKROTIK ROUTEROS
            </div>
            <div className="flex items-center gap-2 text-sm font-bold tracking-wider text-white sm:text-base">
              <span className="text-lg">☁️</span> MIKROTIK CHR
            </div>
            <div className="flex items-center gap-2 text-sm font-bold tracking-wider text-white sm:text-base">
              <span className="text-lg">🔒</span> RFC 2865 RADIUS
            </div>
            <div className="flex items-center gap-2 text-sm font-bold tracking-wider text-white sm:text-base">
              <span className="text-lg">📡</span> PPPoE & HOTSPOT
            </div>
            <div className="flex items-center gap-2 text-sm font-bold tracking-wider text-white sm:text-base">
              <span className="text-lg">💳</span> RAZORPAY & UPI
            </div>
          </div>
        </div>
      </div>

      {/* Seamless gradient fade into next dark section */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-48"
        style={{ background: 'linear-gradient(to bottom, transparent 0%, #0A0D14 100%)' }}
      />
    </section>
  )
}
