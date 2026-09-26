'use client'

import { Router, CreditCard, MessageCircle, Network } from 'lucide-react'

export function EcosystemTransition() {
  const integrations = [
    {
      title: 'Routers & Firmware',
      icon: Router,
      accent: '#6C8DFF',
      description: 'Native compatibility with MikroTik without external agent scripts or flashing custom firmware.',
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
      description: 'Direct integration with Indian and international payment gateways for 1-tap subscriber renewals.',
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
      description: 'Dispatch real-time expiry notices, automated receipts, and welcome messages to subscribers.',
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
      description: 'Built entirely on open, battle-tested telecom and networking RFC standards for zero vendor lock-in.',
      items: [
        { name: 'PPPoE Framed Sessions', tag: 'Core' },
        { name: 'RFC 2865 RADIUS AAA', tag: 'Standard' },
        { name: 'RFC 3576 CoA & Disconnect', tag: 'Dynamic' },
        { name: 'Captive Portal Hotspot', tag: 'Voucher' },
      ],
    },
  ]

  return (
    <section id="integrations" className="relative unify-transition-gradient pt-24 pb-32 overflow-hidden">
      {/* Background aurora lights */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-gradient-to-r from-[#743CFF]/40 via-[#9061FF]/30 to-[#5EE7E4]/20 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-white tracking-wider uppercase mb-4 backdrop-blur-md">
            Zero Hardware Lock-In
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4 drop-shadow-md">
            Integrates with the network stack you already use
          </h2>
          <p className="text-white/80 text-base sm:text-lg drop-shadow">
            Connect Unify directly to your existing routers, payment gateways, and messaging APIs without replacing your hardware.
          </p>
        </div>

        {/* 4 Frosted Violet Glass Cards (NO dark black cards!) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {integrations.map((card, idx) => {
            const Icon = card.icon
            return (
              <div
                key={idx}
                className="unify-frosted-violet-card p-6 sm:p-8 space-y-6 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg bg-white/15 text-white border border-white/20"
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-bold text-white tracking-tight">
                      {card.title}
                    </h3>
                  </div>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#5EE7E4] shadow-sm shadow-[#5EE7E4]" />
                </div>

                <p className="text-white/85 text-sm leading-relaxed">
                  {card.description}
                </p>

                {/* Sub-item pills */}
                <div className="grid grid-cols-2 gap-2.5 pt-2">
                  {card.items.map((item, itemIdx) => (
                    <div
                      key={itemIdx}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 transition-all text-xs text-white"
                    >
                      <span className="font-medium truncate mr-1">{item.name}</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/20 text-white/90 shrink-0">
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
