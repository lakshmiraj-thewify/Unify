'use client'

import React, {
  useState,
  Children,
  useRef,
  useEffect,
  useLayoutEffect,
  type ReactNode,
  type CSSProperties,
  type ButtonHTMLAttributes,
} from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import './stepper.css'

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect

export interface StepProps {
  children: ReactNode
  className?: string
  style?: CSSProperties
}

export function Step({ children, className = '', style }: StepProps) {
  return (
    <div className={cn('stepper-step-default', className)} style={style}>
      {children}
    </div>
  )
}

export interface RenderStepIndicatorParams {
  step: number
  currentStep: number
  onStepClick: (step: number) => void
}

export interface StepperProps {
  children: ReactNode
  initialStep?: number
  step?: number
  onStepChange?: (step: number) => void
  onFinalStepCompleted?: () => void
  stepCircleContainerClassName?: string
  stepContainerClassName?: string
  contentClassName?: string
  footerClassName?: string
  backButtonProps?: ButtonHTMLAttributes<HTMLButtonElement>
  nextButtonProps?: ButtonHTMLAttributes<HTMLButtonElement>
  backButtonText?: string
  nextButtonText?: ReactNode | ((step: number) => ReactNode)
  disableStepIndicators?: boolean
  isNextDisabled?: boolean
  stepLabels?: string[]
  hideFooter?: boolean
  showActiveNumber?: boolean
  renderStepIndicator?: (params: RenderStepIndicatorParams) => ReactNode
  className?: string
  style?: CSSProperties
}

export default function Stepper({
  children,
  initialStep = 1,
  step: controlledStep,
  onStepChange = () => {},
  onFinalStepCompleted = () => {},
  stepCircleContainerClassName = '',
  stepContainerClassName = '',
  contentClassName = '',
  footerClassName = '',
  backButtonProps = {},
  nextButtonProps = {},
  backButtonText = 'Back',
  nextButtonText = 'Continue',
  disableStepIndicators = false,
  isNextDisabled = false,
  stepLabels = [],
  hideFooter = false,
  showActiveNumber = true,
  renderStepIndicator,
  className = '',
  style,
  ...rest
}: StepperProps) {
  const [internalStep, setInternalStep] = useState(initialStep)
  const currentStep = controlledStep !== undefined ? controlledStep : internalStep
  const [direction, setDirection] = useState(0)

  const stepsArray = Children.toArray(children)
  const totalSteps = stepsArray.length
  const isCompleted = currentStep > totalSteps
  const isLastStep = currentStep === totalSteps

  const updateStep = (newStep: number) => {
    if (controlledStep === undefined) {
      setInternalStep(newStep)
    }
    if (newStep > totalSteps) {
      onFinalStepCompleted()
    } else {
      onStepChange(newStep)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setDirection(-1)
      updateStep(currentStep - 1)
    }
  }

  const handleNext = () => {
    if (!isLastStep) {
      setDirection(1)
      updateStep(currentStep + 1)
    }
  }

  const handleComplete = () => {
    setDirection(1)
    updateStep(totalSteps + 1)
  }

  const currentLabel = stepLabels[currentStep - 1]

  const resolvedNextText =
    typeof nextButtonText === 'function'
      ? nextButtonText(currentStep)
      : isLastStep
      ? 'Complete'
      : nextButtonText

  return (
    <div className={cn('stepper-outer-container', className)} style={style} {...rest}>
      <div className={cn('stepper-circle-container', stepCircleContainerClassName)}>
        {/* Step Indicator Row */}
        <div className={cn('stepper-indicator-row', stepContainerClassName)}>
          <div className="flex items-center gap-1.5 flex-1 max-w-xs">
            {stepsArray.map((_, index) => {
              const stepNumber = index + 1
              const isNotLastStep = index < totalSteps - 1
              return (
                <React.Fragment key={stepNumber}>
                  {renderStepIndicator ? (
                    renderStepIndicator({
                      step: stepNumber,
                      currentStep,
                      onStepClick: (clicked) => {
                        setDirection(clicked > currentStep ? 1 : -1)
                        updateStep(clicked)
                      },
                    })
                  ) : (
                    <StepIndicator
                      step={stepNumber}
                      disableStepIndicators={disableStepIndicators}
                      currentStep={currentStep}
                      showActiveNumber={showActiveNumber}
                      onClickStep={(clicked) => {
                        setDirection(clicked > currentStep ? 1 : -1)
                        updateStep(clicked)
                      }}
                    />
                  )}
                  {isNotLastStep && (
                    <StepConnector isComplete={currentStep > stepNumber} />
                  )}
                </React.Fragment>
              )
            })}
          </div>

          {currentLabel && (
            <span className="ml-3 text-xs font-medium text-slate-400 whitespace-nowrap">
              {currentLabel}
            </span>
          )}
        </div>

        {/* Dynamic Sliding Content Wrapper */}
        <StepContentWrapper
          isCompleted={isCompleted}
          currentStep={currentStep}
          direction={direction}
          className={cn('stepper-content-default', contentClassName)}
        >
          {stepsArray[currentStep - 1]}
        </StepContentWrapper>

        {/* Footer Navigation */}
        {!isCompleted && !hideFooter && (
          <div className={cn('stepper-footer-container', footerClassName)}>
            <div
              className={cn(
                'stepper-footer-nav',
                currentStep !== 1 ? 'spread' : 'end single-next'
              )}
            >
              {currentStep !== 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className={cn(
                    'stepper-back-button',
                    currentStep === 1 && 'inactive'
                  )}
                  {...backButtonProps}
                >
                  {backButtonText}
                </button>
              )}
              <button
                type="button"
                onClick={isLastStep ? handleComplete : handleNext}
                disabled={isNextDisabled || nextButtonProps.disabled}
                className="stepper-next-button"
                {...nextButtonProps}
              >
                {resolvedNextText}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function StepContentWrapper({
  isCompleted,
  currentStep,
  direction,
  children,
  className,
}: {
  isCompleted: boolean
  currentStep: number
  direction: number
  children: ReactNode
  className?: string
}) {
  const [parentHeight, setParentHeight] = useState<number | 'auto'>('auto')

  return (
    <motion.div
      className={className}
      style={{ position: 'relative', overflow: 'hidden' }}
      animate={{
        height: isCompleted ? 0 : parentHeight,
      }}
      transition={{ type: 'spring', damping: 28, stiffness: 260 }}
    >
      <AnimatePresence initial={false} mode="sync" custom={direction}>
        {!isCompleted && (
          <SlideTransition
            key={currentStep}
            direction={direction}
            onHeightReady={(h) => setParentHeight(h)}
          >
            {children}
          </SlideTransition>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function SlideTransition({
  children,
  direction,
  onHeightReady,
}: {
  children: ReactNode
  direction: number
  onHeightReady: (height: number) => void
}) {
  const containerRef = useRef<HTMLDivElement>(null)

  useIsomorphicLayoutEffect(() => {
    if (!containerRef.current) return

    const updateHeight = () => {
      if (containerRef.current) {
        onHeightReady(containerRef.current.offsetHeight)
      }
    }

    updateHeight()

    const observer = new ResizeObserver(() => {
      updateHeight()
    })
    observer.observe(containerRef.current)

    return () => observer.disconnect()
  }, [children, onHeightReady])

  return (
    <motion.div
      ref={containerRef}
      custom={direction}
      variants={stepVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      style={{ position: 'absolute', left: 0, right: 0, top: 0 }}
    >
      {children}
    </motion.div>
  )
}

const stepVariants = {
  enter: (dir: number) => ({
    x: dir >= 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: '0%',
    opacity: 1,
  },
  exit: (dir: number) => ({
    x: dir >= 0 ? '-100%' : '100%',
    opacity: 0,
  }),
}

function StepIndicator({
  step,
  currentStep,
  onClickStep,
  disableStepIndicators,
  showActiveNumber = true,
}: {
  step: number
  currentStep: number
  onClickStep: (step: number) => void
  disableStepIndicators?: boolean
  showActiveNumber?: boolean
}) {
  const status =
    currentStep === step ? 'active' : currentStep < step ? 'inactive' : 'complete'

  const handleClick = () => {
    if (step !== currentStep && !disableStepIndicators) {
      onClickStep(step)
    }
  }

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      className="stepper-indicator focus:outline-none"
      style={
        disableStepIndicators
          ? { pointerEvents: 'none', cursor: 'default' }
          : undefined
      }
      animate={status}
      initial={false}
    >
      <motion.div
        variants={{
          inactive: {
            scale: 1,
            backgroundColor: '#f1f5f9',
            color: '#94a3b8',
          },
          active: {
            scale: 1,
            backgroundColor: '#7c3aed',
            color: '#ffffff',
          },
          complete: {
            scale: 1,
            backgroundColor: '#7c3aed',
            color: '#ffffff',
          },
        }}
        transition={{ duration: 0.25 }}
        className="stepper-indicator-inner"
      >
        {status === 'complete' ? (
          <CheckIcon className="stepper-check-icon" />
        ) : status === 'active' && !showActiveNumber ? (
          <div className="stepper-active-dot" />
        ) : (
          <span className="stepper-step-number">{step}</span>
        )}
      </motion.div>
    </motion.button>
  )
}

function StepConnector({ isComplete }: { isComplete: boolean }) {
  const lineVariants = {
    incomplete: { width: '0%', backgroundColor: 'transparent' },
    complete: { width: '100%', backgroundColor: '#7c3aed' },
  }

  return (
    <div className="stepper-connector">
      <motion.div
        className="stepper-connector-inner"
        variants={lineVariants}
        initial={false}
        animate={isComplete ? 'complete' : 'incomplete'}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
      />
    </div>
  )
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      viewBox="0 0 24 24"
      {...props}
    >
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.05, type: 'tween', ease: 'easeOut', duration: 0.25 }}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
      />
    </svg>
  )
}

export { Stepper }
