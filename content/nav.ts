export type NavItem = {
  label: string
  href: string
}

export type NavGroup = {
  heading: string
  items: NavItem[]
}

/**
 * Navigation, exactly as approved:
 *   Solutions · Features · Hardware · Pricing · Blog · Contact
 *
 * The first three are homepage sections; the last three are routes. Section
 * anchors match the `id` set on the corresponding <Section> so there is one
 * source of truth for both.
 */
export const primaryNav: NavItem[] = [
  { label: 'Solutions', href: '/#solutions' },
  { label: 'Features', href: '/#tabs-showcase' },
  { label: 'Hardware', href: '/#integrations' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

/** Anchor ids owned by the homepage. Sections import these so links cannot drift. */
export const sectionIds = {
  hardware: 'hardware',
  pillars: 'pillars',
  howItWorks: 'how-it-works',
  features: 'features',
  solutions: 'solutions',
  calculator: 'savings-calculator',
  ownership: 'ownership',
  architecture: 'architecture',
  blog: 'blog',
  faq: 'faq',
  contact: 'contact',
  pricing: 'pricing',
} as const

export const footerNav: NavGroup[] = [
  {
    heading: 'Platform',
    items: [
      { label: 'Solutions', href: '/#solutions' },
      { label: 'Features', href: '/#features' },
      { label: 'Hardware', href: '/#hardware' },
      { label: 'How it works', href: '/#how-it-works' },
    ],
  },
  {
    heading: 'Company',
    items: [
      { label: 'Pricing', href: '/pricing' },
      { label: 'Blog', href: '/blog' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    heading: 'Legal',
    items: [
      { label: 'Privacy Policy', href: '/legal/privacy' },
      { label: 'Terms of Service', href: '/legal/terms' },
      { label: 'Cookie Policy', href: '/legal/cookies' },
    ],
  },
]
