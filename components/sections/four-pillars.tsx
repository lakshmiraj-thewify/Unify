import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { Reveal } from '@/components/ui/reveal'
import { Section } from '@/components/ui/section'
import { SectionHeading } from '@/components/ui/section-heading'
import { pillars, pillarsSection } from '@/content/home'
import { sectionIds } from '@/content/nav'

const pillarImages = [
  '/images/visp/activation-server-3.png',
  '/images/visp/billing-1.png',
  '/images/visp/subscriber-Self-MGt.png',
  '/images/visp/network-monitoring-1.png',
]

/**
 * Four Pillars — Core platform capabilities presented as clean white cards
 * with image previews, 16px border-radius, and soft hover elevation.
 */
export function FourPillars() {
  return (
    <Section
      id={sectionIds.pillars}
      tone="light"
      spacing="default"
      divider="bottom"
      aria-labelledby="pillars-heading"
    >
      <SectionHeading
        id="pillars-heading"
        eyebrow={pillarsSection.eyebrow}
        title={pillarsSection.heading}
        lead={pillarsSection.lead}
      />

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {pillars.map((pillar, i) => {
          const imgSrc: string = pillarImages[i] ?? pillarImages[0] ?? ''
          return (
            <Reveal
              key={pillar.title}
              as="div"
              delay={i * 90}
            >
              <Card
                tone="light"
                padding="none"
                interactive
                className="h-full flex flex-col overflow-hidden"
              >
                {/* Visual header graphic */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-subtle p-4 flex items-center justify-center border-b border-line">
                  <Image
                    src={imgSrc}
                    alt={pillar.title}
                    width={400}
                    height={250}
                    className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 rounded-md bg-primary-500/10 px-2.5 py-0.5 font-mono text-xs font-semibold text-primary-600">
                    0{i + 1}
                  </span>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-heading text-lg font-semibold text-ink group-hover:text-primary-500 transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted flex-1">
                    {pillar.description}
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
