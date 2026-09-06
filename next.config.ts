import type { NextConfig } from 'next'

/**
 * Baseline security headers.
 *
 * A strict Content-Security-Policy is intentionally NOT set here yet — it is
 * scheduled for Phase 10, once the full set of third-party origins (analytics,
 * payment/booking embeds) is actually known. Adding a CSP before then would
 * either be wrong or would have to be loosened to the point of being useless.
 */
const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
  },
]

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  // Compile-time checking of every `href` against the real route tree.
  //
  // Deliberately OFF until Phase 10. `typedRoutes` validates href literals
  // against routes that actually exist, so enabling it now would reject the
  // links to /pricing, /blog and /contact that the navigation needs before
  // those routes are built in Phase 7. `LinkHref` in lib/links.ts is derived
  // from next/link, so flipping this to `true` once the route tree is complete
  // upgrades every href in the codebase without touching a single component.
  typedRoutes: false,

  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }]
  },
}

export default nextConfig
