import Link from 'next/link'
import { Radio, ArrowUpRight } from 'lucide-react'

export function SiteFooter() {
  return (
    <footer className="bg-[#0A0D14] text-white/70 text-sm border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Info (Cols 1-2) */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#743CFF] to-[#5EE7E4] flex items-center justify-center">
                <Radio className="w-4 h-4 text-white" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-lg text-white">Unify</span>
                <span className="text-[10px] uppercase font-semibold text-[#5EE7E4] bg-[#5EE7E4]/10 px-1.5 py-0.5 rounded">Wi-Fi</span>
              </div>
            </Link>
            <p className="text-white/50 text-xs sm:text-sm max-w-sm leading-relaxed">
              Cloud RADIUS and ISP billing automation for MikroTik network operators, WISPs, and Local Cable Operators across India.
            </p>
            <div className="text-xs text-white/40 space-y-1">
              <div>A product of <strong className="text-white/60">TheWiFy Technologies Private Limited</strong></div>
              <div>Hyderabad, India · support@thewify.com</div>
            </div>
          </div>

          {/* Col 3: Platform */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">Platform</div>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li><Link href="#tabs-showcase" className="hover:text-white transition-colors">Cloud RADIUS & AAA</Link></li>
              <li><Link href="#tabs-showcase" className="hover:text-white transition-colors">Automated Invoicing</Link></li>
              <li><Link href="#tabs-showcase" className="hover:text-white transition-colors">Bandwidth & FUP</Link></li>
              <li><Link href="#tabs-showcase" className="hover:text-white transition-colors">White-Label Reseller</Link></li>
              <li><Link href="#integrations" className="hover:text-white transition-colors">MikroTik RouterOS</Link></li>
            </ul>
          </div>

          {/* Col 4: Operators */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">Solutions</div>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li><Link href="#tabs-showcase" className="hover:text-white transition-colors">Wireless ISPs (WISPs)</Link></li>
              <li><Link href="#tabs-showcase" className="hover:text-white transition-colors">Fiber Broadband ISPs</Link></li>
              <li><Link href="#tabs-showcase" className="hover:text-white transition-colors">LCO Franchise Networks</Link></li>
              <li><Link href="#tabs-showcase" className="hover:text-white transition-colors">Public Hotspots</Link></li>
              <li><Link href="#pricing" className="hover:text-white transition-colors">Pricing & Plans</Link></li>
            </ul>
          </div>

          {/* Col 5: Company & Legal */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">Company</div>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li><Link href="/contact" className="hover:text-white transition-colors">Book a Demo</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Support</Link></li>
              <li><a href="https://guestwifi.thewify.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">Guest Wi-Fi <ArrowUpRight className="w-3 h-3" /></a></li>
              <li><a href="https://thewify.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">TheWiFy Parent Brand <ArrowUpRight className="w-3 h-3" /></a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <div>
            © {new Date().getFullYear()} TheWiFy Technologies Pvt Ltd. All rights reserved.
          </div>
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
