import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft,
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
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Section } from '@/components/ui/section'
import { Reveal } from '@/components/ui/reveal'
import { pageMetadata } from '@/lib/seo'
import { featureDetails, getFeatureDetail } from '@/content/feature-details'

// ── Icon map ─────────────────────────────────────────────────────────────────

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

// ── Static params ─────────────────────────────────────────────────────────────

export function generateStaticParams() {
  return featureDetails.map((f) => ({ slug: f.slug }))
}

// ── Metadata ──────────────────────────────────────────────────────────────────

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

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function FeatureDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const feature = getFeatureDetail(slug)

  if (!feature) notFound()

  const Icon = iconMap[feature.icon as IconKey]
  const related = featureDetails.filter((f) => feature.related.includes(f.slug))

  return (
    <>
      {/* Dark header band */}
      <Section tone="dark" spacing="flush" contained={false} className="relative overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-hero-glow" />
        <div className="relative mx-auto w-full max-w-page px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          {/* Back link */}
          <Link
            href="/#features"
            className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-dark-fg-muted transition-colors hover:text-dark-fg"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            All features
          </Link>

          <div className="flex flex-col items-start gap-5 lg:flex-row lg:items-center lg:gap-8">
            {/* Icon */}
            <div className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-primary-600 shadow-primary lg:size-20">
              {Icon ? <Icon className="size-8 text-white lg:size-10" strokeWidth={1.5} /> : null}
            </div>

            <div>
              <p className="mb-2 text-xs font-bold tracking-widest text-signal-400 uppercase">
                {feature.eyebrow}
              </p>
              <h1 className="text-3xl font-extrabold tracking-tight text-dark-fg lg:text-4xl">
                {feature.title}
              </h1>
              <p className="mt-3 max-w-2xl text-lg leading-relaxed text-dark-fg-muted">
                {feature.description}
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Body */}
      <Section tone="subtle" spacing="default">
        <div className="mx-auto max-w-content">
          <div className="grid gap-10 lg:grid-cols-[1fr_340px]">
            {/* Main content */}
            <div className="flex flex-col gap-8">
              {/* Overview */}
              <Card tone="light" padding="lg" className="border-line shadow-card">
                <h2 className="mb-3 text-lg font-bold text-ink">Overview</h2>
                <p className="text-base leading-relaxed text-ink-muted">{feature.body}</p>
              </Card>

              {/* Capabilities */}
              <div>
                <h2 className="mb-4 text-lg font-bold text-ink">What it includes</h2>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {feature.capabilities.map((cap, i) => (
                    <Reveal key={cap} as="li" delay={i * 40}>
                      <div className="flex items-start gap-3 rounded-xl border border-line bg-surface p-4 shadow-card">
                        <CheckCircle2
                          aria-hidden="true"
                          className="mt-0.5 size-4 shrink-0 text-ok-600"
                        />
                        <span className="text-sm font-semibold text-ink-soft">{cap}</span>
                      </div>
                    </Reveal>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="flex flex-col gap-6">
              {/* Who it helps */}
              <Card tone="light" padding="md" className="border-line shadow-card">
                <h2 className="mb-3 text-sm font-bold tracking-wider text-ink-muted uppercase">
                  Who this helps
                </h2>
                <p className="text-sm leading-relaxed text-ink-soft">{feature.whoItHelps}</p>
              </Card>

              {/* CTA */}
              <Card tone="dark" padding="md" className="border-dark-line">
                <p className="mb-1 text-sm font-bold text-dark-fg">Ready to see it live?</p>
                <p className="mb-4 text-xs text-dark-fg-muted">
                  Book a 20-minute demo and we&apos;ll walk you through this module in action.
                </p>
                <Button href="/contact" size="sm" className="w-full justify-center">
                  Book a demo
                </Button>
              </Card>

              {/* Related */}
              {related.length > 0 && (
                <div>
                  <h2 className="mb-3 text-sm font-bold tracking-wider text-ink-muted uppercase">
                    Related modules
                  </h2>
                  <ul className="flex flex-col gap-2">
                    {related.map((rel) => {
                      const RelIcon = iconMap[rel.icon as IconKey]
                      return (
                        <li key={rel.slug}>
                          <Link
                            href={`/features/${rel.slug}`}
                            className="group flex items-center gap-3 rounded-xl border border-line bg-surface p-3 shadow-card transition-[border-color,box-shadow] duration-200 hover:border-primary-300 hover:shadow-lift"
                          >
                            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600 group-hover:bg-primary-100">
                              {RelIcon ? <RelIcon className="size-4" aria-hidden="true" /> : null}
                            </span>
                            <span className="text-sm font-semibold text-ink group-hover:text-primary-700">
                              {rel.title}
                            </span>
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
          <div className="mt-10">
            <Button href="/#features" variant="secondary" size="md" leadingIcon={<ArrowLeft />}>
              Back to all features
            </Button>
          </div>
        </div>
      </Section>
    </>
  )
}
