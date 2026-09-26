import { CheckCircle2 } from 'lucide-react'
import { NoiseTexture } from '@/registry/magicui/noise-texture'

const youOwn = [
  'Your brand & domain',
  'Your subscriber relationships',
  'Your pricing & plans',
  'Your LCO reseller network',
]
const weRun = [
  'Cloud RADIUS servers',
  'Geo-redundant AAA infrastructure',
  'Billing engine & payment gateway',
  'Security, uptime & scaling',
]

function OwnershipColumn({
  side,
  items,
  accent,
  bg,
}: {
  side: string
  items: string[]
  accent: string
  bg: string
}) {
  return (
    <div
      className="relative flex flex-col gap-5 overflow-hidden rounded-2xl border p-8 backdrop-blur-sm"
      style={{ background: bg, borderColor: `${accent}22` }}
    >
      <NoiseTexture className="opacity-30" />
      <p
        className="relative z-10 text-xs font-bold tracking-[0.15em] uppercase"
        style={{ color: accent }}
      >
        {side}
      </p>
      <ul className="relative z-10 flex flex-col gap-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5">
            <CheckCircle2
              className="mt-0.5 size-4 shrink-0"
              style={{ color: accent }}
              aria-hidden="true"
            />
            <span className="text-sm text-white/80">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function BusinessModel() {
  return (
    <section id="ownership" className="relative z-10 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold tracking-wider text-[#5EE7E4] uppercase">
            Business Model
          </div>
          <h2 className="mb-4 text-3xl leading-tight font-extrabold tracking-tight text-white sm:text-5xl">
            Your ISP brand.{' '}
            <span className="bg-gradient-to-r from-[#5EE7E4] to-[#C084FC] bg-clip-text text-transparent">
              Our cloud infrastructure.
            </span>
          </h2>
          <p className="text-base leading-relaxed text-white/60 sm:text-lg">
            You stay in control of your brand, your subscribers, and your pricing. We run the
            infrastructure that powers it all.
          </p>
        </div>
        <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
          <OwnershipColumn
            side="You Own"
            items={youOwn}
            accent="#743CFF"
            bg="rgba(116,60,255,0.08)"
          />
          <OwnershipColumn
            side="We Run"
            items={weRun}
            accent="#5EE7E4"
            bg="rgba(94,231,228,0.08)"
          />
        </div>
      </div>
    </section>
  )
}
