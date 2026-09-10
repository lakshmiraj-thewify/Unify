import { ArrowRight, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Eyebrow } from '@/components/ui/eyebrow'
import { Section } from '@/components/ui/section'
import { SectionHeading } from '@/components/ui/section-heading'
import { blogArticles } from '@/content/blog'
import { sectionIds } from '@/content/nav'
import { heading } from '@/components/ui/typography'

/** Show the 3 most recent articles on the homepage. */
const TEASER_COUNT = 3

export function HomeBlogTeaser() {
  const articles = blogArticles.slice(0, TEASER_COUNT)

  return (
    <Section
      id={sectionIds.blog}
      tone="light"
      divider="bottom"
      aria-labelledby="blog-teaser-heading"
    >
      <SectionHeading
        id="blog-teaser-heading"
        eyebrow="Knowledge hub"
        title="The ISP Operator's Knowledge Hub"
        lead="Practical guides, setup tutorials, and technical deep-dives — written specifically for MikroTik operators, WISPs, and LCOs."
      />

      <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <Card key={article.slug} as="li" padding="md" className="gap-4">
            <div className="flex items-center gap-2">
              <Eyebrow>{article.tag}</Eyebrow>
            </div>

            <h3 className={`${heading.h3} line-clamp-2 text-ink`}>{article.title}</h3>
            <p className="line-clamp-3 text-sm leading-relaxed text-ink-muted">{article.summary}</p>

            <div className="mt-auto flex items-center justify-between pt-2">
              <span className="flex items-center gap-1.5 text-xs text-ink-faint">
                <Clock className="size-3.5" />
                {article.readTime}
              </span>
              <span className="text-xs text-ink-faint">{article.publishedDate}</span>
            </div>
          </Card>
        ))}
      </ul>

      <div className="mt-10 flex justify-center">
        <Button href="/blog" variant="secondary" trailingIcon={<ArrowRight />}>
          View all articles
        </Button>
      </div>
    </Section>
  )
}
