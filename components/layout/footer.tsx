import Link from 'next/link'
import { Radio, ArrowUpRight } from 'lucide-react'

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#0A0D14] pt-16 pb-12 text-sm text-white/70">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Info (Cols 1-2) */}
          <div className="space-y-4 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-[#743CFF] to-[#5EE7E4]">
                <Radio className="h-4 w-4 text-white" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-bold text-white">Unify</span>
                <span className="rounded bg-[#5EE7E4]/10 px-1.5 py-0.5 text-[10px] font-semibold text-[#5EE7E4] uppercase">
                  Wi-Fi
                </span>
              </div>
            </Link>
            <p className="max-w-sm text-xs leading-relaxed text-white/50 sm:text-sm">
              Cloud RADIUS and ISP billing automation for MikroTik network operators, WISPs, and
              Local Cable Operators across India.
            </p>
            <div className="space-y-1 text-xs text-white/40">
              <div>
                A product of{' '}
                <strong className="text-white/60">TheWiFy Technologies Private Limited</strong>
              </div>
              <div>Hyderabad, India · support@thewify.com</div>
            </div>
          </div>

          {/* Col 3: Platform */}
          <div className="space-y-3">
            <div className="text-xs font-bold tracking-wider text-white uppercase">Platform</div>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="#tabs-showcase" className="transition-colors hover:text-white">
                  Cloud RADIUS & AAA
                </Link>
              </li>
              <li>
                <Link href="#tabs-showcase" className="transition-colors hover:text-white">
                  Automated Invoicing
                </Link>
              </li>
              <li>
                <Link href="#tabs-showcase" className="transition-colors hover:text-white">
                  Bandwidth & FUP
                </Link>
              </li>
              <li>
                <Link href="#tabs-showcase" className="transition-colors hover:text-white">
                  White-Label Reseller
                </Link>
              </li>
              <li>
                <Link href="#integrations" className="transition-colors hover:text-white">
                  MikroTik RouterOS
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Operators */}
          <div className="space-y-3">
            <div className="text-xs font-bold tracking-wider text-white uppercase">Solutions</div>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="#tabs-showcase" className="transition-colors hover:text-white">
                  Wireless ISPs (WISPs)
                </Link>
              </li>
              <li>
                <Link href="#tabs-showcase" className="transition-colors hover:text-white">
                  Fiber Broadband ISPs
                </Link>
              </li>
              <li>
                <Link href="#tabs-showcase" className="transition-colors hover:text-white">
                  LCO Franchise Networks
                </Link>
              </li>
              <li>
                <Link href="#tabs-showcase" className="transition-colors hover:text-white">
                  Public Hotspots
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="transition-colors hover:text-white">
                  Pricing & Plans
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Company & Legal */}
          <div className="space-y-3">
            <div className="text-xs font-bold tracking-wider text-white uppercase">Company</div>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/contact" className="transition-colors hover:text-white">
                  Book a Demo
                </Link>
              </li>
              <li>
                <Link href="/contact" className="transition-colors hover:text-white">
                  Contact Support
                </Link>
              </li>
              <li>
                <a
                  href="https://guestwifi.thewify.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 transition-colors hover:text-white"
                >
                  Guest Wi-Fi <ArrowUpRight className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://thewify.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 transition-colors hover:text-white"
                >
                  TheWiFy Parent Brand <ArrowUpRight className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 text-xs text-white/40 sm:flex-row">
          <div>© {new Date().getFullYear()} TheWiFy Technologies Pvt Ltd. All rights reserved.</div>
          <div className="flex items-center gap-6">
            <span>RFC 2865 Compliant</span>
            <span>99.99% Cloud SLA</span>
            <span>Hyderabad, India</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
