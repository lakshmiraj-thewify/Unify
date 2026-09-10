/**
 * ---------------------------------------------------------------------------
 * Hardware compatibility — Section 2 of the approved blueprint.
 *
 * The blueprint identifies MikroTik as the primary and only approved hardware
 * vendor for the current launch. No setup times or compatibility claims are
 * made for any other vendor — Unify Wi-Fi is intentionally MikroTik-first.
 *
 * The other vendors (Cambium, Ubiquiti, Ruijie, Cisco, TP-Link) had no
 * approved setup times and are not listed to avoid unsupported performance
 * claims. Remove the PENDING markers — MikroTik is the official position.
 * ---------------------------------------------------------------------------
 */

export const hardware = {
  eyebrow: 'Official hardware partner',
  heading: 'Built for MikroTik. Optimised for MikroTik.',
  lead: "Unify Wi-Fi is purpose-built around MikroTik's RouterOS. Connect your existing router in under 10 minutes — no other hardware is needed.",
  setupTime: '10 min',
  setupLabel: 'Average setup time',
  features: [
    'Full PPPoE & Hotspot integration',
    'CoA-based bandwidth control',
    'Sub-15ms RADIUS auth response',
    'Works with RouterOS v6 & v7',
    'MikroTik CHR supported',
    'No firmware changes required',
  ],
  compatibilityNote: 'Works with any MikroTik router running RouterOS — from hEX to CCR2.',
} as const
