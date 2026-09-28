import { Globe, Network, RadioTower, Wifi, Zap, Building2 } from 'lucide-react'
import { NoiseTexture } from '@/registry/magicui/noise-texture'

const solutions = [
  {
    segment: 'WISP',
    tagline: 'Wireless ISP',
    anchorId: 'solution-wisp',
    description:
      'Manage outdoor CPE subscribers, enforce FUP, and auto-bill monthly — no office visits required. Cloud RADIUS keeps sessions alive even when your backhaul fluctuates.',
    icon: RadioTower,
    color: '#5EE7E4',
  },
  {
    segment: 'LCO',
    tagline: 'Local Cable Operator',
    anchorId: 'solution-lco',
    description:
      'Give your LCO partners a branded portal to manage their own subscribers under your RADIUS infrastructure. Full billing and plan isolation per partner.',
    icon: Network,
    color: '#743CFF',
  },
  {
    segment: 'Fiber ISP',
    tagline: 'Fiber Broadband Operator',
    anchorId: 'solution-fiber',
    description:
      'Handle PPPoE authentication, static IP allocation, and automated invoice generation across thousands of fiber subscribers — at any scale.',
    icon: Zap,
    color: '#6C8DFF',
  },
  {
    segment: 'Hotspot',
    tagline: 'Hotspot Operator',
    anchorId: 'solution-hotspot',
    description:
      'Sell prepaid vouchers, manage session time limits, and monitor per-device bandwidth in real time. Captive portal customisation included.',
    icon: Wifi,
    color: '#C084FC',
  },
  {
    segment: 'Enterprise',
    tagline: 'Enterprise Network Manager',
    anchorId: 'solution-enterprise',
    description:
      'Centrally manage multi-site RADIUS authentication and bandwidth policies across campuses and branch offices — from one cloud dashboard.',
    icon: Globe,
    color: '#5EE7E4',
  },
  {
    segment: 'Hospitality & MSP',
    tagline: 'Managed Service Providers',
    anchorId: 'solution-msp',
    description:
      'Deploy branded captive portals, guest tier speeds, and automated PMS integration for hotels, co-working spaces, and retail venues with multi-tenant oversight.',
    icon: Building2,
    color: '#743CFF',
  },
]

export function IspSolutions() {
  return (
    <section id="solutions" className="relative z-10 py-24 scroll-mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold tracking-wider text-[#5EE7E4] uppercase">
            Solutions by Operator Type
          </div>
          <h2 className="mb-4 text-3xl leading-tight font-extrabold tracking-tight text-white sm:text-5xl">
            Built for every type of{' '}
            <span className="bg-gradient-to-r from-[#5EE7E4] to-[#743CFF] bg-clip-text text-transparent">
              internet operator.
            </span>
          </h2>
          <p className="text-base leading-relaxed text-white/60 sm:text-lg">
            Unify Wi-Fi speaks the language of your specific ISP operation — from small WISP to
            multi-site enterprise network.
          </p>
        </div>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((sol) => {
            const Icon = sol.icon
            return (
              <li
                key={sol.segment}
                id={sol.anchorId}
                className="scroll-mt-28"
              >
                <div className="unify-card-dark relative flex h-full flex-col gap-4 overflow-hidden p-6 transition-all duration-300 hover:border-white/25 hover:-translate-y-1">
                  <NoiseTexture className="opacity-30" />
                  <div className="relative z-10 flex h-full flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <span
                        className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg"
                        style={{ background: `${sol.color}15`, color: sol.color }}
                      >
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                      <div>
                        <span
                          className="block text-xs font-bold tracking-widest uppercase"
                          style={{ color: sol.color }}
                        >
                          {sol.segment}
                        </span>
                        <h3 className="text-sm font-bold text-white">{sol.tagline}</h3>
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed text-white/55">{sol.description}</p>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
