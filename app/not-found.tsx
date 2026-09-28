import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Home, WifiOff, Compass, ShieldCheck, ReceiptText, ArrowRight } from 'lucide-react'
import { site } from '@/content/site'

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The requested page or route could not be found. Return to Unify Wi-Fi home.',
  robots: { index: false, follow: false },
}

const QUICK_LINKS = [
  {
    title: 'Cloud RADIUS & AAA',
    description: 'Sub-15ms authentication for PPPoE and Hotspots with zero on-prem servers.',
    href: '/features/cloud-radius',
    icon: ShieldCheck,
  },
  {
    title: 'Automated Billing & Invoicing',
    description: 'Automated recurring billing, Razorpay integration, and instant plan renewals.',
    href: '/features/billing-invoicing',
    icon: ReceiptText,
  },
  {
    title: 'ISP Solutions Grid',
    description: 'Tailored workflows for WISPs, Fiber operators, LCO franchises, and hotels.',
    href: '/#solutions',
    icon: Compass,
  },
]

export default function NotFound() {
  return (
    <div className="relative min-h-[85vh] overflow-hidden bg-[#0D0F17] pt-28 pb-20 sm:pt-36 sm:pb-28">
      {/* Background ambient radial glows */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 h-[450px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-[#743CFF]/20 to-[#6C8DFF]/10 blur-[130px]" />
      <div className="pointer-events-none absolute top-1/3 left-1/4 h-[300px] w-[300px] rounded-full bg-[#5EE7E4]/10 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-1/4 right-1/4 h-[350px] w-[350px] rounded-full bg-[#743CFF]/15 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        {/* Status Pill Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-rose-500/20 bg-rose-500/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-rose-400 uppercase sm:text-sm">
          <WifiOff className="h-4 w-4 animate-pulse" />
          <span>Error 404 · Packet Dropped</span>
        </div>

        {/* Display 404 Large Glow Number */}
        <h1 className="mb-3 text-7xl font-extrabold tracking-tight sm:text-9xl">
          <span className="bg-gradient-to-r from-white via-white/90 to-white/40 bg-clip-text text-transparent">
            4
          </span>
          <span className="bg-gradient-to-r from-[#5EE7E4] to-[#743CFF] bg-clip-text text-transparent">
            0
          </span>
          <span className="bg-gradient-to-r from-white/90 via-white/70 to-white/30 bg-clip-text text-transparent">
            4
          </span>
        </h1>

        {/* Headline */}
        <h2 className="mb-4 text-2xl font-bold tracking-tight text-white sm:text-4xl">
          Page not found on this router.
        </h2>

        {/* Description */}
        <p className="mx-auto mb-10 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
          The RADIUS packet or URL you requested wandered off the network routing table. The link
          may be outdated or moved to a new cloud endpoint.
        </p>

        {/* Primary Action Buttons */}
        <div className="mb-16 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#743CFF] to-[#6C8DFF] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_0_24px_rgba(116,60,255,0.4)] transition-all hover:scale-[1.02] hover:shadow-[0_0_32px_rgba(116,60,255,0.6)]"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Home</span>
          </Link>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-all hover:border-white/30 hover:bg-white/10"
          >
            <Home className="h-4 w-4 text-[#5EE7E4]" />
            <span>Book a Demo</span>
          </Link>
        </div>

        {/* Quick Route Suggestions */}
        <div className="mx-auto max-w-2xl rounded-2xl border border-white/10 bg-[#141A26]/80 p-6 text-left shadow-2xl backdrop-blur-xl sm:p-8">
          <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
            <span className="text-xs font-semibold tracking-wider text-white/50 uppercase">
              Suggested Next Hops
            </span>
            <span className="text-xs text-[#5EE7E4]">Unify Cloud Engine</span>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {QUICK_LINKS.map((link) => {
              const Icon = link.icon
              return (
                <Link
                  key={link.title}
                  href={link.href}
                  className="group flex flex-col justify-between rounded-xl border border-white/5 bg-white/[0.03] p-4 transition-all hover:border-[#743CFF]/40 hover:bg-white/[0.06]"
                >
                  <div>
                    <Icon className="mb-2.5 h-5 w-5 text-[#5EE7E4] transition-transform group-hover:scale-110" />
                    <h3 className="mb-1 text-sm font-bold text-white group-hover:text-[#5EE7E4]">
                      {link.title}
                    </h3>
                    <p className="line-clamp-2 text-xs text-white/50">{link.description}</p>
                  </div>
                  <div className="mt-3 flex items-center gap-1 text-xs font-medium text-[#6C8DFF]">
                    <span>Explore</span>
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              )
            })}
          </div>

          {/* Need help footer */}
          <div className="mt-6 border-t border-white/10 pt-4 text-center text-xs text-white/50">
            Still lost? Email our engineering team at{' '}
            <a
              href={`mailto:${site.contact.email}`}
              className="font-medium text-[#5EE7E4] underline underline-offset-4 hover:text-white"
            >
              {site.contact.email}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
