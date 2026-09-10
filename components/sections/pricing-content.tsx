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
      <Section tone="dark" spacing="flush" contained={false} className="relative overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-hero-glow" />
        <Container className="relative py-12 lg:py-16">
          <div className="flex flex-col items-center text-center">
            <Badge variant="signal" tone="dark" size="md" dot className="mb-4">
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
        </Container>
      </Section>

      <Section tone="subtle" spacing="default" aria-labelledby="pricing-tiers-heading" id="pricing">
        <div className="flex flex-col gap-16">
          {/* 3 Tier Pricing Cards */}
          <div className="grid items-stretch gap-8 lg:grid-cols-3">
            {pricingTiers.map((tier) => (
              <Card
                key={tier.name}
                tone={tier.popular ? 'light' : 'subtle'}
                padding="lg"
                className={cn(
                  'relative flex flex-col justify-between',
                  tier.popular && 'border-primary-500 shadow-lift ring-1 ring-primary-500',
                )}
              >
                {tier.popular ? (
                  <div className="absolute top-4 right-4">
                    <Badge variant="primary" size="sm">
                      Most Popular
                    </Badge>
                  </div>
                ) : null}

                <div>
                  <div className="mb-4">
                    <h2
                      id={tier.popular ? 'pricing-tiers-heading' : undefined}
                      className={cn(heading.h3, 'text-ink')}
                    >
                      {tier.name}
                    </h2>
                    <p className={cn(label.mono, 'mt-1 text-primary-600')}>{tier.subscribers}</p>
                  </div>

                  {/* Price display with strict PENDING support */}
                  <div className="my-6 border-b border-line pb-6">
                    {isProvided(tier.monthlyPrice) ? (
                      <div className="flex items-baseline gap-1">
                        <span className="text-sm font-semibold text-ink-muted">₹</span>
                        <span
                          data-numeric=""
                          className="text-4xl font-extrabold tracking-tight text-ink"
                        >
                          {tier.monthlyPrice}
                        </span>
                        <span className="text-sm text-ink-muted">/month</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-start gap-2">
                        {tier.name === 'Scale' ? (
                          <span className="text-2xl font-extrabold text-ink">Custom Pricing</span>
                        ) : (
                          <div className="flex items-center gap-2">
                            <span className="text-2xl font-extrabold text-ink">₹</span>
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
                    <ul className="flex flex-col gap-2.5">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-sm text-ink-soft">
                          <Check
                            aria-hidden="true"
                            className="mt-0.5 size-4 shrink-0 text-ok-600"
                          />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <Button
                    href={tier.ctaHref}
                    variant={tier.popular ? 'primary' : 'secondary'}
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
          <div className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-line bg-surface p-6 sm:flex-row sm:p-8">
            <div>
              <h3 className={cn(heading.h4, 'text-ink')}>30-Day Risk-Free Trial</h3>
              <p className={cn(bodyText.small, 'mt-1 max-w-xl text-ink-muted')}>
                Connect your router today. Test with real subscriber PPPoE/Hotspot sessions in our
                cloud environment. No payment details required.
              </p>
            </div>
            <Button href="/contact" size="md" className="shrink-0">
              Start Free Trial
            </Button>
          </div>

          {/* Pricing FAQ */}
          <div className="border-t border-line pt-8">
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
                <Card key={faq.question} padding="md" tone="light">
                  <div className="flex items-start gap-3">
                    <HelpCircle className="mt-0.5 size-5 shrink-0 text-primary-600" />
                    <div>
                      <h4 className={cn(heading.h4, 'text-ink')}>{faq.question}</h4>
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
