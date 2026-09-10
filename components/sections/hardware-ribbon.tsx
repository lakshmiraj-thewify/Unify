import { CheckCircle2, Clock, Router } from 'lucide-react'
import { Section } from '@/components/ui/section'
import { sectionIds } from '@/content/nav'
import { hardware } from '@/content/hardware'

/**
 * Hardware section — blueprint Section 2.
 *
 * Redesigned to present MikroTik as the sole official hardware partner in a
 * visually intentional, balanced layout. Rather than one small card lost in a
 * row of six, the section uses a centred hero treatment that communicates
 * deliberate, confident hardware positioning.
 *
 * No other vendor is listed — the blueprint only provides MikroTik with an
 * approved setup time. Showing others with "pending" badges implied breadth
 * that isn't yet approved. This design says: "We are MikroTik specialists."
 */
export function HardwareRibbon() {
  return (
    <Section
      id={sectionIds.hardware}
      tone="subtle"
      spacing="compact"
      divider="bottom"
      aria-labelledby="hardware-heading"
    >
      {/* Section label */}
      <p className="mb-4 text-center text-xs font-bold tracking-widest text-primary-600 uppercase">
        {hardware.eyebrow}
      </p>

      <div className="mx-auto max-w-4xl">
        {/* Central card */}
        <div className="relative overflow-hidden rounded-2xl border border-primary-200 bg-gradient-to-br from-primary-50 via-surface to-surface-tint shadow-lift">
          {/* Decorative background ring */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-20 -right-20 size-72 rounded-full border border-primary-100 opacity-60"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-16 -left-16 size-56 rounded-full border border-primary-100 opacity-40"
          />

          <div className="relative grid gap-10 px-6 py-10 sm:px-10 sm:py-12 lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-12">
            {/* Left: headline */}
            <div className="flex flex-col gap-4 lg:justify-center">
              <h2
                id="hardware-heading"
                className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl"
              >
                {hardware.heading}
              </h2>
              <p className="text-base leading-relaxed text-ink-muted">{hardware.lead}</p>

              {/* Setup time badge */}
              <div className="inline-flex items-center gap-2 self-start rounded-full border border-primary-200 bg-primary-50 px-4 py-1.5">
                <Clock aria-hidden="true" className="size-3.5 text-primary-600" />
                <span className="text-xs font-bold text-primary-700">
                  {hardware.setupTime} {hardware.setupLabel}
                </span>
              </div>
            </div>

            {/* Centre: router icon */}
            <div className="flex items-center justify-center">
              <div className="relative flex flex-col items-center gap-3">
                <div className="flex size-24 items-center justify-center rounded-2xl bg-primary-600 shadow-primary sm:size-28">
                  <Router
                    aria-hidden="true"
                    className="size-12 text-white sm:size-14"
                    strokeWidth={1.5}
                  />
                </div>
                <span className="text-center text-sm font-extrabold tracking-tight text-ink">
                  MikroTik
                </span>
                <span className="rounded-full border border-ok-200 bg-ok-50 px-3 py-1 text-xs font-bold text-ok-700">
                  Official partner
                </span>
              </div>
            </div>

            {/* Right: feature list */}
            <ul className="flex flex-col gap-2.5 lg:justify-center">
              {hardware.features.map((feat) => (
                <li key={feat} className="flex items-start gap-2.5">
                  <CheckCircle2 aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-ok-600" />
                  <span className="text-sm font-semibold text-ink-soft">{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Bottom note */}
          <div className="border-t border-primary-100 bg-primary-50/50 px-6 py-3 sm:px-10">
            <p className="text-center text-xs text-ink-muted">{hardware.compatibilityNote}</p>
          </div>
        </div>
      </div>
    </Section>
  )
}
