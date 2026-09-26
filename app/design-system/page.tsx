import { Badge } from '@/components/ui/badge'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { SectionHeading } from '@/components/ui/section-heading'
import { bodyText, heading, label } from '@/components/ui/typography'
import { UnifyLogo, UnifyMark } from '@/components/ui/unify-logo'
import { pageMetadata } from '@/lib/seo'
import { ColourTokens } from './_parts/colour-tokens'
import { Controls } from './_parts/controls'
import { Spec } from './_parts/spec'
import { Surfaces } from './_parts/surfaces'
import { TypeSpecimen } from './_parts/type-specimen'

export const metadata = pageMetadata({
  title: 'Design system',
  description: 'Internal reference for Unify Wi-Fi design tokens and UI primitives.',
  path: '/design-system',
  noIndex: true,
})

/**
 * Internal, never-indexed reference page.
 *
 * It exists to make regressions visible: every token and every primitive variant
 * is rendered here, so a change to the design layer can be reviewed in one place
 * and at every breakpoint rather than hunted across marketing sections.
 */
export default function DesignSystemPage() {
  return (
    <>
      <Section tone="dark" spacing="compact">
        <div className="flex flex-col gap-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <UnifyLogo tone="dark" size="lg" />
            <Badge variant="pending" tone="dark">
              Internal · not indexed
            </Badge>
          </div>
          <SectionHeading
            align="left"
            tone="dark"
            as="h1"
            size="h2"
            eyebrow="Phase 1 · foundation"
            title="Design system"
            lead="Every design token and every primitive variant, on light and on dark. If something is not on this page, it is not part of the system."
          />
          <p className={`${bodyText.small} text-dark-fg-muted max-w-2xl`}>
            Hues, radii and shadow treatment are inherited from thewify.com and
            guestwifi.thewify.com so Unify reads as the same house. The sibling distinctions are
            deliberate: navy is structural rather than decorative, the palette is a closed semantic
            contract, radii stop at 16px, and every number is set in mono.
          </p>
        </div>
      </Section>

      <Section tone="subtle" spacing="compact">
        <div className="flex flex-col gap-6">
          <ColourTokens />
          <TypeSpecimen />
          <Controls />
          <Surfaces />

          <Spec
            title="brand mark"
            note="PROVISIONAL — geometric stand-in until the official logo is supplied (Q1)."
          >
            <div className="flex flex-wrap items-center gap-8">
              <UnifyMark size="sm" />
              <UnifyMark size="md" />
              <UnifyMark size="lg" />
              <UnifyLogo />
            </div>
          </Spec>

          <Spec title="container" note="Four widths. No section sets its own max-w / px pair.">
            <div className="flex flex-col gap-2">
              {(['page', 'content', 'readable'] as const).map((width) => (
                <Container
                  key={width}
                  width={width}
                  className="border-primary-200 bg-primary-50 rounded-lg border py-2"
                >
                  <span className={`${label.mono} text-primary-700`}>{width}</span>
                </Container>
              ))}
            </div>
          </Spec>

          <Spec
            title="focus"
            note="One treatment site-wide, from globals.css. Tab through this page — nothing loses its ring, and dark bands switch it to cyan."
          >
            <p className={`${bodyText.small} text-ink-muted`}>
              The ring colour is a CSS variable (<code className="font-mono">--focus-ring</code>)
              that dark sections re-point, rather than a per-component override.
            </p>
          </Spec>
        </div>
      </Section>

      <Section tone="light" divider="y" spacing="compact">
        <p className={`${label.mono} text-ink-faint`}>section tone=&quot;light&quot;</p>
      </Section>
      <Section tone="subtle" divider="bottom" spacing="compact">
        <p className={`${label.mono} text-ink-faint`}>section tone=&quot;subtle&quot;</p>
      </Section>
      <Section tone="tint" divider="bottom" spacing="compact">
        <p className={`${label.mono} text-ink-faint`}>section tone=&quot;tint&quot;</p>
      </Section>
      <Section tone="dark" spacing="default">
        <div className="flex flex-col gap-2">
          <p className={`${label.mono} text-signal-300`}>section tone=&quot;dark&quot;</p>
          <p className={`${heading.h3} text-dark-fg`}>
            Default band rhythm: py-20 on mobile, py-28 from lg.
          </p>
        </div>
      </Section>
    </>
  )
}
