import { Section } from '@/components/ui/section'
import { AnimatedStat } from '@/components/ui/animated-stat'

/**
 * Trust Stats Bar — blueprint Section 4.
 * Metrics on charcoal dark band with warm orange and teal highlights.
 */
export function TrustStats() {
  return (
    <div className="bg-navy-900 border-y border-white/10 py-4">
      <Section
        tone="dark"
        spacing="compact"
        divider="none"
        aria-label="Platform trust statistics"
        className="bg-transparent py-4 lg:py-6"
      >
        <dl className="grid grid-cols-2 divide-x divide-y divide-white/10 lg:grid-cols-4 lg:divide-y-0">
          <AnimatedStat
            numericTarget={200}
            suffix="+"
            label="Active ISPs & WISPs"
            size="lg"
            tone="dark"
            align="center"
            className="text-primary-400"
          />

          <AnimatedStat
            numericTarget={50000}
            suffix="+"
            label="Subscribers Managed"
            size="lg"
            tone="dark"
            align="center"
            className="text-signal-400"
          />

          <AnimatedStat
            numericTarget={99.99}
            suffix="%"
            decimals={2}
            label="Cloud RADIUS Uptime"
            hint="SLA"
            size="lg"
            tone="dark"
            align="center"
            className="text-primary-400"
          />

          <AnimatedStat
            numericTarget={10}
            suffix=" min"
            label="MikroTik Setup Time"
            size="lg"
            tone="dark"
            align="center"
            className="text-signal-400"
          />
        </dl>
      </Section>
    </div>
  )
}
