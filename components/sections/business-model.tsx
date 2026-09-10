import { CheckCircle2 } from 'lucide-react'
import { Section } from '@/components/ui/section'
import { SectionHeading } from '@/components/ui/section-heading'
import { businessModel } from '@/content/home'
import { sectionIds } from '@/content/nav'

function OwnershipColumn({
  side,
  items,
  accent,
}: {
  side: 'You Own' | 'We Run'
  items: string[]
  accent: string
}) {
  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-dark-line bg-navy-800/60 p-8 backdrop-blur-sm">
      <p className={`text-sm font-bold tracking-[0.12em] uppercase ${accent}`}>{side}</p>
      <ul className="flex flex-col gap-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5">
            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-signal-400" />
            <span className="text-sm text-dark-fg">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function BusinessModel() {
  return (
    <Section
      id={sectionIds.ownership}
      tone="dark"
      divider="none"
      aria-labelledby="ownership-heading"
    >
      <SectionHeading
        id="ownership-heading"
        eyebrow={businessModel.eyebrow}
        title={businessModel.heading}
        lead={businessModel.lead}
        tone="dark"
      />

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        <OwnershipColumn side="You Own" items={businessModel.youOwn} accent="text-primary-400" />
        <OwnershipColumn side="We Run" items={businessModel.weRun} accent="text-signal-400" />
      </div>
    </Section>
  )
}
