import type { Metadata } from 'next'
import { ArrowLeft, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Section } from '@/components/ui/section'
import { Badge } from '@/components/ui/badge'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Cookie Policy — Unify Wi-Fi',
  description:
    'Cookie Policy for Unify Wi-Fi. How we use cookies and similar tracking technologies on our website.',
  path: '/legal/cookies',
})

export default function CookiePolicyPage() {
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
              Cookie Policy
            </h1>
            <p className="mt-3 w-full max-w-readable text-lg leading-relaxed text-pretty text-dark-fg-muted">
              How we use cookies and similar technologies on the Unify Wi-Fi website.
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
                <ShieldCheck className="size-5 text-primary-600" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-bold text-ink">Cookie Policy</p>
                <p className="text-xs text-ink-muted">TheWiFy Technologies Private Limited</p>
              </div>
            </div>

            {/* Legal content */}
            <div className="prose prose-sm max-w-none px-6 py-8 leading-relaxed text-ink-soft sm:px-10 lg:px-12 [&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:text-base [&_h2]:font-bold [&_h2]:text-ink [&_h3]:mt-5 [&_h3]:mb-2 [&_h3]:text-sm [&_h3]:font-bold [&_h3]:text-ink [&_li]:leading-relaxed [&_p]:mb-3 [&_p]:text-sm [&_strong]:font-semibold [&_strong]:text-ink [&_ul]:mb-3 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5 [&_ul]:text-sm">
              <p className="mb-6 text-sm text-ink-muted">
                Unify Wi-Fi is a product of TheWiFy Technologies Private Limited. This Cookie Policy
                applies to the Unify Wi-Fi website. It should be read alongside our{' '}
                <a href="/legal/privacy" className="text-primary-600 hover:text-primary-700">
                  Privacy Policy
                </a>
                .
              </p>

              <p>
                This Cookie Policy explains how Unify Wi-Fi (&ldquo;we&rdquo;, &ldquo;us&rdquo;,
                &ldquo;our&rdquo;) uses cookies and similar tracking technologies when you visit our
                website. This policy should be read alongside our Privacy Policy.
              </p>

              <h2>What Are Cookies?</h2>
              <p>
                Cookies are small text files placed on your device when you visit a website. They
                are widely used to make websites work efficiently, provide analytics information,
                and remember your preferences. Cookies may be &ldquo;session&rdquo; cookies (deleted
                when you close your browser) or &ldquo;persistent&rdquo; cookies (remaining until
                they expire or you delete them).
              </p>

              <h2>How We Use Cookies</h2>
              <p>We use the following categories of cookies:</p>

              <h3>Strictly Necessary Cookies</h3>
              <p>
                These cookies are essential for the website to function. They enable core features
                such as page navigation, secure areas, and session management. You cannot opt out of
                these cookies as the website cannot function without them.
              </p>
              <ul>
                <li>Examples: Session ID, CSRF token, theme preference</li>
              </ul>

              <h3>Analytics Cookies</h3>
              <p>
                These cookies help us understand how visitors interact with our website by
                collecting information anonymously. This data helps us improve the website
                experience. These cookies are only set with your consent.
              </p>
              <ul>
                <li>Examples: Page views, traffic sources, user journey analytics</li>
              </ul>

              <h3>Functional Cookies</h3>
              <p>
                These cookies enable enhanced functionality and personalisation, such as remembering
                your preferences and settings. If you do not allow these cookies, some features may
                not function properly.
              </p>
              <ul>
                <li>Examples: Language preference</li>
              </ul>

              <h2>Third-Party Cookies</h2>
              <p>We may use third-party services that set their own cookies. These include:</p>
              <ul>
                <li>
                  <strong>Google Fonts</strong> — to deliver web fonts (functional)
                </li>
                <li>
                  <strong>Stripe / Razorpay</strong> — for payment processing (strictly necessary
                  for transactions)
                </li>
              </ul>
              <p>
                We do not use third-party advertising cookies. We do not sell or share cookie data
                with third parties for their own marketing purposes.
              </p>

              <h2>Your Rights</h2>
              <p>You have the right to:</p>
              <ul>
                <li>Be informed about what cookies we use and why (this policy)</li>
                <li>Give or withdraw consent for non-essential cookies at any time</li>
                <li>Access information about the data cookies collect about you</li>
                <li>Request deletion of cookie-related personal data</li>
              </ul>

              <h2>Managing Cookies</h2>
              <p>You can manage your cookie preferences in several ways:</p>
              <ul>
                <li>
                  <strong>Browser settings:</strong> Most browsers allow you to block or delete
                  cookies through their settings. Note that blocking all cookies may affect website
                  functionality.
                </li>
                <li>
                  <strong>Device settings:</strong> Mobile devices typically provide controls over
                  cookies and tracking in system settings.
                </li>
              </ul>

              <h2>Data Retention</h2>
              <ul>
                <li>Session cookies are deleted when you close your browser.</li>
                <li>
                  Persistent cookies are retained for up to 12 months unless you delete them sooner.
                </li>
                <li>
                  Analytics data derived from cookies is retained in anonymised form for up to 26
                  months.
                </li>
              </ul>

              <h2>Changes to This Policy</h2>
              <p>
                We may update this Cookie Policy from time to time. Changes will be posted on this
                page with an updated effective date.
              </p>

              <h2>Contact</h2>
              <p>
                If you have questions about our use of cookies, contact our Data Protection team at{' '}
                <a
                  href="mailto:privacy@thewify.com"
                  className="text-primary-600 hover:text-primary-700"
                >
                  privacy@thewify.com
                </a>{' '}
                or{' '}
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
            <Button href="/legal/privacy" variant="secondary" size="md">
              Privacy Policy
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
