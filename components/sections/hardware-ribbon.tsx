import Image from 'next/image'
import { CheckCircle2, Clock } from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'
import { Section } from '@/components/ui/section'
import { sectionIds } from '@/content/nav'
import { hardware } from '@/content/hardware'

/**
 * Hardware section — blueprint Section 2.
 * Clean 2-column layout: text + features on left, provisioning visual on right.
 */
export function HardwareRibbon() {
  return (
    <Section
      id={sectionIds.hardware}
      tone="light"
      spacing="default"
      divider="bottom"
      aria-labelledby="hardware-heading"
    >
      <p className="mb-4 text-center font-mono text-xs font-semibold tracking-widest text-primary-500 uppercase">
        {hardware.eyebrow}
      </p>

      <div className="mx-auto max-w-5xl">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left: Text content */}
          <Reveal>
            <div className="flex flex-col gap-5">
              <h2
                id="hardware-heading"
                className="font-heading text-2xl font-bold tracking-tight text-ink sm:text-3xl"
              >
                {hardware.heading}
              </h2>
              <p className="text-base leading-relaxed text-ink-muted">{hardware.lead}</p>

              {/* Setup time badge */}
              <div className="inline-flex items-center gap-2 self-start rounded-full border border-primary-200 bg-primary-50 px-4 py-2">
                <Clock aria-hidden="true" className="size-4 text-primary-500" />
                <span className="text-sm font-semibold text-primary-700">
                  {hardware.setupTime} {hardware.setupLabel}
                </span>
              </div>

              {/* Feature list */}
              <ul className="mt-2 flex flex-col gap-3">
                {hardware.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-3">
                    <CheckCircle2 aria-hidden="true" className="mt-0.5 size-4.5 shrink-0 text-ok-600" />
                    <span className="text-sm font-medium text-ink-soft">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Provisioning / Hardware visualization */}
          <Reveal delay={150}>
            <div className="relative overflow-hidden rounded-[16px] border border-line bg-white p-6 shadow-card">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-surface-subtle flex items-center justify-center">
                <Image
                  src="/images/visp/sub-provisioning.png"
                  alt="MikroTik Router Provisioning and Fleet Automation"
                  width={600}
                  height={450}
                  className="h-full w-full object-contain p-2"
                />
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-line pt-3 text-xs text-ink-muted">
                <span className="font-semibold text-primary-600">One-Time RADIUS Config</span>
                <span className="font-mono text-ink-faint">Zero On-Prem Server</span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Bottom note */}
        <div className="mt-10 rounded-[16px] bg-surface-subtle border border-line px-6 py-3 text-center">
          <p className="text-xs text-ink-muted">{hardware.compatibilityNote}</p>
        </div>
      </div>
    </Section>
  )
}
