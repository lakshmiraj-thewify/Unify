/**
 * ---------------------------------------------------------------------------
 * Feature module detail content — used by /features/[slug] pages.
 *
 * Source of truth: UNIFY_WIFI_APPROVED_BLUEPRINT.pdf
 * All capabilities listed here are drawn from the approved blueprint.
 * No unsupported claims are added.
 * ---------------------------------------------------------------------------
 */

export type FeatureDetail = {
  slug: string
  title: string
  eyebrow: string
  description: string
  icon: string
  /** Full-length explanation for the detail page */
  body: string
  /** Key capability bullet points */
  capabilities: string[]
  /** Who benefits from this module */
  whoItHelps: string
  /** Related modules by slug */
  related: string[]
}

export const featureDetails: FeatureDetail[] = [
  {
    slug: 'cloud-radius',
    title: 'Cloud RADIUS Server',
    eyebrow: 'Authentication infrastructure',
    icon: 'Server',
    description:
      'Geo-redundant AAA cluster handling PPPoE and Hotspot authentication. Zero on-premise hardware required.',
    body: 'Unify Wi-Fi runs a geo-redundant cloud RADIUS cluster that handles every PPPoE and Hotspot authentication request for your ISP. Instead of maintaining a Linux server in your office or data centre, your MikroTik router simply points at the Unify cloud endpoint. Every subscriber login is authenticated in real time — with sub-15ms response times and automatic failover so your subscribers never notice a blip. There is no on-premise RADIUS server to patch, restart, or scale. When your subscriber count doubles, the infrastructure automatically scales with it.',
    capabilities: [
      'Geo-redundant AAA cluster with automatic failover',
      'Sub-15ms authentication response time',
      'Supports 10,000+ concurrent PPPoE and Hotspot sessions',
      'No on-premise server or Linux expertise required',
      'MikroTik-native: one-time 3-field RADIUS setup',
      '99.99% uptime SLA',
      'RADIUS CoA (Change of Authorization) for live bandwidth changes',
      'Full audit log of every authentication event',
    ],
    whoItHelps:
      'Any ISP or WISP currently running a self-hosted FreeRADIUS or RADIUS server on a VPS. Eliminates server maintenance, capacity planning, and single-point-of-failure risk.',
    related: ['pppoe-hotspot', 'subscriber-management', 'bandwidth-throttling'],
  },
  {
    slug: 'pppoe-hotspot',
    title: 'PPPoE & Hotspot Authentication',
    eyebrow: 'Session management',
    icon: 'KeyRound',
    description:
      'Full support for PPPoE framed sessions and captive portal Hotspot. Sub-15ms auth response time.',
    body: 'Unify Wi-Fi supports both of the authentication modes that MikroTik operators rely on: PPPoE for home and enterprise broadband subscribers, and Hotspot for prepaid voucher or captive portal deployments. PPPoE sessions are fully framed — each subscriber gets their assigned IP, speed profile, and data quota the instant they authenticate. Hotspot sessions support OTP/SMS login, voucher codes, and prepaid time-based access. Both modes are managed from the same dashboard, and both respect FUP throttling and expiry rules set at the subscriber level.',
    capabilities: [
      'Full PPPoE framed-session support with IP assignment',
      'MikroTik Hotspot captive portal integration',
      'OTP/SMS, voucher, and prepaid session support',
      'Sub-15ms RADIUS response on both session types',
      'Per-subscriber speed and data quota enforcement at authentication',
      'Session disconnect and re-authentication on plan change',
      'Static IP pool and dynamic IP allocation',
      'Dual-stack IPv4 and IPv6 support',
    ],
    whoItHelps:
      'ISPs running PPPoE broadband, WISPs with Hotspot prepaid subscribers, and operators who need to manage both simultaneously from one platform.',
    related: ['cloud-radius', 'subscriber-management', 'bandwidth-throttling'],
  },
  {
    slug: 'subscriber-management',
    title: 'Subscriber Management Dashboard',
    eyebrow: 'Operations centre',
    icon: 'Users',
    description:
      'Add, suspend, or modify subscribers in seconds. Live session view, bandwidth graphs, and plan history.',
    body: 'The subscriber dashboard is your ISP\'s operations centre. Every subscriber in your network is listed with their live session status, current plan, data usage, payment status, and expiry date — all on one screen. Adding a new subscriber takes under a minute. Suspending a subscriber cuts off their session immediately via RADIUS CoA without you touching the router. Plan changes take effect in real time. You can filter by active, suspended, or expired subscribers, search by phone number or username, and drill into any subscriber\'s full authentication history and billing record.',
    capabilities: [
      'Full subscriber registry with live session status',
      'One-click suspend, unsuspend, and plan change',
      'Real-time bandwidth usage graphs per subscriber',
      'Plan history and renewal timeline',
      'Payment status and outstanding balance view',
      'Search by phone, username, or IP address',
      'Bulk subscriber operations (renew, suspend, export)',
      'Per-subscriber notes and custom fields',
    ],
    whoItHelps:
      'ISP operations staff and support teams who currently manage subscribers through spreadsheets, router user-manager, or manual notes. Replaces manual workflow with a structured real-time dashboard.',
    related: ['billing-invoicing', 'payment-reminders', 'cloud-radius'],
  },
  {
    slug: 'billing-invoicing',
    title: 'Automated Billing & Invoicing',
    eyebrow: 'Revenue operations',
    icon: 'ReceiptText',
    description:
      'GST-compliant invoices auto-generated at renewal. Stripe, Razorpay, and UPI payment collection built in.',
    body: 'Unify Wi-Fi automates the full billing cycle so your team never has to manually chase payments or generate invoices. When a subscriber\'s plan is due for renewal, an invoice is auto-generated, the payment gateway link is attached, and the subscriber is notified via WhatsApp. Payments are accepted through UPI, Razorpay, or Stripe — whichever your ISP uses. GST-compliant invoice PDFs are generated automatically and can be downloaded by the subscriber or your team. Failed or late payments are tracked, and subscribers are suspended automatically if they do not renew within the configured grace period.',
    capabilities: [
      'Automatic invoice generation at renewal date',
      'GST-compliant PDF invoice with your ISP branding',
      'UPI, Razorpay, and Stripe payment gateway integration',
      'Automated payment collection with WhatsApp notification',
      'Grace period configuration before auto-suspension',
      'Payment failure tracking and retry management',
      'Revenue dashboard with collection rate and outstanding dues',
      'Bulk invoice download and export',
    ],
    whoItHelps:
      'ISPs spending hours each month manually generating invoices, calling subscribers for payments, or using offline cash collection. Eliminates manual billing work almost entirely.',
    related: ['payment-reminders', 'subscriber-management', 'reseller-portal'],
  },
  {
    slug: 'payment-reminders',
    title: 'WhatsApp & UPI Payment Reminders',
    eyebrow: 'Subscriber engagement',
    icon: 'MessageCircle',
    description:
      'Renewal reminders with one-tap UPI pay links dispatched automatically before expiry — no manual follow-ups.',
    body: 'Unify Wi-Fi sends automated WhatsApp messages to subscribers before their plan expires. Three days before expiry, the subscriber receives a WhatsApp message with their plan details, amount due, and a one-tap UPI payment link. If they do not pay, a second reminder is sent on the day of expiry. After payment, they receive a confirmation. Because the pay link is pre-filled with the amount and UPI ID, most subscribers complete the payment in under 30 seconds without calling your support team. This eliminates the most time-consuming part of ISP operations: chasing monthly renewals one by one.',
    capabilities: [
      'Automated WhatsApp renewal reminders 3 days before expiry',
      'One-tap UPI pay link pre-filled with amount and UPI ID',
      'Same-day expiry reminder for unpaid subscribers',
      'Payment confirmation message after successful payment',
      'Custom message template with your ISP name and branding',
      'Configurable reminder schedule (3 days, 1 day, expiry day)',
      'Delivery status tracking per message',
      'Opt-out management for subscribers who prefer other channels',
    ],
    whoItHelps:
      'ISPs who call subscribers every month to collect renewal payments. Automates the reminder and collection process, significantly reducing support call volume and payment delays.',
    related: ['billing-invoicing', 'subscriber-management'],
  },
  {
    slug: 'bandwidth-throttling',
    title: 'FUP & Bandwidth Throttling',
    eyebrow: 'Network control',
    icon: 'Gauge',
    description:
      'Per-subscriber speed limits, daily and monthly data caps, and automatic CoA-based throttling when quotas are hit.',
    body: 'Fair Usage Policy (FUP) enforcement is built into the Unify Wi-Fi platform at the RADIUS level. You define the speed limit, monthly data cap, and post-FUP throttled speed for each plan. When a subscriber hits their data cap, Unify sends a RADIUS CoA message to their MikroTik router — the connection is throttled automatically without any manual intervention and without disconnecting the subscriber. You can set daily caps, monthly caps, or both. Post-FUP speed can be set to any value (e.g., 1 Mbps) or full-disconnect depending on your plan design.',
    capabilities: [
      'Per-plan speed limits (upload and download separately)',
      'Monthly and daily data quota configuration',
      'Automatic RADIUS CoA throttling when quota is exceeded',
      'Post-FUP speed configured per plan',
      'Real-time data usage visible in subscriber dashboard',
      'Quota reset on renewal — automatic and immediate',
      'Bandwidth usage alerts before quota is exhausted',
      'No manual router intervention required for throttling',
    ],
    whoItHelps:
      'ISPs offering data-capped plans who currently have no enforcement mechanism, or who use manual scripts to throttle subscribers. Automates FUP enforcement at the RADIUS layer without touching the router.',
    related: ['cloud-radius', 'subscriber-management', 'pppoe-hotspot'],
  },
  {
    slug: 'reseller-portal',
    title: 'White-Label Reseller Portal',
    eyebrow: 'Partner & LCO management',
    icon: 'Building2',
    description:
      'Custom domain, custom brand, full isolation. LCO partners manage their own subscribers without seeing your infrastructure.',
    body: 'If you work with LCO (Local Cable Operator) partners who handle last-mile subscriber connections, Unify Wi-Fi\'s white-label reseller portal gives each partner their own branded management dashboard. The portal runs on your LCO\'s own domain, shows their logo, and is completely isolated — they cannot see your other partners or your master infrastructure. Each LCO can add subscribers, manage plans, collect payments, and generate reports independently. You retain master-level visibility across all resellers from the parent dashboard. This is the fastest way to scale your ISP through a partner network without building separate infrastructure for each LCO.',
    capabilities: [
      'Fully isolated portal per LCO partner',
      'Custom domain and brand per reseller (white-label)',
      'LCO-managed subscriber add, suspend, and billing',
      'Master visibility across all resellers from parent account',
      'Revenue sharing and commission tracking per reseller',
      'Separate IP pool and plan pricing per LCO',
      'LCO-level usage and payment reports',
      'RBAC: LCO staff see only their own subscribers',
    ],
    whoItHelps:
      'ISPs who wholesale internet connectivity to local LCO partners who manage their own subscribers. Gives each LCO a professional branded tool without the ISP building separate systems per partner.',
    related: ['subscriber-management', 'billing-invoicing', 'cloud-radius'],
  },
  {
    slug: 'hardware-api',
    title: 'Hardware Integrations & API',
    eyebrow: 'Connectivity & extensibility',
    icon: 'Plug',
    description:
      'Works with MikroTik via standard RADIUS. REST API for custom integrations.',
    body: 'Unify Wi-Fi connects to MikroTik routers via the standard RADIUS protocol — the same protocol RouterOS has supported for over a decade. There are no proprietary agents, no custom firmware, and no changes to your existing router configuration beyond three RADIUS settings. For teams building custom integrations — billing apps, CRM connections, or custom monitoring dashboards — Unify provides a REST API covering subscriber management, plan assignment, session data, and billing events. The API is documented and authenticated with per-token scoped access.',
    capabilities: [
      'MikroTik RADIUS integration via standard RFC 2865/2866',
      'Works with RouterOS v6 and v7 — no firmware changes',
      'Three-field RADIUS setup: hostname, shared secret, NAS ID',
      'REST API for subscriber CRUD operations',
      'API access to session data, usage metrics, and billing events',
      'Webhook support for payment and session events',
      'Per-token API authentication with scoped access control',
      'API documentation and sandbox environment',
    ],
    whoItHelps:
      'ISPs with existing billing or CRM systems who want to integrate Unify Wi-Fi data. Also useful for operators building custom monitoring dashboards or automated workflows on top of the platform.',
    related: ['cloud-radius', 'pppoe-hotspot', 'subscriber-management'],
  },
]

/** Lookup a feature detail by slug. Returns undefined if not found. */
export function getFeatureDetail(slug: string): FeatureDetail | undefined {
  return featureDetails.find((f) => f.slug === slug)
}
