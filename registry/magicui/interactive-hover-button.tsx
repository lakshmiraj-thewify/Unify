'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface InteractiveHoverButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
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
    'group relative inline-flex items-center justify-center cursor-pointer overflow-hidden rounded-full font-semibold transition-all select-none',
    isWhite &&
      'bg-white text-[#0D0F17] hover:text-white border border-white/20 px-5 py-2 text-sm shadow-md shadow-white/10',
    isPrimary &&
      'bg-[#743CFF] text-white hover:text-white border border-[#743CFF] px-6 py-3 text-base shadow-lg shadow-[#743CFF]/30',
    isDark &&
      'bg-slate-900 hover:bg-[#743CFF] text-white border border-white/10 hover:border-[#743CFF] px-5 py-2.5 text-sm',
    !isWhite && !isPrimary && !isDark &&
      'bg-white/5 text-white hover:text-white border border-white/15 hover:border-white/30 px-5 py-2 text-sm',
    className,
  )

  const dotColor = isWhite
    ? 'bg-[#743CFF]'
    : isPrimary
      ? 'bg-[#5EE7E4]'
      : isDark
        ? 'bg-[#743CFF]'
        : 'bg-[#743CFF]'

  const hoverTextColor = isPrimary
    ? 'text-[#0D0F17]'
    : 'text-white'

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
          'absolute inset-0 z-10 flex h-full w-full items-center justify-center gap-2 translate-x-12 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100',
          hoverTextColor,
        )}
      >
        <span>{children}</span>
        <ArrowRight className="w-4 h-4 shrink-0" />
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

