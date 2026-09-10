import type { ReactNode } from 'react'
import { Activity, RadioTower } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { label } from '@/components/ui/typography'
import { cn } from '@/lib/cn'
import { formatNumber } from '@/lib/format'
import {
  CONSOLE_DISCLAIMER,
  authEvents,
  consoleMetrics,
  radiusNodes,
  sessionRows,
  throughputSeries,
  type SessionStatus,
} from '@/content/console'

/**
 * ---------------------------------------------------------------------------
 * Hero dashboard preview — blueprint Section 1, "Live Dashboard Preview".
 *
 * A PRESENTATIONAL preview of the product surface, rendered from static
 * fixtures in `content/console.ts`. There is no RADIUS backend behind this
 * site, nothing is polled, and no value changes after paint. The console says
 * "Product preview · sample data" on its own chrome for exactly that reason,
 * and the figcaption repeats it for screen readers.
 *
 * The one piece of motion is an opacity pulse on the newest sparkline bar and
 * the live dot — opacity only, so it never triggers layout, and it is disabled
 * globally under `prefers-reduced-motion`.
 * ---------------------------------------------------------------------------
 */

/** Colour AND text label for every state — status is never colour-only. */
const statusMeta: Record<SessionStatus, { text: string; dot: string; tone: string }> = {
  live: { text: 'Live', dot: 'bg-signal-400', tone: 'text-signal-200' },
  paid: { text: 'Paid', dot: 'bg-ok-500', tone: 'text-ok-200' },
  expiring: { text: 'Expiring', dot: 'bg-warn-500', tone: 'text-warn-200' },
  failed: { text: 'Auth failed', dot: 'bg-danger-500', tone: 'text-danger-200' },
  suspended: { text: 'Suspended', dot: 'bg-danger-500', tone: 'text-danger-200' },
}

const metricTones = {
  signal: 'text-signal-300',
  ok: 'text-ok-200',
  primary: 'text-primary-200',
  neutral: 'text-dark-fg',
} as const

function ConsolePanel({
  title,
  icon,
  children,
  action,
}: {
  title: string
  icon: ReactNode
  children: ReactNode
  action?: ReactNode
}) {
  return (
    <div className="rounded-xl border border-dark-line bg-navy-950/50">
      <div className="flex items-center justify-between gap-3 border-b border-dark-line px-3 py-2">
        <p className={cn(label.mono, 'flex items-center gap-1.5 text-dark-fg-muted')}>
          <span aria-hidden="true" className="text-signal-400 [&_svg]:size-3.5">
            {icon}
          </span>
          {title}
        </p>
        {action}
      </div>
      {children}
    </div>
  )
}

export function HeroConsole() {
  const lastBarIndex = throughputSeries.length - 1

  return (
    <figure className="overflow-hidden rounded-2xl border border-dark-line bg-navy-900 shadow-console">
      {/* Chrome */}
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 border-b border-dark-line bg-navy-950/60 px-4 py-3">
        <div className="flex items-center gap-2">
          <span aria-hidden="true" className="flex gap-1.5">
            <span className="size-2 rounded-full bg-dark-line-strong" />
            <span className="size-2 rounded-full bg-dark-line-strong" />
            <span className="size-2 rounded-full bg-dark-line-strong" />
          </span>
          <p className={cn(label.mono, 'text-dark-fg-muted')}>unify · operations</p>
        </div>
        <Badge variant="pending" tone="dark" size="sm">
          {CONSOLE_DISCLAIMER}
        </Badge>
      </div>

      {/* Metrics. `gap-px` over a line-coloured background draws the hairlines. */}
      <div className="grid grid-cols-2 gap-px bg-dark-line sm:grid-cols-4">
        {consoleMetrics.map((metric) => (
          <div key={metric.label} className="bg-navy-900 px-3 py-3.5">
            <p
              data-numeric=""
              className={cn(
                'text-xl leading-none font-extrabold tracking-tight',
                metricTones[metric.tone],
              )}
            >
              {formatNumber(metric.value)}
              {metric.unit !== undefined ? (
                <span className="ml-1 text-xs font-bold text-dark-fg-muted">{metric.unit}</span>
              ) : null}
            </p>
            <p className={cn(label.mono, 'mt-1.5 text-dark-fg-muted')}>{metric.label}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3 p-3 sm:p-4">
        {/* RADIUS node health */}
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {radiusNodes.map((node) => (
            <div
              key={node.role}
              className="flex items-center justify-between gap-2 rounded-lg border border-dark-line bg-navy-950/50 px-3 py-2"
            >
              <p className={cn(label.mono, 'text-dark-fg-muted')}>{node.role}</p>
              <span className="inline-flex items-center gap-1.5">
                <span aria-hidden="true" className="size-1.5 rounded-full bg-ok-500" />
                <span className="text-xs font-bold text-ok-200">{node.state}</span>
              </span>
            </div>
          ))}
        </div>

        {/* Throughput sparkline */}
        <ConsolePanel
          title="Aggregate throughput"
          icon={<Activity />}
          action={
            <span className="inline-flex items-center gap-1.5">
              <span
                aria-hidden="true"
                className="size-1.5 animate-pulse-dot rounded-full bg-signal-400"
              />
              {/* A time window, not a "live" claim — nothing here is streamed. */}
              <span className="text-[0.6875rem] font-bold text-signal-200">Last 60 min</span>
            </span>
          }
        >
          <div className="flex h-20 items-end gap-[3px] px-3 py-3" aria-hidden="true">
            {throughputSeries.map((point, index) => (
              <span
                key={index}
                style={{ height: `${point}%` }}
                className={cn(
                  'flex-1 rounded-t-[2px]',
                  index === lastBarIndex ? 'animate-bar-live bg-signal-400' : 'bg-primary-500/45',
                )}
              />
            ))}
          </div>
        </ConsolePanel>

        {/* Sessions */}
        <ConsolePanel title="Subscriber sessions" icon={<RadioTower />}>
          <ul className="divide-y divide-dark-line">
            {sessionRows.map((row) => {
              const meta = statusMeta[row.status]
              return (
                <li
                  key={row.id}
                  className="flex items-center justify-between gap-3 px-3 py-2.5 text-xs"
                >
                  <span className="flex min-w-0 items-center gap-2">
                    <span
                      aria-hidden="true"
                      className={cn('size-1.5 shrink-0 rounded-full', meta.dot)}
                    />
                    <span className="min-w-0">
                      <span className="block truncate font-mono font-semibold text-dark-fg">
                        {row.id}
                      </span>
                      <span className="block text-[0.6875rem] text-dark-fg-muted">
                        {row.kind} · {row.plan}
                      </span>
                    </span>
                  </span>
                  <span className="flex shrink-0 items-center gap-3 text-right">
                    <span
                      data-numeric=""
                      className="hidden text-[0.6875rem] text-dark-fg-muted sm:block"
                    >
                      {row.usage ?? '—'}
                    </span>
                    <span className={cn('font-bold whitespace-nowrap', meta.tone)}>
                      {meta.text}
                    </span>
                  </span>
                </li>
              )
            })}
          </ul>
        </ConsolePanel>

        {/* Authentication log */}
        <ConsolePanel title="RADIUS authentication log" icon={<Activity />}>
          <ul className="divide-y divide-dark-line font-mono text-[0.6875rem]">
            {authEvents.map((event) => (
              <li key={`${event.time}-${event.subject}`} className="flex gap-2.5 px-3 py-2">
                <span data-numeric="" className="shrink-0 text-dark-fg-muted">
                  {event.time}
                </span>
                <span
                  className={cn(
                    'shrink-0 font-bold',
                    event.result === 'Access-Accept' ? 'text-ok-200' : 'text-danger-200',
                  )}
                >
                  {event.result}
                </span>
                <span className="min-w-0 truncate text-dark-fg">{event.subject}</span>
                {event.detail !== undefined ? (
                  <span className="ml-auto shrink-0 text-dark-fg-muted">{event.detail}</span>
                ) : null}
              </li>
            ))}
          </ul>
        </ConsolePanel>
      </div>

      <figcaption className="visually-hidden">
        An illustrative preview of the Unify Wi-Fi operations dashboard, showing subscriber session
        metrics, RADIUS node health, aggregate throughput, subscriber session rows and an
        authentication log. All values shown are sample data for illustration only and are not live
        measurements.
      </figcaption>
    </figure>
  )
}
