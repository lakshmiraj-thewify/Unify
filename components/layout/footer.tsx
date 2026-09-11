import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { UnifyLogo } from '@/components/brand/unify-logo'
import { Badge } from '@/components/ui/badge'
import { Container } from '@/components/ui/container'
import { WaveDivider } from '@/components/ui/wave-divider'
import { bodyText, label } from '@/components/ui/typography'
import { footerNav } from '@/content/nav'
import { site } from '@/content/site'
import { isProvided } from '@/content/types'

/**
 * Site footer — charcoal dark footer with smooth wave divider at top.
 */
export function Footer() {
  const year = new Date().getFullYear()

  return (
    <div className="relative bg-navy-950 text-dark-fg">
      <WaveDivider from="light" />

      <footer className="relative bg-navy-950 pb-12 pt-6">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,2fr)]">
            {/* Brand */}
            <div className="flex flex-col items-start gap-5">
              <UnifyLogo tone="dark" size="lg" />
              <p className={`${bodyText.small} max-w-xs text-dark-fg-muted`}>{site.category}</p>
              <a
                href={site.family.guestWifiUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-sm text-sm font-semibold text-primary-300 underline decoration-primary-400/40 decoration-2 underline-offset-4 hover:text-primary-200"
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
                  <h2 className={`${label.mono} text-primary-400 font-semibold tracking-wider uppercase text-xs`}>{group.heading}</h2>
                  <ul className="mt-4 flex flex-col gap-2.5">
                    {group.items.map((item) => (
                      <li key={item.label}>
                        <Link
                          href={item.href}
                          className="rounded-sm text-sm font-medium text-dark-fg/90 transition-colors duration-200 ease-std hover:text-primary-300"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              ))}

              <div>
                <h2 className={`${label.mono} text-primary-400 font-semibold tracking-wider uppercase text-xs`}>Contact</h2>
                <ul className="mt-4 flex flex-col items-start gap-2.5">
                  <li>
                    <a
                      href={`mailto:${site.contact.email}`}
                      className="rounded-sm text-sm font-medium text-dark-fg/90 transition-colors duration-200 ease-std hover:text-primary-300"
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
                        className="rounded-sm text-sm font-medium text-dark-fg/90 transition-colors duration-200 ease-std hover:text-primary-300"
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

          {/* Bottom bar */}
          <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className={`${bodyText.small} text-dark-fg-muted`}>
              {site.name} is a product of {site.legalEntity}.
            </p>
            <p className={`${bodyText.small} text-dark-fg-muted`}>
              <span data-numeric="">&copy; {year}</span> {site.legalEntity}. All rights reserved.
            </p>
          </div>
        </Container>
      </footer>
    </div>
  )
}
