import { Section } from '@/components/ui/section'
import { AnimatedStat } from '@/components/ui/animated-stat'

/**
 * Trust Stats Bar — blueprint Section 4.
 *
 * Renders the four approved blueprint stats with an animated count-up when the
 * section first scrolls into view:
 *   200+ Active ISPs & WISPs · 50,000+ Subscribers Managed ·
 *   99.99% Cloud RADIUS Uptime · 10 min MikroTik Setup
 *
 * All values are taken verbatim from the blueprint (pages 3–4).
 * No values are adjusted or invented.
 *
 * Animation is purely visual — the count goes from 0 to the approved number.
 * Reduced-motion users see the final value immediately.
 */
export function TrustStats() {
  return (
    <Section tone="dark" spacing="compact" divider="none" aria-label="Platform trust statistics">
      <dl className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
        {/* 200+ Active ISPs & WISPs */}
        <AnimatedStat
          numericTarget={200}
          suffix="+"
          label="Active ISPs & WISPs"
          size="lg"
          tone="dark"
          align="center"
        />

        {/* 50,000+ Subscribers Managed */}
        <AnimatedStat
          numericTarget={50000}
          suffix="+"
          label="Subscribers Managed"
          size="lg"
          tone="dark"
          align="center"
        />

        {/* 99.99% Cloud RADIUS Uptime */}
        <AnimatedStat
          numericTarget={99.99}
          suffix="%"
          decimals={2}
          label="Cloud RADIUS Uptime"
          hint="SLA"
          size="lg"
          tone="dark"
          align="center"
        />

        {/* 10 min MikroTik Setup */}
        <AnimatedStat
          numericTarget={10}
          suffix=" min"
          label="MikroTik Setup Time"
          size="lg"
          tone="dark"
          align="center"
        />
      </dl>
    </Section>
  )
}
