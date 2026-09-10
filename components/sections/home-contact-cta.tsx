import { ArrowRight, CalendarDays } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Section } from '@/components/ui/section'
import { sectionIds } from '@/content/nav'
import { heading, bodyText } from '@/components/ui/typography'

/**
 * Homepage Contact CTA — blueprint Section 13.
 * A compact conversion band that drives visitors to /contact for demo booking.
 */
export function HomeContactCta() {
  return (
    <Section
      id={sectionIds.contact}
      tone="dark"
      divider="none"
      spacing="compact"
      aria-labelledby="home-contact-heading"
    >
      <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
        <div className="flex flex-col gap-2">
          <h2 id="home-contact-heading" className={`${heading.h2} text-dark-fg`}>
            Show us your network.
            <br className="hidden sm:block" /> We&apos;ll show you the opportunity.
          </h2>
          <p className={`${bodyText.lead} max-w-xl text-dark-fg-muted`}>
            Book a live 30-minute demo. We&apos;ll walk through your exact setup — MikroTik,
            subscriber count, and billing workflow — and show you how Unify fits in.
          </p>
        </div>

        <div className="flex shrink-0 flex-col gap-3 sm:items-end">
          <Button href="/contact" size="lg" variant="primary" trailingIcon={<CalendarDays />}>
            Book a Demo
          </Button>
          <Button href="/contact" size="md" variant="dark" trailingIcon={<ArrowRight />}>
            Send a message
          </Button>
        </div>
      </div>
    </Section>
  )
}
