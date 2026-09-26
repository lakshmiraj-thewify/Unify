'use client'

import Link from 'next/link'
import { ShieldCheck, Zap, PhoneCall } from 'lucide-react'
import { InteractiveHoverButton } from '@/registry/magicui/interactive-hover-button'

export function CtaBanner() {
  return (
    <section className="py-20 relative z-10 overflow-hidden">
      {/* Background glow orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#743CFF]/30 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="unify-cta-banner rounded-3xl p-8 sm:p-14 text-center text-white relative overflow-hidden">
          {/* Subtle grid pattern overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px] opacity-10 pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-white tracking-wider uppercase backdrop-blur-md">
              <Zap className="w-3.5 h-3.5 text-[#5EE7E4]" />
              10-Minute Setup · No Credit Card Required
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Ready to unify your ISP in the cloud?
            </h2>

            <p className="text-white/80 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Stop maintaining local Linux servers. Join 200+ ISPs and WISPs who automate their PPPoE auth and billing with Unify.
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <InteractiveHoverButton
                href="/contact"
                variant="white"
                className="px-8 py-4 text-base shadow-2xl shadow-black/20 hover:scale-105"
              >
                Book a live demo
              </InteractiveHoverButton>

              <Link
                href="/contact"
                className="px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-base backdrop-blur-md transition-all flex items-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-[#5EE7E4]" />
                <span>Talk to sales</span>
              </Link>
            </div>

            <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-white/70">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#5EE7E4]" /> 99.99% Cloud RADIUS SLA
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#5EE7E4]" /> Compatible with MikroTik RouterOS
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#5EE7E4]" /> Instant UPI & WhatsApp Ready
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
