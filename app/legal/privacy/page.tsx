import type { Metadata } from 'next'
import { ArrowLeft, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Section } from '@/components/ui/section'
import { Badge } from '@/components/ui/badge'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Privacy Policy — Unify Wi-Fi',
  description:
    'Privacy Policy for Unify Wi-Fi (by TheWiFy Technologies Private Limited). How we collect, use, store, and share personal data.',
  path: '/legal/privacy',
})

export default function PrivacyPolicyPage() {
  return (
    <>
      {/* Dark header band — consistent with other inner pages */}
      <Section tone="dark" spacing="flush" contained={false} className="relative overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-hero-glow" />
        <div className="relative mx-auto w-full max-w-page px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="flex flex-col items-center text-center">
            <Badge variant="signal" tone="dark" size="md" dot className="mb-4">
              Legal
            </Badge>
            <h1 className="w-full max-w-readable text-3xl font-extrabold tracking-tight text-balance text-dark-fg lg:text-4xl">
              Privacy Policy
            </h1>
            <p className="mt-3 w-full max-w-readable text-lg leading-relaxed text-pretty text-dark-fg-muted">
              How Unify Wi-Fi collects, stores, and uses your data.
            </p>
            <p className="mt-2 text-sm text-dark-fg-muted">
              Effective: 18 January 2026 · Last updated: 8 March 2026
            </p>
          </div>
        </div>
      </Section>

      <Section tone="subtle" spacing="default">
        <div className="mx-auto max-w-content">
          <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-card">
            {/* Header bar */}
            <div className="flex items-center gap-3 border-b border-line bg-surface-subtle px-6 py-4">
              <div className="flex-shrink-0 rounded-lg border border-primary-200 bg-primary-50 p-2">
                <FileText className="size-5 text-primary-600" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-bold text-ink">Privacy Policy</p>
                <p className="text-xs text-ink-muted">TheWiFy Technologies Private Limited</p>
              </div>
            </div>

            {/* Legal content */}
            <div className="prose prose-sm max-w-none px-6 py-8 leading-relaxed text-ink-soft sm:px-10 lg:px-12 [&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:text-base [&_h2]:font-bold [&_h2]:text-ink [&_h3]:mt-5 [&_h3]:mb-2 [&_h3]:text-sm [&_h3]:font-bold [&_h3]:text-ink [&_li]:leading-relaxed [&_p]:mb-3 [&_p]:text-sm [&_strong]:font-semibold [&_strong]:text-ink [&_ul]:mb-3 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5 [&_ul]:text-sm">
              <p className="mb-6 text-sm text-ink-muted">
                Unify Wi-Fi is a product of TheWiFy Technologies Private Limited. This Privacy
                Policy applies to the Unify Wi-Fi platform and website.
              </p>

              <p>
                TheWiFy (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) provides a
                cloud-managed guest Wi-Fi platform optimised for MikroTik routers. This Privacy
                Policy explains how we collect, use, store, and share personal data when you visit
                our website, use our services, or interact with captive portals powered by TheWiFy.
                We are committed to protecting your privacy in accordance with applicable data
                protection laws.
              </p>

              <h2>1. Data Controller</h2>
              <p>
                The data controller for personal data collected through this website and the Unify
                Wi-Fi platform is:
              </p>
              <p>
                <strong>TheWiFy Technologies Private Limited</strong>
                <br />
                K5 Shriya Serenity, Nanakram Guda, Hyderabad 500032, India
                <br />
                Email:{' '}
                <a
                  href="mailto:privacy@thewify.com"
                  className="text-primary-600 hover:text-primary-700"
                >
                  privacy@thewify.com
                </a>
              </p>
              <p>
                Where TheWiFy processes subscriber or guest WiFi data on behalf of an ISP operator
                or MSP, the operator is the data controller and TheWiFy acts as a data processor.
              </p>

              <h2>2. Information We Collect</h2>
              <h3>Website and platform visitors:</h3>
              <ul>
                <li>
                  Business contact details: name, email, phone number, company name (via contact and
                  demo request forms)
                </li>
                <li>Technical data: IP address, browser type, device information, pages visited</li>
                <li>Cookie data (see Section 10)</li>
              </ul>
              <h3>ISP subscribers (processed on behalf of ISP operators):</h3>
              <ul>
                <li>Authentication data: username, password hash, session tokens</li>
                <li>
                  Session data: device identifiers, IP address, connection timestamps, session
                  duration, data usage
                </li>
                <li>
                  Billing data: payment records processed via UPI, Razorpay, or Stripe (we do not
                  store card details)
                </li>
                <li>
                  Contact details shared by the ISP: subscriber name, phone number, WhatsApp number
                </li>
              </ul>

              <h2>3. Lawful Basis for Processing</h2>
              <p>We process personal data under the following lawful bases:</p>
              <ul>
                <li>
                  <strong>Consent:</strong> Marketing communications and analytics cookies. You can
                  withdraw consent at any time.
                </li>
                <li>
                  <strong>Contract performance:</strong> Processing necessary to provide our ISP
                  management services, process demo requests, and manage accounts.
                </li>
                <li>
                  <strong>Legitimate interests:</strong> Website security, fraud prevention, and
                  service improvement.
                </li>
                <li>
                  <strong>Legal obligation:</strong> Compliance with applicable laws and lawful
                  authority requests.
                </li>
              </ul>

              <h2>4. How We Use Information</h2>
              <ul>
                <li>Provide, secure, and improve the Unify Wi-Fi platform and services</li>
                <li>Authenticate subscriber PPPoE and Hotspot sessions via cloud RADIUS</li>
                <li>Automate billing, invoicing, and payment collection for ISP operators</li>
                <li>
                  Send WhatsApp renewal reminders to ISP subscribers on behalf of the operator
                </li>
                <li>Process demo requests and respond to enquiries</li>
                <li>Send service updates and, where consented, marketing communications</li>
                <li>Detect and prevent fraud, abuse, and security threats</li>
              </ul>

              <h2>5. How We Share Information</h2>
              <ul>
                <li>
                  <strong>ISP operators:</strong> Subscriber data is shared with and managed by the
                  ISP operator who manages the network (as they are the data controller for their
                  subscribers).
                </li>
                <li>
                  <strong>Sub-processors:</strong> All sub-processors are bound by data processing
                  agreements covering cloud infrastructure, email delivery, SMS/WhatsApp messaging,
                  and payment processing.
                </li>
                <li>
                  <strong>Legal authorities:</strong> When required by law, court order, or to
                  protect our rights and safety.
                </li>
              </ul>
              <p>We do not sell personal data to third parties.</p>

              <h2>6. Data Retention</h2>
              <ul>
                <li>
                  Contact form submissions: Retained for up to 24 months from last interaction, then
                  deleted or anonymised.
                </li>
                <li>
                  Subscriber session data: Retained for up to 12 months as configured by the ISP
                  operator, then automatically purged.
                </li>
                <li>
                  Authentication logs: Retained for up to 12 months for security and compliance
                  audit trails.
                </li>
                <li>
                  Payment records: Retained as required by applicable tax and accounting laws
                  (typically 7 years).
                </li>
              </ul>

              <h2>7. Data Security</h2>
              <p>
                We implement appropriate technical and organisational measures to protect personal
                data, including:
              </p>
              <ul>
                <li>AES-256-GCM encryption for data at rest</li>
                <li>TLS 1.2+ encryption for data in transit</li>
                <li>Row-level tenant isolation in our multi-tenant database</li>
                <li>Role-based access control (RBAC) for platform administrators</li>
                <li>Regular security audits and vulnerability assessments</li>
                <li>Automated health monitoring and incident response procedures</li>
              </ul>

              <h2>8. Your Rights</h2>
              <p>You have the following rights regarding your personal data:</p>
              <ul>
                <li>
                  <strong>Right of access:</strong> Request a copy of your personal data.
                </li>
                <li>
                  <strong>Right to rectification:</strong> Correct inaccurate or incomplete data.
                </li>
                <li>
                  <strong>Right to erasure:</strong> Request deletion of your data.
                </li>
                <li>
                  <strong>Right to restriction:</strong> Restrict processing of your data in certain
                  circumstances.
                </li>
                <li>
                  <strong>Right to data portability:</strong> Receive your data in a structured,
                  machine-readable format.
                </li>
                <li>
                  <strong>Right to object:</strong> Object to processing based on legitimate
                  interests or direct marketing.
                </li>
                <li>
                  <strong>Right to withdraw consent:</strong> Withdraw consent at any time without
                  affecting the lawfulness of prior processing.
                </li>
              </ul>
              <p>
                To exercise any of these rights, contact us at{' '}
                <a
                  href="mailto:privacy@thewify.com"
                  className="text-primary-600 hover:text-primary-700"
                >
                  privacy@thewify.com
                </a>
                . We will respond within 30 days.
              </p>
              <p>
                ISP subscribers: If you are a subscriber of an ISP powered by Unify Wi-Fi, please
                contact your ISP first, as they are the data controller for your subscriber data.
              </p>

              <h2>9. International Data Transfers</h2>
              <p>
                Our primary infrastructure is hosted on Google Cloud Platform. Where personal data
                is transferred internationally, we ensure appropriate safeguards are in place,
                including data processing agreements with all sub-processors.
              </p>

              <h2>10. Cookies</h2>
              <p>
                We use cookies and similar technologies on our website. For full details on the
                cookies we use, their purposes, and how to manage your preferences, please see our{' '}
                <a href="/legal/cookies" className="text-primary-600 hover:text-primary-700">
                  Cookie Policy
                </a>
                .
              </p>

              <h2>11. Children&apos;s Privacy</h2>
              <p>
                Our services are not directed at individuals under the age of 16. We do not
                knowingly collect personal data from children. If you believe a child has provided
                us with personal data, please contact us and we will delete it promptly.
              </p>

              <h2>12. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. Material changes will be
                communicated via our website or email. The &ldquo;Last updated&rdquo; date at the
                top of this page indicates when the policy was last revised.
              </p>

              <h2>13. Contact &amp; Data Protection</h2>
              <p>For privacy-related enquiries or to exercise your data subject rights:</p>
              <p>
                <strong>Data Protection Team</strong>
                <br />
                Email:{' '}
                <a
                  href="mailto:privacy@thewify.com"
                  className="text-primary-600 hover:text-primary-700"
                >
                  privacy@thewify.com
                </a>
                <br />
                General:{' '}
                <a
                  href="mailto:support@thewify.com"
                  className="text-primary-600 hover:text-primary-700"
                >
                  support@thewify.com
                </a>
                <br />
                Address: K5 Shriya Serenity, Nanakram Guda, Hyderabad 500032, India
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
