'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Calendar, Clock, Mail, Phone, MessageSquare, ChevronDown, ChevronUp, ArrowRight, CheckCircle } from 'lucide-react'
import { InteractiveHoverButton } from '@/registry/magicui/interactive-hover-button'
import { contactFaqs, demoTimeSlots, subscriberRanges, hardwareOptions, contactMeta } from '@/content/contact'
import Stepper, { Step } from '@/components/ui/stepper'

/* ─── Accordion FAQ ──────────────────────────────────────────────────────── */
function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.45 }}
      className="border border-slate-200 rounded-2xl overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-slate-50 transition-colors"
      >
        <span className="font-semibold text-slate-900 text-sm pr-4">{q}</span>
        {open ? <ChevronUp className="w-4 h-4 text-violet-500 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
      </button>
      {open && (
        <div className="px-6 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100">
          {a}
        </div>
      )}
    </motion.div>
  )
}

/* ─── Multi-step demo booking ─────────────────────────────────────────────── */
type DemoStep = 1 | 2 | 3
type BookingData = {
  name: string; email: string; company: string; subscriberRange: string; hardware: string
  date: string; time: string
}

function DemoBookingForm() {
  const [step, setStep] = useState<DemoStep>(1)
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [data, setData] = useState<BookingData>({
    name: '', email: '', company: '', subscriberRange: '', hardware: '',
    date: '', time: '',
  })

  const today = new Date()
  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today)
    d.setDate(today.getDate() + i + 1)
    return d
  })

  const field = (key: keyof BookingData, value: string) =>
    setData((prev) => ({ ...prev, [key]: value }))

  const step1Valid = Boolean(data.name && data.email && data.company && data.subscriberRange && data.hardware)
  const step2Valid = Boolean(data.date)
  const step3Valid = Boolean(data.time)

  const canGoToStep = (targetStep: number) => {
    if (targetStep === 1) return true
    if (targetStep === 2) return step1Valid
    if (targetStep === 3) return step1Valid && step2Valid
    return false
  }

  async function handleSubmit() {
    setIsSubmitting(true)
    try {
      await fetch('/api/demo-booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
    } catch { /* non-blocking */ } finally {
      setIsSubmitting(false)
    }
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center gap-5 py-16 text-center">
        <CheckCircle className="w-16 h-16 text-green-500 animate-in zoom-in-50 duration-300" />
        <h3 className="text-2xl font-bold text-slate-900">Demo booked!</h3>
        <p className="text-slate-500 text-sm max-w-xs">
          We'll send a confirmation to <strong>{data.email}</strong> with a MikroTik-specific agenda for your network setup.
        </p>
        <Link href="/" className="text-violet-600 text-sm font-semibold hover:underline">Back to home</Link>
      </div>
    )
  }

  return (
    <Stepper
      step={step}
      onStepChange={(newStep) => {
        if (canGoToStep(newStep)) {
          setStep(newStep as DemoStep)
        }
      }}
      onFinalStepCompleted={handleSubmit}
      stepLabels={['Your details', 'Pick a date', 'Choose a time']}
      disableStepIndicators={false}
      isNextDisabled={
        (step === 1 && !step1Valid) ||
        (step === 2 && !step2Valid) ||
        (step === 3 && (!step3Valid || isSubmitting))
      }
      backButtonText="Back"
      nextButtonText={
        step === 1 ? (
          <span className="inline-flex items-center gap-2">
            Next: Pick a date <ArrowRight className="w-4 h-4" />
          </span>
        ) : step === 2 ? (
          <span className="inline-flex items-center gap-2">
            Next: Choose time <ArrowRight className="w-4 h-4" />
          </span>
        ) : (
          <span className="inline-flex items-center gap-2">
            <Calendar className="w-4 h-4" /> {isSubmitting ? 'Booking…' : 'Confirm demo'}
          </span>
        )
      }
    >
      {/* Step 1 — Pre-qualification */}
      <Step>
        <div className="flex flex-col gap-4">
          {[
            { label: 'Full name', key: 'name', type: 'text', placeholder: 'Rajesh Kumar' },
            { label: 'Email address', key: 'email', type: 'email', placeholder: 'rajesh@yourwisp.in' },
            { label: 'ISP / Company name', key: 'company', type: 'text', placeholder: 'My Network Pvt Ltd' },
          ].map(({ label, key, type, placeholder }) => (
            <label key={key} className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold text-slate-700">{label}</span>
              <input
                type={type}
                placeholder={placeholder}
                value={data[key as keyof BookingData]}
                onChange={(e) => field(key as keyof BookingData, e.target.value)}
                className="px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition-all"
              />
            </label>
          ))}

          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold text-slate-700">Active subscribers</span>
            <select
              value={data.subscriberRange}
              onChange={(e) => field('subscriberRange', e.target.value)}
              className="px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-400 bg-white transition-all text-slate-800"
            >
              <option value="">Select range…</option>
              {subscriberRanges.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold text-slate-700">Primary router / hardware</span>
            <select
              value={data.hardware}
              onChange={(e) => field('hardware', e.target.value)}
              className="px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-400 bg-white transition-all text-slate-800"
            >
              <option value="">Select hardware…</option>
              {hardwareOptions.map((h) => <option key={h} value={h}>{h}</option>)}
            </select>
          </label>
        </div>
      </Step>

      {/* Step 2 — Date */}
      <Step>
        <div className="flex flex-col gap-4">
          <p className="text-sm font-medium text-slate-600">Select a date for your 20-minute live demo:</p>
          <div className="grid grid-cols-4 gap-2">
            {dates.map((d) => {
              const iso = d.toISOString().split('T')[0] ?? ''
              const label = d.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' })
              const isSelected = data.date === iso
              return (
                <button
                  key={iso}
                  type="button"
                  onClick={() => field('date', iso)}
                  className={`flex flex-col items-center py-3 rounded-xl border text-xs font-semibold transition-all ${
                    isSelected
                      ? 'border-violet-600 bg-violet-50 text-violet-700 ring-2 ring-violet-500/20 shadow-sm'
                      : 'border-slate-200 text-slate-600 hover:border-violet-300 hover:bg-slate-50'
                  }`}
                >
                  {label.split(' ').map((p, i) => <span key={i}>{p}</span>)}
                </button>
              )
            })}
          </div>
        </div>
      </Step>

      {/* Step 3 — Time */}
      <Step>
        <div className="flex flex-col gap-4">
          <p className="text-sm font-medium text-slate-600">Choose a time slot for <strong>{data.date || 'your session'}</strong>:</p>
          <div className="grid grid-cols-2 gap-3">
            {demoTimeSlots.map((slot) => {
              const isSelected = data.time === slot
              return (
                <button
                  key={slot}
                  type="button"
                  onClick={() => field('time', slot)}
                  className={`flex items-center justify-center gap-2 py-3 rounded-xl border text-sm font-semibold transition-all ${
                    isSelected
                      ? 'border-violet-600 bg-violet-50 text-violet-700 ring-2 ring-violet-500/20 shadow-sm'
                      : 'border-slate-200 text-slate-600 hover:border-violet-300 hover:bg-slate-50'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" /> {slot}
                </button>
              )
            })}
          </div>
        </div>
      </Step>
    </Stepper>
  )
}

/* ─── Quick contact form ─────────────────────────────────────────────────── */
function QuickContactForm() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const f = (k: keyof typeof form, v: string) => setForm((p) => ({ ...p, [k]: v }))

  async function handleSend(e: React.FormEvent) {
    e.preventDefault()
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
    } catch { /* non-blocking */ }
    setSent(true)
  }

  if (sent) {
    return (
      <div className="flex flex-col items-center gap-4 py-12 text-center">
        <CheckCircle className="w-12 h-12 text-green-500" />
        <p className="font-semibold text-slate-900">Message sent! We'll reply within 24 hours.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSend} className="flex flex-col gap-4">
      {[
        { label: 'Name', key: 'name', type: 'text', placeholder: 'Your name' },
        { label: 'Email', key: 'email', type: 'email', placeholder: 'you@example.com' },
      ].map(({ label, key, type, placeholder }) => (
        <label key={key} className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold text-slate-700">{label}</span>
          <input
            type={type}
            required
            placeholder={placeholder}
            value={form[key as keyof typeof form]}
            onChange={(e) => f(key as keyof typeof form, e.target.value)}
            className="px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-400"
          />
        </label>
      ))}
      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-semibold text-slate-700">Message</span>
        <textarea
          required
          rows={4}
          placeholder="Tell us about your network setup…"
          value={form.message}
          onChange={(e) => f('message', e.target.value)}
          className="px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-400 resize-none"
        />
      </label>
      <button
        type="submit"
        className="flex items-center justify-center gap-2 w-full py-3 rounded-full bg-slate-900 text-white font-semibold text-sm hover:bg-slate-700 transition-colors"
      >
        <Mail className="w-4 h-4" /> Send message
      </button>
    </form>
  )
}

/* ─── Main export ─────────────────────────────────────────────────────────── */
export function ContactContent() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-20" style={{background: 'radial-gradient(ellipse 80% 100% at 50% 0%, #9061FF 0%, #6332F6 35%, #2A115E 72%, #150833 100%)'}}>
        {/* Dot grid overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px] opacity-10 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(116,60,255,0.28)_0%,transparent_70%)]" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-violet-400 tracking-wider uppercase mb-5">
              {contactMeta.eyebrow}
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-5">
              {contactMeta.heading}
            </h1>
            <p className="text-lg text-white/60">{contactMeta.lead}</p>
          </motion.div>
        </div>
      </section>

      {/* Two-column forms */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Demo booking */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-violet-600" />
                </div>
                <div>
                  <h2 className="font-bold text-slate-900">Book a Live Demo</h2>
                  <p className="text-xs text-slate-500">20-min interactive session tailored to your router setup</p>
                </div>
              </div>
              <DemoBookingForm />
            </motion.div>

            {/* Quick contact */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="flex flex-col gap-6"
            >
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 flex-1">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-slate-600" />
                  </div>
                  <div>
                    <h2 className="font-bold text-slate-900">Quick Message</h2>
                    <p className="text-xs text-slate-500">We reply within 24 hours on business days</p>
                  </div>
                </div>
                <QuickContactForm />
              </div>

              {/* Direct contact */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 flex flex-col gap-4">
                <h3 className="font-semibold text-slate-900 text-sm">Reach us directly</h3>
                <a href="mailto:support@thewify.com" className="flex items-center gap-3 text-sm text-slate-700 hover:text-violet-600 transition-colors">
                  <Mail className="w-4 h-4 text-violet-500" />
                  support@thewify.com
                </a>
                <a href="https://wa.me/91XXXXXXXXXX" className="flex items-center gap-3 text-sm text-slate-700 hover:text-violet-600 transition-colors">
                  <Phone className="w-4 h-4 text-violet-500" />
                  WhatsApp (India) — number pending
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-10">Common questions</h2>
          <div className="flex flex-col gap-3">
            {contactFaqs.map((faq, i) => (
              <FaqItem key={faq.question} q={faq.question} a={faq.answer} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[#0D0F17] py-16 text-center">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-white mb-3">Ready to eliminate server maintenance?</h2>
          <p className="text-white/60 text-sm mb-8">Join 200+ ISPs across India managing subscribers in the cloud.</p>
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
