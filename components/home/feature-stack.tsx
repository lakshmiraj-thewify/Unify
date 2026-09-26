'use client'

import { Zap, MessageSquare, Sliders, ShieldCheck } from 'lucide-react'
import ScrollStack, { ScrollStackItem } from '@/components/ui/scroll-stack'

const features = [
  {
    icon: Zap,
    accent: '#5EE7E4',
    tag: 'Ultra-Fast Performance',
    title: 'Sub-15ms RADIUS Authentication SLA',
    description:
      'Every PPPoE and Hotspot login request is validated through an ultra-low latency cloud cluster. Eliminates subscriber connection lag even during peak evening hours.',
    metric: '<15ms',
    metricLabel: 'Average auth response time',
  },
  {
    icon: MessageSquare,
    accent: '#743CFF',
    tag: 'Zero Churn Reminders',
    title: 'Automated WhatsApp & UPI Invoicing',
    description:
      '3 days prior to plan expiry, Unify automatically generates GST-compliant bills and dispatches a personalized WhatsApp notification with a direct UPI payment link.',
    metric: '80%',
    metricLabel: 'Reduction in manual follow-up calls',
  },
  {
    icon: Sliders,
    accent: '#5EE7E4',
    tag: 'No Scripting',
    title: 'CoA-Based Bandwidth & FUP Throttling',
    description:
      'When subscribers hit their data cap, Unify dynamically throttles connection speed using RADIUS CoA without dropping the active PPPoE session or requiring router reboots.',
    metric: '0 Disconnects',
    metricLabel: 'Seamless speed transitions',
  },
  {
    icon: ShieldCheck,
    accent: '#9061FF',
    tag: 'Enterprise Availability',
    title: '99.99% Cloud RADIUS Uptime Cluster',
    description:
      'Multiple active-active cloud nodes across high-availability data centers ensure your network never halts due to an on-premise hardware crash, UPS failure, or local power outage.',
    metric: '99.99%',
    metricLabel: 'RADIUS availability SLA',
  },
]

export function FeatureStack() {
  return (
    <section id="architecture" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="mb-16 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-[#9061FF] tracking-wider uppercase mb-4">
            Cloud Infrastructure
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Eliminate server crashes and manual collection calls.
          </h2>
          <p className="text-white/70 text-base sm:text-lg leading-relaxed">
            Running on-premise RADIUS hardware requires dedicated servers, static IPs, UPS
            batteries, and constant Linux maintenance. Unify moves that entire layer to an
            enterprise cloud cluster.
          </p>
        </div>

        {/* ScrollStack — full-width, exactly like the reference */}
        <ScrollStack
          itemDistance={120}
          itemScale={0.03}
          itemStackDistance={30}
          stackPosition="20%"
          scaleEndPosition="10%"
          baseScale={0.85}
        >
          {features.map((item, index) => {
            const Icon = item.icon
            return (
              <ScrollStackItem key={index}>
                <div
                  className="p-8 sm:p-10 rounded-3xl border border-white/10 hover:border-white/20 transition-colors shadow-xl"
                  style={{ backgroundColor: '#131722cc' }}
                >
                  {/* Card number */}
                  <span className="absolute top-6 right-8 text-xs font-bold tracking-widest text-white/10">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-8 items-start">
                    {/* Left: icon + tag */}
                    <div>
                      <div
                        className="w-11 h-11 rounded-2xl flex items-center justify-center shadow-lg mb-5"
                        style={{ backgroundColor: `${item.accent}20`, color: item.accent }}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/60 inline-block mb-3">
                        {item.tag}
                      </span>
                      <div className="mt-4 pt-4 border-t border-white/5">
                        <span
                          className="text-3xl sm:text-4xl font-mono font-extrabold block"
                          style={{ color: item.accent }}
                        >
                          {item.metric}
                        </span>
                        <span className="text-xs text-white/40 mt-1 block">{item.metricLabel}</span>
                      </div>
                    </div>

                    {/* Right: title + description */}
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-3">
                        {item.title}
                      </h3>
                      <p className="text-white/60 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollStackItem>
            )
          })}
        </ScrollStack>

      </div>
    </section>
  )
}
