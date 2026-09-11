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
 * Clean, modern pricing cards on warm off-white background with subtle orange accents.
 */
export function HomePricingBand() {
  return (
    <Section
      id={sectionIds.pricing}
      tone="light"
      spacing="default"
      divider="bottom"
      aria-labelledby="home-pricing-heading"
      className="bg-surface"
    >
      <SectionHeading
        id="home-pricing-heading"
        eyebrow="Pricing"
        title={pricingMeta.heading}
        lead="Start free, scale as you grow. No hardware costs, no hidden fees."
      />

      <div className="mt-4 flex justify-center">
        <Badge variant="primary" size="sm">
          {pricingMeta.badge}
        </Badge>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-3 max-w-5xl mx-auto">
        {pricingTiers.map((tier) => (
          <Card
            key={tier.name}
            padding="lg"
            tone="light"
            className={cn(
              'h-full flex flex-col justify-between rounded-2xl border border-line bg-white p-8 shadow-card transition-all duration-300 hover:shadow-card-hover',
              tier.popular && 'border-2 border-primary-500 shadow-lift ring-2 ring-primary-500/10 md:-translate-y-1.5 z-10',
            )}
          >
            <div>
              {tier.popular && (
                <div className="mb-4">
                  <Badge variant="primary" size="sm" dot>
                    Most popular
                  </Badge>
                </div>
              )}

              <h3 className="text-xl font-bold font-heading text-ink">{tier.name}</h3>
              <p className="mt-1 text-xs font-medium text-ink-muted">{tier.subscribers}</p>

              {/* Price */}
              <div className="mt-5 border-y border-line/60 py-4">
                {tier.monthlyPrice !== null ? (
                  <span data-numeric="" className="text-3xl font-bold tracking-tight text-ink">
                    ₹{tier.monthlyPrice}
                    <span className="text-sm font-normal text-ink-muted">/mo</span>
                  </span>
                ) : (
                  <span className="text-base font-bold text-primary-600">
                    {tier.name === 'Scale' ? 'Custom pricing' : 'Pricing on request'}
                  </span>
                )}
                <p className="mt-1 text-xs text-ink-faint">{tier.priceNote}</p>
              </div>

              <ul className="mt-6 flex flex-col gap-3">
                {tier.features.slice(0, 4).map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-xs text-ink-soft">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary-500" />
                    <span>{feature}</span>
                  </li>
                ))}
                {tier.features.length > 4 && (
                  <li className="text-xs font-semibold text-primary-600 pl-6">
                    + {tier.features.length - 4} more features
                  </li>
                )}
              </ul>
            </div>

            <div className="mt-8 pt-4">
              <Button
                href={tier.ctaHref}
                variant={tier.popular ? 'primary' : 'outline'}
                fullWidth
                size="md"
                trailingIcon={<ArrowRight className="size-4" />}
              >
                {tier.ctaLabel}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <Button href="/pricing" variant="link" trailingIcon={<ArrowRight className="size-4" />}>
          View full pricing details
        </Button>
      </div>
    </Section>
  )
}
