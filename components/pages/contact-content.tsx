'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Calendar,
  Mail,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react'
import { InteractiveHoverButton } from '@/registry/magicui/interactive-hover-button'
import { contactFaqs, contactMeta, subscriberRanges, hardwareOptions } from '@/content/contact'
import { CalendlyWidget } from '@/components/ui/calendly-widget'

/* ─── Accordion FAQ ──────────────────────────────────────────────────────── */
function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.45 }}
      className="overflow-hidden rounded-2xl border border-slate-200"
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors hover:bg-slate-50"
      >
        <span className="pr-4 text-sm font-semibold text-slate-900">{q}</span>
        {open ? (
          <ChevronUp className="h-4 w-4 shrink-0 text-violet-500" />
        ) : (
          <ChevronDown className="h-4 w-4 shrink-0 text-slate-400" />
        )}
      </button>
      {open && (
        <div className="border-t border-slate-100 px-6 pb-5 text-sm leading-relaxed text-slate-600">
          {a}
        </div>
      )}
    </motion.div>
  )
}

/* ─── Demo booking section (Questions before Calendly) ─────────────────────── */
function DemoBookingSection() {
  const [step, setStep] = useState<'questions' | 'calendar'>('questions')
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    subscribers: '',
    hardware: '',
    note: '',
  })
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    company: false,
    subscribers: false,
    hardware: false,
  })
  const [serverError, setServerError] = useState<string | null>(null)

  const emailValid = EMAIL_RE.test(form.email)
  const emailError = touched.email && form.email.length > 0 && !emailValid
  const emailRequired = touched.email && form.email.trim().length === 0
  const nameRequired = touched.name && form.name.trim().length === 0
  const companyRequired = touched.company && form.company.trim().length === 0
  const subscribersRequired = touched.subscribers && !form.subscribers
  const hardwareRequired = touched.hardware && !form.hardware

  const f = (k: keyof typeof form, v: string) => {
    setForm((p) => ({ ...p, [k]: v }))
    setServerError(null)
  }
  const touch = (k: keyof typeof touched) => setTouched((p) => ({ ...p, [k]: true }))

  async function handleProceedToCalendar(e: React.FormEvent) {
    e.preventDefault()
    setTouched({
      name: true,
      email: true,
      company: true,
      subscribers: true,
      hardware: true,
    })

    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !emailValid ||
      !form.company.trim() ||
      !form.subscribers ||
      !form.hardware
    ) {
      return
    }

    setSubmitting(true)
    setServerError(null)

    try {
      await fetch('/api/demo-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
    } catch {
      // Non-blocking: user can still proceed to Calendly
    } finally {
      setSubmitting(false)
      setStep('calendar')
    }
  }

  return (
    <div className="flex flex-col">
      {step === 'questions' ? (
        <form onSubmit={handleProceedToCalendar} noValidate id="demo-block" className="flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <span className="text-xs font-semibold tracking-wider text-violet-600 uppercase">
              Step 1 of 2: Network Details
            </span>
            <span className="text-xs text-slate-400">Takes 30 seconds</span>
          </div>

          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
            {/* Full Name */}
            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold text-slate-700">
                Full name <span className="text-red-500">*</span>
              </span>
              <input
                type="text"
                required
                placeholder="Rajesh Kumar"
                value={form.name}
                onChange={(e) => f('name', e.target.value)}
                onBlur={() => touch('name')}
                style={{ color: '#0f172a', backgroundColor: '#ffffff' }}
                className={`rounded-xl border px-3.5 py-2.5 text-sm text-slate-900 transition-all placeholder:text-slate-400 focus:ring-2 focus:outline-none ${
                  nameRequired
                    ? 'border-red-400 focus:ring-red-300'
                    : 'border-slate-200 focus:ring-violet-400'
                }`}
              />
              {nameRequired && <span className="text-xs text-red-500">Name is required</span>}
            </label>

            {/* Work Email */}
            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold text-slate-700">
                Work email <span className="text-red-500">*</span>
              </span>
              <input
                type="email"
                required
                placeholder="rajesh@yourwisp.in"
                value={form.email}
                onChange={(e) => f('email', e.target.value)}
                onBlur={() => touch('email')}
                style={{ color: '#0f172a', backgroundColor: '#ffffff' }}
                className={`rounded-xl border px-3.5 py-2.5 text-sm text-slate-900 transition-all placeholder:text-slate-400 focus:ring-2 focus:outline-none ${
                  emailError || emailRequired
                    ? 'border-red-400 focus:ring-red-300'
                    : 'border-slate-200 focus:ring-violet-400'
                }`}
              />
              {emailError ? (
                <span className="text-xs text-red-500">Please enter a valid email</span>
              ) : emailRequired ? (
                <span className="text-xs text-red-500">Email is required</span>
              ) : null}
            </label>
          </div>

          {/* ISP / Company Name */}
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold text-slate-700">
              ISP / Organization name <span className="text-red-500">*</span>
            </span>
            <input
              type="text"
              required
              placeholder="e.g. SpeedNet Broadband Pvt Ltd"
              value={form.company}
              onChange={(e) => f('company', e.target.value)}
              onBlur={() => touch('company')}
              style={{ color: '#0f172a', backgroundColor: '#ffffff' }}
              className={`rounded-xl border px-3.5 py-2.5 text-sm text-slate-900 transition-all placeholder:text-slate-400 focus:ring-2 focus:outline-none ${
                companyRequired
                  ? 'border-red-400 focus:ring-red-300'
                  : 'border-slate-200 focus:ring-violet-400'
              }`}
            />
            {companyRequired && (
              <span className="text-xs text-red-500">Company / ISP name is required</span>
            )}
          </label>

          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
            {/* Active Subscribers */}
            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold text-slate-700">
                Active subscribers <span className="text-red-500">*</span>
              </span>
              <select
                required
                value={form.subscribers}
                onChange={(e) => f('subscribers', e.target.value)}
                onBlur={() => touch('subscribers')}
                style={{
                  color: form.subscribers ? '#0f172a' : '#94a3b8',
                  backgroundColor: '#ffffff',
                }}
                className={`rounded-xl border px-3.5 py-2.5 text-sm transition-all focus:ring-2 focus:outline-none ${
                  subscribersRequired
                    ? 'border-red-400 focus:ring-red-300'
                    : 'border-slate-200 focus:ring-violet-400'
                }`}
              >
                <option value="" disabled>
                  Select range…
                </option>
                {subscriberRanges.map((r) => (
                  <option key={r} value={r} style={{ color: '#0f172a' }}>
                    {r}
                  </option>
                ))}
              </select>
              {subscribersRequired && (
                <span className="text-xs text-red-500">Please select subscriber range</span>
              )}
            </label>

            {/* Primary Router / Hardware */}
            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold text-slate-700">
                Primary router <span className="text-red-500">*</span>
              </span>
              <select
                required
                value={form.hardware}
                onChange={(e) => f('hardware', e.target.value)}
                onBlur={() => touch('hardware')}
                style={{
                  color: form.hardware ? '#0f172a' : '#94a3b8',
                  backgroundColor: '#ffffff',
                }}
                className={`rounded-xl border px-3.5 py-2.5 text-sm transition-all focus:ring-2 focus:outline-none ${
                  hardwareRequired
                    ? 'border-red-400 focus:ring-red-300'
                    : 'border-slate-200 focus:ring-violet-400'
                }`}
              >
                <option value="" disabled>
                  Select hardware…
                </option>
                {hardwareOptions.map((h) => (
                  <option key={h} value={h} style={{ color: '#0f172a' }}>
                    {h}
                  </option>
                ))}
              </select>
              {hardwareRequired && (
                <span className="text-xs text-red-500">Please select router type</span>
              )}
            </label>
          </div>

          {/* Looking for / notes */}
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold text-slate-700">
              What would you like to see?{' '}
              <span className="font-normal text-slate-400">(Optional)</span>
            </span>
            <input
              type="text"
              placeholder="e.g. LCO reseller billing, captive portal, or RADIUS migration"
              value={form.note}
              onChange={(e) => f('note', e.target.value)}
              style={{ color: '#0f172a', backgroundColor: '#ffffff' }}
              className="rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 transition-all placeholder:text-slate-400 focus:border-transparent focus:ring-2 focus:ring-violet-400 focus:outline-none"
            />
          </label>

          {serverError && (
            <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-xs font-medium text-red-600">
              {serverError}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="mt-1 flex w-full items-center justify-center gap-2 rounded-full bg-violet-600 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-violet-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <span>{submitting ? 'Saving details…' : 'Continue to Pick Time Slot'}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>
      ) : (
        <div className="flex flex-col">
          {/* Step 2 sleek header */}
          <div className="mb-2 flex items-center justify-between border-b border-slate-100 pb-2.5 text-xs">
            <button
              type="button"
              onClick={() => setStep('questions')}
              className="inline-flex items-center gap-1.5 font-medium text-slate-500 transition-colors hover:text-slate-900"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Edit details</span>
            </button>
            <span className="text-slate-400">
              Booking for <strong className="font-semibold text-slate-700">{form.name}</strong>
              {form.company ? ` · ${form.company}` : ''}
            </span>
          </div>

          {/* Calendly Inline Widget */}
          <CalendlyWidget
            height={640}
            prefill={{
              name: form.name,
              email: form.email,
            }}
          />
        </div>
      )}
    </div>
  )
}

/* ─── Quick contact form ─────────────────────────────────────────────────── */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function QuickContactForm() {
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [touched, setTouched] = useState({ name: false, email: false, message: false })

  const emailValid = EMAIL_RE.test(form.email)
  const emailError = touched.email && form.email.length > 0 && !emailValid

  const f = (k: keyof typeof form, v: string) => {
    setForm((p) => ({ ...p, [k]: v }))
    setServerError(null)
  }
  const touch = (k: keyof typeof touched) => setTouched((p) => ({ ...p, [k]: true }))

  async function handleSend(e: React.FormEvent) {
    e.preventDefault()
    setTouched({ name: true, email: true, message: true })
    if (!emailValid) return

    setSending(true)
    setServerError(null)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const json = (await res.json()) as { ok: boolean; error?: string }
      if (!json.ok) {
        setServerError(json.error ?? 'Something went wrong. Please try again.')
        return
      }
      setSent(true)
    } catch {
      setServerError('Could not reach the server. Please check your connection.')
    } finally {
      setSending(false)
    }
  }

  if (sent) {
    return (
      <div className="flex flex-col items-center gap-4 py-12 text-center">
        <CheckCircle className="h-12 w-12 text-green-500" />
        <p className="font-semibold text-slate-900">
          Message sent! We&apos;ll reply within 24 hours.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSend} className="flex flex-col gap-4" noValidate>
      {/* Name */}
      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-semibold text-slate-700">Name</span>
        <input
          type="text"
          required
          placeholder="Your name"
          value={form.name}
          onChange={(e) => f('name', e.target.value)}
          onBlur={() => touch('name')}
          style={{ color: '#0f172a', backgroundColor: '#ffffff' }}
          className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 transition-all placeholder:text-slate-400 focus:border-transparent focus:ring-2 focus:ring-violet-400 focus:outline-none"
        />
      </label>

      {/* Email with live validation */}
      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-semibold text-slate-700">Email</span>
        <input
          type="email"
          required
          placeholder="you@example.com"
          value={form.email}
          onChange={(e) => f('email', e.target.value)}
          onBlur={() => touch('email')}
          style={{ color: '#0f172a', backgroundColor: '#ffffff' }}
          className={`rounded-xl border bg-white px-4 py-2.5 text-sm text-slate-900 transition-all placeholder:text-slate-400 focus:border-transparent focus:ring-2 focus:outline-none ${
            emailError
              ? 'border-red-400 focus:ring-red-300'
              : 'border-slate-200 focus:ring-violet-400'
          }`}
        />
        {emailError && (
          <span className="flex items-center gap-1 text-xs font-medium text-red-500">
            <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
                clipRule="evenodd"
              />
            </svg>
            Please enter a valid email address.
          </span>
        )}
      </label>

      {/* Message */}
      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-semibold text-slate-700">Message</span>
        <textarea
          required
          rows={4}
          placeholder="Tell us about your network setup…"
          value={form.message}
          onChange={(e) => f('message', e.target.value)}
          onBlur={() => touch('message')}
          style={{ color: '#0f172a', backgroundColor: '#ffffff' }}
          className="resize-none rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 transition-all placeholder:text-slate-400 focus:border-transparent focus:ring-2 focus:ring-violet-400 focus:outline-none"
        />
      </label>

      {/* Server error */}
      {serverError && (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-xs font-medium text-red-600">
          {serverError}
        </p>
      )}

      <button
        type="submit"
        disabled={sending}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-slate-900 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Mail className="h-4 w-4" />
        {sending ? 'Sending…' : 'Send message'}
      </button>
    </form>
  )
}

/* ─── Main export ─────────────────────────────────────────────────────────── */
export function ContactContent() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section
        className="relative overflow-hidden pt-32 pb-20"
        style={{
          background:
            'radial-gradient(ellipse 80% 100% at 50% 0%, #9061FF 0%, #6332F6 35%, #2A115E 72%, #150833 100%)',
        }}
      >
        {/* Dot grid overlay */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px] opacity-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(116,60,255,0.28)_0%,transparent_70%)]" />
        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
            }}
          >
            <div className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold tracking-wider text-violet-400 uppercase">
              {contactMeta.eyebrow}
            </div>
            <h1 className="mb-5 text-4xl leading-tight font-extrabold tracking-tight text-white sm:text-5xl">
              {contactMeta.heading}
            </h1>
            <p className="text-lg text-white/60">{contactMeta.lead}</p>
          </motion.div>
        </div>
      </section>

      {/* Two-column forms */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2">
            {/* Demo booking — Pre-qualification questions then Calendly */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-8"
            >
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100">
                  <Calendar className="h-5 w-5 text-violet-600" />
                </div>
                <div>
                  <h2 className="font-bold text-slate-900">Book a Free Demo</h2>
                  <p className="text-xs text-slate-500">
                    30-min interactive session tailored to your router setup
                  </p>
                </div>
              </div>
              <DemoBookingSection />
            </motion.div>

            {/* Quick contact */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="flex flex-col gap-6"
            >
              <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
                    <MessageSquare className="h-5 w-5 text-slate-600" />
                  </div>
                  <div>
                    <h2 className="font-bold text-slate-900">Quick Message</h2>
                    <p className="text-xs text-slate-500">
                      We reply within 24 hours on business days
                    </p>
                  </div>
                </div>
                <QuickContactForm />
              </div>

              {/* Direct contact */}
              <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-sm font-semibold text-slate-900">Reach us directly</h3>
                <a
                  href="mailto:support@thewify.com"
                  className="flex items-center gap-3 text-sm text-slate-700 transition-colors hover:text-violet-600"
                >
                  <Mail className="h-4 w-4 text-violet-500" />
                  support@thewify.com
                </a>
                <a
                  href="https://wa.me/918333963405"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-slate-700 transition-colors hover:text-emerald-600"
                >
                  <MessageSquare className="h-4 w-4 text-emerald-500" />
                  WhatsApp: +91 83339 63405
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-slate-100 bg-white py-20">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <h2 className="mb-10 text-center text-2xl font-bold text-slate-900">Common questions</h2>
          <div className="flex flex-col gap-3">
            {contactFaqs.map((faq, i) => (
              <FaqItem key={faq.question} q={faq.question} a={faq.answer} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[#0D0F17] py-16 text-center">
        <div className="mx-auto max-w-xl px-4">
          <h2 className="mb-3 text-2xl font-bold text-white">
            Ready to eliminate server maintenance?
          </h2>
          <p className="mb-8 text-sm text-white/60">
            Join 200+ ISPs across India managing subscribers in the cloud.
          </p>
          <InteractiveHoverButton
            href="/"
            variant="white"
            className="px-6 py-3 text-sm font-semibold"
          >
            See how it works
          </InteractiveHoverButton>
        </div>
      </section>
    </main>
  )
}
