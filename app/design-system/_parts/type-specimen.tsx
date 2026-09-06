import { bodyText, heading, label } from '@/components/ui/typography'
import { formatINR, formatNumber } from '@/lib/format'
import { Spec, SpecRow } from './spec'

export function TypeSpecimen() {
  return (
    <div className="flex flex-col gap-6">
      <Spec
        title="type scale"
        note="Plus Jakarta Sans (variable). Sizes live in components/ui/typography.ts."
      >
        <div className="flex flex-col divide-y divide-line">
          <SpecRow label="heading.display — h1 only · 36 / 48 / 56">
            <p className={`${heading.display} text-ink`}>Your ISP. Unified. In the Cloud.</p>
          </SpecRow>
          <SpecRow label="heading.h2 — section heading · 30 / 40">
            <p className={`${heading.h2} text-ink`}>Four pillars. One cloud platform.</p>
          </SpecRow>
          <SpecRow label="heading.h3 — card title · 18 / 20">
            <p className={`${heading.h3} text-ink`}>Cloud RADIUS &amp; AAA</p>
          </SpecRow>
          <SpecRow label="heading.h4 — dense label · 16">
            <p className={`${heading.h4} text-ink`}>PPPoE &amp; Hotspot Authentication</p>
          </SpecRow>
          <SpecRow label="bodyText.lead — 18 / 20">
            <p className={`${bodyText.lead} max-w-2xl text-ink-muted`}>
              Connect MikroTik in 10 minutes. Automate PPPoE &amp; Hotspot billing.
            </p>
          </SpecRow>
          <SpecRow label="bodyText.base — 16">
            <p className={`${bodyText.base} max-w-2xl text-ink-soft`}>
              Authenticate every PPPoE and Hotspot session through geo-redundant cloud RADIUS.
            </p>
          </SpecRow>
          <SpecRow label="bodyText.small — 14">
            <p className={`${bodyText.small} max-w-2xl text-ink-muted`}>
              Set per-subscriber speed limits, data caps and Fair Usage Policy throttling.
            </p>
          </SpecRow>
          <SpecRow label="bodyText.micro — 12">
            <p className={`${bodyText.micro} max-w-2xl text-ink-faint`}>
              Footnote, disclaimer and assumption text.
            </p>
          </SpecRow>
          <SpecRow label="label.eyebrow">
            <p className={`${label.eyebrow} text-primary-600`}>How it works</p>
          </SpecRow>
          <SpecRow label="label.mono">
            <p className={`${label.mono} text-ink-muted`}>Active sessions</p>
          </SpecRow>
        </div>
      </Spec>

      <Spec
        title="numeric layer"
        note="JetBrains Mono + tabular figures via data-numeric. Digits never change width, so live values do not jitter."
      >
        <div className="flex flex-col divide-y divide-line">
          <SpecRow label="en-IN grouping — formatNumber()">
            <span data-numeric="" className="text-2xl font-extrabold text-ink">
              {formatNumber(50000)}
            </span>
            <span data-numeric="" className="text-2xl font-extrabold text-ink">
              {formatNumber(1234567)}
            </span>
          </SpecRow>
          <SpecRow label="currency — formatINR()">
            <span data-numeric="" className="text-2xl font-extrabold text-ink">
              {formatINR(48000)}
            </span>
          </SpecRow>
          <SpecRow label="width stability — same character count, aligned">
            <span className="flex flex-col">
              <span data-numeric="" className="text-lg font-bold text-ink">
                111,111
              </span>
              <span data-numeric="" className="text-lg font-bold text-ink">
                999,999
              </span>
            </span>
          </SpecRow>
        </div>
      </Spec>
    </div>
  )
}
