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
  // Enabled now that the full route tree is in place: /, /pricing, /blog,
  // /contact, /legal/privacy, /legal/terms. This narrows LinkHref to the
  // generated route union and catches any typo in an internal href at build
  // time without touching any component.
  typedRoutes: true,

  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }]
  },
}

export default nextConfig
