'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { RotateCcw, AlertTriangle, ArrowLeft } from 'lucide-react'
import { site } from '@/content/site'

/**
 * Route-level error boundary matching the dark Unify theme.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="relative min-h-[85vh] overflow-hidden bg-[#0D0F17] pt-28 pb-20 sm:pt-36 sm:pb-28">
      {/* Background ambient radial glows */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 h-[450px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-rose-600/15 to-[#743CFF]/20 blur-[130px]" />
      <div className="pointer-events-none absolute right-1/4 bottom-1/4 h-[350px] w-[350px] rounded-full bg-[#743CFF]/15 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        {/* Status Pill Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-rose-500/25 bg-rose-500/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-rose-400 uppercase sm:text-sm">
          <AlertTriangle className="h-4 w-4 animate-pulse" />
          <span>System Exception · Unexpected Error</span>
        </div>

        {/* Headline */}
        <h1 className="mb-4 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
          Something went wrong on our side.
        </h1>

        {/* Description */}
        <p className="mx-auto mb-10 max-w-lg text-base leading-relaxed text-white/60 sm:text-lg">
          This page failed to render properly. Retrying usually re-establishes the session cleanly.
        </p>

        {/* Action Buttons */}
        <div className="mb-12 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#743CFF] to-[#6C8DFF] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_0_24px_rgba(116,60,255,0.4)] transition-all hover:scale-[1.02] hover:shadow-[0_0_32px_rgba(116,60,255,0.6)]"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Try Again</span>
          </button>

          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-all hover:border-white/30 hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Support & Diagnostic Digest Card */}
        <div className="mx-auto max-w-lg rounded-xl border border-white/10 bg-[#141A26]/80 p-5 text-sm text-white/60 backdrop-blur-xl">
          <p className="mb-2">
            If the problem persists, contact our support team at{' '}
            <a
              href={`mailto:${site.contact.email}`}
              className="font-medium text-[#5EE7E4] underline underline-offset-4 hover:text-white"
            >
              {site.contact.email}
            </a>
          </p>
          {error.digest && (
            <p className="font-mono text-xs text-white/40">
              Error Digest Reference:{' '}
              <code className="rounded bg-white/10 px-1.5 py-0.5 text-white/80">
                {error.digest}
              </code>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
