/**
 * Locale-aware formatters.
 *
 * The audience is Indian ISP, WISP and LCO operators, so grouping follows the
 * Indian numbering system (1,00,000 not 100,000) and currency is INR. Intl
 * instances are constructed once at module scope — they are expensive.
 */

const NUMBER = new Intl.NumberFormat('en-IN')

const INR_WHOLE = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
})

/** `12500` -> `"12,500"` */
export function formatNumber(value: number): string {
  return NUMBER.format(value)
}

/** `48000` -> `"₹48,000"`. Whole rupees only; this product is not priced in paise. */
export function formatINR(value: number): string {
  return INR_WHOLE.format(value)
}
