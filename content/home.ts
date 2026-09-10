/**
 * ---------------------------------------------------------------------------
 * Homepage section content — Sections 3–14 of the approved blueprint.
 *
 * Section source of truth: UNIFY_WIFI_APPROVED_BLUEPRINT.pdf
 *
 * Convention: values the blueprint refers to but does not specify are null
 * with a PENDING(Qn) marker. Grep for "PENDING(" to find outstanding items.
 * ---------------------------------------------------------------------------
 */

// ── Section 3: Four Pillars ──────────────────────────────────────────────────

export type Pillar = {
  title: string
  description: string
  /** lucide-react icon name — the component maps this to the real icon. */
  icon: string
}

export const pillars: Pillar[] = [
  {
    title: 'Cloud RADIUS & AAA',
    description:
      'Authenticate every PPPoE and Hotspot session through a geo-redundant cloud RADIUS cluster. No on-premise RADIUS server required.',
    icon: 'ShieldCheck',
  },
  {
    title: 'Automated ISP Billing',
    description:
      'Auto-generate invoices, send WhatsApp renewal reminders, and accept UPI, Razorpay & Stripe payments — all without manual intervention.',
    icon: 'ReceiptText',
  },
  {
    title: 'Bandwidth & FUP Engine',
    description:
      'Set per-subscriber speed limits, data caps, and Fair Usage Policy throttling directly from the dashboard — no scripts required.',
    icon: 'Gauge',
  },
  {
    title: 'White-Label Reseller Portal',
    description:
      'Give your LCO partners their own branded dashboard, subscriber management, and billing under their own domain — fully isolated.',
    icon: 'Building2',
  },
]

export const pillarsSection = {
  eyebrow: 'Platform overview',
  heading: 'Four pillars. One cloud platform.',
  lead: 'Everything your ISP needs to authenticate, bill, and scale — hosted in the cloud, connected to the hardware you already operate.',
}

// ── Section 4: Trust Stats Bar ───────────────────────────────────────────────

/**
 * Trust stats exactly as the blueprint specifies them (blueprint pages 3–4).
 * Any stat not explicitly confirmed by the business must not be displayed
 * as a real figure. The blueprint provides these four values verbatim.
 *
 * IMPORTANT: The blueprint lists these as marketing figures.
 * Do NOT adjust the values — they are the approved blueprint wording.
 */
export const trustStats = [
  { value: '200+', label: 'Active ISPs & WISPs' },
  { value: '50,000+', label: 'Subscribers Managed' },
  {
    value: '99.99%',
    label: 'Cloud RADIUS Uptime',
    hint: 'SLA',
  },
  { value: '10 min', label: 'MikroTik Setup Time' },
]

// ── Section 5: How It Works ───────────────────────────────────────────────────

export type WorkStep = {
  step: number
  title: string
  description: string
  icon: string
}

export const howItWorksSteps: WorkStep[] = [
  {
    step: 1,
    title: 'Connect Your Router',
    description:
      'Point MikroTik RADIUS settings to the Unify cloud endpoint. One-time 3-field setup — hostname, shared secret, and NAS identifier.',
    icon: 'Router',
  },
  {
    step: 2,
    title: 'Subscribers Connect',
    description:
      'PPPoE or Hotspot login requests are authenticated through cloud RADIUS in real time. Sub-15ms response, geo-redundant failover.',
    icon: 'Wifi',
  },
  {
    step: 3,
    title: 'Plans & Billing Assigned',
    description:
      'Each subscriber is auto-mapped to their plan, speed tier, data quota, and expiry date the moment they authenticate.',
    icon: 'ClipboardList',
  },
  {
    step: 4,
    title: 'Automated Renewals',
    description:
      'WhatsApp reminders sent 3 days before expiry. UPI pay link included. Subscribers renew without calling your support team.',
    icon: 'RefreshCcw',
  },
  {
    step: 5,
    title: 'You Monitor Everything',
    description:
      'One dashboard shows live sessions, per-subscriber bandwidth, payment status, and real-time alerts across your entire network.',
    icon: 'LayoutDashboard',
  },
]

export const howItWorksSection = {
  eyebrow: 'How it works',
  heading: 'From MikroTik router to cloud-managed subscriber — in under 10 minutes.',
  lead: 'No Linux expertise required. No on-premise servers to maintain. Connect once, then manage everything from a single cloud dashboard.',
}

// ── Section 6: Feature Modules ────────────────────────────────────────────────

export type Feature = {
  title: string
  description: string
  icon: string
}

export const features: Feature[] = [
  {
    title: 'Cloud RADIUS Server',
    description:
      'Geo-redundant AAA cluster handling PPPoE and Hotspot authentication. Zero on-premise hardware required.',
    icon: 'Server',
  },
  {
    title: 'PPPoE & Hotspot Authentication',
    description:
      'Full support for PPPoE framed sessions and captive portal Hotspot. Sub-15ms auth response time.',
    icon: 'KeyRound',
  },
  {
    title: 'Subscriber Management Dashboard',
    description:
      'Add, suspend, or modify subscribers in seconds. Live session view, bandwidth graphs, and plan history.',
    icon: 'Users',
  },
  {
    title: 'Automated Billing & Invoicing',
    description:
      'GST-compliant invoices auto-generated at renewal. Stripe, Razorpay, and UPI payment collection built in.',
    icon: 'ReceiptText',
  },
  {
    title: 'WhatsApp & UPI Payment Reminders',
    description:
      'Renewal reminders with one-tap UPI pay links dispatched automatically before expiry — no manual follow-ups.',
    icon: 'MessageCircle',
  },
  {
    title: 'FUP & Bandwidth Throttling',
    description:
      'Per-subscriber speed limits, daily and monthly data caps, and automatic CoA-based throttling when quotas are hit.',
    icon: 'Gauge',
  },
  {
    title: 'White-Label Reseller Portal',
    description:
      'Custom domain, custom brand, full isolation. LCO partners manage their own subscribers without seeing your infrastructure.',
    icon: 'Building2',
  },
  {
    title: 'Hardware Integrations & API',
    description:
      'Purpose-built for MikroTik RouterOS via standard RADIUS. REST API for custom integrations with billing, CRM, or monitoring systems.',
    icon: 'Plug',
  },
]

export const featuresSection = {
  eyebrow: 'Feature modules',
  heading: "Everything your ISP needs. Nothing it doesn't.",
  lead: 'Eight tightly integrated modules — built specifically for ISPs, WISPs, and LCO networks.',
}

// ── Section 7: ISP Type Solutions ─────────────────────────────────────────────

export type IspSolution = {
  segment: string
  tagline: string
  description: string
  icon: string
}

export const ispSolutions: IspSolution[] = [
  {
    segment: 'WISP',
    tagline: 'Wireless ISP',
    description:
      'Manage outdoor CPE subscribers, enforce FUP, and auto-bill monthly — no office visits required. Cloud RADIUS keeps sessions alive even when your backhaul fluctuates.',
    icon: 'RadioTower',
  },
  {
    segment: 'LCO',
    tagline: 'Local Cable Operator',
    description:
      'Give your LCO partners a branded portal to manage their own subscribers under your RADIUS infrastructure. Full billing and plan isolation per partner.',
    icon: 'Network',
  },
  {
    segment: 'Fiber ISP',
    tagline: 'Fiber Broadband Operator',
    description:
      'Handle PPPoE authentication, static IP allocation, and automated invoice generation across thousands of fiber subscribers — at any scale.',
    icon: 'Zap',
  },
  {
    segment: 'Hotspot',
    tagline: 'Hotspot Operator',
    description:
      'Sell prepaid vouchers, manage session time limits, and monitor per-device bandwidth in real time. Captive portal customisation included.',
    icon: 'Wifi',
  },
  {
    segment: 'Enterprise',
    tagline: 'Enterprise Network Manager',
    description:
      'Centrally manage multi-site RADIUS authentication and bandwidth policies across campuses and branch offices — from one cloud dashboard.',
    icon: 'Globe',
  },
]

export const solutionsSection = {
  eyebrow: 'Solutions by operator type',
  heading: 'Built for every type of internet operator.',
  lead: 'Unify Wi-Fi speaks the language of your specific ISP operation — from small WISP to multi-site enterprise network.',
}

// ── Section 8: Subscriber Revenue Calculator ─────────────────────────────────

/**
 * Calculator constants — the blueprint (page 7) specifies:
 *   - Slider range: 100 to 20,000 subscribers
 *   - Outputs: monthly hours saved on manual billing,
 *              estimated reduction in subscriber churn (auto-reminders),
 *              cost saved vs running an on-premise RADIUS server
 *
 * The blueprint does NOT provide the underlying calculation formulas or
 * the exact monetary values. The figures below are deliberately simple
 * ratios that are defensible as directional estimates and are clearly
 * presented as estimates in the UI.
 *
 * PENDING(Q5): Business/product team needs to approve or supply the
 * specific calculation assumptions for the calculator outputs.
 *
 * Until those are approved, the calculator shows directional estimates
 * (marked "estimate") rather than precise financial claims.
 */
export const calculatorSection = {
  eyebrow: 'Impact calculator',
  heading: 'See what Unify Wi-Fi can save you.',
  lead: 'Adjust the slider to your subscriber count and see the directional impact. Exact figures depend on your current setup.',
  sliderMin: 100,
  sliderMax: 20000,
  sliderDefault: 1000,
  sliderLabel: 'How many subscribers do you manage?',
  pendingNote:
    'PENDING(Q5): Exact calculation assumptions are awaiting business approval. These are directional estimates only.',
  /**
   * Calculation helpers.
   * Rule of thumb: each subscriber requires ~15 min/month of manual billing work
   * (reminders, follow-ups, plan changes). Automation removes ~80% of that.
   * On-premise RADIUS server cost estimate: ₹500/month fixed + ₹2/subscriber.
   * These ratios are placeholders until Q5 is resolved.
   */
  hoursPerSubscriberMonth: 0.25, // 15 min = 0.25 hr
  automationSavingRate: 0.8, // 80% reduction
  onPremFixedCostINR: 500,
  onPremPerSubscriberINR: 2,
}

// ── Section 9: Business Model ─────────────────────────────────────────────────

export const businessModel = {
  eyebrow: 'Business model',
  heading: 'Your ISP brand. Our cloud infrastructure.',
  lead: 'You stay in control of your brand, your subscribers, and your pricing. We run the infrastructure that powers it all.',
  youOwn: [
    'Your brand & domain',
    'Your subscriber relationships',
    'Your pricing & plans',
    'Your LCO reseller network',
  ],
  weRun: [
    'Cloud RADIUS servers',
    'Geo-redundant AAA infrastructure',
    'Billing engine & payment gateway',
    'Security, uptime & scaling',
  ],
}

// ── Section 10: Platform Architecture ────────────────────────────────────────

export type ArchPoint = {
  title: string
  detail: string
  icon: string
}

export const archPoints: ArchPoint[] = [
  {
    title: 'Cloud RADIUS',
    detail:
      'Geo-redundant AAA cluster. Supports 10,000+ concurrent PPPoE/Hotspot sessions. Sub-15ms auth response.',
    icon: 'ServerStack',
  },
  {
    title: 'Multi-Tenant Isolation',
    detail:
      'Each ISP and reseller is fully isolated — no data crossover. RBAC and audit logs included.',
    icon: 'Lock',
  },
  {
    title: 'White-Label Stack',
    detail:
      'Custom domains, custom billing portal branding. Zero Unify Wi-Fi branding on reseller interfaces.',
    icon: 'Layers',
  },
]

export const architectureSection = {
  eyebrow: 'Platform architecture',
  heading: 'Enterprise-grade infrastructure. Without the enterprise complexity.',
  lead: 'Built for network engineers who need to trust the stack before they can recommend it.',
}

// ── Section 12: FAQ ───────────────────────────────────────────────────────────

export type FaqItem = {
  question: string
  answer: string
}

export const homepageFaqs: FaqItem[] = [
  {
    question: 'Do I need to replace my existing hardware?',
    answer:
      'No. Unify Wi-Fi is built specifically for MikroTik routers running RouterOS. Your existing MikroTik hardware stays in place — just point the RADIUS settings at the Unify cloud endpoint and you are ready to go.',
  },
  {
    question: 'How long does it take to set up?',
    answer:
      'Under 10 minutes for MikroTik users. You point your RADIUS server settings at the Unify cloud endpoint — hostname, shared secret, and NAS ID — and your first subscriber can authenticate immediately.',
  },
  {
    question: 'What happens if the cloud goes down?',
    answer:
      'Unify runs a geo-redundant RADIUS cluster with automatic failover. Sub-second switchover keeps subscriber sessions alive. The platform is designed with a 99.99% uptime SLA.',
  },
  {
    question: 'Can my LCO resellers manage their own subscribers?',
    answer:
      'Yes. White-label reseller portals give each LCO partner their own branded dashboard with full subscriber management and billing — completely isolated from your infrastructure and other partners.',
  },
  {
    question: 'How does billing work for Indian ISPs?',
    answer:
      'Unify has native UPI, Razorpay, and Stripe integration. WhatsApp renewal reminders and UPI payment links are auto-generated before subscriber expiry — no manual follow-up required.',
  },
  {
    question: 'How is Unify Wi-Fi different from running my own RADIUS server?',
    answer:
      'With Unify you have no servers to maintain, no Linux expertise required, no downtime risk from hardware failure, and no capacity planning headaches as your subscriber count grows. Everything runs in the cloud.',
  },
]

export const faqSection = {
  eyebrow: 'FAQ',
  heading: 'Questions, answered.',
}
