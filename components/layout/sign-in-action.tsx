import { LogIn } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { site } from '@/content/site'
import { isProvided } from '@/content/types'

/**
 * Sign In, as specified in the approved navigation.
 *
 * PENDING(Q6): the blueprint specifies the control but never says where it
 * points. Rather than guessing a subdomain, it renders in a genuinely disabled
 * state with the reason exposed to assistive technology. The moment
 * `site.signInUrl` is filled in this becomes a real link, with no other change.
 *
 * Lives in its own module because both the header (server) and the mobile
 * drawer (client) render it — importing it from either one would create a cycle
 * and drag the header into the client bundle.
 */
export function SignInAction({ fullWidth = false }: { fullWidth?: boolean }) {
  if (isProvided(site.signInUrl)) {
    return (
      <Button
        href={site.signInUrl}
        external
        variant="ghost"
        size="sm"
        fullWidth={fullWidth}
        leadingIcon={<LogIn />}
      >
        Sign In
      </Button>
    )
  }

  return (
    <Button variant="ghost" size="sm" fullWidth={fullWidth} leadingIcon={<LogIn />} disabled>
      Sign In
      <span className="visually-hidden"> — subscriber portal not available yet</span>
    </Button>
  )
}
