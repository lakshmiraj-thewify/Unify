import { ShieldCheck, ReceiptText, Gauge, Building2 } from 'lucide-react'
import { BounceCards } from '@/components/ui/bounce-cards'

const pillars = [
  {
    icon: ShieldCheck,
    title: 'Cloud RADIUS',
    description: 'Geo-redundant AAA cluster. Handles PPPoE & Hotspot authentication with sub-15ms response — no on-premise Linux server needed.',
    color: '#5EE7E4',
  },
  {
    icon: ReceiptText,
    title: 'Automated Billing',
    description: 'GST-compliant invoices, Razorpay & UPI integration, and WhatsApp renewal reminders — all triggered automatically on plan expiry.',
    color: '#743CFF',
  },
  {
    icon: Gauge,
    title: 'FUP & Throttling',
    description: 'Per-plan data caps, daily/monthly quotas, and CoA-based speed throttling when subscribers hit their limit. Zero manual intervention.',
    color: '#6C8DFF',
  },
  {
    icon: Building2,
    title: 'White-Label Portal',
    description: 'Give each LCO partner their own branded domain, logo, and fully isolated subscriber dashboard. Zero Unify branding visible to end users.',
    color: '#C084FC',
  },
]

const transformStyles = [
  'rotate(-8deg) translate(-360px)',
  'rotate(-2.5deg) translate(-120px)',
  'rotate(2.5deg) translate(120px)',
  'rotate(8deg) translate(360px)',
]

export function FourPillars() {
  const cardItems = pillars.map((pillar) => {
    const Icon = pillar.icon
    return {
      id: pillar.title,
      title: pillar.title,
      description: pillar.description,
      color: pillar.color,
      icon: <Icon className="size-5" aria-hidden="true" />,
    }
  })

  return (
    <section className="py-24 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-[#5EE7E4] tracking-wider uppercase mb-4">
            Core Platform
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Four pillars.{' '}
            <span className="bg-gradient-to-r from-[#6C8DFF] to-[#C084FC] bg-clip-text text-transparent">
              One seamless platform.
            </span>
          </h2>
          <p className="text-white/60 text-base sm:text-lg leading-relaxed">
            Cloud RADIUS, automated billing, FUP enforcement, and white-label reseller portals —
            all tightly integrated for ISPs and MikroTik operators.
          </p>
        </div>

        {/* Desktop Interactive BounceCards Fan (Hover to inspect & push siblings) */}
        <div className="hidden lg:block w-full">
          <BounceCards
            items={cardItems}
            containerWidth="100%"
            containerHeight={380}
            transformStyles={transformStyles}
            enableHover={true}
            animationDelay={0.2}
            animationStagger={0.09}
            easeType="elastic.out(1, 0.6)"
          />
        </div>

        {/* Mobile & Tablet Responsive Grid */}
        <div className="grid lg:hidden gap-5 sm:grid-cols-2">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon
            return (
              <div
                key={pillar.title}
                className="unify-card-dark p-6 rounded-2xl flex flex-col justify-between border border-white/10"
              >
                <div className="flex flex-col gap-4">
                  <span
                    className="inline-flex size-11 items-center justify-center rounded-xl"
                    style={{ background: `${pillar.color}15`, color: pillar.color }}
                  >
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-white mb-1.5">{pillar.title}</h3>
                    <p className="text-sm text-white/60 leading-relaxed">{pillar.description}</p>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs">
                  <span className="font-mono text-[#5EE7E4]">0{idx + 1} // CORE</span>
                  <span className="text-white/40">MikroTik Ready</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

