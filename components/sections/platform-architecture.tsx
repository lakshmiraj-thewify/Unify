import Image from 'next/image'
import { Layers, Lock, Server } from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'
import { Section } from '@/components/ui/section'
import { SectionHeading } from '@/components/ui/section-heading'
import { WaveDivider } from '@/components/ui/wave-divider'
import { archPoints, architectureSection } from '@/content/home'
import { sectionIds } from '@/content/nav'

const iconMap = {
  ServerStack: Server,
  Lock,
  Layers,
} as const

type IconKey = keyof typeof iconMap

/**
 * Platform Architecture — blueprint Section 10.
 * Charcoal dark band with architecture points and topology visual.
 */
export function PlatformArchitecture() {
  return (
    <div className="relative bg-navy-900 text-white">
      <WaveDivider from="light" />

      <Section
        id={sectionIds.architecture}
        tone="dark"
        spacing="default"
        divider="none"
        aria-labelledby="architecture-heading"
        className="bg-transparent"
      >
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left: Text content */}
          <div>
            <SectionHeading
              id="architecture-heading"
              eyebrow={architectureSection.eyebrow}
              title={architectureSection.heading}
              lead={architectureSection.lead}
              tone="dark"
              align="left"
            />

            <ul className="mt-10 flex flex-col gap-6">
              {archPoints.map((point, i) => {
                const Icon = iconMap[point.icon as IconKey]
                return (
                  <Reveal key={point.title} as="li" delay={i * 80}>
                    <div className="flex gap-4">
                      <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-primary-500/20 text-primary-400 border border-primary-400/30 [&_svg]:size-5">
                        {Icon ? <Icon /> : null}
                      </span>
                      <div className="flex flex-col gap-1">
                        <h3 className="font-heading text-base font-semibold text-white">{point.title}</h3>
                        <p className="text-sm leading-relaxed text-dark-fg-muted">{point.detail}</p>
                      </div>
                    </div>
                  </Reveal>
                )
              })}
            </ul>
          </div>

          {/* Right: Architecture visualization */}
          <Reveal delay={200}>
            <div className="relative overflow-hidden rounded-[16px] border border-white/10 bg-navy-800/80 p-6 shadow-lift backdrop-blur-sm">
              <div className="relative aspect-[16/11] w-full overflow-hidden rounded-lg bg-navy-950/60 flex items-center justify-center">
                <Image
                  src="/images/visp/activation-server-3.png"
                  alt="Platform Architecture Topology"
                  width={700}
                  height={480}
                  className="h-full w-full object-contain p-2"
                />
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3 text-xs text-dark-fg-muted">
                <span className="font-semibold text-primary-300">Tenant-Isolated Architecture</span>
                <span className="font-mono text-primary-400">Zero Local Server Maintenance</span>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <WaveDivider from="dark" />
    </div>
  )
}
