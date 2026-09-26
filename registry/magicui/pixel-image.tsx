/* eslint-disable @next/next/no-img-element */
'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

type Grid = {
  rows: number
  cols: number
}

const DEFAULT_GRIDS: Record<string, Grid> = {
  '6x4': { rows: 4, cols: 6 },
  '8x8': { rows: 8, cols: 8 },
  '8x3': { rows: 3, cols: 8 },
  '4x6': { rows: 6, cols: 4 },
  '3x8': { rows: 8, cols: 3 },
}

type PredefinedGridKey = keyof typeof DEFAULT_GRIDS

export interface PixelImageProps {
  src?: string
  alt?: string
  children?: React.ReactNode
  className?: string
  imageClassName?: string
  grid?: PredefinedGridKey
  customGrid?: Grid
  grayscaleAnimation?: boolean
  pixelFadeInDuration?: number // in ms
  maxAnimationDelay?: number // in ms
  colorRevealDelay?: number // in ms
  triggerOnView?: boolean
}

export const PixelImage = ({
  src,
  alt = 'Pixelated preview',
  children,
  className,
  imageClassName,
  grid = '6x4',
  grayscaleAnimation = true,
  pixelFadeInDuration = 800,
  maxAnimationDelay = 1000,
  colorRevealDelay = 1100,
  customGrid,
  triggerOnView = true,
}: PixelImageProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(!triggerOnView)
  const [showColor, setShowColor] = useState(false)

  const MIN_GRID = 1
  const MAX_GRID = 16

  const { rows, cols } = useMemo(() => {
    const isValidGrid = (g?: Grid) => {
      if (!g) return false
      return (
        Number.isInteger(g.rows) &&
        Number.isInteger(g.cols) &&
        g.rows >= MIN_GRID &&
        g.cols >= MIN_GRID &&
        g.rows <= MAX_GRID &&
        g.cols <= MAX_GRID
      )
    }

    return isValidGrid(customGrid) ? customGrid! : (DEFAULT_GRIDS[grid] ?? { rows: 6, cols: 6 })
  }, [customGrid, grid])

  useEffect(() => {
    if (!triggerOnView) {
      const colorTimeout = setTimeout(() => setShowColor(true), colorRevealDelay)
      return () => clearTimeout(colorTimeout)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true)
          setTimeout(() => setShowColor(true), colorRevealDelay)
          observer.disconnect()
        }
      },
      { threshold: 0.25 },
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [triggerOnView, colorRevealDelay])

  const pieces = useMemo(() => {
    const total = rows * cols
    // Deterministic pseudo-random seed generator: prevents Next.js hydration mismatches
    const pseudoRandom = (seed: number) => {
      const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453
      return x - Math.floor(x)
    }

    return Array.from({ length: total }, (_, index) => {
      const row = Math.floor(index / cols)
      const col = index % cols

      const clipPath = `polygon(
        ${col * (100 / cols)}% ${row * (100 / rows)}%,
        ${(col + 1) * (100 / cols)}% ${row * (100 / rows)}%,
        ${(col + 1) * (100 / cols)}% ${(row + 1) * (100 / rows)}%,
        ${col * (100 / cols)}% ${(row + 1) * (100 / rows)}%
      )`

      const delay = Math.round(pseudoRandom(index + 1) * maxAnimationDelay)
      return {
        clipPath,
        delay,
      }
    })
  }, [rows, cols, maxAnimationDelay])

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative overflow-hidden select-none',
        className ?? 'h-72 w-72 md:h-96 md:w-96',
      )}
    >
      {pieces.map((piece, index) => (
        <div
          key={index}
          className={cn(
            'absolute inset-0 transition-all ease-out',
            isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0',
          )}
          style={{
            clipPath: piece.clipPath,
            transitionDelay: `${piece.delay}ms`,
            transitionDuration: `${pixelFadeInDuration}ms`,
          }}
        >
          {src ? (
            <img
              src={src}
              alt={alt}
              className={cn(
                'size-full object-cover',
                grayscaleAnimation && (showColor ? 'grayscale-0' : 'grayscale'),
                imageClassName,
              )}
              style={{
                transition: grayscaleAnimation
                  ? `filter ${pixelFadeInDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`
                  : 'none',
              }}
              draggable={false}
            />
          ) : (
            <div
              className={cn(
                'size-full',
                grayscaleAnimation && (showColor ? 'grayscale-0' : 'grayscale'),
                imageClassName,
              )}
              style={{
                transition: grayscaleAnimation
                  ? `filter ${pixelFadeInDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`
                  : 'none',
              }}
            >
              {children}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
