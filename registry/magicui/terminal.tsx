'use client'

import {
  Children,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentType,
  type ReactNode,
  type RefAttributes,
} from 'react'
import {
  motion,
  useInView,
  type HTMLMotionProps,
  type MotionProps,
} from 'framer-motion'
import { cn } from '@/lib/utils'

interface SequenceContextValue {
  completeItem: (index: number) => void
  activeIndex: number
  sequenceStarted: boolean
}

const SequenceContext = createContext<SequenceContextValue | null>(null)
const useSequence = () => useContext(SequenceContext)

const ItemIndexContext = createContext<number | null>(null)
const useItemIndex = () => useContext(ItemIndexContext)

export interface AnimatedSpanProps extends MotionProps {
  children: ReactNode
  delay?: number
  className?: string
  startOnView?: boolean
}

export const AnimatedSpan = ({
  children,
  delay = 0,
  className,
  startOnView = false,
  ...props
}: AnimatedSpanProps) => {
  const elementRef = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(elementRef as React.RefObject<Element>, {
    amount: 0.3,
    once: true,
  })

  const sequence = useSequence()
  const itemIndex = useItemIndex()
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    if (sequence && itemIndex !== null) {
      if (!sequence.sequenceStarted) return
      if (hasStarted) return
      if (sequence.activeIndex === itemIndex) {
        const timer = setTimeout(() => {
          setHasStarted(true)
        }, delay)
        return () => clearTimeout(timer)
      }
    } else if (!sequence) {
      if (!startOnView || isInView) {
        const timer = setTimeout(() => {
          setHasStarted(true)
        }, delay)
        return () => clearTimeout(timer)
      }
    }
  }, [sequence, hasStarted, itemIndex, delay, startOnView, isInView])

  const shouldAnimate = sequence ? hasStarted : (startOnView ? isInView && hasStarted : hasStarted)

  return (
    <motion.div
      ref={elementRef}
      initial={{ opacity: 0, y: -4 }}
      animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: -4 }}
      transition={{ duration: 0.3 }}
      className={cn('grid text-sm font-normal tracking-tight', className)}
      onAnimationComplete={() => {
        if (!sequence) return
        if (itemIndex === null) return
        sequence.completeItem(itemIndex)
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

const motionElements = {
  article: motion.article,
  div: motion.div,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  h4: motion.h4,
  h5: motion.h5,
  h6: motion.h6,
  li: motion.li,
  p: motion.p,
  section: motion.section,
  span: motion.span,
} as const

type MotionElementType = keyof typeof motionElements

export interface TypingAnimationProps extends Omit<MotionProps, 'children'> {
  children: string
  className?: string
  duration?: number
  delay?: number
  as?: MotionElementType
  startOnView?: boolean
  showCursor?: boolean
}

export const TypingAnimation = ({
  children,
  className,
  duration = 30,
  delay = 0,
  as: Component = 'span',
  startOnView = true,
  showCursor = false,
  ...props
}: TypingAnimationProps) => {
  if (typeof children !== 'string') {
    throw new Error('TypingAnimation: children must be a string.')
  }

  const MotionComponent = motionElements[Component] as ComponentType<
    Omit<HTMLMotionProps<'span'>, 'ref'> & RefAttributes<HTMLElement>
  >

  const [displayedText, setDisplayedText] = useState<string>('')
  const [started, setStarted] = useState(false)
  const [isFinished, setIsFinished] = useState(false)
  const elementRef = useRef<HTMLElement | null>(null)
  const isInView = useInView(elementRef as React.RefObject<Element>, {
    amount: 0.3,
    once: true,
  })

  const sequence = useSequence()
  const itemIndex = useItemIndex()
  const hasSequence = sequence !== null
  const sequenceStarted = sequence?.sequenceStarted ?? false
  const sequenceActiveIndex = sequence?.activeIndex ?? null
  const sequenceCompleteItemRef = useRef<SequenceContextValue['completeItem'] | null>(null)
  const sequenceItemIndexRef = useRef<number | null>(null)

  useEffect(() => {
    sequenceCompleteItemRef.current = sequence?.completeItem ?? null
    sequenceItemIndexRef.current = itemIndex
  }, [sequence?.completeItem, itemIndex])

  useEffect(() => {
    let startTimeout: ReturnType<typeof setTimeout> | null = null

    if (hasSequence && itemIndex !== null) {
      if (sequenceStarted && !started && sequenceActiveIndex === itemIndex) {
        startTimeout = setTimeout(() => setStarted(true), delay)
      }
    } else if (!startOnView || isInView) {
      startTimeout = setTimeout(() => setStarted(true), delay)
    }

    return () => {
      if (startTimeout !== null) {
        clearTimeout(startTimeout)
      }
    }
  }, [
    delay,
    startOnView,
    isInView,
    started,
    hasSequence,
    sequenceActiveIndex,
    sequenceStarted,
    itemIndex,
  ])

  useEffect(() => {
    let typingEffect: ReturnType<typeof setInterval> | null = null

    if (started) {
      let i = 0
      typingEffect = setInterval(() => {
        if (i < children.length) {
          setDisplayedText(children.substring(0, i + 1))
          i++
        } else {
          if (typingEffect !== null) {
            clearInterval(typingEffect)
          }
          setIsFinished(true)
          const completeItem = sequenceCompleteItemRef.current
          const currentItemIndex = sequenceItemIndexRef.current
          if (completeItem && currentItemIndex !== null) {
            completeItem(currentItemIndex)
          }
        }
      }, duration)
    }

    return () => {
      if (typingEffect !== null) {
        clearInterval(typingEffect)
      }
    }
  }, [children, duration, started])

  return (
    <MotionComponent
      ref={elementRef}
      className={cn('text-sm font-normal tracking-tight inline-flex items-center', className)}
      {...props}
    >
      <span>{displayedText}</span>
      {showCursor && started && !isFinished && (
        <span className="inline-block w-1.5 h-4 ml-0.5 bg-[#5EE7E4] animate-pulse" />
      )}
    </MotionComponent>
  )
}

export interface TerminalProps {
  children: ReactNode
  className?: string
  sequence?: boolean
  startOnView?: boolean
  header?: ReactNode
}

export const Terminal = ({
  children,
  className,
  sequence = true,
  startOnView = true,
  header,
}: TerminalProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(containerRef as React.RefObject<Element>, {
    amount: 0.2,
    once: true,
  })

  const [activeIndex, setActiveIndex] = useState(0)
  const sequenceHasStarted = sequence ? (!startOnView || isInView) : false

  const contextValue = useMemo<SequenceContextValue | null>(() => {
    if (!sequence) return null
    return {
      completeItem: (index: number) => {
        setActiveIndex((current) => (index === current ? current + 1 : current))
      },
      activeIndex,
      sequenceStarted: sequenceHasStarted,
    }
  }, [sequence, activeIndex, sequenceHasStarted])

  const wrappedChildren = useMemo(() => {
    if (!sequence) return children
    const array = Children.toArray(children)
    return array.map((child, index) => (
      <ItemIndexContext.Provider key={index} value={index}>
        {child as ReactNode}
      </ItemIndexContext.Provider>
    ))
  }, [children, sequence])

  const defaultHeader = (
    <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#0A0D14]/80">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-[#FF5F56]/80" />
        <div className="w-3 h-3 rounded-full bg-[#FFBD2E]/80" />
        <div className="w-3 h-3 rounded-full bg-[#27C93F]/80" />
      </div>
    </div>
  )

  const content = (
    <div
      ref={containerRef}
      className={cn(
        'border-white/15 bg-[#121620]/90 backdrop-blur-xl border rounded-2xl shadow-2xl overflow-hidden',
        className,
      )}
    >
      {header !== undefined ? header : defaultHeader}
      <div className="p-4 sm:p-6 font-mono text-xs sm:text-sm overflow-x-auto space-y-2">
        {wrappedChildren}
      </div>
    </div>
  )

  if (!sequence) return content

  return (
    <SequenceContext.Provider value={contextValue}>
      {content}
    </SequenceContext.Provider>
  )
}
