import type { ReactNode } from 'react'
import type { Metadata, Viewport } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import localFont from 'next/font/local'
import { SiteHeader } from '@/components/layout/header'
import { SiteFooter } from '@/components/layout/footer'
import { site } from '@/content/site'
import { OG_IMAGE_URL } from '@/lib/seo'
import './globals.css'

/* Body font — Inter */
const inter = localFont({
  src: './fonts/inter.woff2',
  variable: '--font-inter',
  display: 'swap',
  weight: '100 900',
})

/* Display/heading font — Space Grotesk */
const spaceGrotesk = localFont({
  src: './fonts/space-grotesk.woff2',
  variable: '--font-space-grotesk',
  display: 'swap',
  weight: '300 700',
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
  themeColor: '#0D0F17',
  colorScheme: 'dark',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-IN" className={`${inter.variable} ${spaceGrotesk.variable} ${mono.variable}`}>
      <body className="flex min-h-dvh flex-col bg-[#0D0F17] text-white antialiased selection:bg-[#743CFF] selection:text-white">
        <SiteHeader />
        <main id="main" tabIndex={-1} className="flex-1 focus-visible:outline-none">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  )
}
