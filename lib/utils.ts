import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type Link from 'next/link'
import type { ComponentProps } from 'react'

/**
 * Merge conditional class names with Tailwind utility conflict resolution.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

/**
 * Locale-aware formatters (en-IN for Indian ISP/network operators).
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

/** `48000` -> `"₹48,000"` */
export function formatINR(value: number): string {
  return INR_WHOLE.format(value)
}

/** The `href` type accepted by `next/link`. */
export type LinkHref = ComponentProps<typeof Link>['href']
