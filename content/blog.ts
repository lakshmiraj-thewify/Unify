/**
 * ---------------------------------------------------------------------------
 * Blog & Knowledge Hub copy — Section 11 of the approved blueprint.
 *
 * Heading: "The ISP Operator's Knowledge Hub"
 * Filter tags: MikroTik · PPPoE · Hotspot · Cloud RADIUS · Billing · WISP · India
 *
 * 6 Launch articles:
 *   1. MikroTik RouterOS 7 + Unify Cloud RADIUS: Complete Setup in 10 Minutes
 *   2. PPPoE vs Hotspot Authentication: Which Is Right for Your ISP Network?
 *   3. Why On-Premise RADIUS Servers Fail at Scale — And How Cloud Solves It
 *   4. How to Automate WhatsApp Renewal Reminders and Reduce Monthly Churn
 *   5. Setting Up FUP Throttling on MikroTik Using Unify Wi-Fi
 *   6. What Every Small Indian WISP Needs to Automate Before Scaling to 5,000 Subscribers
 *
 * Article bodies are PENDING(Q13). The articles can be listed with their
 * approved category, read-time, and titles.
 * ---------------------------------------------------------------------------
 */

export type BlogArticle = {
  slug: string
  title: string
  category: string
  tag: string
  readTime: string
  summary: string
  publishedDate: string
  featured?: boolean
}

export const blogTags = [
  'All',
  'MikroTik',
  'PPPoE',
  'Hotspot',
  'Cloud RADIUS',
  'Billing',
  'WISP',
  'India',
] as const

export const blogArticles: BlogArticle[] = [
  {
    slug: 'mikrotik-routeros-7-cloud-radius-setup',
    title: 'MikroTik RouterOS 7 + Unify Cloud RADIUS: Complete Setup in 10 Minutes',
    category: 'MikroTik',
    tag: 'MikroTik',
    readTime: '6 min read',
    summary:
      'Step-by-step guide to configuring your MikroTik CCR or hEX router with Unify geo-redundant cloud RADIUS endpoints without replacing your existing network hardware.',
    publishedDate: 'Sep 2026',
    featured: true,
  },
  {
    slug: 'pppoe-vs-hotspot-authentication-isp-guide',
    title: 'PPPoE vs Hotspot Authentication: Which Is Right for Your ISP Network?',
    category: 'PPPoE',
    tag: 'PPPoE',
    readTime: '8 min read',
    summary:
      'A technical breakdown of PPPoE framing vs captive portal Hotspot for broadband delivery in dense residential clusters and commercial deployments in India.',
    publishedDate: 'Aug 2026',
  },
  {
    slug: 'why-on-premise-radius-servers-fail-at-scale',
    title: 'Why On-Premise RADIUS Servers Fail at Scale — And How Cloud Solves It',
    category: 'Cloud RADIUS',
    tag: 'Cloud RADIUS',
    readTime: '7 min read',
    summary:
      'Single points of failure, MySQL replication headaches, and power outages: why self-hosted FreeRADIUS costs Indian ISPs more in lost revenue than cloud AAA.',
    publishedDate: 'Aug 2026',
  },
  {
    slug: 'automate-whatsapp-renewal-reminders-reduce-churn',
    title: 'How to Automate WhatsApp Renewal Reminders and Reduce Monthly Churn',
    category: 'Billing',
    tag: 'Billing',
    readTime: '5 min read',
    summary:
      'Proven notification templates and automated UPI collection workflows that reduce subscriber payment follow-up time by over 80%.',
    publishedDate: 'Aug 2026',
  },
  {
    slug: 'setting-up-fup-throttling-mikrotik-unify',
    title: 'Setting Up FUP Throttling on MikroTik Using Unify Wi-Fi',
    category: 'WISP',
    tag: 'WISP',
    readTime: '6 min read',
    summary:
      'Configure daily and monthly data caps with automated CoA (Change of Authorization) queue updates to enforce fair usage policies smoothly.',
    publishedDate: 'Jul 2026',
  },
  {
    slug: 'small-indian-wisp-automation-scale-5000-subscribers',
    title: 'What Every Small Indian WISP Needs to Automate Before Scaling to 5,000 Subscribers',
    category: 'India',
    tag: 'India',
    readTime: '10 min read',
    summary:
      'The transition guide for local cable operators and emerging WISPs moving from manual registers and spreadsheets to automated subscriber lifecycle operations.',
    publishedDate: 'Jul 2026',
  },
]

export const blogMeta = {
  eyebrow: 'Knowledge Hub',
  heading: "The ISP Operator's Knowledge Hub",
  lead: 'Practical guides, MikroTik configurations, and business strategies built specifically for Indian WISPs, LCOs, and network engineers.',
}
