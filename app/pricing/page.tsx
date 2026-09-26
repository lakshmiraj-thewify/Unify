import type { Metadata } from 'next'
import { PricingContent } from '@/components/pages/pricing-content'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Pricing — Transparent Plans for ISPs, WISPs & LCOs',
  description:
    'Predictable, transparent cloud RADIUS and ISP billing pricing. Starter, Growth, and Scale tiers with no hidden fees and a free 30-day trial.',
  path: '/pricing',
})

export default function PricingPage() {
  return <PricingContent />
}
