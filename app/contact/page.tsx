import type { Metadata } from 'next'
import { ContactContent } from '@/components/pages/contact-content'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Contact & Demo Booking — Unify Wi-Fi',
  description:
    "Schedule a live interactive demonstration or contact our engineering team. We'll show you how Unify connects MikroTik in 10 minutes.",
  path: '/contact',
})

export default function ContactPage() {
  return <ContactContent />
}
