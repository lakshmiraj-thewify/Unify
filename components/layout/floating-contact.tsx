import type { ReactNode } from 'react'
import { MessageCircle, Phone } from 'lucide-react'
import { site } from '@/content/site'
import { isProvided } from '@/content/types'

/**
 * ---------------------------------------------------------------------------
 * Floating Call Us / WhatsApp actions — approved navigation, bottom right.
 *
 * CURRENTLY RENDERS NOTHING, BY DESIGN.
 *
 * The blueprint specifies both controls but supplies neither number
 * (PENDING(Q10) in `content/site.ts`). A floating action that dials nothing is
 * worse than no floating action, and a fabricated number is not an option — so
 * the structure is built and wired, and it activates the moment
 * `site.contact.phone` / `site.contact.whatsapp` are filled in. No other change
 * is needed at that point.
 *
 * Deliberately NOT substituted with an email button: the approved nav specifies
 * telephone and WhatsApp, and quietly swapping in a third channel would be
 * inventing navigation.
 * ---------------------------------------------------------------------------
 */

type FloatingAction = {
  label: string
  href: string
  icon: ReactNode
  className: string
}

export function FloatingContact() {
  const actions: FloatingAction[] = []

  if (isProvided(site.contact.phone)) {
    actions.push({
      label: 'Call us',
      href: `tel:${site.contact.phone}`,
      icon: <Phone />,
      className: 'bg-primary-600 text-white shadow-primary hover:bg-primary-700',
    })
  }

  if (isProvided(site.contact.whatsapp)) {
    actions.push({
      label: 'WhatsApp',
      href: `https://wa.me/${site.contact.whatsapp.replace(/[^\d]/g, '')}`,
      icon: <MessageCircle />,
      className: 'bg-ok-600 text-white shadow-lift hover:bg-ok-700',
    })
  }

  if (actions.length === 0) return null

  return (
    <div
      className="fixed right-4 bottom-4 z-40 flex flex-col items-end gap-2 print:hidden"
      aria-label="Quick contact"
      role="group"
    >
      {actions.map((action) => (
        <a
          key={action.label}
          href={action.href}
          className={`inline-flex size-12 items-center justify-center rounded-full transition-colors duration-200 ease-std [&_svg]:size-5 ${action.className}`}
        >
          {action.icon}
          <span className="visually-hidden">{action.label}</span>
        </a>
      ))}
    </div>
  )
}
