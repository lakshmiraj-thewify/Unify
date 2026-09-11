import Image from 'next/image'
import { ArrowDown, ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { WaveDivider } from '@/components/ui/wave-divider'
import { bodyText, heading } from '@/components/ui/typography'
import { cn } from '@/lib/cn'
import { hero } from '@/content/hero'

/**
 * Hero — charcoal dark band with warm orange accents. Clean, confident,
 * corporate feel. Architecture visual in a browser-chrome-style card.
 */
export function Hero() {
  return (
    <div className="relative bg-navy-900 text-white">
      <Section
        tone="dark"
        spacing="flush"
        contained={false}
        className="overflow-hidden bg-transparent"
        aria-labelledby="hero-heading"
      >
        <Container className="py-14 lg:py-20">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-6">
              <Badge variant="primary" tone="dark" dot className="max-w-full font-semibold">
                <span className="truncate">{hero.badge}</span>
              </Badge>

              {/* Main headline */}
              <h1
                id="hero-heading"
                className={cn(
                  heading.display,
                  'mt-6 text-balance text-white tracking-tight',
                  'text-4xl sm:text-5xl lg:text-[3.5rem] leading-[1.1]',
                )}
              >
                {hero.headline.before}{' '}
                <span className="text-primary-400">{hero.headline.emphasis}</span>{' '}
                {hero.headline.after}
              </h1>

              {/* Sub-headline */}
              <p
                className={cn(
                  bodyText.lead,
                  'mt-5 max-w-readable text-pretty text-dark-fg-muted font-normal text-lg',
                )}
              >
                {hero.subheadline}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
                <Button
                  href={hero.primaryCta.href}
                  variant="primary"
                  size="lg"
                  fullWidth
                  className="sm:w-auto"
                  trailingIcon={<ArrowRight className="size-4" />}
                >
                  {hero.primaryCta.label}
                </Button>
                <Button
                  href={hero.secondaryCta.href}
                  variant="dark"
                  size="lg"
                  fullWidth
                  className="sm:w-auto"
                  trailingIcon={<ArrowDown className="size-4" />}
                >
                  {hero.secondaryCta.label}
                </Button>
              </div>

              <ul className="mt-8 flex flex-wrap items-center gap-2">
                {hero.trustClaims.map((claim) => (
                  <li key={claim.label}>
                    <Badge variant={claim.tone === 'signal' ? 'primary' : claim.tone} tone="dark" size="sm" mono={claim.numeric} dot>
                      {claim.label}
                    </Badge>
                  </li>
                ))}
              </ul>
            </div>

            {/* Visual showcase column */}
            <div className="relative lg:col-span-6">
              <div className="relative overflow-hidden rounded-[16px] border border-white/10 bg-navy-800/80 p-6 shadow-lift backdrop-blur-sm">
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-navy-950/60 flex items-center justify-center">
                  <Image
                    src="/images/visp/HyperRADIUS.png"
                    alt="Unify Cloud RADIUS High-Availability Architecture"
                    width={800}
                    height={500}
                    className="h-full w-full object-contain p-2"
                    priority
                  />
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3 text-xs text-dark-fg-muted">
                  <span className="font-semibold text-primary-300">Carrier-Grade Cloud Architecture</span>
                  <span className="font-mono text-primary-400">99.9% Uptime SLA</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Wave SVG section divider for smooth transition from dark hero to light content */}
      <WaveDivider from="dark" />
    </div>
  )
}
