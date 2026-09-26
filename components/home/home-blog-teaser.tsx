import { Clock } from 'lucide-react'
import { blogArticles } from '@/content/blog'
import { NoiseTexture } from '@/registry/magicui/noise-texture'
import { InteractiveHoverButton } from '@/registry/magicui/interactive-hover-button'

const TEASER_COUNT = 3
const tagColors: Record<string, string> = {
  MikroTik: '#5EE7E4',
  PPPoE: '#6C8DFF',
  'Cloud RADIUS': '#743CFF',
  Billing: '#C084FC',
  WISP: '#5EE7E4',
  India: '#6C8DFF',
  Hotspot: '#743CFF',
}

export function HomeBlogTeaser() {
  const articles = blogArticles.slice(0, TEASER_COUNT)

  return (
    <section id="blog" className="relative z-10 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold tracking-wider text-[#5EE7E4] uppercase">
            Knowledge Hub
          </div>
          <h2 className="mb-4 text-3xl leading-tight font-extrabold tracking-tight text-white sm:text-5xl">
            The ISP Operator&apos;s{' '}
            <span className="bg-gradient-to-r from-[#5EE7E4] to-[#C084FC] bg-clip-text text-transparent">
              Knowledge Hub
            </span>
          </h2>
          <p className="text-base leading-relaxed text-white/60 sm:text-lg">
            Practical guides, setup tutorials, and technical deep-dives — written specifically for
            MikroTik operators, WISPs, and LCOs.
          </p>
        </div>

        <ul className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => {
            const accentColor = tagColors[article.tag] ?? '#5EE7E4'
            return (
              <li key={article.slug}>
                <div className="unify-card-dark relative flex h-full flex-col gap-4 overflow-hidden p-6">
                  <NoiseTexture className="opacity-30" />
                  <span
                    className="relative z-10 inline-flex items-center self-start rounded-full px-2.5 py-1 text-[11px] font-bold tracking-wider uppercase"
                    style={{ background: `${accentColor}18`, color: accentColor }}
                  >
                    {article.tag}
                  </span>
                  <h3 className="relative z-10 line-clamp-2 text-sm leading-snug font-bold text-white">
                    {article.title}
                  </h3>
                  <p className="relative z-10 line-clamp-3 flex-1 text-sm leading-relaxed text-white/55">
                    {article.summary}
                  </p>
                  <div className="relative z-10 flex items-center justify-between border-t border-white/[0.07] pt-4">
                    <span className="flex items-center gap-1.5 text-xs text-white/35">
                      <Clock className="size-3.5" />
                      {article.readTime}
                    </span>
                    <span className="text-xs text-white/35">{article.publishedDate}</span>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>

        <div className="flex justify-center">
          <InteractiveHoverButton
            href="/blog"
            variant="outline"
            className="px-6 py-3 text-sm font-semibold"
          >
            View all articles
          </InteractiveHoverButton>
        </div>
      </div>
    </section>
  )
}
