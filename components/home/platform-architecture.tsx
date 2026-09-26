import { Layers, Lock, Server } from 'lucide-react'
import { NoiseTexture } from '@/registry/magicui/noise-texture'

const archPoints = [
  {
    title: 'Cloud RADIUS',
    detail:
      'Geo-redundant AAA cluster. Supports 10,000+ concurrent PPPoE/Hotspot sessions. Sub-15ms auth response.',
    icon: Server,
    color: '#5EE7E4',
  },
  {
    title: 'Multi-Tenant Isolation',
    detail:
      'Each ISP and reseller is fully isolated — no data crossover. RBAC and audit logs included.',
    icon: Lock,
    color: '#743CFF',
  },
  {
    title: 'White-Label Stack',
    detail:
      'Custom domains, custom billing portal branding. Zero Unify Wi-Fi branding on reseller interfaces.',
    icon: Layers,
    color: '#C084FC',
  },
]

export function PlatformArchitecture() {
  return (
    <section id="architecture" className="relative z-10 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold tracking-wider text-[#5EE7E4] uppercase">
            Platform Architecture
          </div>
          <h2 className="mb-4 text-3xl leading-tight font-extrabold tracking-tight text-white sm:text-5xl">
            Enterprise-grade infrastructure.{' '}
            <span className="bg-gradient-to-r from-[#6C8DFF] to-[#5EE7E4] bg-clip-text text-transparent">
              Without the complexity.
            </span>
          </h2>
          <p className="text-base leading-relaxed text-white/60 sm:text-lg">
            Built for network engineers who need to trust the stack before they can recommend it.
          </p>
        </div>
        <ul className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-3">
          {archPoints.map((point) => {
            const Icon = point.icon
            return (
              <li key={point.title}>
                <div className="unify-card-dark relative flex h-full flex-col gap-5 overflow-hidden p-8">
                  <NoiseTexture className="opacity-30" />
                  <span
                    className="relative z-10 inline-flex size-12 shrink-0 items-center justify-center rounded-xl"
                    style={{
                      background: `linear-gradient(135deg, ${point.color}28, ${point.color}12)`,
                      color: point.color,
                      boxShadow: `0 4px 20px -4px ${point.color}28`,
                    }}
                  >
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <div className="relative z-10 flex flex-col gap-1.5">
                    <h3 className="text-base font-bold text-white">{point.title}</h3>
                    <p className="text-sm leading-relaxed text-white/55">{point.detail}</p>
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
