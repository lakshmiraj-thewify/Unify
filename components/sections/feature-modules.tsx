import {
  ArrowRight,
  Building2,
  Gauge,
  KeyRound,
  MessageCircle,
  Plug,
  ReceiptText,
  Server,
  Users,
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Reveal } from '@/components/ui/reveal'
import { Section } from '@/components/ui/section'
import { SectionHeading } from '@/components/ui/section-heading'
import { featureDetails } from '@/content/feature-details'
import { featuresSection } from '@/content/home'
import { sectionIds } from '@/content/nav'

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

/**
 * Feature Modules — blueprint Section 6.
 *
 * Each card is now a link to its dedicated detail page at /features/[slug].
 * The detail pages contain the full capability breakdown, who-it-helps context,
 * and a demo CTA — giving visitors enough space to understand each module
 * without the homepage becoming overwhelming.
 *
 * Cards retain the original visual design; the only change is that they are
 * now interactive (hover affordance + arrow indicator + link href).
 */
export function FeatureModules() {
  return (
    <Section
      id={sectionIds.features}
      tone="light"
      divider="bottom"
      aria-labelledby="features-heading"
    >
      <SectionHeading
        id="features-heading"
        eyebrow={featuresSection.eyebrow}
        title={featuresSection.heading}
        lead={featuresSection.lead}
      />

      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {featureDetails.map((feature, i) => {
          const Icon = iconMap[feature.icon as IconKey]
          return (
            <Reveal key={feature.slug} as="li" delay={i * 50}>
              <Card
                href={`/features/${feature.slug}`}
                padding="md"
                className="group h-full gap-3"
              >
                <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600 transition-colors duration-200 group-hover:bg-primary-100 [&_svg]:size-[1.1rem]">
                  {Icon ? <Icon /> : null}
                </span>
                <div className="flex flex-col gap-1 flex-1">
                  <h3 className="text-sm font-bold text-ink">{feature.title}</h3>
                  <p className="text-sm leading-relaxed text-ink-muted">{feature.description}</p>
                </div>
                <div className="flex items-center gap-1 text-xs font-semibold text-primary-600 opacity-0 transition-opacity duration-200 group-hover:opacity-100 mt-1">
                  Learn more
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </div>
              </Card>
            </Reveal>
          )
        })}
      </ul>
    </Section>
  )
}
