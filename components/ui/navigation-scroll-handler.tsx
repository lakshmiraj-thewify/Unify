'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/**
 * Global navigation handler that ensures:
 * 1. When clicking any link/button pointing to the current page (e.g. clicking "Book a Demo"
 *    while already on /contact), the page smoothly scrolls to the top instead of doing nothing.
 * 2. When clicking any hash link on the same page (e.g. /#solution-wisp), it smoothly scrolls
 *    to that section even if the hash is already in the URL.
 * 3. When navigating between different pages, it ensures the new page starts at the very top.
 */
export function NavigationScrollHandler() {
  const pathname = usePathname()

  // Ensure every route transition starts at the top (unless a valid hash is targeted)
  useEffect(() => {
    if (typeof window === 'undefined') return

    const timer = setTimeout(() => {
      if (window.location.hash) {
        const hashId = window.location.hash.slice(1)
        const el = document.getElementById(hashId)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
          return
        }
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }, 10)

    return () => clearTimeout(timer)
  }, [pathname])

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const anchor = (e.target as HTMLElement).closest?.('a')
      if (!anchor) return

      const href = anchor.getAttribute('href')
      if (!href) return

      // Skip external protocols or new-tab targets
      if (
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        href.startsWith('javascript:') ||
        anchor.getAttribute('target') === '_blank'
      ) {
        return
      }

      try {
        const targetUrl = new URL(href, window.location.href)
        if (targetUrl.origin !== window.location.origin) return

        const currentPath = window.location.pathname.replace(/\/+$/, '') || '/'
        const targetPath = targetUrl.pathname.replace(/\/+$/, '') || '/'

        // If clicking a link pointing to the CURRENT page
        if (currentPath === targetPath) {
          if (!targetUrl.hash || targetUrl.hash === '#') {
            // Same page, no hash: smoothly scroll to the top
            e.preventDefault()
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
            if (window.location.hash) {
              window.history.pushState(null, '', targetPath + targetUrl.search)
            }
          } else {
            // Same page, with hash: smoothly scroll to the section
            const hashId = targetUrl.hash.slice(1)
            const targetEl = document.getElementById(hashId)
            if (targetEl) {
              e.preventDefault()
              targetEl.scrollIntoView({ behavior: 'smooth' })
              window.history.pushState(null, '', targetPath + targetUrl.search + targetUrl.hash)
            } else {
              e.preventDefault()
              window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
            }
          }
        }
      } catch {
        // Fallback for unparseable URLs
      }
    }

    document.addEventListener('click', handleClick, { capture: true })
    return () => {
      document.removeEventListener('click', handleClick, { capture: true })
    }
  }, [])

  return null
}
