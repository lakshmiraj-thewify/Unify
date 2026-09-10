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
    <div className="border-b border-line last:border-b-0">
      <button
        id={buttonId}
        type="button"
        aria-expanded={open}
        aria-controls={contentId}
        onClick={() => setOpen((prev) => !prev)}
        suppressHydrationWarning
        className={cn(
          'flex w-full items-center justify-between gap-4 py-5 text-left',
          'text-sm font-semibold text-ink transition-colors duration-200 hover:text-primary-700',
          'focus-visible:rounded focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2 focus-visible:outline-none',
        )}
      >
        <span>
          <span className="mr-2 font-mono text-xs text-ink-faint">
            {String(index + 1).padStart(2, '0')}
          </span>
          {question}
        </span>
        <ChevronDown
          className={cn(
            'size-4 shrink-0 text-ink-faint transition-transform duration-200',
            open && 'rotate-180',
          )}
        />
      </button>

      <div
        id={contentId}
        role="region"
        aria-labelledby={buttonId}
        hidden={!open}
        className="pb-5 text-sm leading-relaxed text-ink-muted"
      >
        {answer}
      </div>
    </div>
  )
}

export function FaqSection() {
  return (
    <Section id={sectionIds.faq} tone="subtle" divider="y" aria-labelledby="faq-heading">
      <SectionHeading id="faq-heading" eyebrow={faqSection.eyebrow} title={faqSection.heading} />

      <div className="mx-auto mt-12 max-w-2xl">
        {homepageFaqs.map((item, i) => (
          <FaqItem key={item.question} question={item.question} answer={item.answer} index={i} />
        ))}
      </div>
    </Section>
  )
}
