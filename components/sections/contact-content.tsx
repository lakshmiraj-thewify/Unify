'use client'

import { useState } from 'react'
import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  Clock,
  Loader2,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Video,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { SectionHeading } from '@/components/ui/section-heading'
import { bodyText, heading, label } from '@/components/ui/typography'
import {
  contactFaqs,
  contactMeta,
  demoTimeSlots,
  hardwareOptions,
  subscriberRanges,
} from '@/content/contact'
import { site } from '@/content/site'
import { isProvided } from '@/content/types'
import { cn } from '@/lib/cn'

export function ContactContent() {
  const [activeTab, setActiveTab] = useState<'demo' | 'quick'>('demo')

  // Demo form state
  const [demoStep, setDemoStep] = useState<1 | 2>(1)
  const [demoName, setDemoName] = useState('')
  const [demoEmail, setDemoEmail] = useState('')
  const [demoCompany, setDemoCompany] = useState('')
  const [demoSubscribers, setDemoSubscribers] = useState<string>(subscriberRanges[0])
  const [demoHardware, setDemoHardware] = useState<string>(hardwareOptions[0])
  const [selectedSlot, setSelectedSlot] = useState<string>(demoTimeSlots[0])
  const [selectedDate, setSelectedDate] = useState<string>('Tomorrow')
  const [demoSubmitted, setDemoSubmitted] = useState(false)
  const [demoLoading, setDemoLoading] = useState(false)
  const [demoError, setDemoError] = useState<string | null>(null)
  /** 'demo' | 'live' | null — set after a successful submission. */
  const [demoMode, setDemoMode] = useState<'demo' | 'live' | null>(null)
  /** Google Meet URL returned by the API in live mode. Null in demo mode. */
  const [meetUrl, setMeetUrl] = useState<string | null>(null)

  // Quick message state
  const [quickName, setQuickName] = useState('')
  const [quickEmail, setQuickEmail] = useState('')
  const [quickMessage, setQuickMessage] = useState('')
  const [quickSubmitted, setQuickSubmitted] = useState(false)
  const [quickLoading, setQuickLoading] = useState(false)
  const [quickError, setQuickError] = useState<string | null>(null)
  const [quickMode, setQuickMode] = useState<'demo' | 'live' | null>(null)

  const handleDemoSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (demoStep === 1) {
      setDemoStep(2)
      return
    }

    // Step 2: POST to the demo booking API.
    setDemoLoading(true)
    setDemoError(null)
    try {
      const res = await fetch('/api/demo-booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: demoName,
          email: demoEmail,
          company: demoCompany,
          subscribers: demoSubscribers,
          hardware: demoHardware,
          date: selectedDate,
          slot: selectedSlot,
        }),
      })
      const data = (await res.json()) as {
        ok: boolean
        mode?: 'demo' | 'live'
        error?: string
        meetUrl?: string | null
      }
      if (!res.ok || !data.ok) {
        setDemoError(data.error ?? 'Something went wrong. Please try again.')
        return
      }
      setDemoMode(data.mode ?? 'demo')
      setMeetUrl(data.meetUrl ?? null)
      setDemoSubmitted(true)
    } catch {
      setDemoError('Network error. Please check your connection and try again.')
    } finally {
      setDemoLoading(false)
    }
  }

  const handleQuickSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setQuickLoading(true)
    setQuickError(null)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: quickName,
          email: quickEmail,
          message: quickMessage,
        }),
      })
      const data = (await res.json()) as { ok: boolean; mode?: 'demo' | 'live'; error?: string }
      if (!res.ok || !data.ok) {
        setQuickError(data.error ?? 'Something went wrong. Please try again.')
        return
      }
      setQuickMode(data.mode ?? 'demo')
      setQuickSubmitted(true)
    } catch {
      setQuickError('Network error. Please check your connection and try again.')
    } finally {
      setQuickLoading(false)
    }
  }

  return (
    <>
      <Section tone="dark" spacing="flush" contained={false} className="relative overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-hero-glow" />
        <Container className="relative py-12 lg:py-16">
          <div className="flex flex-col items-center text-center">
            <Badge variant="signal" tone="dark" size="md" dot className="mb-4">
              {contactMeta.eyebrow}
            </Badge>
            <h1 className={cn(heading.display, 'w-full max-w-readable text-balance text-dark-fg')}>
              {contactMeta.heading}
            </h1>
            <p
              className={cn(
                bodyText.lead,
                'mt-5 w-full max-w-readable text-pretty text-dark-fg-muted',
              )}
            >
              {contactMeta.lead}
            </p>
          </div>
        </Container>
      </Section>

      <Section tone="subtle" spacing="default">
        <div className="flex flex-col gap-16">
          {/* Main 2-Column Interface: Left = Tabs/Forms, Right = Direct Info & Highlights */}
          <div className="grid items-start gap-12 lg:grid-cols-12">
            {/* Left Column: Option A / Option B interactive card */}
            <div className="lg:col-span-7">
              <Card tone="light" padding="lg" className="border-line-strong shadow-lift">
                {/* Mode Selector Tabs — ARIA tablist pattern */}
                <div
                  role="tablist"
                  aria-label="Contact method"
                  className="mb-6 flex items-center gap-2 border-b border-line pb-4"
                >
                  <button
                    type="button"
                    role="tab"
                    id="tab-demo"
                    aria-selected={activeTab === 'demo'}
                    aria-controls="tabpanel-demo"
                    onClick={() => setActiveTab('demo')}
                    className={cn(
                      'inline-flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold transition-[background-color,color,box-shadow] duration-200',
                      activeTab === 'demo'
                        ? 'bg-primary-600 text-white shadow-primary'
                        : 'bg-surface-subtle text-ink-muted hover:text-ink',
                    )}
                  >
                    <Calendar className="size-4" />
                    Option A: Book Live Demo
                  </button>
                  <button
                    type="button"
                    role="tab"
                    id="tab-quick"
                    aria-selected={activeTab === 'quick'}
                    aria-controls="tabpanel-quick"
                    onClick={() => setActiveTab('quick')}
                    className={cn(
                      'inline-flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold transition-[background-color,color,box-shadow] duration-200',
                      activeTab === 'quick'
                        ? 'bg-primary-600 text-white shadow-primary'
                        : 'bg-surface-subtle text-ink-muted hover:text-ink',
                    )}
                  >
                    <MessageSquare className="size-4" />
                    Option B: Quick Contact
                  </button>
                </div>

                {/* Option A: Book a Live Demo — tabpanel */}
                {activeTab === 'demo' ? (
                  <div role="tabpanel" id="tabpanel-demo" aria-labelledby="tab-demo">
                    <div className="mb-6">
                      <div className="flex items-center justify-between">
                        <h2 className={cn(heading.h3, 'text-ink')}>Interactive Slot Picker</h2>
                        <span className={cn(label.mono, 'text-primary-600')}>
                          Step {demoStep} of 2
                        </span>
                      </div>
                      <p className={cn(bodyText.small, 'mt-1 text-ink-muted')}>
                        {demoStep === 1
                          ? 'Tell us about your network infrastructure.'
                          : 'Select an available date and time slot for a personalized Google Meet walkthrough.'}
                      </p>
                    </div>

                    {demoSubmitted ? (
                      <div className="rounded-xl border border-ok-200 bg-ok-50 p-6 text-center">
                        <CheckCircle2 className="mx-auto mb-3 size-10 text-ok-600" />
                        <h3 className={cn(heading.h4, 'text-ink')}>Demo Request Received</h3>
                        <p className={cn(bodyText.small, 'mx-auto mt-2 max-w-md text-ink-muted')}>
                          Thank you, <span className="font-bold text-ink">{demoName}</span>. Your
                          demo for <span className="font-semibold text-ink">{selectedDate}</span> at{' '}
                          <span className="font-semibold text-ink">{selectedSlot}</span> has been
                          booked.
                        </p>

                        {/* Live mode: show the Meet link prominently */}
                        {demoMode === 'live' && meetUrl !== null ? (
                          <div className="mt-5 rounded-xl border border-primary-200 bg-primary-50 p-4">
                            <p
                              className={cn(
                                bodyText.micro,
                                'mb-3 font-semibold tracking-wider text-primary-700 uppercase',
                              )}
                            >
                              Your Google Meet link
                            </p>
                            <a
                              href={meetUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-primary-700"
                            >
                              <Video className="size-4" />
                              Join Google Meet
                            </a>
                            <p className={cn(bodyText.micro, 'mt-2 text-primary-600')}>
                              A calendar invite with this link has been sent to{' '}
                              <span className="font-semibold">{demoEmail}</span>.
                            </p>
                          </div>
                        ) : demoMode === 'live' ? (
                          <p className={cn(bodyText.micro, 'mt-4 text-ink-faint')}>
                            A calendar invite has been sent to{' '}
                            <span className="font-semibold">{demoEmail}</span>.
                          </p>
                        ) : (
                          <p
                            className={cn(
                              bodyText.micro,
                              'mt-4 rounded-lg border border-warn-200 bg-warn-50 px-3 py-2 text-warn-700',
                            )}
                          >
                            Demo mode — no real calendar event or Google Meet link was created.
                          </p>
                        )}

                        <Button
                          variant="secondary"
                          size="sm"
                          className="mt-5"
                          onClick={() => {
                            setDemoSubmitted(false)
                            setDemoStep(1)
                            setDemoMode(null)
                            setMeetUrl(null)
                          }}
                        >
                          Book another slot
                        </Button>
                      </div>
                    ) : (
                      <form onSubmit={handleDemoSubmit} className="flex flex-col gap-4">
                        {demoStep === 1 ? (
                          <>
                            <div>
                              <label
                                htmlFor="demo-name"
                                className={cn(label.mono, 'mb-1 block text-ink')}
                              >
                                Full Name *
                              </label>
                              <input
                                id="demo-name"
                                type="text"
                                required
                                value={demoName}
                                onChange={(e) => setDemoName(e.target.value)}
                                placeholder="e.g. Rajesh Kumar"
                                className="w-full rounded-lg border border-line-strong bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-faint focus-visible:border-primary-500 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:outline-none"
                              />
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                              <div>
                                <label
                                  htmlFor="demo-email"
                                  className={cn(label.mono, 'mb-1 block text-ink')}
                                >
                                  Work Email *
                                </label>
                                <input
                                  id="demo-email"
                                  type="email"
                                  required
                                  value={demoEmail}
                                  onChange={(e) => setDemoEmail(e.target.value)}
                                  placeholder="rajesh@citybroadband.in"
                                  className="w-full rounded-lg border border-line-strong bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-faint focus-visible:border-primary-500 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:outline-none"
                                />
                              </div>

                              <div>
                                <label
                                  htmlFor="demo-company"
                                  className={cn(label.mono, 'mb-1 block text-ink')}
                                >
                                  Company / ISP Name *
                                </label>
                                <input
                                  id="demo-company"
                                  type="text"
                                  required
                                  value={demoCompany}
                                  onChange={(e) => setDemoCompany(e.target.value)}
                                  placeholder="City Broadband Networks"
                                  className="w-full rounded-lg border border-line-strong bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-faint focus-visible:border-primary-500 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:outline-none"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                              <div>
                                <label
                                  htmlFor="demo-subscribers"
                                  className={cn(label.mono, 'mb-1 block text-ink')}
                                >
                                  Active Subscribers *
                                </label>
                                <select
                                  id="demo-subscribers"
                                  value={demoSubscribers}
                                  onChange={(e) => setDemoSubscribers(e.target.value)}
                                  className="w-full rounded-lg border border-line-strong bg-surface px-3 py-2.5 text-sm text-ink focus-visible:border-primary-500 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:outline-none"
                                >
                                  {subscriberRanges.map((range) => (
                                    <option key={range} value={range}>
                                      {range}
                                    </option>
                                  ))}
                                </select>
                              </div>

                              <div>
                                <label
                                  htmlFor="demo-hardware"
                                  className={cn(label.mono, 'mb-1 block text-ink')}
                                >
                                  Primary Router Hardware *
                                </label>
                                <select
                                  id="demo-hardware"
                                  value={demoHardware}
                                  onChange={(e) => setDemoHardware(e.target.value)}
                                  className="w-full rounded-lg border border-line-strong bg-surface px-3 py-2.5 text-sm text-ink focus-visible:border-primary-500 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:outline-none"
                                >
                                  {hardwareOptions.map((hw) => (
                                    <option key={hw} value={hw}>
                                      {hw}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>

                            <Button type="submit" size="lg" fullWidth className="mt-4">
                              Continue to Select Time Slot →
                            </Button>
                            {demoError !== null && demoStep === 1 ? (
                              <p
                                role="alert"
                                className={cn(
                                  bodyText.micro,
                                  'flex items-center gap-1.5 text-danger-700',
                                )}
                              >
                                <AlertCircle className="size-3.5 shrink-0" />
                                {demoError}
                              </p>
                            ) : null}
                          </>
                        ) : (
                          <>
                            {/* Step 2: Slot Picker */}
                            <fieldset className="m-0 border-0 p-0">
                              <legend className={cn(label.mono, 'mb-2 block text-ink')}>
                                Select Preferred Day
                              </legend>
                              <div className="grid grid-cols-3 gap-2">
                                {['Tomorrow', 'In 2 Days', 'Next Monday'].map((day) => (
                                  <button
                                    key={day}
                                    type="button"
                                    onClick={() => setSelectedDate(day)}
                                    className={cn(
                                      'cursor-pointer rounded-lg border p-3 text-center text-xs font-bold transition-[border-color,background-color,color,box-shadow]',
                                      selectedDate === day
                                        ? 'border-primary-600 bg-primary-50 text-primary-700 ring-1 ring-primary-600'
                                        : 'border-line bg-surface text-ink hover:border-primary-300',
                                    )}
                                  >
                                    {day}
                                  </button>
                                ))}
                              </div>
                            </fieldset>

                            <fieldset className="m-0 mt-2 border-0 p-0">
                              <legend className={cn(label.mono, 'mb-2 block text-ink')}>
                                Available Time Slots (IST)
                              </legend>
                              <div className="grid grid-cols-2 gap-2.5">
                                {demoTimeSlots.map((slot) => (
                                  <button
                                    key={slot}
                                    type="button"
                                    onClick={() => setSelectedSlot(slot)}
                                    className={cn(
                                      'flex cursor-pointer items-center justify-between rounded-lg border p-3 text-left text-xs font-semibold transition-[border-color,background-color,color,box-shadow]',
                                      selectedSlot === slot
                                        ? 'border-primary-600 bg-primary-50 text-primary-700 ring-1 ring-primary-600'
                                        : 'border-line bg-surface text-ink hover:border-primary-300',
                                    )}
                                  >
                                    <span className="flex items-center gap-1.5">
                                      <Clock className="size-3.5" />
                                      {slot}
                                    </span>
                                    {selectedSlot === slot ? (
                                      <CheckCircle2 className="size-3.5 text-primary-600" />
                                    ) : null}
                                  </button>
                                ))}
                              </div>
                            </fieldset>

                            {demoError !== null ? (
                              <p
                                role="alert"
                                className={cn(
                                  bodyText.micro,
                                  'mt-2 flex items-center gap-1.5 text-danger-700',
                                )}
                              >
                                <AlertCircle className="size-3.5 shrink-0" />
                                {demoError}
                              </p>
                            ) : null}
                            <div className="mt-4 flex items-center gap-3">
                              <Button
                                variant="secondary"
                                size="md"
                                onClick={() => setDemoStep(1)}
                                disabled={demoLoading}
                              >
                                ← Back
                              </Button>
                              <Button type="submit" size="md" fullWidth disabled={demoLoading}>
                                {demoLoading ? (
                                  <span className="flex items-center justify-center gap-2">
                                    <Loader2 className="size-4 animate-spin" />
                                    Booking…
                                  </span>
                                ) : (
                                  'Confirm Live Demo Booking'
                                )}
                              </Button>
                            </div>
                          </>
                        )}
                      </form>
                    )}
                  </div>
                ) : (
                  /* Option B: Quick Contact Form — tabpanel */
                  <div role="tabpanel" id="tabpanel-quick" aria-labelledby="tab-quick">
                    <div className="mb-6">
                      <h2 className={cn(heading.h3, 'text-ink')}>Quick Contact Form</h2>
                      <p className={cn(bodyText.small, 'mt-1 text-ink-muted')}>
                        Send a message directly to our engineering and support leads.
                      </p>
                    </div>

                    {quickSubmitted ? (
                      <div className="rounded-xl border border-ok-200 bg-ok-50 p-6 text-center">
                        <CheckCircle2 className="mx-auto mb-3 size-10 text-ok-600" />
                        <h3 className={cn(heading.h4, 'text-ink')}>Message Received</h3>
                        <p className={cn(bodyText.small, 'mx-auto mt-2 max-w-md text-ink-muted')}>
                          Thank you, <span className="font-bold text-ink">{quickName}</span>.
                          {quickMode === 'live' ? (
                            <>
                              {' '}
                              Your message has been delivered to{' '}
                              <span className="font-bold text-ink">{site.contact.email}</span>. Our
                              team will respond within 2 business hours.
                            </>
                          ) : (
                            <> Your message has been recorded.</>
                          )}
                        </p>
                        {quickMode === 'demo' ? (
                          <p
                            className={cn(
                              bodyText.micro,
                              'mt-4 rounded-lg border border-warn-200 bg-warn-50 px-3 py-2 text-warn-700',
                            )}
                          >
                            Demo mode — no email was delivered. Live email integration is configured
                            in Phase 8 Step 2.
                          </p>
                        ) : null}
                        <Button
                          variant="secondary"
                          size="sm"
                          className="mt-5"
                          onClick={() => {
                            setQuickSubmitted(false)
                            setQuickMode(null)
                          }}
                        >
                          Send another message
                        </Button>
                      </div>
                    ) : (
                      <form onSubmit={handleQuickSubmit} className="flex flex-col gap-4">
                        <div>
                          <label
                            htmlFor="quick-name"
                            className={cn(label.mono, 'mb-1 block text-ink')}
                          >
                            Your Name *
                          </label>
                          <input
                            id="quick-name"
                            type="text"
                            required
                            value={quickName}
                            onChange={(e) => setQuickName(e.target.value)}
                            placeholder="Sunil Rao"
                            className="w-full rounded-lg border border-line-strong bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-faint focus-visible:border-primary-500 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:outline-none"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="quick-email"
                            className={cn(label.mono, 'mb-1 block text-ink')}
                          >
                            Your Email *
                          </label>
                          <input
                            id="quick-email"
                            type="email"
                            required
                            value={quickEmail}
                            onChange={(e) => setQuickEmail(e.target.value)}
                            placeholder="sunil@broadbandservices.in"
                            className="w-full rounded-lg border border-line-strong bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-faint focus-visible:border-primary-500 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:outline-none"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="quick-message"
                            className={cn(label.mono, 'mb-1 block text-ink')}
                          >
                            Message / Router Configuration *
                          </label>
                          <textarea
                            id="quick-message"
                            rows={4}
                            required
                            value={quickMessage}
                            onChange={(e) => setQuickMessage(e.target.value)}
                            placeholder="We currently operate 3 MikroTik CCR1036 routers with 1,800 PPPoE subscribers. We would like to understand..."
                            className="w-full resize-none rounded-lg border border-line-strong bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-faint focus-visible:border-primary-500 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:outline-none"
                          />
                        </div>

                        {quickError !== null ? (
                          <p
                            role="alert"
                            className={cn(
                              bodyText.micro,
                              'flex items-center gap-1.5 text-danger-700',
                            )}
                          >
                            <AlertCircle className="size-3.5 shrink-0" />
                            {quickError}
                          </p>
                        ) : null}
                        <Button
                          type="submit"
                          size="lg"
                          fullWidth
                          className="mt-2"
                          disabled={quickLoading}
                        >
                          {quickLoading ? (
                            <span className="flex items-center justify-center gap-2">
                              <Loader2 className="size-4 animate-spin" />
                              Sending…
                            </span>
                          ) : (
                            'Send Message to Engineering Lead'
                          )}
                        </Button>
                      </form>
                    )}
                  </div>
                )}
              </Card>
            </div>

            {/* Right Column: Direct Channels, Office Address & Blueprint Specs */}
            <div className="flex flex-col gap-6 lg:col-span-5">
              {/* Direct Channels Card */}
              <Card tone="light" padding="lg" className="border-line">
                <h3 className={cn(heading.h4, 'mb-4 text-ink')}>Direct Communication</h3>
                <ul className="flex flex-col gap-4 text-sm">
                  <li className="flex items-start gap-3">
                    <Mail className="mt-0.5 size-5 shrink-0 text-primary-600" />
                    <div>
                      <span className={cn(label.mono, 'block text-ink-faint')}>Direct Email</span>
                      <a
                        href={`mailto:${site.contact.email}`}
                        className="font-bold text-ink transition-colors hover:text-primary-600"
                      >
                        {site.contact.email}
                      </a>
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <Phone className="mt-0.5 size-5 shrink-0 text-primary-600" />
                    <div>
                      <span className={cn(label.mono, 'block text-ink-faint')}>Telephone</span>
                      {isProvided(site.contact.phone) ? (
                        <a href={`tel:${site.contact.phone}`} className="font-bold text-ink">
                          {site.contact.phone}
                        </a>
                      ) : (
                        <Badge variant="pending" size="sm">
                          Direct phone line pending (Q10)
                        </Badge>
                      )}
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <MessageSquare className="mt-0.5 size-5 shrink-0 text-ok-600" />
                    <div>
                      <span className={cn(label.mono, 'block text-ink-faint')}>
                        WhatsApp Support
                      </span>
                      {isProvided(site.contact.whatsapp) ? (
                        <a
                          href={`https://wa.me/${site.contact.whatsapp.replace(/[^\d]/g, '')}`}
                          className="font-bold text-ink"
                        >
                          {site.contact.whatsapp}
                        </a>
                      ) : (
                        <Badge variant="pending" size="sm">
                          WhatsApp number pending (Q10)
                        </Badge>
                      )}
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <MapPin className="mt-0.5 size-5 shrink-0 text-primary-600" />
                    <div>
                      <span className={cn(label.mono, 'block text-ink-faint')}>Headquarters</span>
                      <p className="font-semibold text-ink">
                        {site.contact.address.locality}, {site.contact.address.country}
                      </p>
                      <Badge variant="pending" size="sm" className="mt-1">
                        Street address pending (Q10)
                      </Badge>
                    </div>
                  </li>
                </ul>
              </Card>

              {/* What to Expect Card */}
              <Card tone="subtle" padding="lg" className="border-line">
                <h3 className={cn(heading.h4, 'mb-3 text-ink')}>What to expect in the demo</h3>
                <ul className="flex flex-col gap-2.5 text-xs text-ink-muted">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-ok-600" />
                    <span>Real-time MikroTik RADIUS connection walkthrough</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-ok-600" />
                    <span>PPPoE and Hotspot plan creation & FUP speed policy demo</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-ok-600" />
                    <span>Automated UPI payment link and WhatsApp billing dispatch</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-ok-600" />
                    <span>Answers to all topology, migration, and compliance questions</span>
                  </li>
                </ul>
              </Card>
            </div>
          </div>

          {/* Section 12: Embedded FAQ Accordion / Grid */}
          <div className="border-t border-line pt-8">
            <SectionHeading
              eyebrow="Questions, answered"
              title="Frequently asked questions"
              lead="Everything you need to know about switching your ISP management to Unify Wi-Fi."
              align="center"
              size="h2"
              className="mb-10"
            />
            <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2">
              {contactFaqs.map((faq) => (
                <Card key={faq.question} padding="md" tone="light">
                  <h4 className={cn(heading.h4, 'text-sm text-ink lg:text-base')}>
                    {faq.question}
                  </h4>
                  <p className={cn(bodyText.small, 'mt-2 text-ink-muted')}>{faq.answer}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}
