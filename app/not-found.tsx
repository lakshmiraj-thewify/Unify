import type { Metadata } from 'next'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Section } from '@/components/ui/section'
import { SectionHeading } from '@/components/ui/section-heading'
import { bodyText } from '@/components/ui/typography'
import { site } from '@/content/site'

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <Section tone="light" spacing="default">
      <div className="max-w-readable mx-auto flex flex-col items-center gap-6 text-center">
        <span className="text-primary-600 font-mono text-sm font-semibold tracking-[0.08em]">
          404
        </span>
        <SectionHeading
          as="h1"
          size="h2"
          title="That page does not exist."
          lead="The link may be out of date, or the page may not have been published yet."
        />
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button href="/" size="md" leadingIcon={<ArrowLeft />}>
            Back to home
          </Button>
          <Button href="/contact" variant="secondary" size="md">
            Contact us
          </Button>
        </div>
        <p className={`${bodyText.small} text-ink-muted`}>
          Still stuck? Email{' '}
          <a
            href={`mailto:${site.contact.email}`}
            className="text-primary-600 decoration-primary-300 font-semibold underline decoration-2 underline-offset-4"
          >
            {site.contact.email}
          </a>
          .
        </p>
      </div>
    </Section>
  )
}
