import { Layers, Lock, Server } from 'lucide-react'
import { NoiseTexture } from '@/registry/magicui/noise-texture'

const archPoints = [
  { title: 'Cloud RADIUS', detail: 'Geo-redundant AAA cluster. Supports 10,000+ concurrent PPPoE/Hotspot sessions. Sub-15ms auth response.', icon: Server, color: '#5EE7E4' },
  { title: 'Multi-Tenant Isolation', detail: 'Each ISP and reseller is fully isolated — no data crossover. RBAC and audit logs included.', icon: Lock, color: '#743CFF' },
  { title: 'White-Label Stack', detail: 'Custom domains, custom billing portal branding. Zero Unify Wi-Fi branding on reseller interfaces.', icon: Layers, color: '#C084FC' },
]

export function PlatformArchitecture() {
  return (
    <section id="architecture" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-[#5EE7E4] tracking-wider uppercase mb-4">
            Platform Architecture
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Enterprise-grade infrastructure.{' '}
            <span className="bg-gradient-to-r from-[#6C8DFF] to-[#5EE7E4] bg-clip-text text-transparent">Without the complexity.</span>
          </h2>
          <p className="text-white/60 text-base sm:text-lg leading-relaxed">
            Built for network engineers who need to trust the stack before they can recommend it.
          </p>
        </div>
        <ul className="grid gap-6 sm:grid-cols-3 max-w-5xl mx-auto">
          {archPoints.map((point) => {
            const Icon = point.icon
            return (
              <li key={point.title}>
                <div className="relative unify-card-dark h-full p-8 flex flex-col gap-5 overflow-hidden">
                  <NoiseTexture className="opacity-30" />
                  <span className="relative z-10 inline-flex size-12 shrink-0 items-center justify-center rounded-xl"
                    style={{ background: `linear-gradient(135deg, ${point.color}28, ${point.color}12)`, color: point.color, boxShadow: `0 4px 20px -4px ${point.color}28` }}>
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
