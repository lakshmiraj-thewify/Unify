import type { Metadata } from 'next'
import { ArrowLeft, ScrollText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Section } from '@/components/ui/section'
import { Badge } from '@/components/ui/badge'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Terms of Service — Unify Wi-Fi',
  description:
    'Terms of Service for Unify Wi-Fi (by TheWiFy Technologies Private Limited). The contractual terms governing access to and use of the platform.',
  path: '/legal/terms',
})

export default function TermsOfServicePage() {
  return (
    <>
      {/* Dark header band — consistent with other inner pages */}
      <Section tone="dark" spacing="flush" contained={false}>
        <div className="mx-auto w-full max-w-page px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="flex flex-col items-center text-center">
            <Badge variant="signal" tone="dark" size="md" dot className="mb-4">
              Legal
            </Badge>
            <h1 className="w-full max-w-readable text-3xl font-extrabold tracking-tight text-balance text-dark-fg lg:text-4xl">
              Terms of Service
            </h1>
            <p className="mt-3 w-full max-w-readable text-lg leading-relaxed text-pretty text-dark-fg-muted">
              The contractual terms governing access to and use of the Unify Wi-Fi platform.
            </p>
            <p className="mt-2 text-sm text-dark-fg-muted">
              Effective: 18 January 2026 · Last updated: 8 March 2026
            </p>
          </div>
        </div>
      </Section>

      <Section tone="subtle" spacing="default">
        <div className="mx-auto max-w-content">
          <div className="overflow-hidden border-y border-line bg-surface">
            {/* Header bar */}
            <div className="flex items-center gap-3 border-b border-line bg-surface-subtle px-6 py-4">
              <div className="flex-shrink-0 rounded-lg border border-primary-200 bg-primary-50 p-2">
                <ScrollText className="size-5 text-primary-600" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-bold text-ink">Terms of Service</p>
                <p className="text-xs text-ink-muted">TheWiFy Technologies Private Limited</p>
              </div>
            </div>

            {/* Legal content */}
            <div className="prose prose-sm max-w-none px-6 py-8 leading-relaxed text-ink-soft sm:px-10 lg:px-12 [&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:text-base [&_h2]:font-bold [&_h2]:text-ink [&_h3]:mt-5 [&_h3]:mb-2 [&_h3]:text-sm [&_h3]:font-bold [&_h3]:text-ink [&_li]:leading-relaxed [&_p]:mb-3 [&_p]:text-sm [&_strong]:font-semibold [&_strong]:text-ink [&_ul]:mb-3 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5 [&_ul]:text-sm">
              <p className="mb-6 text-sm text-ink-muted">
                Unify Wi-Fi is a product of TheWiFy Technologies Private Limited. These Terms of
                Service apply to the Unify Wi-Fi platform.
              </p>

              <p>
                These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of Unify
                Wi-Fi&apos;s website, platform, and services. By using our services, you agree to be
                bound by these Terms. If you do not agree, please do not use our services.
              </p>

              <h2>1. Definitions</h2>
              <ul>
                <li>
                  &ldquo;Unify Wi-Fi&rdquo; / &ldquo;we&rdquo; / &ldquo;us&rdquo; /
                  &ldquo;our&rdquo; refers to the Unify Wi-Fi platform operated by TheWiFy
                  Technologies Private Limited.
                </li>
                <li>
                  &ldquo;Customer&rdquo; refers to ISP operators, WISPs, LCOs, or businesses who
                  subscribe to Unify Wi-Fi services.
                </li>
                <li>
                  &ldquo;Subscriber&rdquo; refers to end users whose internet access is managed
                  through the Unify Wi-Fi platform.
                </li>
                <li>
                  &ldquo;Services&rdquo; refers to the cloud RADIUS platform, subscriber management,
                  billing automation, and related features.
                </li>
                <li>
                  &ldquo;Platform&rdquo; refers to the Unify Wi-Fi web application, APIs, and
                  management dashboard.
                </li>
              </ul>

              <h2>2. Service Overview</h2>
              <p>
                Unify Wi-Fi provides a cloud-managed ISP platform built on a geo-redundant RADIUS
                infrastructure, optimised for MikroTik routers. Services include PPPoE and Hotspot
                authentication, subscriber management, automated billing and invoicing, WhatsApp
                payment reminders, FUP and bandwidth throttling, and white-label reseller portals
                for LCO partners.
              </p>

              <h2>3. Account Responsibilities</h2>
              <ul>
                <li>You are responsible for all activity that occurs under your account.</li>
                <li>
                  You must keep access credentials secure and notify us immediately of any
                  unauthorised use.
                </li>
                <li>
                  You agree to provide accurate and current business information when registering.
                </li>
                <li>You must not share account credentials with unauthorised parties.</li>
                <li>
                  You are responsible for managing user roles and permissions within your
                  organisation using the RBAC controls provided.
                </li>
              </ul>

              <h2>4. Acceptable Use</h2>
              <p>You agree not to:</p>
              <ul>
                <li>Use the Services for any unlawful, abusive, or harmful activity</li>
                <li>
                  Attempt to interfere with network security, RADIUS infrastructure, or service
                  availability
                </li>
                <li>
                  Reverse engineer, decompile, or attempt to extract the source code of the Platform
                </li>
                <li>
                  Use the Services to collect personal data without appropriate legal basis and
                  consent
                </li>
                <li>Resell or redistribute the Services without a valid reseller agreement</li>
                <li>Exceed any usage limits specified in your subscription plan</li>
              </ul>

              <h2>5. Data Protection</h2>
              <h3>5.1 Roles and responsibilities</h3>
              <ul>
                <li>
                  The Customer (ISP operator) is the data controller for subscriber data collected
                  through the platform.
                </li>
                <li>
                  Unify Wi-Fi acts as a data processor, processing subscriber data on behalf of the
                  Customer.
                </li>
                <li>
                  Unify Wi-Fi is the data controller for data collected directly through this
                  website (contact forms, demo requests).
                </li>
              </ul>

              <h3>5.2 Data processing obligations</h3>
              <p>As a data processor, Unify Wi-Fi shall:</p>
              <ul>
                <li>Process personal data only on documented instructions from the Customer</li>
                <li>
                  Implement appropriate technical and organisational security measures (including
                  AES-256-GCM encryption, row-level tenant isolation, and RBAC)
                </li>
                <li>
                  Not engage sub-processors without prior written authorisation from the Customer
                </li>
                <li>Assist the Customer in responding to data subject rights requests</li>
                <li>
                  Delete or return all personal data upon termination of the service, at the
                  Customer&apos;s choice
                </li>
              </ul>

              <h3>5.3 Customer obligations</h3>
              <p>The Customer shall:</p>
              <ul>
                <li>Ensure a valid legal basis exists for collecting subscriber data</li>
                <li>Comply with applicable data protection laws in their jurisdiction</li>
                <li>
                  Respond to data subject access requests from their subscribers within the
                  timeframes required by law
                </li>
                <li>
                  Not instruct Unify Wi-Fi to process data in a manner that would violate applicable
                  law
                </li>
              </ul>

              <h2>6. Payment and Billing</h2>
              <ul>
                <li>
                  Subscription fees are billed in advance on a monthly or annual basis as selected.
                </li>
                <li>
                  Subscriber payment collection is processed via UPI, Razorpay, or Stripe as
                  configured by the Customer.
                </li>
                <li>
                  All fees are exclusive of applicable taxes (including GST) unless stated
                  otherwise.
                </li>
                <li>
                  Failure to pay may result in suspension of Services after a 14-day grace period
                  and written notice.
                </li>
              </ul>

              <h2>7. Service Level</h2>
              <p>
                Unify Wi-Fi targets 99.99% uptime for the cloud RADIUS authentication service and
                management platform. Scheduled maintenance windows will be communicated at least 48
                hours in advance. This is a target SLA — a separate SLA agreement is required for
                contractual uptime guarantees.
              </p>

              <h2>8. Intellectual Property</h2>
              <p>
                The Unify Wi-Fi platform, its content, features, and software are owned by TheWiFy
                Technologies Private Limited and protected by applicable intellectual property laws.
                You may not copy, modify, distribute, or create derivative works of the Platform
                without our written permission.
              </p>
              <p>
                Customers retain ownership of their data, subscriber records, and custom branding
                assets. Unify Wi-Fi grants Customers a non-exclusive licence to use the Platform
                during the subscription term.
              </p>

              <h2>9. Warranty Disclaimer</h2>
              <p>
                The Services are provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo;
                basis. We disclaim all warranties, express or implied, to the maximum extent
                permitted by law, including warranties of merchantability, fitness for a particular
                purpose, and non-infringement.
              </p>

              <h2>10. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, Unify Wi-Fi shall not be liable for any
                indirect, incidental, special, consequential, or punitive damages, including loss of
                profits, data, or business opportunities. Our total aggregate liability shall not
                exceed the fees paid by you in the 12 months preceding the claim.
              </p>
              <p>
                Nothing in these Terms excludes or limits liability for death or personal injury
                caused by negligence, fraud, or any liability that cannot be excluded by law.
              </p>

              <h2>11. Termination</h2>
              <ul>
                <li>Either party may terminate the agreement with 30 days&apos; written notice.</li>
                <li>
                  We may suspend or terminate access immediately if you materially breach these
                  Terms.
                </li>
                <li>
                  Upon termination, your right to use the Services ends. We will provide data export
                  options for 30 days following termination.
                </li>
                <li>
                  All personal data processed on your behalf will be deleted or returned within 90
                  days of termination.
                </li>
              </ul>

              <h2>12. Governing Law and Disputes</h2>
              <p>
                These Terms are governed by the laws of India. Any disputes shall be resolved
                through good-faith negotiation first, followed by binding arbitration in Hyderabad,
                India.
              </p>

              <h2>13. Changes to These Terms</h2>
              <p>
                We may update these Terms from time to time. Material changes will be communicated
                via email or a prominent notice on our website at least 30 days before they take
                effect. Continued use of the Services after changes constitutes acceptance.
              </p>

              <h2>14. Contact</h2>
              <p>
                Questions about these Terms? Contact us at{' '}
                <a
                  href="mailto:support@thewify.com"
                  className="text-primary-600 hover:text-primary-700"
                >
                  support@thewify.com
                </a>
                .
              </p>
            </div>
          </div>

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
