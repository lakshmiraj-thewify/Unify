'use client'

import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { ArrowRight, BookOpen, Clock, FileText, X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { bodyText, heading, label } from '@/components/ui/typography'
import { blogArticles, blogMeta, blogTags, type BlogArticle } from '@/content/blog'
import { cn } from '@/lib/cn'

/** Elements inside the modal that can receive focus, in DOM order. */
const MODAL_FOCUSABLE = 'a[href], button:not([disabled])'

export function BlogContent() {
  const [selectedTag, setSelectedTag] = useState<string>('All')
  const [activeArticle, setActiveArticle] = useState<BlogArticle | null>(null)
  const dialogId = useId()
  const closeBtnRef = useRef<HTMLButtonElement | null>(null)
  const openTriggerRef = useRef<HTMLElement | null>(null)
  const dialogRef = useRef<HTMLDivElement | null>(null)

  const closeArticle = useCallback(() => setActiveArticle(null), [])

  // ── Modal accessibility: Escape, focus trap, and open/close focus management ──
  useEffect(() => {
    if (!activeArticle) return

    // Move focus into the modal close button on open.
    closeBtnRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeArticle()
        return
      }
      if (event.key !== 'Tab') return

      const dialog = dialogRef.current
      if (dialog === null) return

      const focusable = Array.from(dialog.querySelectorAll<HTMLElement>(MODAL_FOCUSABLE))
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (first === undefined || last === undefined) return

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [activeArticle, closeArticle])

  // Return focus to the element that opened the modal when it closes.
  const hasOpened = useRef(false)
  useEffect(() => {
    if (activeArticle) {
      hasOpened.current = true
      // Capture the element that triggered the open before moving focus.
      openTriggerRef.current = document.activeElement as HTMLElement | null
    } else if (hasOpened.current) {
      openTriggerRef.current?.focus()
    }
  }, [activeArticle])

  // Lock background scroll while modal is open.
  useEffect(() => {
    if (!activeArticle) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [activeArticle])

  const filteredArticles =
    selectedTag === 'All'
      ? blogArticles
      : blogArticles.filter((item) => item.tag === selectedTag || item.category === selectedTag)

  const featured = blogArticles.find((a) => a.featured) ?? blogArticles[0]

  return (
    <>
      {/* ── Dark hero banner ── */}
      <Section tone="dark" spacing="flush" contained={false} className="relative overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-hero-glow" />
        <Container className="relative py-12 lg:py-16">
          <div className="flex flex-col items-center text-center">
            <Badge variant="signal" tone="dark" size="md" dot className="mb-4">
              {blogMeta.eyebrow}
            </Badge>
            <h1 className={cn(heading.display, 'w-full text-balance text-dark-fg max-w-readable')}>
              {blogMeta.heading}
            </h1>
            <p className={cn(bodyText.lead, 'mt-5 w-full max-w-readable text-pretty text-dark-fg-muted')}>
              {blogMeta.lead}
            </p>
          </div>
        </Container>
      </Section>

      <Section tone="subtle" spacing="default">
        <div className="flex flex-col gap-12">
          {/* Featured Article Card */}
          {featured ? (
            <Card
              tone="light"
              padding="lg"
              className="border-primary-200/80 shadow-lift bg-surface-subtle"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="primary" size="sm">
                      Featured Guide
                    </Badge>
                    <Badge variant="neutral" size="sm" icon={<Clock />}>
                      {featured.readTime}
                    </Badge>
                    <span className="text-xs text-ink-faint">{featured.publishedDate}</span>
                  </div>

                  <h2 className={cn(heading.h3, 'text-ink text-xl lg:text-2xl')}>
                    {featured.title}
                  </h2>
                  <p className={cn(bodyText.base, 'text-ink-muted mt-3 max-w-3xl')}>
                    {featured.summary}
                  </p>

                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <Button
                      size="sm"
                      onClick={() => setActiveArticle(featured)}
                      trailingIcon={<ArrowRight />}
                    >
                      Read Guide
                    </Button>
                    <Badge variant="pending" size="sm">
                      Article body pending sign-off (Q13)
                    </Badge>
                  </div>
                </div>

                <div className="hidden lg:flex size-36 shrink-0 items-center justify-center rounded-2xl bg-primary-50 border border-primary-200 text-primary-600">
                  <BookOpen className="size-16" />
                </div>
              </div>
            </Card>
          ) : null}

          {/* Filter Tags */}
          <div className="flex flex-col gap-3">
            <p className={cn(label.mono, 'text-ink-faint')}>Filter by topic</p>
            <div role="group" aria-label="Filter articles by topic" className="flex flex-wrap items-center gap-2">
              {blogTags.map((tag) => {
                const isSelected = selectedTag === tag
                return (
                  <button
                    key={tag}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setSelectedTag(tag)}
                    className={cn(
                      'inline-flex items-center rounded-lg px-3 py-1.5 text-xs font-semibold transition-[background-color,border-color,color] duration-200 ease-std cursor-pointer',
                      isSelected
                        ? 'bg-primary-600 text-white shadow-primary'
                        : 'bg-surface border border-line text-ink-muted hover:border-primary-300 hover:text-ink',
                    )}
                  >
                    {tag}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Article Grid (3 columns on lg) */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredArticles.map((article) => (
              <Card
                key={article.slug}
                tone="light"
                padding="md"
                className="flex flex-col justify-between hover:border-primary-300 hover:shadow-lift transition-[border-color,box-shadow]"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <Badge variant="signal" size="sm">
                      {article.category}
                    </Badge>
                    <span className="text-xs text-ink-faint flex items-center gap-1">
                      <Clock className="size-3" />
                      {article.readTime}
                    </span>
                  </div>

                  <h3 className={cn(heading.h4, 'text-ink hover:text-primary-700 transition-colors')}>
                    {article.title}
                  </h3>

                  <p className={cn(bodyText.small, 'text-ink-muted mt-2.5')}>
                    {article.summary}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-line flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setActiveArticle(article)}
                    className="text-xs font-bold text-primary-600 hover:text-primary-800 flex items-center gap-1 cursor-pointer"
                  >
                    View Overview <ArrowRight className="size-3" />
                  </button>
                  <Badge variant="pending" size="sm">
                    Pending body
                  </Badge>
                </div>
              </Card>
            ))}
          </div>

          {/* ── Accessible article preview modal ── */}
          {activeArticle ? (
            <>
              {/*
                Backdrop scrim: clicking it closes the modal.
                aria-hidden + tabIndex={-1}: a redundant pointer affordance;
                Escape on the keyboard already covers the accessible path.
              */}
              <button
                type="button"
                tabIndex={-1}
                aria-hidden="true"
                onClick={closeArticle}
                className="fixed inset-0 z-50 w-full cursor-default bg-navy-950/60 backdrop-blur-sm"
              />

              <div
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby={`${dialogId}-title`}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
              >
                <div className="relative w-full max-w-2xl rounded-2xl bg-surface border border-line shadow-lift p-6 sm:p-8 overflow-y-auto max-h-[90vh] pointer-events-auto">
                  <div className="flex items-center justify-between gap-4 border-b border-line pb-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Badge variant="primary" size="sm">
                        {activeArticle.category}
                      </Badge>
                      <span className="text-xs text-ink-faint">{activeArticle.readTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="pending" size="sm">
                        Pending Q13
                      </Badge>
                      {/* Close button — first focusable; receives focus on open */}
                      <button
                        ref={closeBtnRef}
                        type="button"
                        onClick={closeArticle}
                        aria-label="Close article preview"
                        className="inline-flex size-8 items-center justify-center rounded-lg text-ink-muted hover:bg-surface-subtle hover:text-ink transition-colors"
                      >
                        <X className="size-4" aria-hidden="true" />
                      </button>
                    </div>
                  </div>

                  <h2 id={`${dialogId}-title`} className={cn(heading.h3, 'text-ink')}>
                    {activeArticle.title}
                  </h2>

                  <p className={cn(bodyText.base, 'text-ink-soft mt-4')}>
                    {activeArticle.summary}
                  </p>

                  <div className="mt-6 rounded-xl border border-dashed border-line-strong bg-surface-subtle p-5">
                    <div className="flex items-center gap-2 text-ink">
                      <FileText className="size-5 text-primary-600" />
                      <span className="text-sm font-bold">Full Article Content Scheduled</span>
                    </div>
                    <p className={cn(bodyText.small, 'text-ink-muted mt-2')}>
                      Per the approved blueprint (Section 11), article titles and knowledge hub
                      topics are signed off, while comprehensive long-form publication text is
                      currently undergoing technical editorial review before production publication.
                    </p>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <Button variant="secondary" size="md" onClick={closeArticle}>
                      Close
                    </Button>
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </Section>
    </>
  )
}
