/**
 * ---------------------------------------------------------------------------
 * Contact & Demo Booking copy — Section 12 & 13 of the approved blueprint.
 *
 * Heading: "Show us your network. We'll show you the opportunity."
 *
 * Two options side by side:
 *   Option A: Book a Live Demo (Interactive Slot Picker)
 *     - Step 1: Pre-qualification (Name, Email, Company/ISP Name, Active Subscribers, Primary Hardware)
 *     - Step 2: Date slot picker
 *     - Step 3: Time slot (10:00 AM / 11:30 AM / 2:00 PM / 4:00 PM IST)
 *
 *   Option B: Quick Contact Form
 *     - Name, Email, Message -> sends to support@thewify.com
 *     - Direct email shown: support@thewify.com
 *     - Phone / WhatsApp number shown (or PENDING)
 *
 * Section 12 FAQ (Embedded on contact page):
 *   - "Do I need to replace my existing hardware?"
 *   - "How long does it take to set up?"
 *   - "What happens if the cloud goes down?"
 *   - "Can my LCO resellers manage their own subscribers?"
 *   - "How does billing work for Indian ISPs?"
 *   - "How is Unify Wi-Fi different from setting up my own RADIUS server?"
 * ---------------------------------------------------------------------------
 */

export const contactFaqs = [
  {
    question: 'Do I need to replace my existing hardware?',
    answer:
      'No. Unify connects to MikroTik, Cambium, Ubiquiti, Ruijie, Cisco, and more via the standard RADIUS protocol. There is zero hardware lock-in and nothing needs to be replaced.',
  },
  {
    question: 'How long does it take to set up?',
    answer:
      'Under 10 minutes for MikroTik operators. You simply point your router RADIUS configuration to our cloud endpoints, paste your secret, and your first subscriber authenticates immediately.',
  },
  {
    question: 'What happens if the cloud goes down?',
    answer:
      'Unify operates an active geo-redundant AAA cluster with sub-second failover and a 99.99% uptime SLA. Even in extreme connectivity events, existing sessions remain active on your router.',
  },
  {
    question: 'Can my LCO resellers manage their own subscribers?',
    answer:
      'Yes. Unify includes white-label reseller portals with full tenant isolation. You can provide your LCO partners with their own branded dashboard, subscriber views, and recharge tools.',
  },
  {
    question: 'How does billing work for Indian ISPs?',
    answer:
      'Native Indian payment stack support: automated UPI payment links, QR codes, Razorpay, and Stripe. Automated WhatsApp renewal reminders and GST-compliant tax invoices are sent automatically.',
  },
  {
    question: 'How is Unify Wi-Fi different from setting up my own RADIUS server?',
    answer:
      'No Linux servers to maintain, no database replication or disk corruption risks, no manual backup routines, and no power/UPS dependencies. Unify is fully managed cloud infrastructure with zero maintenance overhead.',
  },
]

export const demoTimeSlots = ['10:00 AM IST', '11:30 AM IST', '2:00 PM IST', '4:00 PM IST'] as const

export const subscriberRanges = [
  'Under 250 subscribers',
  '250 – 1,000 subscribers',
  '1,000 – 5,000 subscribers',
  '5,000+ subscribers',
] as const

export const hardwareOptions = [
  'MikroTik (CCR / hEX / Cloud Core)',
  'Ubiquiti (EdgeRouter / UniFi)',
  'Cambium Networks',
  'Ruijie / Reyee',
  'Cisco / Huawei',
  'Other / Mixed',
] as const

export const contactMeta = {
  eyebrow: 'Direct Contact & Demo',
  heading: "Show us your network. We'll show you the opportunity.",
  lead: 'Schedule a 20-minute live demonstration tailored to your router topology and billing requirements, or send our engineering team a direct message.',
}
