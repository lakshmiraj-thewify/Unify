import { Check, HelpCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { SectionHeading } from '@/components/ui/section-heading'
import { bodyText, heading, label } from '@/components/ui/typography'
import { pricingFaqs, pricingMeta, pricingTiers } from '@/content/pricing'
import { isProvided } from '@/content/types'
import { cn } from '@/lib/cn'

export function PricingContent() {
  return (
    <>
      <Section tone="dark" spacing="flush" contained={false}>
        <Container className="py-14 lg:py-20">
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <Badge variant="primary" tone="dark" size="md" dot className="mb-4">
                {pricingMeta.badge}
              </Badge>
              <h1 className={cn(heading.display, 'w-full max-w-readable text-balance text-dark-fg')}>
                {pricingMeta.heading}
              </h1>
              <p
                className={cn(
                  bodyText.lead,
                  'mt-5 w-full max-w-readable text-pretty text-dark-fg-muted',
                )}
              >
                {pricingMeta.lead}
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="subtle" spacing="default" aria-labelledby="pricing-tiers-heading" id="pricing">
        <div className="flex flex-col gap-16">
          {/* 3 Tier Pricing Cards */}
          <div className="grid gap-6 lg:grid-cols-3 max-w-6xl mx-auto w-full items-stretch">
            {pricingTiers.map((tier) => (
              <Card
                key={tier.name}
                tone="light"
                padding="lg"
                className={cn(
                  'relative flex flex-col justify-between rounded-2xl border border-line bg-white shadow-card transition-all duration-300 hover:shadow-card-hover p-8',
                  tier.popular && 'border-2 border-primary-500 shadow-lift ring-2 ring-primary-500/10 md:-translate-y-2 z-10',
                )}
              >
                {tier.popular ? (
                  <div className="absolute top-4 right-4">
                    <Badge variant="primary" size="sm" dot>
                      Most Popular
                    </Badge>
                  </div>
                ) : null}

                <div>
                  <div className="mb-4">
                    <h2
                      id={tier.popular ? 'pricing-tiers-heading' : undefined}
                      className={cn(heading.h3, 'text-ink font-heading')}
                    >
                      {tier.name}
                    </h2>
                    <p className={cn(label.mono, 'mt-1 text-primary-600')}>{tier.subscribers}</p>
                  </div>

                  {/* Price display with strict PENDING support */}
                  <div className="my-6 border-y border-line/60 py-5">
                    {isProvided(tier.monthlyPrice) ? (
                      <div className="flex items-baseline gap-1">
                        <span className="text-sm font-semibold text-ink-muted">₹</span>
                        <span
                          data-numeric=""
                          className="text-4xl font-bold tracking-tight text-ink"
                        >
                          {tier.monthlyPrice}
                        </span>
                        <span className="text-sm text-ink-muted">/month</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-start gap-2">
                        {tier.name === 'Scale' ? (
                          <span className="text-2xl font-bold text-ink">Custom Pricing</span>
                        ) : (
                          <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold text-ink">₹</span>
                            <Badge variant="pending" size="sm">
                              Amount pending confirmation
                            </Badge>
                          </div>
                        )}
                      </div>
                    )}
                    <p className={cn(bodyText.micro, 'mt-2 text-ink-muted')}>{tier.priceNote}</p>
                  </div>

                  {/* Feature checklist */}
                  <div className="mb-8">
                    <p className={cn(label.mono, 'mb-3 text-ink-faint')}>Included features</p>
                    <ul className="flex flex-col gap-3">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2.5 text-sm text-ink-soft">
                          <Check
                            aria-hidden="true"
                            className="mt-0.5 size-4 shrink-0 text-primary-500"
                          />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4">
                  <Button
                    href={tier.ctaHref}
                    variant={tier.popular ? 'primary' : 'outline'}
                    size="lg"
                    fullWidth
                  >
                    {tier.ctaLabel}
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Pricing Guarantee / Trust Banner */}
          <div className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-line bg-white shadow-card p-6 sm:p-8 max-w-6xl mx-auto w-full sm:flex-row">
            <div>
              <h3 className={cn(heading.h4, 'text-ink font-heading')}>30-Day Risk-Free Trial</h3>
              <p className={cn(bodyText.small, 'mt-1 max-w-xl text-ink-muted')}>
                Connect your router today. Test with real subscriber PPPoE/Hotspot sessions in our
                cloud environment. No payment details required.
              </p>
            </div>
            <Button href="/contact" size="md" variant="primary" className="shrink-0">
              Start Free Trial
            </Button>
          </div>

          {/* Pricing FAQ */}
          <div className="border-t border-line pt-12">
            <SectionHeading
              eyebrow="Pricing FAQ"
              title="Frequently asked questions about pricing"
              lead="Transparent terms designed for growing internet service providers."
              align="center"
              size="h2"
              className="mb-10"
            />
            <div className="mx-auto grid max-w-readable gap-4">
              {pricingFaqs.map((faq) => (
                <Card key={faq.question} padding="md" tone="light" className="rounded-xl border border-line bg-white shadow-card">
                  <div className="flex items-start gap-3">
                    <HelpCircle className="mt-0.5 size-5 shrink-0 text-primary-500" />
                    <div>
                      <h4 className={cn(heading.h4, 'text-ink font-heading')}>{faq.question}</h4>
                      <p className={cn(bodyText.small, 'mt-2 text-ink-muted')}>{faq.answer}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}
