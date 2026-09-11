import Link from 'next/link'
import { UnifyLogo } from '@/components/brand/unify-logo'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { primaryNav } from '@/content/nav'
import { site } from '@/content/site'
import { MobileNav } from './mobile-nav'
import { SignInAction } from './sign-in-action'

/**
 * Low-profile product shell. It remains solid and legible over every section.
 * Server component: the only interactive part is the mobile drawer.
 */
export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-surface">
      <Container className="flex h-[var(--header-h)] items-center justify-between gap-6">
        {/* Logo — text placeholder until real logo is provided */}
        <Link href="/" className="shrink-0 rounded-lg" aria-label={`${site.name} — home`}>
          <UnifyLogo />
        </Link>

        {/* Desktop navigation — clean, well-spaced links */}
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {primaryNav.map((item) => (
              <li key={item.label}>
                <Button href={item.href} variant="ghost" size="sm">
                  {item.label}
                </Button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop actions — Sign In link + prominent CTA */}
        <div className="hidden items-center gap-3 lg:flex">
          <SignInAction />
          <Button href="/contact" size="sm">
            Book a Demo
          </Button>
        </div>

        {/* Mobile hamburger menu */}
        <MobileNav />
      </Container>
    </header>
  )
}
