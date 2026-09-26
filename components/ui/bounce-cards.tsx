/* eslint-disable @next/next/no-img-element */
'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { cn } from '@/lib/utils'

export interface BounceCardItem {
  id?: string | number
  title?: string
  description?: string
  icon?: React.ReactNode
  color?: string
  src?: string
  content?: React.ReactNode
}

export interface BounceCardsProps {
  className?: string
  items?: BounceCardItem[]
  images?: string[]
  containerWidth?: number | string
  containerHeight?: number | string
  animationDelay?: number
  animationStagger?: number
  easeType?: string
  transformStyles?: string[]
  enableHover?: boolean
  renderItem?: (item: BounceCardItem, index: number) => React.ReactNode
}

const DEFAULT_TRANSFORMS_4 = [
  'rotate(-6deg) translate(-280px)',
  'rotate(-2deg) translate(-95px)',
  'rotate(2deg) translate(95px)',
  'rotate(6deg) translate(280px)',
]

const DEFAULT_TRANSFORMS_5 = [
  'rotate(10deg) translate(-170px)',
  'rotate(5deg) translate(-85px)',
  'rotate(-3deg)',
  'rotate(-10deg) translate(85px)',
  'rotate(2deg) translate(170px)',
]

export function BounceCards({
  className = '',
  items = [],
  images = [],
  containerWidth = '100%',
  containerHeight = 360,
  animationDelay = 0.3,
  animationStagger = 0.08,
  easeType = 'elastic.out(1, 0.75)',
  transformStyles,
  enableHover = true,
  renderItem,
}: BounceCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  // Normalize data between items array or images array
  const cardData: BounceCardItem[] =
    items.length > 0 ? items : images.map((src, i) => ({ id: i, src }))

  const transforms =
    transformStyles ?? (cardData.length === 4 ? DEFAULT_TRANSFORMS_4 : DEFAULT_TRANSFORMS_5)

  useEffect(() => {
    if (!containerRef.current) return

    let ctx: gsap.Context | null = null

    // Use IntersectionObserver to trigger animation when scrolled into view
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry?.isIntersecting) {
          ctx = gsap.context(() => {
            gsap.fromTo(
              '.bounce-card',
              { scale: 0, opacity: 0 },
              {
                scale: 1,
                opacity: 1,
                stagger: animationStagger,
                ease: easeType,
                delay: animationDelay,
              },
            )
          }, containerRef)
          observer.disconnect()
        }
      },
      { threshold: 0.2 },
    )

    observer.observe(containerRef.current)

    return () => {
      observer.disconnect()
      ctx?.revert()
    }
  }, [animationStagger, easeType, animationDelay])

  const getNoRotationTransform = (transformStr: string) => {
    const hasRotate = /rotate\([\s\S]*?\)/.test(transformStr)
    if (hasRotate) {
      return transformStr.replace(/rotate\([\s\S]*?\)/, 'rotate(0deg)')
    } else if (transformStr === 'none') {
      return 'rotate(0deg)'
    } else {
      return `${transformStr} rotate(0deg)`
    }
  }

  const getPushedTransform = (baseTransform: string, offsetX: number) => {
    const translateRegex = /translate\(([-0-9.]+)px\)/
    const match = baseTransform.match(translateRegex)
    if (match && match[1]) {
      const currentX = parseFloat(match[1])
      const newX = currentX + offsetX
      return baseTransform.replace(translateRegex, `translate(${newX}px)`)
    } else {
      return baseTransform === 'none'
        ? `translate(${offsetX}px)`
        : `${baseTransform} translate(${offsetX}px)`
    }
  }

  const pushSiblings = (hoveredIdx: number) => {
    if (!enableHover || !containerRef.current) return

    const q = gsap.utils.selector(containerRef)

    cardData.forEach((_, i) => {
      const target = q(`.bounce-card-${i}`)
      gsap.killTweensOf(target)

      const baseTransform = transforms[i] || 'none'

      if (i === hoveredIdx) {
        const noRotationTransform = getNoRotationTransform(baseTransform)
        gsap.to(target, {
          transform: noRotationTransform,
          zIndex: 30,
          scale: 1.05,
          duration: 0.35,
          ease: 'back.out(1.4)',
          overwrite: 'auto',
        })
      } else {
        const offsetX = i < hoveredIdx ? -90 : 90
        const pushedTransform = getPushedTransform(baseTransform, offsetX)
        const distance = Math.abs(hoveredIdx - i)
        const delay = distance * 0.04

        gsap.to(target, {
          transform: pushedTransform,
          zIndex: 10,
          scale: 0.96,
          duration: 0.35,
          ease: 'back.out(1.4)',
          delay,
          overwrite: 'auto',
        })
      }
    })
  }

  const resetSiblings = () => {
    if (!enableHover || !containerRef.current) return

    const q = gsap.utils.selector(containerRef)

    cardData.forEach((_, i) => {
      const target = q(`.bounce-card-${i}`)
      gsap.killTweensOf(target)
      const baseTransform = transforms[i] || 'none'
      gsap.to(target, {
        transform: baseTransform,
        zIndex: 15,
        scale: 1,
        duration: 0.4,
        ease: 'back.out(1.4)',
        overwrite: 'auto',
      })
    })
  }

  return (
    <div
      ref={containerRef}
      className={cn('relative mx-auto flex items-center justify-center select-none', className)}
      style={{
        width: typeof containerWidth === 'number' ? `${containerWidth}px` : containerWidth,
        height: typeof containerHeight === 'number' ? `${containerHeight}px` : containerHeight,
      }}
    >
      {cardData.map((item, idx) => {
        const customContent = renderItem ? renderItem(item, idx) : null

        return (
          <div
            key={item.id ?? idx}
            className={`bounce-card bounce-card-${idx} absolute cursor-pointer transition-shadow`}
            style={{
              transform: transforms[idx] ?? 'none',
              transformOrigin: 'center center',
              zIndex: 15,
            }}
            onMouseEnter={() => pushSiblings(idx)}
            onMouseLeave={resetSiblings}
          >
            {customContent ? (
              customContent
            ) : item.src ? (
              <div className="aspect-square w-48 overflow-hidden rounded-2xl border border-white/15 bg-[#1B1722] shadow-2xl sm:w-56">
                <img
                  src={item.src}
                  alt={item.title ?? `card-${idx}`}
                  className="h-full w-full object-cover"
                />
              </div>
            ) : (
              <div className="flex min-h-[260px] w-64 flex-col justify-between rounded-2xl border border-white/15 bg-[#0F1320]/95 p-6 shadow-2xl backdrop-blur-xl transition-colors hover:border-white/30 sm:w-72">
                <div className="flex flex-col gap-4">
                  <span
                    className="inline-flex size-11 items-center justify-center rounded-xl shadow-inner"
                    style={{
                      background: item.color ? `${item.color}15` : 'rgba(255,255,255,0.08)',
                      color: item.color ?? '#5EE7E4',
                      border: `1px solid ${item.color ? `${item.color}30` : 'rgba(255,255,255,0.1)'}`,
                    }}
                  >
                    {item.icon}
                  </span>
                  <div>
                    <h3 className="mb-1.5 text-base font-bold text-white">{item.title}</h3>
                    <p className="text-xs leading-relaxed text-white/60 sm:text-sm">
                      {item.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-white/[0.08] pt-3 text-[11px]">
                  <span className="font-mono text-[#5EE7E4]">
                    0{idx + 1} {'//'} CORE
                  </span>
                  <span className="text-white/40">MikroTik Ready</span>
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
