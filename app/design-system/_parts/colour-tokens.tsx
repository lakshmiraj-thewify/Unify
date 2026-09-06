import { Spec, SpecRow } from './spec'

/*
 * Class names are written out as literals on purpose: Tailwind v4 resolves
 * utilities by scanning source text, so `bg-${name}-${step}` would compile to
 * nothing. If a swatch below renders white, that token does not exist.
 */

type Swatch = { cls: string; step: string }

const ramps: { name: string; swatches: Swatch[] }[] = [
  {
    name: 'primary — actions, links, emphasis',
    swatches: [
      { cls: 'bg-primary-50', step: '50' },
      { cls: 'bg-primary-100', step: '100' },
      { cls: 'bg-primary-200', step: '200' },
      { cls: 'bg-primary-300', step: '300' },
      { cls: 'bg-primary-400', step: '400' },
      { cls: 'bg-primary-500', step: '500' },
      { cls: 'bg-primary-600', step: '600' },
      { cls: 'bg-primary-700', step: '700' },
      { cls: 'bg-primary-800', step: '800' },
      { cls: 'bg-primary-900', step: '900' },
      { cls: 'bg-primary-950', step: '950' },
    ],
  },
  {
    name: 'signal — live / real-time only',
    swatches: [
      { cls: 'bg-signal-50', step: '50' },
      { cls: 'bg-signal-100', step: '100' },
      { cls: 'bg-signal-200', step: '200' },
      { cls: 'bg-signal-300', step: '300' },
      { cls: 'bg-signal-400', step: '400' },
      { cls: 'bg-signal-500', step: '500' },
      { cls: 'bg-signal-600', step: '600' },
      { cls: 'bg-signal-700', step: '700' },
    ],
  },
  {
    name: 'navy — structural dark',
    swatches: [
      { cls: 'bg-navy-600', step: '600' },
      { cls: 'bg-navy-700', step: '700' },
      { cls: 'bg-navy-800', step: '800' },
      { cls: 'bg-navy-900', step: '900' },
      { cls: 'bg-navy-950', step: '950' },
    ],
  },
  {
    name: 'ink — text on light',
    swatches: [
      { cls: 'bg-ink', step: 'ink' },
      { cls: 'bg-ink-soft', step: 'soft' },
      { cls: 'bg-ink-muted', step: 'muted' },
      { cls: 'bg-ink-faint', step: 'faint' },
    ],
  },
  {
    name: 'surfaces + hairlines',
    swatches: [
      { cls: 'bg-surface', step: 'surface' },
      { cls: 'bg-surface-subtle', step: 'subtle' },
      { cls: 'bg-surface-tint', step: 'tint' },
      { cls: 'bg-line', step: 'line' },
      { cls: 'bg-line-strong', step: 'strong' },
    ],
  },
  {
    name: 'status — never decorative',
    swatches: [
      { cls: 'bg-ok-500', step: 'ok' },
      { cls: 'bg-ok-600', step: 'ok-600' },
      { cls: 'bg-warn-500', step: 'warn' },
      { cls: 'bg-warn-600', step: 'warn-600' },
      { cls: 'bg-danger-500', step: 'danger' },
      { cls: 'bg-danger-600', step: 'danger-600' },
    ],
  },
]

const radii = [
  { cls: 'rounded-sm', label: 'sm · 6' },
  { cls: 'rounded-md', label: 'md · 8' },
  { cls: 'rounded-lg', label: 'lg · 10' },
  { cls: 'rounded-xl', label: 'xl · 12' },
  { cls: 'rounded-2xl', label: '2xl · 16' },
  { cls: 'rounded-full', label: 'full · pills only' },
]

const shadows = [
  { cls: 'shadow-card', label: 'card' },
  { cls: 'shadow-lift', label: 'lift' },
  { cls: 'shadow-primary', label: 'primary' },
  { cls: 'shadow-signal', label: 'signal' },
  { cls: 'shadow-console', label: 'console' },
]

export function ColourTokens() {
  return (
    <div className="flex flex-col gap-6">
      <Spec
        title="colour"
        note="A closed, semantic contract. Anything not shown here is not part of the system."
      >
        <div className="flex flex-col divide-y divide-line">
          {ramps.map((ramp) => (
            <SpecRow key={ramp.name} label={ramp.name}>
              {ramp.swatches.map((swatch) => (
                <span key={swatch.cls} className="flex flex-col items-center gap-1.5">
                  <span
                    className={`size-11 rounded-lg border border-line ${swatch.cls}`}
                    title={swatch.cls}
                  />
                  <span className="font-mono text-[0.625rem] text-ink-faint">{swatch.step}</span>
                </span>
              ))}
            </SpecRow>
          ))}
        </div>
      </Spec>

      <div className="grid gap-6 lg:grid-cols-2">
        <Spec title="radius" note="Capped at 16px. Cards stay square-shouldered.">
          <div className="flex flex-wrap gap-4">
            {radii.map((radius) => (
              <span key={radius.cls} className="flex flex-col items-center gap-1.5">
                <span
                  className={`size-14 border border-primary-300 bg-primary-100 ${radius.cls}`}
                />
                <span className="font-mono text-[0.625rem] text-ink-faint">{radius.label}</span>
              </span>
            ))}
          </div>
        </Spec>

        <Spec title="elevation" note="Tinted, never neutral grey.">
          <div className="flex flex-wrap gap-5">
            {shadows.map((shadow) => (
              <span key={shadow.cls} className="flex flex-col items-center gap-2">
                <span
                  className={`size-14 rounded-xl border border-line bg-surface ${shadow.cls}`}
                />
                <span className="font-mono text-[0.625rem] text-ink-faint">{shadow.label}</span>
              </span>
            ))}
          </div>
        </Spec>
      </div>

      <Spec
        title="gradient"
        note="One gradient in the system. Tiles, icon chips, selective emphasis — never a full band."
      >
        <div className="flex flex-wrap items-center gap-5">
          <span className="size-16 rounded-2xl bg-brand-gradient shadow-primary" />
          <span className="text-brand-gradient text-3xl font-extrabold tracking-tight">
            text-brand-gradient
          </span>
          <span className="size-16 rounded-2xl border border-line bg-grid-faint" />
        </div>
      </Spec>
    </div>
  )
}
