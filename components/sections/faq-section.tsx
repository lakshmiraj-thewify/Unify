'use client'

import { useId, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Section } from '@/components/ui/section'
import { SectionHeading } from '@/components/ui/section-heading'
import { homepageFaqs, faqSection } from '@/content/home'
import { sectionIds } from '@/content/nav'
import { cn } from '@/lib/cn'

function FaqItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [open, setOpen] = useState(false)
  const contentId = useId()
  const buttonId = useId()

  return (
    <div className="mb-3 rounded-[16px] border border-line bg-white px-5 transition-colors duration-200 hover:border-primary-300 shadow-card">
      <button
        id={buttonId}
        type="button"
        aria-expanded={open}
        aria-controls={contentId}
        onClick={() => setOpen((prev) => !prev)}
        suppressHydrationWarning
        className={cn(
          'flex w-full items-center justify-between gap-4 py-4 text-left',
          'text-sm font-semibold text-ink transition-colors duration-200 hover:text-primary-500',
          'focus-visible:rounded focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:outline-none',
        )}
      >
        <span className="flex items-center gap-3">
          <span className="font-mono text-xs font-semibold text-primary-500">
            {String(index + 1).padStart(2, '0')}
          </span>
          {question}
        </span>
        <ChevronDown
          className={cn(
            'size-4 shrink-0 text-ink-muted transition-transform duration-200',
            open && 'rotate-180 text-primary-500',
          )}
        />
      </button>

      {open ? (
        <div
          id={contentId}
          role="region"
          aria-labelledby={buttonId}
          className="border-t border-line pb-5 pt-3 text-sm leading-relaxed text-ink-muted"
        >
          {answer}
        </div>
      ) : null}
    </div>
  )
}

export function FaqSection() {
  return (
    <Section
      id={sectionIds.faq}
      tone="subtle"
      spacing="default"
      divider="bottom"
      aria-labelledby="faq-heading"
    >
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <SectionHeading
          id="faq-heading"
          eyebrow={faqSection.eyebrow}
          title={faqSection.heading}
          align="left"
          className="lg:col-span-4"
        />

        <div className="max-w-none lg:col-span-8">
          {homepageFaqs.map((item, i) => (
            <FaqItem key={item.question} question={item.question} answer={item.answer} index={i} />
          ))}
        </div>
      </div>
    </Section>
  )
}
