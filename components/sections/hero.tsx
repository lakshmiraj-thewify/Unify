import { ArrowDown, ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { bodyText, heading } from '@/components/ui/typography'
import { cn } from '@/lib/cn'
import { hero } from '@/content/hero'
import { HeroConsole } from './hero-console'

/**
 * Hero — blueprint Section 1.
 *
 * All copy comes from `content/hero.ts`, which transcribes the approved
 * blueprint. Nothing is written at this layer.
 *
 * The band is navy: on the family sites dark is reserved for the footer, so
 * leading with a structural dark hero is the deliberate sibling distinction
 * recorded in the Phase 1 token notes.
 */
export function Hero() {
  return (
    <Section
      tone="dark"
      spacing="flush"
      contained={false}
      className="overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-hero-glow" />

      <Container className="relative py-14 lg:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-12">
          {/* Copy */}
          <div className="flex flex-col items-start">
            <Badge variant="signal" tone="dark" dot className="max-w-full">
              <span className="truncate">{hero.badge}</span>
            </Badge>

            <h1
              id="hero-heading"
              className={cn(heading.display, 'mt-5 text-balance text-dark-fg')}
            >
              {hero.headline.before}{' '}
              <span className="text-brand-gradient-dark">{hero.headline.emphasis}</span>{' '}
              {hero.headline.after}
            </h1>

            <p className={cn(bodyText.lead, 'mt-5 max-w-readable text-pretty text-dark-fg-muted')}>
              {hero.subheadline}
            </p>

            <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
              <Button
                href={hero.primaryCta.href}
                size="lg"
                fullWidth
                className="sm:w-auto"
                trailingIcon={<ArrowRight />}
              >
                {hero.primaryCta.label}
              </Button>
              <Button
                href={hero.secondaryCta.href}
                variant="dark"
                size="lg"
                fullWidth
                className="sm:w-auto"
                trailingIcon={<ArrowDown />}
              >
                {hero.secondaryCta.label}
              </Button>
            </div>

            <ul className="mt-8 flex flex-wrap items-center gap-2">
              {hero.trustClaims.map((claim) => (
                <li key={claim.label}>
                  <Badge variant={claim.tone} tone="dark" size="sm" mono={claim.numeric} dot>
                    {claim.label}
                  </Badge>
                </li>
              ))}
            </ul>
          </div>

          {/* Product preview */}
          <div className="w-full min-w-0">
            <HeroConsole />
          </div>
        </div>
      </Container>
    </Section>
  )
}
