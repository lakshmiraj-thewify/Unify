/**
 * Skip link. First focusable element on the page, visually hidden until focused.
 * Targets the `#main` landmark rendered by the root layout.
 */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-bold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-100 focus:shadow-lg focus:ring-4 focus:ring-primary-200"
    >
      Skip to main content
    </a>
  )
}
