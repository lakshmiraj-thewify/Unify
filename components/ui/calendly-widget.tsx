'use client'

import { useEffect, useRef } from 'react'

/**
 * Renders a Calendly inline booking widget.
 *
 * The booking URL is read from the NEXT_PUBLIC_CALENDLY_URL environment
 * variable at build/runtime. A fallback URL may also be passed via props.
 *
 * Usage:
 *   <CalendlyWidget />
 *   <CalendlyWidget url="https://calendly.com/your-team/demo" />
 *
 * Env var:
 *   NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/lakshmiraj-thewify/30min
 */

const CALENDLY_CSS = 'https://assets.calendly.com/assets/external/widget.css'
const CALENDLY_JS = 'https://assets.calendly.com/assets/external/widget.js'

interface CalendlyWidgetProps {
  /** Booking URL. Defaults to NEXT_PUBLIC_CALENDLY_URL env var. */
  url?: string
  /** Widget height in pixels. Default: 680 */
  height?: number
  /** Prefill user details */
  prefill?: {
    name?: string
    email?: string
  }
}

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (opts: {
        url: string
        parentElement: HTMLElement
        prefill?: Record<string, unknown>
        utm?: Record<string, unknown>
      }) => void
    }
  }
}

export function CalendlyWidget({
  url = process.env['NEXT_PUBLIC_CALENDLY_URL'] ?? 'https://calendly.com/lakshmiraj-thewify/30min',
  height = 680,
  prefill,
}: CalendlyWidgetProps) {
  // Append params to hide details/banner and prefill name/email
  const params = new URLSearchParams()
  params.set('hide_event_type_details', '1')
  params.set('hide_gdpr_banner', '1')
  if (prefill?.name) params.set('name', prefill.name)
  if (prefill?.email) params.set('email', prefill.email)

  const separator = url.includes('?') ? '&' : '?'
  const embedUrl = `${url}${separator}${params.toString()}`

  const containerRef = useRef<HTMLDivElement>(null)
  const initialised = useRef(false)

  useEffect(() => {
    if (initialised.current) return
    initialised.current = true

    // 1. Inject Calendly stylesheet (idempotent — skip if already present)
    if (!document.querySelector(`link[href="${CALENDLY_CSS}"]`)) {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = CALENDLY_CSS
      document.head.appendChild(link)
    }

    // 2. Load Calendly embed script then initialise the inline widget
    const existingScript = document.querySelector(`script[src="${CALENDLY_JS}"]`)

    const initWidget = () => {
      if (window.Calendly && containerRef.current) {
        containerRef.current.innerHTML = ''
        window.Calendly.initInlineWidget({
          url: embedUrl,
          parentElement: containerRef.current,
          prefill: prefill ?? {},
          utm: {},
        })
      }
    }

    if (existingScript) {
      initWidget()
    } else {
      const script = document.createElement('script')
      script.src = CALENDLY_JS
      script.async = true
      script.onload = initWidget
      document.body.appendChild(script)
    }
  }, [embedUrl, prefill])

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden rounded-2xl"
      style={{ minWidth: 320, height }}
      aria-label="Book a demo calendar"
    />
  )
}
