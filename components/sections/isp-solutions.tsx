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

export function IspSolutions() {
  return (
    <Section
      id={sectionIds.solutions}
      tone="subtle"
      divider="y"
      aria-labelledby="solutions-heading"
    >
      <SectionHeading
        id="solutions-heading"
        eyebrow={solutionsSection.eyebrow}
        title={solutionsSection.heading}
        lead={solutionsSection.lead}
      />

      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {ispSolutions.map((sol, i) => {
          const Icon = iconMap[sol.icon as IconKey]
          const isLast = i === ispSolutions.length - 1
          return (
            <Reveal key={sol.segment} as="li" delay={i * 60}>
              <Card
                padding="md"
                className={[
                  'h-full gap-4',
                  // Centre the 5th card on desktop when it's the only item in its row
                  isLast ? 'sm:col-span-2 lg:col-span-1' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600 [&_svg]:size-5">
                    {Icon ? <Icon /> : null}
                  </span>
                  <div>
                    <span className="text-xs font-bold tracking-widest text-primary-600 uppercase">
                      {sol.segment}
                    </span>
                    <h3 className="text-sm font-bold text-ink">{sol.tagline}</h3>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-ink-muted">{sol.description}</p>
              </Card>
            </Reveal>
          )
        })}
      </ul>
    </Section>
  )
}
