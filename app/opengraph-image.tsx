/**
 * ---------------------------------------------------------------------------
 * app/opengraph-image.tsx
 *
 * Generates the default Open Graph / social preview image (1200 × 630 px)
 * served at /opengraph-image.
 *
 * Uses the Next.js built-in ImageResponse API — zero new dependencies.
 * The image is statically generated at build time and cached at the edge.
 *
 * Design uses the exact Unify Wi-Fi brand colours from app/icon.svg:
 *   #1e3a8a  deep navy (gradient start)
 *   #2563eb  royal blue (gradient mid)
 *   #06b6d4  cyan / signal (gradient end / accent)
 *   #ffffff  white (text + mark strokes)
 *
 * Copy uses only approved homepage messaging from content/site.ts.
 * ---------------------------------------------------------------------------
 */

import { ImageResponse } from 'next/og'

export const runtime = 'nodejs'

export const alt = 'Unify Wi-Fi — Cloud RADIUS & ISP Management Platform'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 45%, #1d4ed8 80%, #0e7490 100%)',
          padding: '72px 80px',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        {/* Background decorative glow blob — top right */}
        <div
          style={{
            position: 'absolute',
            top: '-120px',
            right: '-80px',
            width: '560px',
            height: '560px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(6,182,212,0.18) 0%, transparent 70%)',
          }}
        />

        {/* Background decorative glow blob — bottom left */}
        <div
          style={{
            position: 'absolute',
            bottom: '-80px',
            left: '-60px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(37,99,235,0.22) 0%, transparent 70%)',
          }}
        />

        {/* === TOP SECTION: Logo mark + brand name === */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          {/* Unify Wi-Fi mark — SVG inlined matching app/icon.svg geometry */}
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 55%, #06b6d4 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: '0',
            }}
          >
            {/* WiFi arcs — proportional to the 32px SVG viewBox, scaled to 64px container */}
            <svg
              width="40"
              height="40"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g stroke="#ffffff" strokeWidth="2.6" strokeLinecap="round">
                <path d="M7.6 14.2a12.4 12.4 0 0 1 16.8 0" />
                <path d="M11.6 18.6a6.2 6.2 0 0 1 8.8 0" />
              </g>
              <circle cx="16" cy="23.4" r="2" fill="#ffffff" />
            </svg>
          </div>

          {/* Brand name */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <span
              style={{
                fontSize: '28px',
                fontWeight: '800',
                color: '#ffffff',
                letterSpacing: '-0.5px',
                lineHeight: '1',
              }}
            >
              Unify Wi-Fi
            </span>
            <span
              style={{
                fontSize: '14px',
                fontWeight: '500',
                color: 'rgba(186,230,253,0.85)',
                letterSpacing: '0.04em',
                lineHeight: '1',
              }}
            >
              by TheWiFy
            </span>
          </div>
        </div>

        {/* === MIDDLE SECTION: Main headline + subheadline === */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '820px' }}>
          {/* Category badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(6,182,212,0.15)',
              border: '1px solid rgba(6,182,212,0.35)',
              borderRadius: '100px',
              padding: '6px 16px',
            }}
          >
            <div
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                background: '#06b6d4',
                flexShrink: '0',
              }}
            />
            <span
              style={{
                fontSize: '13px',
                fontWeight: '600',
                color: '#67e8f9',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              Cloud RADIUS · ISP Management Platform
            </span>
          </div>

          {/* Main headline */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span
              style={{
                fontSize: '64px',
                fontWeight: '900',
                color: '#ffffff',
                letterSpacing: '-2px',
                lineHeight: '1.05',
              }}
            >
              Your ISP.{' '}
              <span
                style={{
                  background: 'linear-gradient(90deg, #38bdf8, #06b6d4)',
                  backgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                Unified.
              </span>
            </span>
            <span
              style={{
                fontSize: '64px',
                fontWeight: '900',
                color: '#ffffff',
                letterSpacing: '-2px',
                lineHeight: '1.05',
              }}
            >
              In the Cloud.
            </span>
          </div>

          {/* Subheadline */}
          <p
            style={{
              fontSize: '22px',
              fontWeight: '400',
              color: 'rgba(186,230,253,0.80)',
              lineHeight: '1.5',
              margin: '0',
            }}
          >
            Connect MikroTik in 10 minutes. Automate PPPoE & Hotspot billing.
            Manage every subscriber — no servers required.
          </p>
        </div>

        {/* === BOTTOM SECTION: Trust stats === */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
          {[
            { value: '200+', label: 'Active ISPs' },
            { value: '50,000+', label: 'Subscribers Managed' },
            { value: '99.99%', label: 'RADIUS Uptime SLA' },
            { value: '10 min', label: 'MikroTik Setup' },
          ].map((stat, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                paddingRight: i < 3 ? '40px' : '0',
                borderRight: i < 3 ? '1px solid rgba(255,255,255,0.15)' : 'none',
              }}
            >
              <span
                style={{
                  fontSize: '28px',
                  fontWeight: '800',
                  color: '#ffffff',
                  letterSpacing: '-0.5px',
                  lineHeight: '1',
                }}
              >
                {stat.value}
              </span>
              <span
                style={{
                  fontSize: '13px',
                  fontWeight: '500',
                  color: 'rgba(186,230,253,0.65)',
                  lineHeight: '1',
                  letterSpacing: '0.02em',
                }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
    },
  )
}
