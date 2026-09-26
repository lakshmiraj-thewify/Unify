'use client'

import {
  useLayoutEffect,
  useRef,
  useCallback,
  type ReactNode,
  type CSSProperties,
} from 'react'
import { cn } from '@/lib/utils'

// ─── ScrollStackItem ──────────────────────────────────────────────────────────

export interface ScrollStackItemProps {
  children?: ReactNode
  className?: string
  style?: CSSProperties
}

export function ScrollStackItem({
  children,
  className = '',
  style,
}: ScrollStackItemProps) {
  return (
    // scroll-stack-card is the hook class ScrollStack queries for
    <div
      className={cn(
        'scroll-stack-card relative w-full rounded-3xl box-border origin-top',
        className
      )}
      style={{ backfaceVisibility: 'hidden', ...style }}
    >
      {children}
    </div>
  )
}

// ─── ScrollStack ──────────────────────────────────────────────────────────────

export interface ScrollStackProps {
  children: ReactNode
  className?: string
  /** px gap between cards — this is the "scroll distance" before the next card arrives */
  itemDistance?: number
  /** how much each extra card scales down the one below it */
  itemScale?: number
  /** px vertical offset between pinned cards to show stack depth */
  itemStackDistance?: number
  /** % of viewport height from top where cards pin */
  stackPosition?: string
  /** % of viewport height from top where the scale animation completes */
  scaleEndPosition?: string
  /** final scale of the deepest-buried card */
  baseScale?: number
  style?: CSSProperties
}

export default function ScrollStack({
  children,
  className = '',
  itemDistance = 120,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = '20%',
  scaleEndPosition = '10%',
  baseScale = 0.85,
  style,
}: ScrollStackProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLElement[]>([])
  const cardTopsRef = useRef<number[]>([])
  const lastTransformsRef = useRef(new Map<number, { translateY: number; scale: number }>())
  const isUpdatingRef = useRef(false)
  const rafRef = useRef<number | null>(null)

  // ── Helpers ─────────────────────────────────────────────────────────────────

  const parsePercentage = useCallback(
    (value: string, containerHeight: number) => {
      if (value.includes('%'))
        return (parseFloat(value) / 100) * containerHeight
      return parseFloat(value)
    },
    []
  )

  const calculateProgress = useCallback(
    (scrollTop: number, start: number, end: number) => {
      if (scrollTop < start) return 0
      if (scrollTop > end) return 1
      return (scrollTop - start) / (end - start)
    },
    []
  )

  // ── Measure static tops (clear transforms first to avoid feedback loop) ─────

  const measureStaticTops = useCallback(() => {
    const cards = cardsRef.current
    if (!cards.length) return

    const saved = cards.map((c) => (c ? c.style.transform : ''))
    cards.forEach((c) => { if (c) c.style.transform = 'none' })

    cardTopsRef.current = cards.map((c) =>
      c ? c.getBoundingClientRect().top + window.scrollY : 0
    )

    cards.forEach((c, i) => { if (c) c.style.transform = saved[i] ?? '' })
  }, [])

  // ── Per-scroll transform update ──────────────────────────────────────────────

  const updateCardTransforms = useCallback(() => {
    if (!cardsRef.current.length || isUpdatingRef.current) return
    if (window.innerWidth < 1024) return   // mobile — plain layout, no stacking

    isUpdatingRef.current = true

    const scrollTop = window.scrollY
    const viewH = window.innerHeight
    const stackPositionPx = parsePercentage(stackPosition, viewH)
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, viewH)

    // The sentinel div placed after all cards marks when pinning stops
    const endEl = wrapperRef.current?.querySelector('.scroll-stack-end') as HTMLElement | null
    const endTop = endEl ? endEl.getBoundingClientRect().top + window.scrollY : 0

    cardsRef.current.forEach((card, i) => {
      if (!card) return

      const cardTop =
        cardTopsRef.current[i] !== undefined
          ? cardTopsRef.current[i]
          : card.getBoundingClientRect().top + window.scrollY

      // pinStart: scroll position where this card starts pinning
      const pinStart = cardTop - stackPositionPx - itemStackDistance * i
      // triggerEnd: scroll position where scale animation finishes
      const triggerEnd = cardTop - scaleEndPositionPx
      // pinEnd: scroll position where ALL cards unpin (the sentinel)
      const pinEnd = endTop - viewH / 2

      const scaleProgress = calculateProgress(scrollTop, pinStart, triggerEnd)
      const targetScale = baseScale + i * itemScale
      const scale = 1 - scaleProgress * (1 - targetScale)

      let translateY = 0
      if (scrollTop >= pinStart && scrollTop <= pinEnd) {
        translateY = scrollTop - cardTop + stackPositionPx + itemStackDistance * i
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * i
      }

      const next = {
        translateY: Math.round(translateY * 100) / 100,
        scale: Math.round(scale * 1000) / 1000,
      }
      const last = lastTransformsRef.current.get(i)
      if (
        !last ||
        Math.abs(last.translateY - next.translateY) > 0.1 ||
        Math.abs(last.scale - next.scale) > 0.001
      ) {
        card.style.transform = `translate3d(0, ${next.translateY}px, 0) scale(${next.scale})`
        lastTransformsRef.current.set(i, next)
      }
    })

    isUpdatingRef.current = false
  }, [
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    calculateProgress,
    parsePercentage,
  ])

  // ── Setup ────────────────────────────────────────────────────────────────────

  useLayoutEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return

    const cards = Array.from(
      wrapper.querySelectorAll('.scroll-stack-card')
    ) as HTMLElement[]
    cardsRef.current = cards

    const applyLayout = () => {
      const isMobile = window.innerWidth < 1024
      cards.forEach((card, i) => {
        // itemDistance px gap between cards = scroll breathing room
        card.style.marginBottom =
          i < cards.length - 1 ? (isMobile ? '24px' : `${itemDistance}px`) : '0px'

        if (isMobile) {
          card.style.willChange = 'auto'
          card.style.transform = ''
          card.style.transformOrigin = ''
          lastTransformsRef.current.clear()
        } else {
          card.style.willChange = 'transform'
          card.style.transformOrigin = 'top center'
          card.style.transform = 'translate3d(0,0,0)'
        }
      })
    }

    applyLayout()
    measureStaticTops()
    updateCardTransforms()

    // RAF-throttled scroll handler
    let ticking = false
    const onScroll = () => {
      if (window.innerWidth < 1024 || ticking) return
      ticking = true
      rafRef.current = requestAnimationFrame(() => {
        updateCardTransforms()
        ticking = false
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })

    // Re-measure on resize / reflow
    const ro = new ResizeObserver(() => {
      applyLayout()
      measureStaticTops()
      updateCardTransforms()
    })
    ro.observe(wrapper)

    const savedTransforms = lastTransformsRef.current
    return () => {
      window.removeEventListener('scroll', onScroll)
      ro.disconnect()
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      cardsRef.current = []
      cardTopsRef.current = []
      savedTransforms.clear()
      isUpdatingRef.current = false
    }
  }, [itemDistance, updateCardTransforms, measureStaticTops])

  return (
    <div ref={wrapperRef} className={cn('relative w-full', className)} style={style}>
      {children}
      {/* Sentinel: all cards unpin when scrollTop reaches here */}
      <div className="scroll-stack-end w-full h-px" />
    </div>
  )
}

export { ScrollStack }
