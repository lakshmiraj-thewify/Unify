import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Section } from '@/components/ui/section'
import { SectionHeading } from '@/components/ui/section-heading'
import { pricingMeta, pricingTiers } from '@/content/pricing'
import { sectionIds } from '@/content/nav'
import { cn } from '@/lib/cn'

/**
 * Homepage Pricing Band — blueprint Section 14.
 *
 * Renders the three approved tiers (Starter / Growth / Scale) in a compact
 * band. Actual amounts are PENDING(Q4) and rendered as "Pricing on request"
 * to avoid inventing figures. The canonical pricing page at /pricing has the
 * full detail; this section drives traffic there.
 */
export function HomePricingBand() {
  return (
    <Section
      id={sectionIds.pricing}
      tone="light"
      divider="y"
      aria-labelledby="home-pricing-heading"
    >
      <SectionHeading
        id="home-pricing-heading"
        eyebrow="Pricing"
        title={pricingMeta.heading}
        lead="Start free, scale as you grow. No hardware costs, no hidden fees."
      />

      <div className="mt-4 flex justify-center">
        <Badge variant="signal" size="sm">
          {pricingMeta.badge}
        </Badge>
      </div>

      <ul className="mt-10 grid gap-5 sm:grid-cols-3">
        {pricingTiers.map((tier) => (
          <Card
            key={tier.name}
            as="li"
            padding="md"
            className={cn('h-full gap-5', tier.popular && 'border-primary-400 ring-1 ring-primary-300')}
          >
            {tier.popular && (
              <div className="-mt-1">
                <Badge variant="primary" size="sm">
                  Most popular
                </Badge>
              </div>
            )}

            <div>
              <h3 className="text-base font-bold text-ink">{tier.name}</h3>
              <p className="text-xs text-ink-muted">{tier.subscribers}</p>
            </div>

            {/* Price — PENDING(Q4) */}
            <div>
              {tier.monthlyPrice !== null ? (
                <span data-numeric="" className="text-3xl font-extrabold text-ink">
                  ₹{tier.monthlyPrice}
                  <span className="text-sm font-normal text-ink-muted">/mo</span>
                </span>
              ) : (
                <span className="text-sm font-semibold text-ink-muted">
                  {tier.name === 'Scale' ? 'Custom pricing' : 'Pricing on request'}
                </span>
              )}
              <p className="mt-1 text-xs text-ink-faint">{tier.priceNote}</p>
            </div>

            <ul className="flex flex-col gap-2">
              {tier.features.slice(0, 4).map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-xs text-ink-muted">
                  <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-primary-500" />
                  {feature}
                </li>
              ))}
              {tier.features.length > 4 && (
                <li className="text-xs text-ink-faint">+ {tier.features.length - 4} more</li>
              )}
            </ul>

            <div className="mt-auto">
              <Button
                href={tier.ctaHref}
                variant={tier.popular ? 'primary' : 'secondary'}
                fullWidth
                trailingIcon={<ArrowRight />}
              >
                {tier.ctaLabel}
              </Button>
            </div>
          </Card>
        ))}
      </ul>

      <div className="mt-8 flex justify-center">
        <Button href="/pricing" variant="link" trailingIcon={<ArrowRight />}>
          View full pricing details
        </Button>
      </div>
    </Section>
  )
}
