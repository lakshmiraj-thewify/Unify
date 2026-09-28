'use client'

import { useEffect, useRef } from 'react'
import createGlobe from 'cobe'
import { cn } from '@/lib/utils'

export interface CobeProps {
  variant?: 'auto-rotation' | 'default' | 'draggable' | 'scaled'
  className?: string
  style?: React.CSSProperties
  width?: number
  height?: number
  phi?: number
  theta?: number
  dark?: number
  diffuse?: number
  mapSamples?: number
  mapBrightness?: number
  baseColor?: [number, number, number]
  markerColor?: [number, number, number]
  glowColor?: [number, number, number]
  opacity?: number
}

export function Cobe({
  variant = 'auto-rotation',
  className,
  style,
  phi: initialPhi = 0,
  theta = 0.25,
  dark = 1,
  diffuse = 1.4,
  mapSamples = 8000,
  mapBrightness = 4,
  baseColor = [0.85, 0.85, 1],
  markerColor = [0.37, 0.9, 0.89],
  glowColor = [0.45, 0.24, 0.98],
  opacity = 1,
}: CobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointerInteracting = useRef<number | null>(null)
  const pointerInteractionMovement = useRef<number>(0)

  useEffect(() => {
    let phi = initialPhi
    let currentDrag = 0
    let targetDrag = 0
    let width = 0
    let rafId = 0
    let globe: ReturnType<typeof createGlobe> | null = null

    const canvas = canvasRef.current
    if (!canvas) return

    const getCanvasWidth = () => {
      const elWidth = canvas.offsetWidth || canvas.parentElement?.offsetWidth || 500
      return Math.min(elWidth, 600)
    }

    width = getCanvasWidth()

    const dpr = Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 1.5)

    const onResize = () => {
      if (!canvas) return
      const newWidth = getCanvasWidth()
      if (newWidth > 0 && newWidth !== width) {
        width = newWidth
        if (globe) {
          globe.update({
            width,
            height: width,
          })
        }
      }
    }

    window.addEventListener('resize', onResize)

    // Markers representing global cloud POPs / ISP infrastructure
    const markers: Array<{ location: [number, number]; size: number }> = [
      { location: [19.076, 72.8777], size: 0.06 }, // Mumbai
      { location: [28.6139, 77.209], size: 0.06 }, // Delhi
      { location: [12.9716, 77.5946], size: 0.05 }, // Bengaluru
      { location: [1.3521, 103.8198], size: 0.05 }, // Singapore
      { location: [25.2048, 55.2708], size: 0.05 }, // Dubai
      { location: [51.5074, -0.1278], size: 0.06 }, // London
      { location: [50.1109, 8.6821], size: 0.05 }, // Frankfurt
      { location: [40.7128, -74.006], size: 0.06 }, // New York
      { location: [37.7749, -122.4194], size: 0.06 }, // San Francisco
      { location: [35.6762, 139.6503], size: 0.05 }, // Tokyo
      { location: [-33.8688, 151.2093], size: 0.05 }, // Sydney
    ]

    try {
      globe = createGlobe(canvas, {
        devicePixelRatio: dpr,
        width,
        height: width,
        phi,
        theta,
        dark,
        diffuse,
        mapSamples,
        mapBrightness,
        baseColor,
        markerColor,
        glowColor,
        markers,
        opacity,
      })
    } catch (e) {
      console.error('Failed to create globe:', e)
      return
    }

    let isVisible = true

    const animate = () => {
      if (!isVisible) return

      if (variant === 'auto-rotation' || variant === 'default') {
        if (!pointerInteracting.current) {
          phi += 0.003
        }
      }

      currentDrag += (targetDrag - currentDrag) * 0.08

      if (globe) {
        globe.update({
          phi: phi + currentDrag,
        })
      }

      rafId = requestAnimationFrame(animate)
    }

    // Only animate when visible in viewport
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        isVisible = entry?.isIntersecting ?? false
        if (isVisible) {
          if (!rafId) {
            rafId = requestAnimationFrame(animate)
          }
        } else {
          if (rafId) {
            cancelAnimationFrame(rafId)
            rafId = 0
          }
        }
      },
      { threshold: 0.05 },
    )

    observer.observe(canvas)

    // Initial kickstart
    rafId = requestAnimationFrame(animate)

    // Smooth fade in once initialized
    const timer = setTimeout(() => {
      if (canvas) {
        canvas.style.opacity = '1'
      }
    }, 50)

    // Expose drag update via canvas property for pointer listeners
    const canvasEl = canvas as HTMLCanvasElement & {
      __updateDrag?: (v: number) => void
    }
    canvasEl.__updateDrag = (val: number) => {
      targetDrag = val
    }

    return () => {
      clearTimeout(timer)
      observer.disconnect()
      if (rafId) {
        cancelAnimationFrame(rafId)
      }
      window.removeEventListener('resize', onResize)
      if (globe) {
        globe.destroy()
      }
    }
  }, [
    initialPhi,
    theta,
    dark,
    diffuse,
    mapSamples,
    mapBrightness,
    baseColor,
    markerColor,
    glowColor,
    opacity,
    variant,
  ])

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (variant === 'auto-rotation') return
    pointerInteracting.current = e.clientX - pointerInteractionMovement.current
    if (canvasRef.current) canvasRef.current.style.cursor = 'grabbing'
  }

  const handlePointerUp = () => {
    if (variant === 'auto-rotation') return
    pointerInteracting.current = null
    if (canvasRef.current) canvasRef.current.style.cursor = 'grab'
  }

  const handlePointerOut = () => {
    if (variant === 'auto-rotation') return
    pointerInteracting.current = null
    if (canvasRef.current) canvasRef.current.style.cursor = 'grab'
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (variant === 'auto-rotation' || pointerInteracting.current === null) return
    const delta = e.clientX - pointerInteracting.current
    pointerInteractionMovement.current = delta
    const canvasEl = canvasRef.current as
      (HTMLCanvasElement & { __updateDrag?: (v: number) => void }) | null
    if (canvasEl?.__updateDrag) {
      canvasEl.__updateDrag(delta / 150)
    }
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (variant === 'auto-rotation' || pointerInteracting.current === null || !e.touches[0]) return
    const delta = e.touches[0].clientX - pointerInteracting.current
    pointerInteractionMovement.current = delta
    const canvasEl = canvasRef.current as
      (HTMLCanvasElement & { __updateDrag?: (v: number) => void }) | null
    if (canvasEl?.__updateDrag) {
      canvasEl.__updateDrag(delta / 100)
    }
  }

  return (
    <div
      className={cn('relative flex items-center justify-center', className)}
      style={{
        width: '100%',
        maxWidth: 700,
        aspectRatio: '1',
        margin: 'auto',
        ...style,
      }}
    >
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerOut={handlePointerOut}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        className="h-full w-full opacity-0 transition-opacity duration-700"
        style={{
          width: '100%',
          height: '100%',
          cursor: variant === 'auto-rotation' ? 'default' : 'grab',
          contain: 'layout paint size',
        }}
      />
    </div>
  )
}

export { Cobe as CobeGlobe }
