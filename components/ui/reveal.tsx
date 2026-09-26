'use client'

import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react'
import { cn } from '@/lib/cn'

type RevealProps = {
  children: ReactNode
  /** Stagger within a group, in milliseconds. */
  delay?: number
  as?: 'div' | 'li' | 'section' | 'article' | 'span'
  className?: string
}

/**
 * Fades content up the first time it enters the viewport.
 *
 * The hidden start state lives in CSS behind `@media (scripting: enabled)`, so a
 * visitor or crawler without JavaScript gets fully visible content instead of an
 * invisible page — the failure mode of the usual `style="opacity:0"` approach.
 *
 * Reduced-motion users are opted out twice: here (the observer is skipped) and
 * globally in globals.css.
 */
export function Reveal({ children, delay = 0, as: Tag = 'div', className }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const element = ref.current
    if (element === null) return

    /*
     * `data-revealed` is written straight to the DOM rather than held in state.
     * It is set once, never read during render, and driven entirely by a browser
     * API — the case the effect rules describe as synchronising an external
     * system. It also saves a re-render per revealed element, and the rendered
     * markup stays identical on server and client.
     */
    const reveal = () => element.setAttribute('data-revealed', 'true')

    if (
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      reveal()
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            reveal()
            observer.disconnect()
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref as any}
      data-revealed="false"
      style={delay > 0 ? ({ '--reveal-delay': `${delay}ms` } as CSSProperties) : undefined}
      className={cn('reveal', className)}
    >
      {children}
    </Tag>
  )
}
