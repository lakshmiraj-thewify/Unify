import { CheckCircle2 } from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'
import { Section } from '@/components/ui/section'
import { SectionHeading } from '@/components/ui/section-heading'
import { WaveDivider } from '@/components/ui/wave-divider'
import { businessModel } from '@/content/home'
import { sectionIds } from '@/content/nav'

/**
 * Business Model — blueprint Section 9.
 * Two ownership boundary cards on charcoal dark band.
 */
function OwnershipCard({
  side,
  items,
  badgeBg,
  checkColor,
}: {
  side: 'You Own' | 'We Run'
  items: string[]
  badgeBg: string
  checkColor: string
}) {
  return (
    <div className="flex flex-col rounded-[16px] border border-white/10 bg-navy-800/90 p-8 shadow-lift backdrop-blur-sm">
      <div className="flex items-center justify-between border-b border-white/10 pb-5">
        <span className={`rounded-[10px] px-3 py-1 font-mono text-xs font-semibold tracking-wider uppercase ${badgeBg}`}>
          {side}
        </span>
        <span className="text-xs text-dark-fg-muted font-medium">Clear Boundary</span>
      </div>

      <ul className="mt-6 flex flex-col gap-4">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <CheckCircle2 className={`mt-0.5 size-5 shrink-0 ${checkColor}`} />
            <span className="text-sm leading-relaxed text-dark-fg font-medium">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function BusinessModel() {
  return (
    <div className="relative bg-navy-900 text-white">
      <WaveDivider from="light" />

      <Section
        id={sectionIds.ownership}
        tone="dark"
        spacing="default"
        divider="none"
        aria-labelledby="ownership-heading"
        className="bg-transparent"
      >
        <SectionHeading
          id="ownership-heading"
          eyebrow={businessModel.eyebrow}
          title={businessModel.heading}
          lead={businessModel.lead}
          tone="dark"
        />

        <div className="mt-14 grid gap-8 sm:grid-cols-2 max-w-5xl mx-auto">
          <Reveal delay={0}>
            <OwnershipCard
              side="You Own"
              items={businessModel.youOwn}
              badgeBg="bg-primary-500/20 text-primary-300 border border-primary-400/30"
              checkColor="text-primary-400"
            />
          </Reveal>
          <Reveal delay={100}>
            <OwnershipCard
              side="We Run"
              items={businessModel.weRun}
              badgeBg="bg-signal-500/20 text-signal-300 border border-signal-400/30"
              checkColor="text-signal-400"
            />
          </Reveal>
        </div>
      </Section>

      <WaveDivider from="dark" />
    </div>
  )
}
