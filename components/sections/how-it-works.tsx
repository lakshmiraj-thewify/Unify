import {
  ClipboardList,
  LayoutDashboard,
  RefreshCcw,
  Router,
  Wifi,
} from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'
import { Section } from '@/components/ui/section'
import { SectionHeading } from '@/components/ui/section-heading'
import { howItWorksSection, howItWorksSteps } from '@/content/home'
import { sectionIds } from '@/content/nav'
import { cn } from '@/lib/cn'

const iconMap = {
  Router,
  Wifi,
  ClipboardList,
  RefreshCcw,
  LayoutDashboard,
} as const

type IconKey = keyof typeof iconMap

export function HowItWorks() {
  return (
    <Section
      id={sectionIds.howItWorks}
      tone="subtle"
      divider="y"
      aria-labelledby="how-it-works-heading"
    >
      <SectionHeading
        id="how-it-works-heading"
        eyebrow={howItWorksSection.eyebrow}
        title={howItWorksSection.heading}
        lead={howItWorksSection.lead}
      />

      {/* Step pipeline */}
      <ol className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
        {howItWorksSteps.map((step, i) => {
          const Icon = iconMap[step.icon as IconKey]
          const isLast = i === howItWorksSteps.length - 1
          return (
            <Reveal key={step.step} as="li" delay={i * 80}>
              <div className="relative flex flex-col gap-4">
                {/* Connector line between steps — visible on lg only */}
                {!isLast && (
                  <span
                    aria-hidden="true"
                    className="absolute top-5 left-10 hidden h-px w-[calc(100%+2rem)] bg-line lg:block"
                  />
                )}

                {/* Step circle */}
                <div className="relative z-10 flex items-center gap-3 lg:flex-col lg:items-start">
                  <span
                    className={cn(
                      'inline-flex size-10 shrink-0 items-center justify-center rounded-full border-2',
                      'border-primary-600 bg-surface text-primary-600 [&_svg]:size-4',
                    )}
                  >
                    {Icon ? <Icon /> : null}
                  </span>

                  <span className="text-xs font-bold uppercase tracking-widest text-primary-600 lg:mt-3">
                    Step {step.step}
                  </span>
                </div>

                <div className="lg:mt-1">
                  <h3 className="text-base font-bold text-ink">{step.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{step.description}</p>
                </div>
              </div>
            </Reveal>
          )
        })}
      </ol>
    </Section>
  )
}
