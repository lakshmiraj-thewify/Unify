import { Building2, Gauge, ReceiptText, ShieldCheck } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Reveal } from '@/components/ui/reveal'
import { Section } from '@/components/ui/section'
import { SectionHeading } from '@/components/ui/section-heading'
import { pillars, pillarsSection } from '@/content/home'
import { sectionIds } from '@/content/nav'

const iconMap = {
  ShieldCheck,
  ReceiptText,
  Gauge,
  Building2,
} as const

type IconKey = keyof typeof iconMap

export function FourPillars() {
  return (
    <Section
      id={sectionIds.pillars}
      tone="light"
      divider="bottom"
      aria-labelledby="pillars-heading"
    >
      <SectionHeading
        id="pillars-heading"
        eyebrow={pillarsSection.eyebrow}
        title={pillarsSection.heading}
        lead={pillarsSection.lead}
      />

      <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {pillars.map((pillar, i) => {
          const Icon = iconMap[pillar.icon as IconKey]
          return (
            <Reveal key={pillar.title} as="li" delay={i * 60}>
              <Card padding="md" className="h-full gap-4">
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600 [&_svg]:size-5">
                  {Icon ? <Icon /> : null}
                </span>
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-base font-bold text-ink">{pillar.title}</h3>
                  <p className="text-sm leading-relaxed text-ink-muted">{pillar.description}</p>
                </div>
              </Card>
            </Reveal>
          )
        })}
      </ul>
    </Section>
  )
}
