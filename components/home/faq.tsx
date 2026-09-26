'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0)

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
    <section className="unify-light-section py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-xs font-semibold text-slate-700 tracking-wider uppercase mb-3">
            Common Inquiries
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-500 mt-2 text-sm sm:text-base">
            Everything you need to know about cloud RADIUS, MikroTik setup, and billing.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 overflow-hidden transition-all bg-white hover:border-purple-200"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left"
                >
                  <span className="font-bold text-slate-900 text-base sm:text-lg pr-4">
                    {faq.q}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform ${isOpen ? 'bg-[#743CFF] text-white rotate-180' : 'bg-slate-100 text-slate-500'
                      }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>
                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100 pt-4">
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
