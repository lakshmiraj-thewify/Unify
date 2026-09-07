import Link from 'next/link'
import { UnifyLogo } from '@/components/brand/unify-logo'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { primaryNav } from '@/content/nav'
import { site } from '@/content/site'
import { MobileNav } from './mobile-nav'
import { SignInAction } from './sign-in-action'

/**
 * Site header.
 *
 * Sticky rather than fixed, so it participates in normal flow and no page has to
 * reserve space for it with a magic padding value.
 *
 * Server component: the only interactive part is the mobile drawer, which is
 * isolated in its own client island.
 */
export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-surface/85 backdrop-blur-md">
      <Container className="flex h-[var(--header-h)] items-center justify-between gap-4">
        <Link href="/" className="shrink-0 rounded-lg" aria-label={`${site.name} — home`}>
          <UnifyLogo />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-0.5">
            {primaryNav.map((item) => (
              <li key={item.label}>
                <Button href={item.href} variant="ghost" size="sm">
                  {item.label}
                </Button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <SignInAction />
          <Button href="/contact" size="sm">
            Book a Demo
          </Button>
        </div>

        <MobileNav />
      </Container>
    </header>
  )
}
