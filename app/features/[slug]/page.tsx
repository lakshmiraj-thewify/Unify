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

export default async function FeatureDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const feature = getFeatureDetail(slug)
  if (!feature) notFound()

  const Icon = iconMap[feature.icon as IconKey]
  const related = featureDetails.filter((f) => feature.related.includes(f.slug))

  return (
    <main className="min-h-screen bg-white">
      {/* ── Dark Hero Header ─────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden pt-32 pb-20"
        style={{
          background:
            'radial-gradient(ellipse 80% 100% at 50% 0%, #9061FF 0%, #6332F6 35%, #2A115E 72%, #150833 100%)',
        }}
      >
        {/* Dot grid overlay */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px] opacity-10" />

        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <Link
            href="/#tabs-showcase"
            className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-white/50 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            All features
          </Link>

          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
            {/* Icon */}
            <div
              className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl"
              style={{ background: 'linear-gradient(135deg, #743CFF 0%, #5EE7E4 100%)' }}
            >
              {Icon ? <Icon className="h-8 w-8 text-white" strokeWidth={1.5} /> : null}
            </div>

            <div>
              <p className="mb-2 text-xs font-bold tracking-widest text-violet-400 uppercase">
                {feature.eyebrow}
              </p>
              <h1 className="mb-3 text-3xl leading-tight font-extrabold tracking-tight text-white sm:text-4xl">
                {feature.title}
              </h1>
              <p className="max-w-2xl text-lg leading-relaxed text-white/60">
                {feature.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Body ─────────────────────────────────────────────────────── */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
            {/* Main content */}
            <div className="flex flex-col gap-8">
              {/* Overview card */}
              <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                <h2 className="mb-4 text-lg font-bold text-slate-900">Overview</h2>
                <p className="text-base leading-relaxed text-slate-600">{feature.body}</p>
              </div>

              {/* Capabilities */}
              <div>
                <h2 className="mb-5 text-lg font-bold text-slate-900">What it includes</h2>
                <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {feature.capabilities.map((cap) => (
                    <li
                      key={cap}
                      className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:border-violet-200 hover:shadow-md"
                    >
                      <CheckCircle2
                        className="mt-0.5 h-4 w-4 shrink-0 text-violet-500"
                        aria-hidden="true"
                      />
                      <span className="text-sm font-medium text-slate-700">{cap}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="flex flex-col gap-5">
              {/* Who it helps */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="mb-3 text-[11px] font-bold tracking-widest text-slate-400 uppercase">
                  Who this helps
                </h2>
                <p className="text-sm leading-relaxed text-slate-600">{feature.whoItHelps}</p>
              </div>

              {/* CTA */}
              <div
                className="rounded-3xl p-6 text-white"
                style={{
                  background:
                    'var(--unify-gradient-brand-3, linear-gradient(135deg,#8556FF,#6B3EFF 60%))',
                }}
              >
                <p className="mb-1 text-sm font-bold">Ready to see it live?</p>
                <p className="mb-5 text-xs leading-relaxed text-white/70">
                  Book a 20-minute demo and we&apos;ll walk you through this module on your actual
                  router setup.
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
                  <h2 className="mb-3 text-[11px] font-bold tracking-widest text-slate-400 uppercase">
                    Related modules
                  </h2>
                  <ul className="flex flex-col gap-2">
                    {related.map((rel) => {
                      const RelIcon = iconMap[rel.icon as IconKey]
                      return (
                        <li key={rel.slug}>
                          <Link
                            href={`/features/${rel.slug}`}
                            className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3.5 transition-all hover:border-violet-300 hover:shadow-sm"
                          >
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600 transition-colors group-hover:bg-violet-100">
                              {RelIcon ? <RelIcon className="h-4 w-4" aria-hidden="true" /> : null}
                            </span>
                            <span className="text-sm font-semibold text-slate-700 transition-colors group-hover:text-violet-700">
                              {rel.title}
                            </span>
                            <ArrowRight className="ml-auto h-3.5 w-3.5 text-slate-300 transition-colors group-hover:text-violet-400" />
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
          <div className="mt-12 border-t border-slate-200 pt-8">
            <Link
              href="/#tabs-showcase"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-violet-600"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to all features
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[#0D0F17] py-16 text-center">
        <div className="mx-auto max-w-xl px-4">
          <h2 className="mb-3 text-2xl font-extrabold text-white">
            Connect your MikroTik in 10 minutes
          </h2>
          <p className="mb-8 text-sm text-white/60">
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
