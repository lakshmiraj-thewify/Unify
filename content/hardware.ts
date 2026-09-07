import type { Provided } from './types'

/**
 * ---------------------------------------------------------------------------
 * Hardware compatibility ribbon — Section 2 of the approved blueprint.
 *
 * The blueprint names six vendors and asks for a setup-time badge under each,
 * but supplies exactly one figure: `MikroTik  10 min`. The other five are
 * `null` rather than estimated. A setup time is a performance claim an operator
 * will hold us to, so an invented one is worse than a visibly missing one.
 * ---------------------------------------------------------------------------
 */

export type HardwareVendor = {
  name: string
  /** Approved setup time, or `null` where the blueprint gives none. */
  setupTime: Provided<string>
}

export const hardwareVendors: HardwareVendor[] = [
  { name: 'MikroTik', setupTime: '10 min' },
  /** PENDING(Q4): no setup time supplied for this vendor. */
  { name: 'Cambium', setupTime: null },
  /** PENDING(Q4): no setup time supplied for this vendor. */
  { name: 'Ubiquiti', setupTime: null },
  /** PENDING(Q4): no setup time supplied for this vendor. */
  { name: 'Ruijie', setupTime: null },
  /** PENDING(Q4): no setup time supplied for this vendor. */
  { name: 'Cisco', setupTime: null },
  /** PENDING(Q4): no setup time supplied for this vendor. */
  { name: 'TP-Link', setupTime: null },
]

export const hardware = {
  heading: 'Works instantly with the hardware you already operate',
  /*
   * Restates the blueprint's own FAQ answer: "No. Unify connects to MikroTik,
   * Cambium, Ubiquiti, and more via standard RADIUS protocol."
   */
  lead: 'Unify connects over the standard RADIUS protocol, so nothing in your network has to be replaced.',
} as const
