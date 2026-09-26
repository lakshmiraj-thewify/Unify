import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCircle2,
  Gauge,
  KeyRound,
  MessageCircle,
  Plug,
  ReceiptText,
  Server,
  Users,
} from 'lucide-react'
import { pageMetadata } from '@/lib/seo'
import { featureDetails, getFeatureDetail } from '@/content/feature-details'
import { InteractiveHoverButton } from '@/registry/magicui/interactive-hover-button'

const iconMap = {
  Server,
  KeyRound,
  Users,
  ReceiptText,
  MessageCircle,
  Gauge,
  Building2,
  Plug,
} as const

type IconKey = keyof typeof iconMap

export function generateStaticParams() {
  return featureDetails.map((f) => ({ slug: f.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const feature = getFeatureDetail(slug)
  if (!feature) return {}
  return pageMetadata({
    title: `${feature.title} — Unify Wi-Fi`,
    description: feature.description,
    path: `/features/${slug}`,
  })
}

export default async function FeatureDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const feature = getFeatureDetail(slug)
  if (!feature) notFound()

  const Icon = iconMap[feature.icon as IconKey]
  const related = featureDetails.filter((f) => feature.related.includes(f.slug))

  return (
    <main className="min-h-screen bg-white">
      {/* ── Dark Hero Header ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-32 pb-20" style={{background: 'radial-gradient(ellipse 80% 100% at 50% 0%, #9061FF 0%, #6332F6 35%, #2A115E 72%, #150833 100%)'}}>
        {/* Dot grid overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px] opacity-10 pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Back link */}
          <Link
            href="/#tabs-showcase"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-white/50 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            All features
          </Link>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Icon */}
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0"
              style={{ background: 'linear-gradient(135deg, #743CFF 0%, #5EE7E4 100%)' }}
            >
              {Icon ? <Icon className="w-8 h-8 text-white" strokeWidth={1.5} /> : null}
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-violet-400 mb-2">
                {feature.eyebrow}
              </p>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-3">
                {feature.title}
              </h1>
              <p className="text-lg text-white/60 max-w-2xl leading-relaxed">
                {feature.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Body ─────────────────────────────────────────────────────── */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">

            {/* Main content */}
            <div className="flex flex-col gap-8">
              {/* Overview card */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
                <h2 className="text-lg font-bold text-slate-900 mb-4">Overview</h2>
                <p className="text-slate-600 leading-relaxed text-base">{feature.body}</p>
              </div>

              {/* Capabilities */}
              <div>
                <h2 className="text-lg font-bold text-slate-900 mb-5">What it includes</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {feature.capabilities.map((cap) => (
                    <li
                      key={cap}
                      className="flex items-start gap-3 bg-white rounded-2xl border border-slate-200 p-4 shadow-sm hover:border-violet-200 hover:shadow-md transition-all"
                    >
                      <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-violet-500" aria-hidden="true" />
                      <span className="text-sm font-medium text-slate-700">{cap}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="flex flex-col gap-5">
              {/* Who it helps */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
                <h2 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3">
                  Who this helps
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">{feature.whoItHelps}</p>
              </div>

              {/* CTA */}
              <div className="rounded-3xl p-6 text-white"
                style={{ background: 'var(--unify-gradient-brand-3, linear-gradient(135deg,#8556FF,#6B3EFF 60%))' }}
              >
                <p className="font-bold text-sm mb-1">Ready to see it live?</p>
                <p className="text-white/70 text-xs mb-5 leading-relaxed">
                  Book a 20-minute demo and we&apos;ll walk you through this module on your actual router setup.
                </p>
                <InteractiveHoverButton
                  href="/contact"
                  variant="white"
                  className="w-full py-2.5 text-sm font-semibold"
                >
                  Book a demo
                </InteractiveHoverButton>
              </div>

              {/* Related modules */}
              {related.length > 0 && (
                <div>
                  <h2 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3">
                    Related modules
                  </h2>
                  <ul className="flex flex-col gap-2">
                    {related.map((rel) => {
                      const RelIcon = iconMap[rel.icon as IconKey]
                      return (
                        <li key={rel.slug}>
                          <Link
                            href={`/features/${rel.slug}`}
                            className="group flex items-center gap-3 bg-white rounded-2xl border border-slate-200 p-3.5 hover:border-violet-300 hover:shadow-sm transition-all"
                          >
                            <span className="flex w-8 h-8 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600 group-hover:bg-violet-100 transition-colors">
                              {RelIcon ? <RelIcon className="w-4 h-4" aria-hidden="true" /> : null}
                            </span>
                            <span className="text-sm font-semibold text-slate-700 group-hover:text-violet-700 transition-colors">
                              {rel.title}
                            </span>
                            <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-violet-400 ml-auto transition-colors" />
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )}
            </aside>
          </div>

          {/* Bottom back link */}
          <div className="mt-12 pt-8 border-t border-slate-200">
            <Link
              href="/#tabs-showcase"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-violet-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to all features
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[#0D0F17] py-16 text-center">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="text-2xl font-extrabold text-white mb-3">
            Connect your MikroTik in 10 minutes
          </h2>
          <p className="text-white/60 text-sm mb-8">
            No hardware changes. No Linux expertise. Start your free 30-day trial.
          </p>
          <InteractiveHoverButton
            href="/contact"
            variant="primary"
            className="px-7 py-3.5 text-base shadow-lg shadow-violet-900/30"
          >
            Book a demo
          </InteractiveHoverButton>
        </div>
      </section>
    </main>
  )
}
