'use client'

import { Router, CreditCard, MessageCircle, Network } from 'lucide-react'

export function EcosystemTransition() {
  const integrations = [
    {
      title: 'Routers & Firmware',
      icon: Router,
      accent: '#6C8DFF',
      description:
        'Native compatibility with MikroTik without external agent scripts or flashing custom firmware.',
      items: [
        { name: 'MikroTik RouterOS v7', tag: 'Native' },
        { name: 'MikroTik RouterOS v6', tag: 'Supported' },
        { name: 'MikroTik CHR (Cloud Hosted)', tag: 'Verified' },
        { name: 'CCR & hEX Hardware', tag: 'Tested' },
      ],
    },
    {
      title: 'Automated Payments & UPI',
      icon: CreditCard,
      accent: '#5EE7E4',
      description:
        'Direct integration with Indian and international payment gateways for 1-tap subscriber renewals.',
      items: [
        { name: 'Razorpay Payment Links', tag: 'Built-in' },
        { name: 'UPI Auto-Pay & QR', tag: 'Zero Fee' },
        { name: 'Stripe Global Payments', tag: 'Enabled' },
        { name: 'PhonePe & GPay Direct', tag: 'Supported' },
      ],
    },
    {
      title: 'WhatsApp & SMS Alerts',
      icon: MessageCircle,
      accent: '#C084FC',
      description:
        'Dispatch real-time expiry notices, automated receipts, and welcome messages to subscribers.',
      items: [
        { name: 'WhatsApp Business API', tag: 'Official' },
        { name: 'Transactional SMS Gateway', tag: 'Fast' },
        { name: 'Automated Invoice PDFs', tag: 'GST Ready' },
        { name: 'Telegram Admin Alerts', tag: 'Realtime' },
      ],
    },
    {
      title: 'Standard Network Protocols',
      icon: Network,
      accent: '#743CFF',
      description:
        'Built entirely on open, battle-tested telecom and networking RFC standards for zero vendor lock-in.',
      items: [
        { name: 'PPPoE Framed Sessions', tag: 'Core' },
        { name: 'RFC 2865 RADIUS AAA', tag: 'Standard' },
        { name: 'RFC 3576 CoA & Disconnect', tag: 'Dynamic' },
        { name: 'Captive Portal Hotspot', tag: 'Voucher' },
      ],
    },
  ]

  return (
    <section
      id="integrations"
      className="unify-transition-gradient relative overflow-hidden pt-24 pb-32"
    >
      {/* Background aurora lights */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 h-[400px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-r from-[#743CFF]/40 via-[#9061FF]/30 to-[#5EE7E4]/20 blur-[130px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold tracking-wider text-white uppercase backdrop-blur-md">
            Zero Hardware Lock-In
          </div>
          <h2 className="mb-4 text-3xl leading-tight font-extrabold tracking-tight text-white drop-shadow-md sm:text-5xl">
            Integrates with the network stack you already use
          </h2>
          <p className="text-base text-white/80 drop-shadow sm:text-lg">
            Connect Unify directly to your existing routers, payment gateways, and messaging APIs
            without replacing your hardware.
          </p>
        </div>

        {/* 4 Frosted Violet Glass Cards (NO dark black cards!) */}
        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2">
          {integrations.map((card, idx) => {
            const Icon = card.icon
            return (
              <div
                key={idx}
                className="unify-frosted-violet-card space-y-6 p-6 transition-all duration-300 sm:p-8"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/15 text-white shadow-lg">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-xl font-bold tracking-tight text-white">{card.title}</h3>
                  </div>
                  <span className="h-2.5 w-2.5 rounded-full bg-[#5EE7E4] shadow-sm shadow-[#5EE7E4]" />
                </div>

                <p className="text-sm leading-relaxed text-white/85">{card.description}</p>

                {/* Sub-item pills */}
                <div className="grid grid-cols-2 gap-2.5 pt-2">
                  {card.items.map((item, itemIdx) => (
                    <div
                      key={itemIdx}
                      className="flex items-center justify-between rounded-xl border border-white/15 bg-white/10 p-2.5 text-xs text-white transition-all hover:bg-white/15"
                    >
                      <span className="mr-1 truncate font-medium">{item.name}</span>
                      <span className="shrink-0 rounded bg-white/20 px-1.5 py-0.5 font-mono text-[10px] text-white/90">
                        {item.tag}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
