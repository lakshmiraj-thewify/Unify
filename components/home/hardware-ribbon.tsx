import { CheckCircle2, Clock, Router, Zap } from 'lucide-react'
import { PixelImage } from '@/registry/magicui/pixel-image'

const features = [
  'Full PPPoE & Hotspot integration',
  'CoA-based bandwidth control',
  'Sub-15ms RADIUS auth response',
  'Works with RouterOS v6 & v7',
  'MikroTik CHR supported',
  'No firmware changes required',
]

export function HardwareRibbon() {
  return (
    <section className="relative z-10 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mb-8 text-center text-xs font-bold tracking-[0.2em] text-[#5EE7E4] uppercase">
          Official Hardware Partner
        </p>
        <div className="unify-card-dark mx-auto max-w-5xl p-8 sm:p-10 lg:p-12">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-14">
            {/* Left: headline + badge */}
            <div className="flex flex-col gap-5">
              <h2 className="text-2xl leading-tight font-extrabold tracking-tight text-white sm:text-3xl">
                Built for MikroTik.{' '}
                <span className="bg-gradient-to-r from-[#5EE7E4] to-[#743CFF] bg-clip-text text-transparent">
                  Optimised for MikroTik.
                </span>
              </h2>
              <p className="text-sm leading-relaxed text-white/60">
                Unify Wi-Fi is purpose-built around MikroTik RouterOS. Connect your existing router
                in under 10 minutes — no other hardware needed.
              </p>
              <div className="inline-flex items-center gap-2 self-start rounded-full border border-[#5EE7E4]/30 bg-[#5EE7E4]/10 px-4 py-1.5">
                <Clock className="size-3.5 text-[#5EE7E4]" aria-hidden="true" />
                <span className="text-xs font-bold text-[#5EE7E4]">10 min Average Setup Time</span>
              </div>
            </div>

            {/* Centre: MikroTik icon with PixelImage reveal */}
            <div className="flex items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <PixelImage
                  grid="8x8"
                  className="size-24 rounded-2xl shadow-xl shadow-[#743CFF]/30 sm:size-28"
                  pixelFadeInDuration={850}
                  maxAnimationDelay={750}
                  colorRevealDelay={850}
                >
                  <div className="flex size-full items-center justify-center rounded-2xl bg-gradient-to-br from-[#743CFF] to-[#6C8DFF]">
                    <Router
                      className="size-12 text-white sm:size-14"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </div>
                </PixelImage>
                <span className="text-sm font-extrabold tracking-tight text-white">MikroTik</span>
                <span className="rounded-full border border-emerald-500/40 bg-emerald-500/15 px-3 py-1 text-xs font-bold text-emerald-400">
                  Official partner
                </span>
              </div>
            </div>

            {/* Right: feature list */}
            <ul className="flex flex-col gap-3">
              {features.map((feat) => (
                <li key={feat} className="flex items-start gap-2.5">
                  <CheckCircle2
                    className="mt-0.5 size-4 shrink-0 text-emerald-400"
                    aria-hidden="true"
                  />
                  <span className="text-sm text-white/75">{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Bottom note */}
          <div className="mt-8 border-t border-white/[0.08] pt-6 text-center">
            <p className="flex items-center justify-center gap-1.5 text-xs text-white/40">
              <Zap className="size-3 text-[#5EE7E4]" />
              Works with any MikroTik router running RouterOS — from hEX to CCR2.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
