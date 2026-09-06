import type { ElementType, HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'

const widths = {
  /** Default page gutter container: 1280px. */
  page: 'max-w-page',
  /** Long-form / FAQ column: 896px. */
  content: 'max-w-content',
  /** Section headers and prose: 768px. */
  readable: 'max-w-readable',
  /** No max width — the caller is handling it. */
  full: 'max-w-none',
} as const

export type ContainerWidth = keyof typeof widths

type ContainerProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode
  width?: ContainerWidth
  as?: 'div' | 'section' | 'header' | 'footer' | 'nav' | 'ul' | 'article'
}

/**
 * Horizontal gutter + max-width. The single source of page rhythm: no section
 * should set its own `max-w-*` / `px-*` pair.
 */
export function Container({
  children,
  className,
  width = 'page',
  as = 'div',
  ...rest
}: ContainerProps) {
  const Tag = as as ElementType
  return (
    <Tag {...rest} className={cn('mx-auto w-full px-4 sm:px-6 lg:px-8', widths[width], className)}>
      {children}
    </Tag>
  )
}
