import { Reveal } from '@/components/ui/reveal'
import { Section } from '@/components/ui/section'
import { SectionHeading } from '@/components/ui/section-heading'
import { howItWorksSection, howItWorksSteps } from '@/content/home'
import { sectionIds } from '@/content/nav'

/**
 * How It Works — blueprint Section 5.
 * Numbered step-by-step workflow with orange step badges.
 */
export function HowItWorks() {
  return (
    <Section
      id={sectionIds.howItWorks}
      tone="light"
      spacing="default"
      divider="bottom"
      aria-labelledby="how-it-works-heading"
    >
      <SectionHeading
        id="how-it-works-heading"
        eyebrow={howItWorksSection.eyebrow}
        title={howItWorksSection.heading}
        lead={howItWorksSection.lead}
      />

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {howItWorksSteps.map((step, i) => {
          return (
            <Reveal
              key={step.step}
              as="div"
              delay={i * 90}
              className="relative flex flex-col p-6 rounded-[16px] bg-white border border-line shadow-card"
            >
              <div className="flex items-center justify-between">
                <span className="flex size-12 items-center justify-center rounded-full bg-primary-500 text-white font-bold text-base">
                  {step.step}
                </span>
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-ink-faint">
                  Step 0{step.step}
                </span>
              </div>

              <h3 className="mt-5 font-heading text-base font-semibold text-ink">
                {step.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">
                {step.description}
              </p>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
