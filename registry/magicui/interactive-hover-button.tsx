'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface InteractiveHoverButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string
  text?: string
  variant?: 'white' | 'primary' | 'outline' | 'dark'
}

export function InteractiveHoverButton({
  children,
  className,
  href,
  variant = 'white',
  ...props
}: InteractiveHoverButtonProps) {
  const isWhite = variant === 'white'
  const isPrimary = variant === 'primary'
  const isDark = variant === 'dark'

  const baseStyles = cn(
    'group relative inline-flex cursor-pointer items-center justify-center overflow-hidden rounded-full font-semibold transition-all select-none',
    isWhite &&
      'border border-white/20 bg-white px-5 py-2 text-sm text-[#0D0F17] shadow-md shadow-white/10 hover:text-white',
    isPrimary &&
      'border border-[#743CFF] bg-[#743CFF] px-6 py-3 text-base text-white shadow-lg shadow-[#743CFF]/30 hover:text-white',
    isDark &&
      'border border-white/10 bg-slate-900 px-5 py-2.5 text-sm text-white hover:border-[#743CFF] hover:bg-[#743CFF]',
    !isWhite &&
      !isPrimary &&
      !isDark &&
      'border border-white/15 bg-white/5 px-5 py-2 text-sm text-white hover:border-white/30 hover:text-white',
    className,
  )

  const dotColor = isWhite
    ? 'bg-[#743CFF]'
    : isPrimary
      ? 'bg-[#5EE7E4]'
      : isDark
        ? 'bg-[#743CFF]'
        : 'bg-[#743CFF]'

  const hoverTextColor = isPrimary ? 'text-[#0D0F17]' : 'text-white'

  const content = (
    <>
      <div className="flex items-center justify-center gap-2">
        <div
          className={cn(
            'h-2 w-2 shrink-0 rounded-full transition-all duration-300 group-hover:scale-[100.8]',
            dotColor,
          )}
        />
        <span className="inline-block transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
          {children}
        </span>
      </div>
      <div
        className={cn(
          'absolute inset-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100',
          hoverTextColor,
        )}
      >
        <span>{children}</span>
        <ArrowRight className="h-4 w-4 shrink-0" />
      </div>
    </>
  )

  if (href) {
    return (
      <Link href={href} className={baseStyles}>
        {content}
      </Link>
    )
  }

  return (
    <button className={baseStyles} {...props}>
      {content}
    </button>
  )
}
