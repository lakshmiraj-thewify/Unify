import { Radio, ShieldCheck, Wallet } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Reveal } from '@/components/ui/reveal'
import { SectionHeading } from '@/components/ui/section-heading'
import { Stat } from '@/components/ui/stat'
import { bodyText, heading } from '@/components/ui/typography'
import { formatNumber } from '@/lib/format'
import { Spec, SpecRow } from './spec'

export function Surfaces() {
  return (
    <div className="flex flex-col gap-6">
      <Spec
        title="card"
        note="tone × padding × interactive. Link cards get a `group` hook and an offset focus ring."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <span className="mb-4 inline-flex size-11 items-center justify-center rounded-xl bg-brand-gradient text-white shadow-primary">
              <Radio className="size-5" aria-hidden="true" />
            </span>
            <h3 className={heading.h3}>tone=&quot;light&quot;</h3>
            <p className={`${bodyText.small} mt-2 text-ink-muted`}>Default card on a white band.</p>
          </Card>

          <Card tone="subtle" interactive>
            <span className="mb-4 inline-flex size-11 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
              <Wallet className="size-5" aria-hidden="true" />
            </span>
            <h3 className={heading.h3}>tone=&quot;subtle&quot; interactive</h3>
            <p className={`${bodyText.small} mt-2 text-ink-muted`}>
              Hover raises it and warms the border.
            </p>
          </Card>

          <Card href="/design-system" padding="lg">
            <span className="mb-4 inline-flex size-11 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
              <ShieldCheck className="size-5" aria-hidden="true" />
            </span>
            <h3 className={`${heading.h3} transition-colors group-hover:text-primary-700`}>
              href — whole card is the link
            </h3>
            <p className={`${bodyText.small} mt-2 text-ink-muted`}>padding=&quot;lg&quot;</p>
          </Card>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <Card padding="sm">
            <p className={bodyText.small}>padding=&quot;sm&quot;</p>
          </Card>
          <Card padding="md">
            <p className={bodyText.small}>padding=&quot;md&quot;</p>
          </Card>
          <Card padding="none" className="p-0">
            <span className="block border-b border-line bg-surface-subtle px-4 py-2 font-mono text-[0.6875rem] uppercase">
              padding=&quot;none&quot;
            </span>
            <span className="block px-4 py-3 text-sm">For cards with their own header band.</span>
          </Card>
        </div>
      </Spec>

      <Spec title="card — on dark" tone="dark">
        <div className="grid gap-4 sm:grid-cols-2">
          <Card tone="dark">
            <h3 className={`${heading.h3} text-dark-fg`}>Multi-tenant isolation</h3>
            <p className={`${bodyText.small} mt-2 text-dark-fg-muted`}>
              tone=&quot;dark&quot; — translucent navy over the band.
            </p>
          </Card>
          <Card tone="dark" interactive>
            <h3 className={`${heading.h3} text-dark-fg`}>White-label stack</h3>
            <p className={`${bodyText.small} mt-2 text-dark-fg-muted`}>
              tone=&quot;dark&quot; interactive.
            </p>
          </Card>
        </div>
      </Spec>

      <div className="grid gap-6 lg:grid-cols-2">
        <Spec
          title="stat"
          note="Values arrive pre-formatted. data-numeric applies mono + tabular figures."
        >
          <div className="flex flex-col divide-y divide-line">
            <SpecRow label="size sm / md / lg">
              <Stat size="sm" value="200+" label="Active ISPs" />
              <Stat size="md" value={`${formatNumber(50000)}+`} label="Subscribers managed" />
              <Stat size="lg" value="99.99%" label="RADIUS uptime" />
            </SpecRow>
            <SpecRow label="align=center with hint">
              <Stat
                align="center"
                value="10 min"
                label="MikroTik setup"
                hint="One-time, three fields"
              />
            </SpecRow>
          </div>
        </Spec>

        <Spec title="stat — on dark" tone="dark">
          <div className="grid grid-cols-2 gap-6">
            <Stat tone="dark" value="200+" label="Active ISPs & WISPs" />
            <Stat tone="dark" value="99.99%" label="Cloud RADIUS uptime" />
          </div>
        </Spec>
      </div>

      <Spec
        title="section heading"
        note="Owns the eyebrow / heading / lead stack. `id` pairs with aria-labelledby on the parent section."
      >
        <div className="flex flex-col divide-y divide-line">
          <div className="py-5 first:pt-0">
            <SectionHeading
              eyebrow="How it works"
              title="From MikroTik router to cloud-managed subscriber — in under 10 minutes."
              lead="Point RADIUS at the Unify endpoint once. Everything after that is automatic."
            />
          </div>
          <div className="py-5">
            <SectionHeading
              align="left"
              eyebrow="Business model"
              title={
                <>
                  Your ISP brand. <span className="text-brand-gradient">Our cloud.</span>
                </>
              }
              lead="align=left, with an emphasised fragment."
            />
          </div>
        </div>
      </Spec>

      <Spec title="section heading — on dark" tone="dark">
        <SectionHeading
          tone="dark"
          eyebrow="Platform architecture"
          title="Enterprise-grade infrastructure. Without the enterprise complexity."
          lead="Geo-redundant AAA, multi-tenant isolation, and a white-label stack."
        />
      </Spec>

      <Spec
        title="reveal"
        note="Fades up on first intersection. Hidden start state is gated behind @media (scripting: enabled), so no-JS visitors see content immediately."
      >
        <div className="grid gap-3 sm:grid-cols-3">
          {[0, 90, 180].map((delay) => (
            <Reveal key={delay} delay={delay}>
              <Card tone="subtle" padding="sm">
                <p className="font-mono text-xs">delay={delay}ms</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Spec>
    </div>
  )
}
