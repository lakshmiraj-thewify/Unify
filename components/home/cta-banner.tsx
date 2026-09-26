'use client'

import Link from 'next/link'
import { ShieldCheck, Zap, PhoneCall } from 'lucide-react'
import { InteractiveHoverButton } from '@/registry/magicui/interactive-hover-button'

export function CtaBanner() {
  return (
    <section className="relative z-10 overflow-hidden py-20">
      {/* Background glow orb */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[350px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#743CFF]/30 blur-[130px]" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="unify-cta-banner relative overflow-hidden rounded-3xl p-8 text-center text-white sm:p-14">
          {/* Subtle grid pattern overlay */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px] opacity-10" />

          <div className="relative z-10 mx-auto max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold tracking-wider text-white uppercase backdrop-blur-md">
              <Zap className="h-3.5 w-3.5 text-[#5EE7E4]" />
              10-Minute Setup · No Credit Card Required
            </div>

            <h2 className="text-3xl leading-tight font-extrabold tracking-tight sm:text-5xl">
              Ready to unify your ISP in the cloud?
            </h2>

            <p className="mx-auto max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
              Stop maintaining local Linux servers. Join 200+ ISPs and WISPs who automate their
              PPPoE auth and billing with Unify.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <InteractiveHoverButton
                href="/contact"
                variant="white"
                className="px-8 py-4 text-base shadow-2xl shadow-black/20 hover:scale-105"
              >
                Book a live demo
              </InteractiveHoverButton>

              <Link
                href="/contact"
                className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur-md transition-all hover:bg-white/20"
              >
                <PhoneCall className="h-4 w-4 text-[#5EE7E4]" />
                <span>Talk to sales</span>
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 pt-6 text-xs text-white/70">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-[#5EE7E4]" /> 99.99% Cloud RADIUS SLA
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-[#5EE7E4]" /> Compatible with MikroTik RouterOS
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-[#5EE7E4]" /> Instant UPI & WhatsApp Ready
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
