import { ArrowRight, CalendarDays } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Section } from '@/components/ui/section'
import { WaveDivider } from '@/components/ui/wave-divider'
import { sectionIds } from '@/content/nav'
import { heading, bodyText } from '@/components/ui/typography'

/**
 * Homepage Contact CTA — blueprint Section 13.
 * Clean conversion band on charcoal dark surface with warm orange primary action.
 */
export function HomeContactCta() {
  return (
    <div className="relative bg-navy-900 text-white">
      <WaveDivider from="light" />

      <Section
        id={sectionIds.contact}
        tone="dark"
        divider="none"
        spacing="compact"
        className="bg-transparent py-12 lg:py-16"
        aria-labelledby="home-contact-heading"
      >
        <div className="flex flex-col gap-8 rounded-2xl border border-white/10 bg-navy-800/90 p-8 sm:p-12 shadow-lift sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-3">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-primary-400">
              Live Operator Walkthrough
            </span>
            <h2 id="home-contact-heading" className={`${heading.h2} text-white font-bold`}>
              Show us your network.
              <br className="hidden sm:block" /> We&apos;ll show you the opportunity.
            </h2>
            <p className={`${bodyText.lead} max-w-xl text-dark-fg-muted text-sm sm:text-base`}>
              Book a live 30-minute demo. We&apos;ll walk through your exact setup — MikroTik,
              subscriber count, and billing workflow — and show you how Unify fits in.
            </p>
          </div>

          <div className="flex shrink-0 flex-col gap-3 sm:items-end">
            <Button
              href="/contact"
              size="lg"
              variant="primary"
              trailingIcon={<CalendarDays className="size-4" />}
            >
              Book a Demo
            </Button>
            <Button href="/contact" size="md" variant="dark" trailingIcon={<ArrowRight className="size-4" />}>
              Send a message
            </Button>
          </div>
        </div>
      </Section>
    </div>
  )
}
