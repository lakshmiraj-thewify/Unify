'use client'

import { useEffect } from 'react'
import { RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Section } from '@/components/ui/section'
import { SectionHeading } from '@/components/ui/section-heading'
import { bodyText } from '@/components/ui/typography'
import { site } from '@/content/site'

/**
 * Route-level error boundary. Client component by requirement — `reset` is a
 * function passed across the boundary.
 *
 * The message is intentionally generic: `error.message` from a server component
 * is redacted in production anyway, and surfacing raw text would only leak
 * implementation detail in development while saying nothing useful to a visitor.
 * The digest is shown because it is the one value that lets a log lookup happen.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Phase 10 replaces this with the real reporting sink.
    console.error(error)
  }, [error])

  return (
    <Section tone="light" spacing="default">
      <div className="max-w-readable mx-auto flex flex-col items-center gap-6 text-center">
        <span className="text-danger-600 font-mono text-sm font-semibold tracking-[0.08em]">
          Error
        </span>
        <SectionHeading
          as="h1"
          size="h2"
          title="Something went wrong on our side."
          lead="This page failed to render. Trying again usually clears it."
        />
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button size="md" leadingIcon={<RotateCcw />} onClick={reset}>
            Try again
          </Button>
          <Button href="/" variant="secondary" size="md">
            Back to home
          </Button>
        </div>
        <p className={`${bodyText.small} text-ink-muted`}>
          If it keeps happening, email{' '}
          <a
            href={`mailto:${site.contact.email}`}
            className="text-primary-600 decoration-primary-300 font-semibold underline decoration-2 underline-offset-4"
          >
            {site.contact.email}
          </a>
          {error.digest ? (
            <>
              {' '}
              and quote reference{' '}
              <code data-numeric="" className="text-ink">
                {error.digest}
              </code>
            </>
          ) : null}
          .
        </p>
      </div>
    </Section>
  )
}
