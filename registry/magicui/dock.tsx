'use client'

import React, { useRef, type PropsWithChildren } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import {
  motion,
  type MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionProps,
} from 'framer-motion'
import { cn } from '@/lib/utils'

export interface DockProps extends VariantProps<typeof dockVariants> {
  className?: string
  iconSize?: number
  iconMagnification?: number
  disableMagnification?: boolean
  iconDistance?: number
  direction?: 'top' | 'middle' | 'bottom'
  children: React.ReactNode
}

const DEFAULT_SIZE = 40
const DEFAULT_MAGNIFICATION = 60
const DEFAULT_DISTANCE = 140
const DEFAULT_DISABLEMAGNIFICATION = false

const dockVariants = cva(
  'mx-auto flex h-[58px] w-max items-center justify-center gap-2 rounded-2xl border p-2 backdrop-blur-md supports-backdrop-blur:bg-white/10 supports-backdrop-blur:dark:bg-black/10',
)

const Dock = React.forwardRef<HTMLDivElement, DockProps>(
  (
    {
      className,
      children,
      iconSize = DEFAULT_SIZE,
      iconMagnification = DEFAULT_MAGNIFICATION,
      disableMagnification = DEFAULT_DISABLEMAGNIFICATION,
      iconDistance = DEFAULT_DISTANCE,
      direction = 'middle',
      ...props
    },
    ref,
  ) => {
    const mouseX = useMotionValue(Infinity)

    const renderChildren = () => {
      return React.Children.map(children, (child) => {
        if (React.isValidElement<DockIconProps>(child) && child.type === DockIcon) {
          return React.cloneElement(child, {
            ...child.props,
            mouseX: mouseX,
            size: child.props.size ?? iconSize,
            magnification: child.props.magnification ?? iconMagnification,
            disableMagnification: child.props.disableMagnification ?? disableMagnification,
            distance: child.props.distance ?? iconDistance,
          })
        }
        return child
      })
    }

    return (
      <motion.div
        ref={ref}
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        {...props}
        className={cn(dockVariants({ className }), {
          'items-start': direction === 'top',
          'items-center': direction === 'middle',
          'items-end': direction === 'bottom',
        })}
      >
        {renderChildren()}
      </motion.div>
    )
  },
)

Dock.displayName = 'Dock'

export interface DockIconProps extends Omit<
  MotionProps & React.HTMLAttributes<HTMLDivElement>,
  'children'
> {
  size?: number
  magnification?: number
  disableMagnification?: boolean
  distance?: number
  mouseX?: MotionValue<number>
  className?: string
  children?: React.ReactNode
  props?: PropsWithChildren
  asPill?: boolean
}

const DockIcon = ({
  size = DEFAULT_SIZE,
  magnification = DEFAULT_MAGNIFICATION,
  disableMagnification,
  distance = DEFAULT_DISTANCE,
  mouseX,
  className,
  children,
  asPill = false,
  ...props
}: DockIconProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const padding = Math.max(6, size * 0.2)
  const defaultMouseX = useMotionValue(Infinity)

  const distanceCalc = useTransform(mouseX ?? defaultMouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
    return val - bounds.x - bounds.width / 2
  })

  const targetSize = disableMagnification ? size : magnification

  const sizeTransform = useTransform(
    distanceCalc,
    [-distance, 0, distance],
    [size, targetSize, size],
  )

  const scaleTransform = useTransform(
    distanceCalc,
    [-distance, 0, distance],
    [1, disableMagnification ? 1 : magnification / size, 1],
  )

  const scaleSize = useSpring(sizeTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  })

  const springScale = useSpring(scaleTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  })

  if (asPill) {
    return (
      <motion.div
        ref={ref}
        style={{ scale: springScale }}
        className={cn(
          'flex cursor-pointer items-center justify-center transition-colors',
          className,
        )}
        {...props}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <motion.div
      ref={ref}
      style={{ width: scaleSize, height: scaleSize, padding }}
      className={cn(
        'flex aspect-square cursor-pointer items-center justify-center rounded-full',
        disableMagnification && 'hover:bg-muted-foreground transition-colors',
        className,
      )}
      {...props}
    >
      <div>{children}</div>
    </motion.div>
  )
}

DockIcon.displayName = 'DockIcon'

export { Dock, DockIcon, dockVariants }
