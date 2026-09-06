import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge conditional class names, with later Tailwind utilities winning over
 * earlier conflicting ones. Every primitive routes its `className` prop through
 * this so callers can always override a variant without `!important`.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
