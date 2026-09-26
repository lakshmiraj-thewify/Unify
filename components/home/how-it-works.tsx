'use client'

import { useRef } from 'react'
import { Router, Wifi, ClipboardList, RefreshCcw, LayoutDashboard } from 'lucide-react'
import { AnimatedBeam } from '@/registry/magicui/animated-beam'

const steps = [
  {
    step: 1,
    icon: Router,
    title: 'Point Your MikroTik at Unify',
    description:
      'Add a single RADIUS entry in RouterOS with the Unify hostname, shared secret, and NAS ID. Three fields. Done.',
    color: '#5EE7E4',
  },
  {
    step: 2,
    icon: Wifi,
    title: 'First Subscriber Authenticates',
    description:
      'Your MikroTik PPPoE or Hotspot server sends RADIUS auth to Unify cloud. Sub-15ms response. Subscriber is online.',
    color: '#743CFF',
  },
  {
    step: 3,
    icon: ClipboardList,
    title: 'Add Subscribers & Plans',
    description:
      'Create subscriber profiles, assign plans with speed limits and data quotas. WhatsApp billing reminders activate automatically.',
    color: '#6C8DFF',
  },
  {
    step: 4,
    icon: RefreshCcw,
    title: 'Billing Runs Automatically',
    description:
      'Invoices generate on expiry. UPI pay links go out on WhatsApp. Razorpay handles collection. No staff follow-ups needed.',
    color: '#C084FC',
  },
  {
    step: 5,
    icon: LayoutDashboard,
    title: 'Monitor & Scale From One Dashboard',
    description:
      'Live session visibility, bandwidth graphs, payment collection rates, and LCO partner portals — all in one place.',
    color: '#5EE7E4',
  },
]

export function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null)
  const step1Ref = useRef<HTMLSpanElement>(null)
  const step2Ref = useRef<HTMLSpanElement>(null)
  const step3Ref = useRef<HTMLSpanElement>(null)
  const step4Ref = useRef<HTMLSpanElement>(null)
  const step5Ref = useRef<HTMLSpanElement>(null)

  const stepRefs = [step1Ref, step2Ref, step3Ref, step4Ref, step5Ref]

  return (
    <section id="how-it-works" className="relative z-10 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold tracking-wider text-[#5EE7E4] uppercase">
            How It Works
          </div>
          <h2 className="mb-4 text-3xl leading-tight font-extrabold tracking-tight text-white sm:text-5xl">
            From router to cloud in{' '}
            <span className="bg-gradient-to-r from-[#5EE7E4] to-[#C084FC] bg-clip-text text-transparent">
              10 minutes.
            </span>
          </h2>
          <p className="text-base leading-relaxed text-white/60 sm:text-lg">
            No servers to buy. No Linux expertise required. No downtime risk.
          </p>
        </div>

        {/* Relative container wrapping the steps & animated beams */}
        <div ref={containerRef} className="relative">
          <ol className="relative z-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {steps.map((step, i) => {
              const Icon = step.icon
              const currentRef = stepRefs[i]

              return (
                <li key={step.step} className="relative flex flex-col gap-4">
                  <div className="relative z-10 flex items-center gap-3 lg:flex-col lg:items-start">
                    <span
                      ref={currentRef}
                      className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border-2 transition-transform duration-300 hover:scale-110"
                      style={{
                        borderColor: step.color,
                        color: step.color,
                        background: `${step.color}18`,
                        boxShadow: `0 0 16px -2px ${step.color}40`,
                      }}
                    >
                      <Icon className="size-4" aria-hidden="true" />
                    </span>
                    <span
                      className="text-xs font-bold tracking-widest uppercase lg:mt-3"
                      style={{ color: step.color }}
                    >
                      Step {step.step}
                    </span>
                  </div>
                  <div className="lg:mt-1">
                    <h3 className="text-sm font-bold text-white">{step.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-white/55">
                      {step.description}
                    </p>
                  </div>
                </li>
              )
            })}
          </ol>

          {/* Sequential Animated Beams across the 5 step nodes */}
          <div className="pointer-events-none hidden lg:block">
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={step1Ref}
              toRef={step2Ref}
              duration={2.8}
              delay={0}
              gradientStartColor="#5EE7E4"
              gradientStopColor="#743CFF"
              pathColor="rgba(255, 255, 255, 0.08)"
              pathWidth={2}
            />
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={step2Ref}
              toRef={step3Ref}
              duration={2.8}
              delay={0.7}
              gradientStartColor="#743CFF"
              gradientStopColor="#6C8DFF"
              pathColor="rgba(255, 255, 255, 0.08)"
              pathWidth={2}
            />
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={step3Ref}
              toRef={step4Ref}
              duration={2.8}
              delay={1.4}
              gradientStartColor="#6C8DFF"
              gradientStopColor="#C084FC"
              pathColor="rgba(255, 255, 255, 0.08)"
              pathWidth={2}
            />
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={step4Ref}
              toRef={step5Ref}
              duration={2.8}
              delay={2.1}
              gradientStartColor="#C084FC"
              gradientStopColor="#5EE7E4"
              pathColor="rgba(255, 255, 255, 0.08)"
              pathWidth={2}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
