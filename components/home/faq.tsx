'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  const faqs = [
    {
      q: 'How does Unify connect to my MikroTik router?',
      a: 'Unify connects over standard RADIUS protocol (RFC 2865). In RouterOS, you add Unify’s cloud server IP, shared secret, and enable it for PPP or Hotspot. The setup takes under 10 minutes and does not require custom firmware, scripts, or firewall changes.',
    },
    {
      q: 'What happens if our local internet connection fluctuates?',
      a: 'Existing active subscriber sessions remain connected on your MikroTik even during temporary backhaul jitter. Furthermore, Unify runs on a geo-redundant cluster with multiple backup endpoints so authentication never stalls.',
    },
    {
      q: 'How do automated WhatsApp renewal reminders work?',
      a: '3 days prior to a subscriber’s expiry date, Unify automatically generates their GST invoice and dispatches a WhatsApp notification containing their renewal details and a direct UPI pay link (GPay, PhonePe, Paytm). When they pay, their account automatically renews in RADIUS.',
    },
    {
      q: 'Can my LCO franchise partners manage their own subscribers?',
      a: 'Yes. With Unify’s White-Label Reseller Portal, each LCO partner gets an isolated branded dashboard on their own domain. They can add subscribers, view collection reports, and generate invoices without seeing your core router or other LCOs’ data.',
    },
    {
      q: 'Is there a setup fee or lock-in contract?',
      a: 'No. Unify has zero setup fees, zero hardware appliance costs, and requires no long-term contracts. You can start with a 30-day free trial and scale or downgrade as your subscriber base changes.',
    },
  ]

  return (
    <section className="unify-light-section bg-white py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold tracking-wider text-slate-700 uppercase">
            Common Inquiries
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-sm text-slate-500 sm:text-base">
            Everything you need to know about cloud RADIUS, MikroTik setup, and billing.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx
            return (
              <div
                key={idx}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all hover:border-purple-200"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between p-5 text-left sm:p-6"
                >
                  <span className="pr-4 text-base font-bold text-slate-900 sm:text-lg">
                    {faq.q}
                  </span>
                  <div
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-transform ${
                      isOpen ? 'rotate-180 bg-[#743CFF] text-white' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </button>
                {isOpen && (
                  <div className="border-t border-slate-100 px-5 pt-4 pb-6 text-sm leading-relaxed text-slate-600 sm:px-6 sm:pb-6 sm:text-base">
                    {faq.a}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
