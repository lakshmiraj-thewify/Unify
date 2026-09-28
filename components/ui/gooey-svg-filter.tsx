'use client'

export interface GooeySvgFilterProps {
  id?: string
  strength?: number
  className?: string
}

export function GooeySvgFilter({
  id = 'gooey-filter',
  strength = 10,
  className = '',
}: GooeySvgFilterProps) {
  return (
    <svg
      className={`pointer-events-none absolute h-0 w-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <defs>
        <filter id={id} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceGraphic" stdDeviation={strength} result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
            result="goo"
          />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </defs>
    </svg>
  )
}

export default GooeySvgFilter
