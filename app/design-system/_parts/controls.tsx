import { ArrowRight, CalendarCheck, ExternalLink } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Eyebrow } from '@/components/ui/eyebrow'
import { Spec, SpecRow } from './spec'

const badgeVariants = ['neutral', 'primary', 'signal', 'ok', 'warn', 'danger', 'pending'] as const

export function Controls() {
  return (
    <div className="flex flex-col gap-6">
      <Spec
        title="button"
        note="One component; renders <button>, next/link or a plain <a> for off-site."
      >
        <div className="divide-line flex flex-col divide-y">
          <SpecRow label="variant × size — primary">
            <Button size="sm">Book a Demo</Button>
            <Button size="md">Book a Demo</Button>
            <Button size="lg" trailingIcon={<ArrowRight />}>
              Book a Demo
            </Button>
          </SpecRow>
          <SpecRow label="variant × size — secondary">
            <Button variant="secondary" size="sm">
              See How It Works
            </Button>
            <Button variant="secondary" size="md">
              See How It Works
            </Button>
            <Button variant="secondary" size="lg" trailingIcon={<ArrowRight />}>
              See How It Works
            </Button>
          </SpecRow>
          <SpecRow label="variant — ghost / link">
            <Button variant="ghost" size="md">
              Learn More
            </Button>
            <Button variant="link" size="md" trailingIcon={<ArrowRight />}>
              View all features
            </Button>
          </SpecRow>
          <SpecRow label="with leading icon">
            <Button variant="secondary" size="md" leadingIcon={<CalendarCheck />}>
              Pick a slot
            </Button>
          </SpecRow>
          <SpecRow label="state — disabled / loading">
            <Button disabled>Disabled</Button>
            <Button loading loadingLabel="Sending…">
              Get my savings report
            </Button>
            <Button variant="secondary" loading>
              Submitting
            </Button>
          </SpecRow>
          <SpecRow label="as internal link (next/link) / as external anchor">
            <Button href="/design-system" variant="secondary" size="md">
              Internal route
            </Button>
            <Button
              href="https://guestwifi.thewify.com"
              external
              variant="link"
              size="md"
              trailingIcon={<ExternalLink />}
            >
              guestwifi.thewify.com
            </Button>
          </SpecRow>
          <SpecRow label="fullWidth — pricing card CTA">
            <span className="w-full max-w-xs">
              <Button fullWidth size="md">
                Talk to Us
              </Button>
            </span>
          </SpecRow>
        </div>
      </Spec>

      <Spec
        title="button — on dark"
        tone="dark"
        note="`dark` is the secondary pairing inside a navy band. The focus ring switches to cyan."
      >
        <div className="flex flex-wrap items-center gap-3">
          <Button size="lg">Book a Demo</Button>
          <Button variant="dark" size="lg">
            Read the architecture
          </Button>
          <Button variant="dark" size="md" disabled>
            Disabled
          </Button>
        </div>
      </Spec>

      <div className="grid gap-6 lg:grid-cols-2">
        <Spec
          title="badge"
          note="`pending` is dashed and muted — it marks a fact awaiting sign-off."
        >
          <div className="divide-line flex flex-col divide-y">
            <SpecRow label="variants · md">
              {badgeVariants.map((variant) => (
                <Badge key={variant} variant={variant}>
                  {variant}
                </Badge>
              ))}
            </SpecRow>
            <SpecRow label="variants · sm">
              {badgeVariants.map((variant) => (
                <Badge key={variant} variant={variant} size="sm">
                  {variant}
                </Badge>
              ))}
            </SpecRow>
            <SpecRow label="dot / live / mono">
              <Badge variant="ok" dot>
                MikroTik 10 min
              </Badge>
              <Badge variant="signal" live>
                Live
              </Badge>
              <Badge variant="primary" mono>
                RouterOS 7
              </Badge>
              <Badge variant="pending">Setup time pending</Badge>
            </SpecRow>
          </div>
        </Spec>

        <Spec title="badge — on dark" tone="dark">
          <div className="flex flex-col gap-3">
            <span className="flex flex-wrap gap-2">
              {badgeVariants.map((variant) => (
                <Badge key={variant} variant={variant} tone="dark">
                  {variant}
                </Badge>
              ))}
            </span>
            <span className="flex flex-wrap gap-2">
              <Badge variant="signal" tone="dark" live>
                Live
              </Badge>
              <Badge variant="ok" tone="dark" dot>
                99.99% uptime
              </Badge>
              <Badge variant="neutral" tone="dark" mono>
                sub-15ms
              </Badge>
            </span>
          </div>
        </Spec>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Spec title="eyebrow" note="Plain uppercase label above a heading. Not a pill.">
          <div className="flex flex-col gap-3">
            <Eyebrow>How it works</Eyebrow>
            <Eyebrow live>Live dashboard</Eyebrow>
          </div>
        </Spec>
        <Spec title="eyebrow — on dark" tone="dark">
          <div className="flex flex-col gap-3">
            <Eyebrow tone="dark">Platform architecture</Eyebrow>
            <Eyebrow tone="dark" live>
              Real-time
            </Eyebrow>
          </div>
        </Spec>
      </div>
    </div>
  )
}
