import type { Metadata } from 'next'
import { ArrowLeft, FileText } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Section } from '@/components/ui/section'
import { bodyText } from '@/components/ui/typography'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Privacy Policy — Unify Wi-Fi',
  description:
    'Privacy Policy for Unify Wi-Fi. The approved document is currently undergoing legal review.',
  path: '/legal/privacy',
})

export default function PrivacyPolicyPage() {
  return (
    <>
      {/* Dark header band — consistent with other inner pages */}
      <Section tone="dark" spacing="flush" contained={false} className="relative overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-hero-glow" />
        <div className="mx-auto w-full max-w-page px-4 sm:px-6 lg:px-8 relative py-12 lg:py-16">
          <div className="flex flex-col items-center text-center">
            <Badge variant="signal" tone="dark" size="md" dot className="mb-4">
              Legal
            </Badge>
            <h1 className="w-full text-balance text-dark-fg max-w-readable font-extrabold text-3xl lg:text-4xl tracking-tight">
              Privacy Policy
            </h1>
            <p className="mt-5 w-full max-w-readable text-pretty text-dark-fg-muted text-lg leading-relaxed">
              How Unify Wi-Fi collects, stores, and uses your data.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="subtle" spacing="default">
        <div className="mx-auto max-w-content">
          <Card tone="light" padding="lg" className="border-line shadow-lift">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 rounded-xl bg-primary-50 border border-primary-200 p-3">
                <FileText className="size-6 text-primary-600" aria-hidden="true" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-lg font-bold text-ink">Document Pending Legal Review</h2>
                  <Badge variant="pending" size="sm">PENDING</Badge>
                </div>
                <p className={`${bodyText.base} text-ink-muted`}>
                  The approved Privacy Policy text is currently undergoing legal and editorial
                  review. This document will be published here before the platform is opened to
                  new subscribers.
                </p>
                <p className={`${bodyText.small} text-ink-faint mt-3`}>
                  If you have a privacy-related enquiry in the interim, please contact us directly
                  by email.
                </p>
              </div>
            </div>
          </Card>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button href="/" variant="secondary" size="md" leadingIcon={<ArrowLeft />}>
              Back to home
            </Button>
            <Button href="/contact" size="md">
              Contact us
            </Button>
          </div>
        </div>
      </Section>
    </>
  )
}
