import Link from 'next/link'
import { ArrowRight, Building2, Gauge, KeyRound, MessageCircle, Plug, ReceiptText, Server, Users } from 'lucide-react'
import { featureDetails } from '@/content/feature-details'

const iconMap: Record<string, React.ElementType> = { Server, KeyRound, Users, ReceiptText, MessageCircle, Gauge, Building2, Plug }

export function FeatureModules() {
  return (
    <section id="features" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-[#5EE7E4] tracking-wider uppercase mb-4">
            Feature Modules
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Everything your ISP needs.{' '}
            <span className="bg-gradient-to-r from-[#6C8DFF] to-[#C084FC] bg-clip-text text-transparent">Nothing it doesn&apos;t.</span>
          </h2>
          <p className="text-white/60 text-base sm:text-lg leading-relaxed">
            Eight tightly integrated modules — built specifically for ISPs, WISPs, and LCO networks.
          </p>
        </div>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featureDetails.map((feature) => {
            const Icon = iconMap[feature.icon]
            return (
              <li key={feature.slug}>
                <Link href={`/features/${feature.slug}`} className="group unify-card-dark h-full flex flex-col gap-3 p-5">
                  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#743CFF]/15 text-[#743CFF] transition-colors duration-200 group-hover:bg-[#743CFF]/25">
                    {Icon ? <Icon className="size-[1.1rem]" aria-hidden="true" /> : null}
                  </span>
                  <div className="flex flex-1 flex-col gap-1">
                    <h3 className="text-sm font-bold text-white">{feature.title}</h3>
                    <p className="text-sm leading-relaxed text-white/55">{feature.description}</p>
                  </div>
                  <div className="mt-1 flex items-center gap-1 text-xs font-semibold text-[#5EE7E4] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    Learn more <ArrowRight className="size-3.5" aria-hidden="true" />
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
