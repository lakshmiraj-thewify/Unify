import { ShieldCheck, ReceiptText, Gauge, Building2 } from 'lucide-react'
import { BounceCards } from '@/components/ui/bounce-cards'

const pillars = [
  {
    icon: ShieldCheck,
    title: 'Cloud RADIUS',
    description:
      'Geo-redundant AAA cluster. Handles PPPoE & Hotspot authentication with sub-15ms response — no on-premise Linux server needed.',
    color: '#5EE7E4',
  },
  {
    icon: ReceiptText,
    title: 'Automated Billing',
    description:
      'GST-compliant invoices, Razorpay & UPI integration, and WhatsApp renewal reminders — all triggered automatically on plan expiry.',
    color: '#743CFF',
  },
  {
    icon: Gauge,
    title: 'FUP & Throttling',
    description:
      'Per-plan data caps, daily/monthly quotas, and CoA-based speed throttling when subscribers hit their limit. Zero manual intervention.',
    color: '#6C8DFF',
  },
  {
    icon: Building2,
    title: 'White-Label Portal',
    description:
      'Give each LCO partner their own branded domain, logo, and fully isolated subscriber dashboard. Zero Unify branding visible to end users.',
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
    <section className="relative z-10 overflow-hidden py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold tracking-wider text-[#5EE7E4] uppercase">
            Core Platform
          </div>
          <h2 className="mb-4 text-3xl leading-tight font-extrabold tracking-tight text-white sm:text-5xl">
            Four pillars.{' '}
            <span className="bg-gradient-to-r from-[#6C8DFF] to-[#C084FC] bg-clip-text text-transparent">
              One seamless platform.
            </span>
          </h2>
          <p className="text-base leading-relaxed text-white/60 sm:text-lg">
            Cloud RADIUS, automated billing, FUP enforcement, and white-label reseller portals — all
            tightly integrated for ISPs and MikroTik operators.
          </p>
        </div>

        {/* Desktop Interactive BounceCards Fan (Hover to inspect & push siblings) */}
        <div className="hidden w-full lg:block">
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
        <div className="grid gap-5 sm:grid-cols-2 lg:hidden">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon
            return (
              <div
                key={pillar.title}
                className="unify-card-dark flex flex-col justify-between rounded-2xl border border-white/10 p-6"
              >
                <div className="flex flex-col gap-4">
                  <span
                    className="inline-flex size-11 items-center justify-center rounded-xl"
                    style={{ background: `${pillar.color}15`, color: pillar.color }}
                  >
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="mb-1.5 text-base font-bold text-white">{pillar.title}</h3>
                    <p className="text-sm leading-relaxed text-white/60">{pillar.description}</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-white/[0.08] pt-3 text-xs">
                  <span className="font-mono text-[#5EE7E4]">
                    0{idx + 1} {'//'} CORE
                  </span>
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
