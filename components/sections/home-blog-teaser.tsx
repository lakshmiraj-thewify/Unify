import Link from 'next/link'
import { ArrowRight, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Section } from '@/components/ui/section'
import { SectionHeading } from '@/components/ui/section-heading'
import { blogArticles } from '@/content/blog'
import { sectionIds } from '@/content/nav'

/** Show the 3 most recent articles on the homepage. */
const TEASER_COUNT = 3

export function HomeBlogTeaser() {
  const articles = blogArticles.slice(0, TEASER_COUNT)

  return (
    <Section
      id={sectionIds.blog}
      tone="light"
      spacing="default"
      divider="bottom"
      aria-labelledby="blog-teaser-heading"
    >
      <SectionHeading
        id="blog-teaser-heading"
        eyebrow="Knowledge hub"
        title="The ISP Operator's Knowledge Hub"
        lead="Practical guides, setup tutorials, and technical deep-dives — written specifically for MikroTik operators, WISPs, and LCOs."
      />

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {articles.map((article) => (
          <Card
            key={article.slug}
            tone="light"
            padding="none"
            interactive
            className="flex flex-col justify-between p-6"
          >
            <div>
              <span className="rounded-[10px] bg-primary-50 px-2.5 py-1 font-mono text-[0.6875rem] font-semibold tracking-wider uppercase text-primary-600">
                {article.tag}
              </span>
              <h3 className="mt-4 font-heading text-lg font-semibold leading-snug text-ink group-hover:text-primary-500 transition-colors line-clamp-2">
                <Link href={`/blog/${article.slug}`}>
                  {article.title}
                </Link>
              </h3>
              <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink-muted">
                {article.summary}
              </p>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-line pt-4 text-xs text-ink-muted">
              <span className="flex items-center gap-1.5 font-medium">
                <Clock className="size-3.5 text-primary-500" />
                {article.readTime}
              </span>
              <span className="font-mono text-ink-faint">{article.publishedDate}</span>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <Button href="/blog" variant="outline" trailingIcon={<ArrowRight className="size-4" />}>
          View all articles
        </Button>
      </div>
    </Section>
  )
}
