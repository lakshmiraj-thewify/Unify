import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono, Sora } from 'next/font/google'
import type { ReactNode } from 'react'
import { FloatingContact } from '@/components/layout/floating-contact'
import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import { SkipLink } from '@/components/layout/skip-link'
import { site } from '@/content/site'
import { OG_IMAGE_URL } from '@/lib/seo'
import './globals.css'

/*
 * Sora for headings, Inter for body. Both are variable fonts, self-hosted by
 * next/font at build time: no request to Google at runtime, `display: swap`,
 * and a metric-adjusted fallback so swapping in the real face does not shift
 * layout.
 */
const heading = Sora({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-sora',
})

const body = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
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
  openGraph: {
    siteName: site.name,
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: `${site.name} — Cloud RADIUS & ISP Management Platform`,
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: [OG_IMAGE_URL],
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FAFAF8' },
    { media: '(prefers-color-scheme: dark)', color: '#1C1C1C' },
  ],
  colorScheme: 'light',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-IN" className={`${heading.variable} ${body.variable} ${mono.variable}`}>
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
