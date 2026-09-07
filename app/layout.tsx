import type { Metadata, Viewport } from 'next'
import { JetBrains_Mono, Plus_Jakarta_Sans } from 'next/font/google'
import type { ReactNode } from 'react'
import { FloatingContact } from '@/components/layout/floating-contact'
import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import { SkipLink } from '@/components/layout/skip-link'
import { site } from '@/content/site'
import './globals.css'

/*
 * Both faces are variable fonts, self-hosted by next/font at build time: no
 * request to Google at runtime, `display: swap`, and a metric-adjusted fallback
 * so swapping in the real face does not shift layout.
 */
const sans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-plus-jakarta',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Cloud RADIUS & ISP Management Platform`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.legalEntity, url: site.family.parentUrl }],
  creator: site.legalEntity,
  publisher: site.legalEntity,
  formatDetection: { telephone: false, address: false, email: false },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#070f1e' },
  ],
  colorScheme: 'light',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-IN" className={`${sans.variable} ${mono.variable}`}>
      <body className="flex min-h-dvh flex-col bg-surface text-ink antialiased">
        <SkipLink />
        <Header />

        <main id="main" tabIndex={-1} className="flex-1 focus-visible:outline-none">
          {children}
        </main>

        <Footer />
        <FloatingContact />
      </body>
    </html>
  )
}
