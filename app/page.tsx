import type { Metadata } from 'next'
import { ArrowRight } from 'lucide-react'
import { UnifyLogo } from '@/components/brand/unify-logo'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Section } from '@/components/ui/section'
import { SectionHeading } from '@/components/ui/section-heading'
import { bodyText, label } from '@/components/ui/typography'
import { primaryNav } from '@/content/nav'

/*
 * ---------------------------------------------------------------------------
 * PHASE 2 replaces this file.
 *
 * A deliberate scaffold, not a draft of the homepage. It carries no approved
 * marketing copy, no statistics and no product claims, so there is nothing here
 * that could be mistaken for signed-off content or quietly survive into the
 * real build. `noindex` is set for the same reason.
 * ---------------------------------------------------------------------------
 */

export const metadata: Metadata = {
  // Title and description are inherited from the root layout.
  alternates: { canonical: '/' },
  robots: { index: false, follow: false },
}

export default function HomePlaceholderPage() {
  return (
    <Section tone="dark" spacing="default">
      <div className="flex flex-col items-start gap-6">
        <UnifyLogo tone="dark" size="lg" />
        <Badge variant="pending" tone="dark">
          Phase 1 · foundation only
        </Badge>
        <SectionHeading
          align="left"
          tone="dark"
          as="h1"
          size="h2"
          title="Foundation in place. Homepage not built yet."
          lead="Design tokens, typography, layout shell and the base UI primitives are complete and verified. The approved 16-section homepage is Phase 2."
        />
        <Button href="/design-system" variant="dark" size="lg" trailingIcon={<ArrowRight />}>
          Open the design system
        </Button>

        <div className="mt-4 flex flex-col gap-3 border-t border-dark-line pt-6">
          <p className={`${label.mono} text-signal-300`}>Routes queued</p>
          <ul className={`${bodyText.small} flex flex-wrap gap-x-5 gap-y-1 text-dark-fg-muted`}>
            {primaryNav.map((item) => (
              <li key={item.label} className="font-mono text-xs">
                {String(item.href)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
