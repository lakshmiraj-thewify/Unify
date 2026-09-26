import { Globe, Network, RadioTower, Wifi, Zap } from 'lucide-react'

const solutions = [
  { segment: 'WISP', tagline: 'Wireless ISP', description: 'Manage outdoor CPE subscribers, enforce FUP, and auto-bill monthly — no office visits required. Cloud RADIUS keeps sessions alive even when your backhaul fluctuates.', icon: RadioTower, color: '#5EE7E4' },
  { segment: 'LCO', tagline: 'Local Cable Operator', description: 'Give your LCO partners a branded portal to manage their own subscribers under your RADIUS infrastructure. Full billing and plan isolation per partner.', icon: Network, color: '#743CFF' },
  { segment: 'Fiber ISP', tagline: 'Fiber Broadband Operator', description: 'Handle PPPoE authentication, static IP allocation, and automated invoice generation across thousands of fiber subscribers — at any scale.', icon: Zap, color: '#6C8DFF' },
  { segment: 'Hotspot', tagline: 'Hotspot Operator', description: 'Sell prepaid vouchers, manage session time limits, and monitor per-device bandwidth in real time. Captive portal customisation included.', icon: Wifi, color: '#C084FC' },
  { segment: 'Enterprise', tagline: 'Enterprise Network Manager', description: 'Centrally manage multi-site RADIUS authentication and bandwidth policies across campuses and branch offices — from one cloud dashboard.', icon: Globe, color: '#5EE7E4' },
]

export function IspSolutions() {
  return (
    <section id="solutions" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-[#5EE7E4] tracking-wider uppercase mb-4">
            Solutions by Operator Type
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Built for every type of{' '}
            <span className="bg-gradient-to-r from-[#5EE7E4] to-[#743CFF] bg-clip-text text-transparent">internet operator.</span>
          </h2>
          <p className="text-white/60 text-base sm:text-lg leading-relaxed">
            Unify Wi-Fi speaks the language of your specific ISP operation — from small WISP to multi-site enterprise network.
          </p>
        </div>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((sol, i) => {
            const Icon = sol.icon
            return (
              <li key={sol.segment} className={i === solutions.length - 1 ? 'sm:col-span-2 lg:col-span-1' : ''}>
                <div className="unify-card-dark h-full p-6 flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg" style={{ background: `${sol.color}15`, color: sol.color }}>
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <div>
                      <span className="text-xs font-bold tracking-widest uppercase block" style={{ color: sol.color }}>{sol.segment}</span>
                      <h3 className="text-sm font-bold text-white">{sol.tagline}</h3>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-white/55">{sol.description}</p>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
