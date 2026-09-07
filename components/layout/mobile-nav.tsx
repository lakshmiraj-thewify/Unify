'use client'

import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { bodyText, label } from '@/components/ui/typography'
import { primaryNav } from '@/content/nav'
import { site } from '@/content/site'
import { cn } from '@/lib/cn'
import { SignInAction } from './sign-in-action'

/** Elements inside the panel that can receive focus, in DOM order. */
const FOCUSABLE = 'a[href], button:not([disabled])'

/**
 * Mobile navigation drawer.
 *
 * The trigger button lives inside the header. The scrim and drawer panel are
 * portalled to `document.body` so that they render at the root stacking
 * context. Without the portal, the panel inherits the header's stacking
 * context (header has `z-50`), which means the panel's own `z-50` is resolved
 * relative to the header — not the page — and page content can render above it.
 *
 * The panel is conditionally rendered (not just hidden) so we don't need to
 * work around `[hidden] { display: none !important }` specificity issues.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false)
  const panelId = useId()
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const panelRef = useRef<HTMLDivElement | null>(null)
  const hasOpened = useRef(false)

  const close = useCallback(() => setOpen(false), [])

  // Escape to close + focus trap inside the panel.
  useEffect(() => {
    if (!open) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        close()
        return
      }
      if (event.key !== 'Tab') return

      const panel = panelRef.current
      if (panel === null) return

      const focusable = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE))
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (first === undefined || last === undefined) return

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, close])

  // Lock background scroll while the drawer is open.
  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [open])

  // Close when the viewport expands past the lg breakpoint.
  useEffect(() => {
    if (!open) return
    const query = window.matchMedia('(min-width: 64rem)')
    const onChange = () => {
      if (query.matches) close()
    }
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [open, close])

  // Move focus into the panel on open; return it to the trigger on close.
  useEffect(() => {
    if (open) {
      hasOpened.current = true
      panelRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus()
    } else if (hasOpened.current) {
      triggerRef.current?.focus()
    }
  }, [open])

  const overlay = (
    <>
      {/* Scrim — closes the drawer on click; invisible to AT */}
      <button
        type="button"
        tabIndex={-1}
        aria-hidden="true"
        onClick={close}
        className="fixed inset-0 top-[var(--header-h)] z-40 w-full cursor-default bg-navy-950/50 backdrop-blur-sm"
      />

      {/* Drawer panel */}
      <div
        ref={panelRef}
        id={panelId}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        className="fixed inset-x-0 top-[var(--header-h)] bottom-0 z-50 overflow-y-auto overscroll-contain border-t border-[var(--color-line)] bg-[var(--color-surface)]"
      >
        <div className="flex flex-col gap-6 px-4 py-6 sm:px-6">
          <nav aria-label="Primary">
            <p className={`${label.mono} mb-2 text-[var(--color-ink-faint)]`}>Navigate</p>
            <ul className="flex flex-col">
              {primaryNav.map((item) => (
                <li key={item.label} className="border-b border-[var(--color-line)] last:border-b-0">
                  <Button
                    href={item.href}
                    variant="ghost"
                    size="lg"
                    fullWidth
                    onClick={close}
                    className="justify-start rounded-none px-2 font-bold"
                  >
                    {item.label}
                  </Button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-3">
            <Button href="/contact" size="lg" fullWidth onClick={close}>
              Book a Demo
            </Button>
            <SignInAction fullWidth />
          </div>

          <p className={`${bodyText.small} text-[var(--color-ink-muted)]`}>
            Prefer email? Write to{' '}
            <a
              href={`mailto:${site.contact.email}`}
              className="font-semibold text-[var(--color-primary-600)] underline decoration-[var(--color-primary-300)] decoration-2 underline-offset-4"
            >
              {site.contact.email}
            </a>
            .
          </p>
        </div>
      </div>
    </>
  )

  return (
    <div className="lg:hidden">
      {/* Trigger — stays inside the header */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={panelId}
        className={cn(
          'inline-flex size-10 items-center justify-center rounded-lg border border-line-strong bg-surface text-ink-soft',
          'transition-colors duration-200 ease-std hover:border-primary-300 hover:text-primary-700',
        )}
      >
        {open ? <X className="size-5" /> : <Menu className="size-5" />}
        <span className="visually-hidden">{open ? 'Close menu' : 'Open menu'}</span>
      </button>

      {/* Portal: render the overlay at the body root to escape the header stacking context */}
      {typeof document !== 'undefined' && open && createPortal(overlay, document.body)}
    </div>
  )
}
