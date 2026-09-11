import { Globe, Network, RadioTower, Wifi, Zap } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Reveal } from '@/components/ui/reveal'
import { Section } from '@/components/ui/section'
import { SectionHeading } from '@/components/ui/section-heading'
import { ispSolutions, solutionsSection } from '@/content/home'
import { sectionIds } from '@/content/nav'

const iconMap = {
  RadioTower,
  Network,
  Zap,
  Wifi,
  Globe,
} as const

type IconKey = keyof typeof iconMap

/**
 * ISP Solutions — blueprint Section 7.
 * Operator segment solutions as clean white cards with circular icon badges.
 */
export function IspSolutions() {
  return (
    <Section
      id={sectionIds.solutions}
      tone="light"
      spacing="default"
      divider="bottom"
      aria-labelledby="solutions-heading"
    >
      <SectionHeading
        id="solutions-heading"
        eyebrow={solutionsSection.eyebrow}
        title={solutionsSection.heading}
        lead={solutionsSection.lead}
      />

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {ispSolutions.map((sol, i) => {
          const Icon = iconMap[sol.icon as IconKey]
          return (
            <Reveal key={sol.segment} as="div" delay={i * 70}>
              <Card
                tone="light"
                padding="none"
                interactive
                className="h-full flex flex-col justify-between p-6"
              >
                <div>
                  <span className="inline-flex size-12 items-center justify-center rounded-full bg-primary-50 text-primary-500 border border-primary-100 group-hover:bg-primary-500 group-hover:text-white transition-colors">
                    {Icon ? <Icon className="size-6" /> : null}
                  </span>

                  <p className="mt-5 font-mono text-[0.6875rem] font-semibold tracking-[0.12em] text-primary-500 uppercase">
                    {sol.segment}
                  </p>
                  <h3 className="mt-2 font-heading text-base font-semibold text-ink group-hover:text-primary-500 transition-colors">
                    {sol.tagline}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                    {sol.description}
                  </p>
                </div>
              </Card>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
