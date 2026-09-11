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
 * Feature Modules — clean card grid with circular icon badges,
 * white cards on off-white background, orange accent on hover.
 */
export function FeatureModules() {
  return (
    <Section
      id={sectionIds.features}
      tone="subtle"
      spacing="default"
      divider="bottom"
      aria-labelledby="features-heading"
    >
      <SectionHeading
        id="features-heading"
        eyebrow={featuresSection.eyebrow}
        title={featuresSection.heading}
        lead={featuresSection.lead}
      />

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {featureDetails.map((feature, i) => {
          const Icon = iconMap[feature.icon as IconKey]
          return (
            <Reveal
              key={feature.slug}
              as="div"
              delay={i * 60}
            >
              <Card
                href={`/features/${feature.slug}`}
                tone="light"
                padding="none"
                interactive
                className="h-full flex flex-col justify-between p-6"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex size-12 items-center justify-center rounded-full bg-primary-50 text-primary-500 border border-primary-100 group-hover:bg-primary-500 group-hover:text-white transition-colors">
                      {Icon ? <Icon className="size-6" /> : null}
                    </span>
                    <span className="font-mono text-xs font-semibold text-ink-faint">
                      0{i + 1}
                    </span>
                  </div>

                  <h3 className="mt-5 font-heading text-lg font-semibold text-ink group-hover:text-primary-500 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">
                    {feature.description}
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-primary-500 pt-4 border-t border-line group-hover:text-primary-600">
                  <span>Learn more</span>
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </div>
              </Card>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
