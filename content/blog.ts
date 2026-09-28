/**
 * ---------------------------------------------------------------------------
 * Blog & Knowledge Hub Content — Unify Wi-Fi & TheWiFy
 *
 * Combining ISP Operator deep dives with TheWiFy's proven Guest Wi-Fi,
 * Captive Portal, and Hospitality/Retail guides.
 * ---------------------------------------------------------------------------
 */

export type CodeSnippet = {
  language: string
  title?: string
  code: string
}

export type Callout = {
  type: 'tip' | 'warning' | 'info'
  title: string
  text: string
}

export type ArticleSection = {
  id: string
  title: string
  content: string
  codeSnippet?: CodeSnippet
  callout?: Callout
}

export type BlogAuthor = {
  name: string
  role: string
  avatar?: string
}

export type BlogArticle = {
  slug: string
  title: string
  category: string
  tag: string
  readTime: string
  summary: string
  publishedDate: string
  featured?: boolean
  coverImage?: string
  author: BlogAuthor
  keyTakeaways?: string[]
  sections?: ArticleSection[]
}

export const blogTags = [
  'All',
  'MikroTik',
  'Captive Portal',
  'Security',
  'Marketing',
  'Hospitality',
  'Analytics',
  'Cloud RADIUS',
  'PPPoE',
  'Billing',
  'WISP',
] as const

export const tagColors: Record<string, string> = {
  MikroTik: '#5EE7E4',
  'Captive Portal': '#743CFF',
  Security: '#F43F5E',
  Marketing: '#F59E0B',
  Hospitality: '#10B981',
  Analytics: '#38BDF8',
  'Cloud RADIUS': '#743CFF',
  PPPoE: '#6C8DFF',
  Billing: '#C084FC',
  WISP: '#5EE7E4',
  India: '#6C8DFF',
  Hotspot: '#743CFF',
}

export const blogArticles: BlogArticle[] = [
  {
    slug: 'mikrotik-guest-wifi-setup-guide',
    title: 'Complete Guide: Setting Up Guest Wi-Fi on MikroTik with TheWiFy & Unify',
    category: 'MikroTik',
    tag: 'MikroTik',
    readTime: '8 min read',
    summary:
      'Learn how to turn any MikroTik router into an enterprise-grade guest Wi-Fi hotspot with cloud captive portal authentication, RADIUS accounting, and zero-touch guest onboarding.',
    publishedDate: 'Sep 2026',
    featured: true,
    coverImage: '/images/blog/dashboard-preview.webp',
    author: {
      name: 'Unify & TheWiFy Network Architecture Team',
      role: 'Core Systems Engineering',
    },
    keyTakeaways: [
      'Separate guest traffic cleanly onto dedicated VLANs to safeguard internal office resources.',
      'Configure cloud RADIUS endpoints with failover ports (1812 authentication, 1813 accounting).',
      'Deploy branded responsive splash pages with one-click social or OTP logins.',
      'Enforce fair bandwidth queues automatically without saturating the router CPU.',
    ],
    sections: [
      {
        id: 'prerequisites',
        title: 'Prerequisites & Network Topology',
        content:
          'Before beginning the configuration, ensure your MikroTik router runs RouterOS 6.48+ or 7.x. You will need Winbox or SSH access with administrator rights, an active Internet uplink configured on ether1, and your Unify / TheWiFy RADIUS Secret Key ready from your dashboard.',
        callout: {
          type: 'info',
          title: 'VLAN Recommendation',
          text: 'Never run guest Wi-Fi on the same broadcast domain as your POS terminals, servers, or internal office LAN. Always isolate guests on a separate bridge (e.g. bridge-guest or VLAN 100).',
        },
      },
      {
        id: 'radius-configuration',
        title: 'Step 1: Configure Cloud RADIUS in RouterOS',
        content:
          'Connect to your MikroTik router via Winbox, navigate to RADIUS, and add the Unify Cloud RADIUS endpoints. This connects your router to our geo-redundant AAA cluster for instant authentication and session billing.',
        codeSnippet: {
          language: 'routeros',
          title: 'MikroTik CLI — RADIUS Configuration',
          code: `/radius add service=hotspot address=radius.thewify.com secret="YourRadiusSecret123" authentication-port=1812 accounting-port=1813 timeout=3000ms comment="TheWiFy Primary RADIUS"
/radius add service=hotspot address=radius-backup.thewify.com secret="YourRadiusSecret123" authentication-port=1812 accounting-port=1813 timeout=3000ms comment="TheWiFy Secondary RADIUS"
/radius incoming set accept=yes port=3799`,
        },
      },
      {
        id: 'hotspot-setup',
        title: 'Step 2: Initialize Hotspot Server on Guest Interface',
        content:
          'Navigate to IP -> Hotspot in Winbox. Run the Hotspot Setup wizard on your guest bridge interface (e.g., bridge-guest). Assign your guest IP pool (typically 192.168.88.0/24 or 10.10.0.0/22 for high-density locations). Set DNS name to login.guest.wifi.',
        codeSnippet: {
          language: 'routeros',
          title: 'MikroTik CLI — Hotspot Server & Profile',
          code: `/ip hotspot profile set [find default=yes] login-by=http-pap,http-chap use-radius=yes radius-accounting=yes radius-default-domain="" radius-location-id="BRANCH-HQ-01"
/ip hotspot user profile set [find default=yes] keepalive-timeout=2m open-status-page=always shared-users=1 status-autorefresh=1m transparent-proxy=no`,
        },
        callout: {
          type: 'tip',
          title: 'Walled Garden Notice',
          text: 'Ensure all authentication URLs, CDN scripts, and captive portal domain assets are whitelisted in IP -> Hotspot -> Walled Garden so guests can load the login portal prior to authentication.',
        },
      },
      {
        id: 'walled-garden',
        title: 'Step 3: Enable Walled Garden for Captive Portal Loading',
        content:
          'Because guests do not have internet access prior to authentication, the MikroTik router must allow HTTP/HTTPS traffic to the portal host and any third-party auth providers (Google, Meta, Apple, or SMS OTP gateways).',
        codeSnippet: {
          language: 'routeros',
          title: 'MikroTik CLI — Walled Garden Whitelist',
          code: `/ip hotspot walled-garden ip add dst-host=portal.thewify.com action=accept comment="TheWiFy Captive Portal"
/ip hotspot walled-garden ip add dst-host=*.gstatic.com action=accept comment="Google Fonts & Assets"
/ip hotspot walled-garden ip add dst-host=*.facebook.com action=accept comment="Meta Social Login"`,
        },
      },
      {
        id: 'testing-verification',
        title: 'Step 4: Testing & Live Session Monitoring',
        content:
          'Connect a test smartphone or laptop to your Guest SSID. Your device will automatically display the operating system captive network assistant (CNA popup) rendering your custom branded portal. Once logged in, your active session immediately registers in both Winbox (/ip hotspot active) and the live Unify Cloud Dashboard with real-time bandwidth metrics.',
      },
    ],
  },
  {
    slug: 'captive-portal-design-best-practices',
    title: 'Captive Portal Design: Best Practices for High Conversion Guest Wi-Fi',
    category: 'Captive Portal',
    tag: 'Captive Portal',
    readTime: '6 min read',
    summary:
      'How to design mobile-first captive portals that maximize guest opt-ins, comply with privacy laws, and deliver high brand recall without frustrating your visitors.',
    publishedDate: 'Sep 2026',
    coverImage: '/images/blog/captive-designer.webp',
    author: {
      name: 'UX & Product Strategy Group',
      role: 'Frontend & Experience Design',
    },
    keyTakeaways: [
      'Keep login friction low: require 2 fields maximum (Name + Mobile OTP or Email).',
      'Optimize for mobile mini-browsers (Captive Network Assistant / Apple CNA).',
      'Display clear, transparent opt-in checkboxes for marketing communication.',
      'Deliver instant value on the post-login landing screen (menus, coupons, Wi-Fi speed).',
    ],
    sections: [
      {
        id: 'mobile-first',
        title: '1. Designing for the Mobile CNA Browser',
        content:
          'Over 94% of guest Wi-Fi logins happen on smartphones. When a guest connects, iOS and Android open a lightweight embedded webview (Apple Captive Network Assistant). This webview has strict cookie constraints, no tabbed browsing, and limited memory. Your portal must load in under 1.2 seconds with no bulky video assets or external script blocks.',
      },
      {
        id: 'minimal-friction',
        title: '2. The 2-Field Rule for High Completion Rates',
        content:
          'Every additional form field slashes your captive portal completion rate by up to 25%. If your goal is marketing collection, request only a First Name and Phone Number (or Email). Avoid long survey questions at login; instead, trigger satisfaction polls via SMS 15 minutes after connection.',
        callout: {
          type: 'tip',
          title: 'One-Click Returning Guests',
          text: 'Use MAC address binding with a 30-day token. Returning guests reconnect automatically without re-entering their credentials, creating a frictionless hospitality experience.',
        },
      },
      {
        id: 'compliance',
        title: '3. Legal Consent & Privacy Compliance',
        content:
          'Explicit consent checkboxes are mandatory under GDPR, CCPA, and India’s Digital Personal Data Protection (DPDP) Act. Separate Terms of Service acceptance from Marketing Opt-in checkboxes, and ensure clear links to your Privacy Policy are accessible within the walled garden.',
      },
    ],
  },
  {
    slug: 'guest-wifi-security-compliance',
    title: 'Guest Wi-Fi Security & Compliance: Everything Operators Must Know',
    category: 'Security',
    tag: 'Security',
    readTime: '7 min read',
    summary:
      'A deep dive into VLAN isolation, client-to-client blocking, DoT/TRAI logging mandates, and DNS content filtering to shield your venue from liability.',
    publishedDate: 'Aug 2026',
    coverImage: '/images/blog/analytics-dashboard.webp',
    author: {
      name: 'Cybersecurity & Compliance Office',
      role: 'Network Defense & Policy',
    },
    keyTakeaways: [
      'Enforce Client Isolation at the access point level to prevent lateral peer-to-peer attacks.',
      'Maintain NAT and IP session logs for the statutory period (12-24 months) required by telecom regulators.',
      'Block adult, illegal, and high-risk torrent traffic at the DNS layer.',
      'Prevent network bandwidth hijacking with automated per-device rate limiting.',
    ],
    sections: [
      {
        id: 'client-isolation',
        title: 'Client-to-Client Isolation',
        content:
          'In an open public Wi-Fi network, any infected device can scan and exploit other connected laptops or phones. Enabling Client Isolation on your APs (or port isolation on your managed switches) ensures connected clients can only talk to the internet gateway and never to each other.',
      },
      {
        id: 'statutory-logging',
        title: 'DoT & Law Enforcement Logging Compliance',
        content:
          'Telecom regulations require operators to maintain accurate timestamped records linking a verified user identity (via verified OTP or government ID verification) to internal IP, external NAT IP, and port allocations. Unify and TheWiFy automate this compliance logging in encrypted cloud storage.',
        callout: {
          type: 'warning',
          title: 'Regulatory Liability',
          text: 'Failing to record session NAT logs can result in severe fines or suspension of internet service licenses if illicit traffic originates from an unauthenticated guest connection.',
        },
      },
    ],
  },
  {
    slug: 'restaurant-wifi-marketing-strategies',
    title: '5 Ways Restaurants Use Guest Wi-Fi for 40%+ Higher Customer Retention',
    category: 'Marketing',
    tag: 'Marketing',
    readTime: '5 min read',
    summary:
      'Turn free guest Wi-Fi from an overhead expense into a high-ROI revenue engine that automatically drives 5-star Google reviews and repeat dinner bookings.',
    publishedDate: 'Aug 2026',
    coverImage: '/images/blog/restaurant-hero.webp',
    author: {
      name: 'Growth & Hospitality Strategy',
      role: 'Hospitality Tech Specialist',
    },
    keyTakeaways: [
      'Automate Google Review requests sent via WhatsApp 45 minutes into the guest visit.',
      'Run digital loyalty punches tied to guest MAC addresses with zero physical cards.',
      'Direct guests to your online menu or daily happy-hour specials immediately on login.',
      'Re-engage lost diners who haven’t visited in 30 days with automated promotional SMS.',
    ],
    sections: [
      {
        id: 'review-acceleration',
        title: '1. Automated Google Review Acceleration',
        content:
          'Happy diners are busy enjoying their meals and rarely think to leave a Google review unless prompted at the right moment. TheWiFy detects how long a guest has been connected; at the 45-minute mark, an automated WhatsApp message invites them to rate their dining experience while flavors are fresh in their mind.',
      },
      {
        id: 'digital-menu-redirect',
        title: '2. Instant Menu & Beverage Upsells',
        content:
          'Upon successful captive portal login, the browser automatically redirects to your digital beverage or dessert menu. Venues utilizing this strategy see an average 18% lift in dessert and specialty cocktail orders.',
      },
    ],
  },
  {
    slug: 'hotel-guest-wifi-experience',
    title: 'Elevating Hotel Guest Experience with Professional Hospitality Wi-Fi',
    category: 'Hospitality',
    tag: 'Hospitality',
    readTime: '6 min read',
    summary:
      'How modern hotels integrate Property Management Systems (PMS) with cloud captive portals to provide tiered bandwidth, VIP perks, and seamless property roaming.',
    publishedDate: 'Aug 2026',
    coverImage: '/images/blog/hotel-lobby.webp',
    author: {
      name: 'Enterprise Hospitality Team',
      role: 'Hotel Systems Integration',
    },
    keyTakeaways: [
      'Two-way PMS integration automatically validates Room Number and Guest Last Name.',
      'Tiered bandwidth models allow free basic browsing while billing premium high-speed video tiers directly to the room folio.',
      '802.11r/k/v fast roaming prevents call drops as guests transition from lobby to elevators to suites.',
    ],
    sections: [
      {
        id: 'pms-integration',
        title: 'Two-Way Opera & Fidelio PMS Integration',
        content:
          'Eliminate manual front-desk voucher printing. When a guest arrives, they log in using their Room Number and Surname. The Wi-Fi controller queries the PMS in real time to verify check-in status, departure date, and tier eligibility.',
      },
      {
        id: 'conference-wifi',
        title: 'Banquet & Conference Room Monetisation',
        content:
          'Event organizers need dedicated SSIDs with customized splash branding, isolated bandwidth pools, and custom passcodes. TheWiFy lets hotel staff spin up dedicated event Wi-Fi zones in 30 seconds with no router reboot.',
      },
    ],
  },
  {
    slug: 'retail-wifi-analytics-insights',
    title: 'Using Wi-Fi Analytics to Understand Retail Customer Behavior',
    category: 'Analytics',
    tag: 'Analytics',
    readTime: '6 min read',
    summary:
      'Track footfall traffic, passerby conversion rates, average dwell times, and repeat visit frequencies using passive Wi-Fi probe requests and captive logins.',
    publishedDate: 'Jul 2026',
    coverImage: '/images/blog/guest-analytics.webp',
    author: {
      name: 'Retail Analytics Lab',
      role: 'Footfall Intelligence',
    },
    keyTakeaways: [
      'Measure storefront window conversion: percentage of street footfall that enters the store.',
      'Calculate average customer dwell time across store sections.',
      'Identify repeat shopper cohorts and measure the impact of promotional campaigns.',
    ],
    sections: [
      {
        id: 'probe-analytics',
        title: 'Understanding Passive Probe Requests',
        content:
          'Smartphones continuously transmit Wi-Fi probe requests searching for known networks. Wi-Fi access points detect these signal strengths (RSSI) to calculate how many shoppers walked past the store versus how many entered the premises.',
      },
      {
        id: 'heatmaps',
        title: 'Zone Dwell Time & Staffing Optimization',
        content:
          'By analyzing device dwell duration, store managers can determine peak traffic hours, identify cold zones where merchandise is overlooked, and allocate sales staff accurately.',
      },
    ],
  },
  {
    slug: 'mikrotik-routeros-7-cloud-radius-setup',
    title: 'MikroTik RouterOS 7 + Unify Cloud RADIUS: Complete Setup in 10 Minutes',
    category: 'MikroTik',
    tag: 'MikroTik',
    readTime: '6 min read',
    summary:
      'Step-by-step guide to configuring your MikroTik CCR or hEX router with Unify geo-redundant cloud RADIUS endpoints without replacing your existing network hardware.',
    publishedDate: 'Jul 2026',
    coverImage: '/images/blog/dashboard-preview.webp',
    author: {
      name: 'Unify ISP Engineering',
      role: 'Network Automation Specialist',
    },
    keyTakeaways: [
      'Migrate from local user databases to geo-distributed cloud AAA with zero subscriber downtime.',
      'Automate CoA dynamic disconnects when subscriber vouchers or plans expire.',
      'Keep backup local profiles in case of primary WAN uplink disruption.',
    ],
  },
  {
    slug: 'pppoe-vs-hotspot-authentication-isp-guide',
    title: 'PPPoE vs Hotspot Authentication: Which Is Right for Your ISP Network?',
    category: 'PPPoE',
    tag: 'PPPoE',
    readTime: '8 min read',
    summary:
      'A technical breakdown of PPPoE framing vs captive portal Hotspot for broadband delivery in dense residential clusters and commercial deployments in India.',
    publishedDate: 'Jun 2026',
    coverImage: '/images/blog/analytics-dashboard.webp',
    author: {
      name: 'Unify Network Architecture',
      role: 'Broadband Delivery Consultant',
    },
  },
  {
    slug: 'why-on-premise-radius-servers-fail-at-scale',
    title: 'Why On-Premise RADIUS Servers Fail at Scale — And How Cloud Solves It',
    category: 'Cloud RADIUS',
    tag: 'Cloud RADIUS',
    readTime: '7 min read',
    summary:
      'Single points of failure, MySQL replication headaches, and power outages: why self-hosted FreeRADIUS costs Indian ISPs more in lost revenue than cloud AAA.',
    publishedDate: 'Jun 2026',
    coverImage: '/images/blog/captive-designer.webp',
    author: {
      name: 'Cloud Infrastructure Team',
      role: 'High Availability Lead',
    },
  },
  {
    slug: 'automate-whatsapp-renewal-reminders-reduce-churn',
    title: 'How to Automate WhatsApp Renewal Reminders and Reduce Monthly Churn',
    category: 'Billing',
    tag: 'Billing',
    readTime: '5 min read',
    summary:
      'Proven notification templates and automated UPI collection workflows that reduce subscriber payment follow-up time by over 80%.',
    publishedDate: 'May 2026',
    coverImage: '/images/blog/restaurant-hero.webp',
    author: {
      name: 'Billing & Automation Lab',
      role: 'FinTech Integrations',
    },
  },
  {
    slug: 'setting-up-fup-throttling-mikrotik-unify',
    title: 'Setting Up FUP Throttling on MikroTik Using Unify Wi-Fi',
    category: 'WISP',
    tag: 'WISP',
    readTime: '6 min read',
    summary:
      'Configure daily and monthly data caps with automated CoA (Change of Authorization) queue updates to enforce fair usage policies smoothly.',
    publishedDate: 'May 2026',
    coverImage: '/images/blog/guest-analytics.webp',
    author: {
      name: 'Bandwidth Management Group',
      role: 'QoS & Traffic Shaping',
    },
  },
  {
    slug: 'small-indian-wisp-automation-scale-5000-subscribers',
    title: 'What Every Small Indian WISP Needs to Automate Before Scaling to 5,000 Subscribers',
    category: 'India',
    tag: 'India',
    readTime: '10 min read',
    summary:
      'The transition guide for local cable operators and emerging WISPs moving from manual registers and spreadsheets to automated subscriber lifecycle operations.',
    publishedDate: 'Apr 2026',
    coverImage: '/images/blog/hotel-lobby.webp',
    author: {
      name: 'Operations Advisory',
      role: 'WISP Growth Specialist',
    },
  },
]

export const blogMeta = {
  eyebrow: 'Knowledge Hub & Technical Guides',
  heading: 'The Wi-Fi & ISP Operator Knowledge Hub',
  lead: 'Practical engineering guides, RouterOS scripts, captive portal best practices, and monetisation playbooks — curated for network operators and venue partners.',
}
