/**
 * ===========================================================================
 * ILLUSTRATIVE SAMPLE DATA — NOT LIVE, NOT REAL.
 * ---------------------------------------------------------------------------
 * Fixtures for the hero dashboard preview (blueprint Section 1, "Live Dashboard
 * Preview"). Nothing here is fetched, streamed or measured: there is no RADIUS
 * backend behind this site, and the component that renders it says so on the
 * face of the console.
 *
 * Rules this file follows, deliberately:
 *   - Identifiers are synthetic (`pppoe-10482`), never a real subscriber.
 *   - No operator, customer or brand name appears in any row.
 *   - No datacentre, region or partner is named — those are business facts
 *     nobody has supplied.
 *   - Figures are plausible-looking UI filler, and are never repeated outside
 *     this preview as a marketing claim.
 * ===========================================================================
 */

/** Subscriber-session state. Drives both a colour and a text label — never colour alone. */
export type SessionStatus = 'live' | 'paid' | 'expiring' | 'failed' | 'suspended'

export type ConsoleMetric = {
  label: string
  value: number
  /** Unit appended after the formatted figure, e.g. `Gbps`. */
  unit?: string
  tone: 'signal' | 'ok' | 'primary' | 'neutral'
}

export type SessionRow = {
  /** Synthetic identifier. Not a real subscriber. */
  id: string
  kind: 'PPPoE' | 'Hotspot'
  /** Provisioned speed tier. */
  plan: string
  /** Session volume, or `null` where the session never established. */
  usage: string | null
  status: SessionStatus
}

export type AuthEvent = {
  time: string
  result: 'Access-Accept' | 'Access-Reject'
  subject: string
  detail?: string
}

export const consoleMetrics: ConsoleMetric[] = [
  { label: 'Active sessions', value: 2481, tone: 'signal' },
  { label: 'Auth / min', value: 1204, tone: 'primary' },
  { label: 'Throughput', value: 18.4, unit: 'Gbps', tone: 'signal' },
  { label: 'Auth response', value: 12, unit: 'ms', tone: 'ok' },
]

export const sessionRows: SessionRow[] = [
  { id: 'pppoe-10482', kind: 'PPPoE', plan: '100 Mbps', usage: '42.6 GB', status: 'live' },
  { id: 'pppoe-10517', kind: 'PPPoE', plan: '50 Mbps', usage: '18.1 GB', status: 'paid' },
  { id: 'hotspot-77120', kind: 'Hotspot', plan: '20 Mbps', usage: '2.4 GB', status: 'expiring' },
  { id: 'pppoe-10334', kind: 'PPPoE', plan: '200 Mbps', usage: null, status: 'failed' },
  { id: 'pppoe-09781', kind: 'PPPoE', plan: '50 Mbps', usage: null, status: 'suspended' },
]

export const authEvents: AuthEvent[] = [
  { time: '21:04:11', result: 'Access-Accept', subject: 'pppoe-10482' },
  { time: '21:04:09', result: 'Access-Accept', subject: 'hotspot-77120' },
  { time: '21:04:04', result: 'Access-Reject', subject: 'pppoe-10334', detail: 'Bad password' },
  { time: '21:03:58', result: 'Access-Accept', subject: 'pppoe-10517' },
]

/** Relative bar heights (0–100) for the throughput sparkline. Shape only. */
export const throughputSeries: number[] = [
  38, 44, 41, 52, 60, 55, 63, 71, 66, 74, 82, 77, 85, 79, 88, 92,
]

/**
 * Health of the two RADIUS roles. Intentionally unnamed and unlocated: the
 * blueprint promises geo-redundancy but names no region, so none is invented.
 */
export const radiusNodes = [
  { role: 'RADIUS primary', state: 'Operational' },
  { role: 'RADIUS secondary', state: 'Standby' },
] as const

/** Shown on the console chrome so the preview is never mistaken for live data. */
export const CONSOLE_DISCLAIMER = 'Product preview · sample data'
