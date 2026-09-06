import type Link from 'next/link'
import type { ComponentProps } from 'react'

/**
 * The `href` type accepted by `next/link`.
 *
 * Derived from `next/link` rather than declared, so it tracks whatever
 * `typedRoutes` is set to in next.config.ts. That flag is currently `false`
 * (the approved nav links to /pricing, /blog and /contact, which do not exist
 * until Phase 7), so today this widens to `string | UrlObject` and a typo in an
 * internal href is NOT caught by `tsc`. Flipping the flag on in Phase 10, once
 * the route tree is complete, narrows this to the generated route union and
 * upgrades every href in the codebase without editing a single component.
 *
 * External URLs are deliberately NOT part of this type — components take a
 * separate, explicitly-flagged path for those so an outbound link can never be
 * handed to the client-side router by accident.
 */
export type LinkHref = ComponentProps<typeof Link>['href']
