import { Layers, Lock, Server } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Reveal } from '@/components/ui/reveal'
import { Section } from '@/components/ui/section'
import { SectionHeading } from '@/components/ui/section-heading'
import { archPoints, architectureSection } from '@/content/home'
import { sectionIds } from '@/content/nav'

const iconMap = {
  ServerStack: Server, // lucide-react has no ServerStack; Server is the closest match
  Lock,
  Layers,
} as const

type IconKey = keyof typeof iconMap

export function PlatformArchitecture() {
  return (
    <Section
      id={sectionIds.architecture}
      tone="subtle"
      divider="y"
      aria-labelledby="architecture-heading"
    >
      <SectionHeading
        id="architecture-heading"
        eyebrow={architectureSection.eyebrow}
        title={architectureSection.heading}
        lead={architectureSection.lead}
      />

      <ul className="mt-12 grid gap-6 sm:grid-cols-3">
        {archPoints.map((point, i) => {
          const Icon = iconMap[point.icon as IconKey]
          return (
            <Reveal key={point.title} as="li" delay={i * 80}>
              <Card padding="lg" className="h-full gap-5">
                <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary-600 text-white [&_svg]:size-5">
                  {Icon ? <Icon /> : null}
                </span>
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-base font-bold text-ink">{point.title}</h3>
                  <p className="text-sm leading-relaxed text-ink-muted">{point.detail}</p>
                </div>
              </Card>
            </Reveal>
          )
        })}
      </ul>
    </Section>
  )
}
