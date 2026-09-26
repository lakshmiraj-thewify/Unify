import { CheckCircle2 } from 'lucide-react'
import { NoiseTexture } from '@/registry/magicui/noise-texture'

const youOwn = ['Your brand & domain', 'Your subscriber relationships', 'Your pricing & plans', 'Your LCO reseller network']
const weRun = ['Cloud RADIUS servers', 'Geo-redundant AAA infrastructure', 'Billing engine & payment gateway', 'Security, uptime & scaling']

function OwnershipColumn({ side, items, accent, bg }: { side: string; items: string[]; accent: string; bg: string }) {
  return (
    <div className="relative overflow-hidden flex flex-col gap-5 rounded-2xl border p-8 backdrop-blur-sm" style={{ background: bg, borderColor: `${accent}22` }}>
      <NoiseTexture className="opacity-30" />
      <p className="relative z-10 text-xs font-bold tracking-[0.15em] uppercase" style={{ color: accent }}>{side}</p>
      <ul className="relative z-10 flex flex-col gap-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5">
            <CheckCircle2 className="mt-0.5 size-4 shrink-0" style={{ color: accent }} aria-hidden="true" />
            <span className="text-sm text-white/80">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function BusinessModel() {
  return (
    <section id="ownership" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-[#5EE7E4] tracking-wider uppercase mb-4">
            Business Model
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Your ISP brand.{' '}
            <span className="bg-gradient-to-r from-[#5EE7E4] to-[#C084FC] bg-clip-text text-transparent">Our cloud infrastructure.</span>
          </h2>
          <p className="text-white/60 text-base sm:text-lg leading-relaxed">
            You stay in control of your brand, your subscribers, and your pricing. We run the infrastructure that powers it all.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 max-w-4xl mx-auto">
          <OwnershipColumn side="You Own" items={youOwn} accent="#743CFF" bg="rgba(116,60,255,0.08)" />
          <OwnershipColumn side="We Run" items={weRun} accent="#5EE7E4" bg="rgba(94,231,228,0.08)" />
        </div>
      </div>
    </section>
  )
}
