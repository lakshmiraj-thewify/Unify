import { Router } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Section } from '@/components/ui/section'
import { SectionHeading } from '@/components/ui/section-heading'
import { sectionIds } from '@/content/nav'
import { hardware, hardwareVendors } from '@/content/hardware'
import { isProvided } from '@/content/types'

/**
 * Hardware compatibility ribbon — blueprint Section 2.
 *
 * Vendors are represented by a neutral device glyph and their name set in type,
 * NOT by their trademarks: no vendor logo has been licensed or approved for use
 * here, and reproducing one would imply an endorsement that does not exist.
 *
 * The blueprint asks for a setup-time badge under each vendor but supplies only
 * MikroTik's. The remaining five render the `pending` badge rather than an
 * invented figure — see `content/hardware.ts`.
 */
export function HardwareRibbon() {
  return (
    <Section
      id={sectionIds.hardware}
      tone="subtle"
      spacing="compact"
      divider="bottom"
      aria-labelledby="hardware-heading"
    >
      <SectionHeading
        id="hardware-heading"
        eyebrow="Hardware compatibility"
        title={hardware.heading}
        lead={hardware.lead}
      />

      <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {hardwareVendors.map((vendor) => (
          <Card
            key={vendor.name}
            as="li"
            padding="sm"
            className="items-center gap-2.5 text-center"
          >
            <span
              aria-hidden="true"
              className="inline-flex size-9 items-center justify-center rounded-lg bg-primary-50 text-primary-600 [&_svg]:size-[1.125rem]"
            >
              <Router />
            </span>

            <span className="text-sm font-bold text-ink">{vendor.name}</span>

            {isProvided(vendor.setupTime) ? (
              <Badge variant="signal" size="sm" mono>
                {vendor.setupTime} setup
              </Badge>
            ) : (
              <Badge variant="pending" size="sm">
                Setup time pending
              </Badge>
            )}
          </Card>
        ))}
      </ul>
    </Section>
  )
}
