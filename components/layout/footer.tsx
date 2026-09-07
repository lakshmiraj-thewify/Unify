import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { UnifyLogo } from '@/components/brand/unify-logo'
import { Badge } from '@/components/ui/badge'
import { Container } from '@/components/ui/container'
import { bodyText, label } from '@/components/ui/typography'
import { footerNav } from '@/content/nav'
import { site } from '@/content/site'
import { isProvided } from '@/content/types'

/**
 * Site footer — the approved blueprint footer, and nothing beyond it.
 *
 * Contents are exactly the four things the blueprint lists: the link groups,
 * the contact block, the legal-entity brand note, and the Guest WiFi
 * cross-link. Contact details the blueprint promises but never supplies
 * (WhatsApp number, street address) render as `pending`, never as a guess.
 *
 * `[--focus-ring:…]` re-points the global focus ring at cyan for this band, the
 * same way `Section tone="dark"` does — a navy footer would otherwise swallow it.
 */
export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-dark-line bg-navy-950 text-dark-fg [--focus-ring:var(--color-signal-300)]">
      <Container className="py-14 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,2fr)]">
          {/* Brand */}
          <div className="flex flex-col items-start gap-4">
            <UnifyLogo tone="dark" size="lg" />
            <p className={`${bodyText.small} max-w-xs text-dark-fg-muted`}>{site.category}</p>
            <a
              href={site.family.guestWifiUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-sm text-sm font-bold text-signal-300 underline decoration-signal-300/40 decoration-2 underline-offset-4 hover:text-signal-200 hover:decoration-signal-300"
            >
              Looking for Guest WiFi? Visit {site.family.guestWifiLabel}
              <ArrowUpRight aria-hidden="true" className="size-4" />
              <span className="visually-hidden"> (opens in a new tab)</span>
            </a>
          </div>

          {/* Link groups + contact */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {footerNav.map((group) => (
              <nav key={group.heading} aria-label={group.heading}>
                <h2 className={`${label.mono} text-dark-fg-muted`}>{group.heading}</h2>
                <ul className="mt-3 flex flex-col gap-2">
                  {group.items.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className="rounded-sm text-sm font-semibold text-dark-fg transition-colors duration-200 ease-std hover:text-signal-300"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}

            <div>
              <h2 className={`${label.mono} text-dark-fg-muted`}>Contact</h2>
              <ul className="mt-3 flex flex-col items-start gap-2">
                <li>
                  <a
                    href={`mailto:${site.contact.email}`}
                    className="rounded-sm text-sm font-semibold text-dark-fg transition-colors duration-200 ease-std hover:text-signal-300"
                  >
                    {site.contact.email}
                  </a>
                </li>
                <li>
                  {isProvided(site.contact.whatsapp) ? (
                    <a
                      href={`https://wa.me/${site.contact.whatsapp.replace(/[^\d]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-sm text-sm font-semibold text-dark-fg transition-colors duration-200 ease-std hover:text-signal-300"
                    >
                      WhatsApp
                    </a>
                  ) : (
                    <Badge variant="pending" tone="dark" size="sm">
                      WhatsApp number pending
                    </Badge>
                  )}
                </li>
                <li className={`${bodyText.small} text-dark-fg-muted`}>
                  {site.contact.address.locality}, {site.contact.address.country}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-dark-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className={`${bodyText.small} text-dark-fg-muted`}>
            {site.name} is a product of {site.legalEntity}.
          </p>
          <p className={`${bodyText.small} text-dark-fg-muted`}>
            <span data-numeric="">&copy; {year}</span> {site.legalEntity}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  )
}
