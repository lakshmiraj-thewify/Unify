import { Clock } from 'lucide-react'
import { blogArticles } from '@/content/blog'
import { NoiseTexture } from '@/registry/magicui/noise-texture'
import { InteractiveHoverButton } from '@/registry/magicui/interactive-hover-button'

const TEASER_COUNT = 3
const tagColors: Record<string, string> = {
  MikroTik: '#5EE7E4', PPPoE: '#6C8DFF', 'Cloud RADIUS': '#743CFF',
  Billing: '#C084FC', WISP: '#5EE7E4', India: '#6C8DFF', Hotspot: '#743CFF',
}

export function HomeBlogTeaser() {
  const articles = blogArticles.slice(0, TEASER_COUNT)

  return (
    <section id="blog" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-[#5EE7E4] tracking-wider uppercase mb-4">
            Knowledge Hub
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            The ISP Operator&apos;s{' '}
            <span className="bg-gradient-to-r from-[#5EE7E4] to-[#C084FC] bg-clip-text text-transparent">Knowledge Hub</span>
          </h2>
          <p className="text-white/60 text-base sm:text-lg leading-relaxed">
            Practical guides, setup tutorials, and technical deep-dives — written specifically for MikroTik operators, WISPs, and LCOs.
          </p>
        </div>

        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-12">
          {articles.map((article) => {
            const accentColor = tagColors[article.tag] ?? '#5EE7E4'
            return (
              <li key={article.slug}>
                <div className="relative overflow-hidden unify-card-dark h-full flex flex-col gap-4 p-6">
                  <NoiseTexture className="opacity-30" />
                  <span className="relative z-10 inline-flex self-start items-center px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider"
                    style={{ background: `${accentColor}18`, color: accentColor }}>
                    {article.tag}
                  </span>
                  <h3 className="relative z-10 text-sm font-bold text-white leading-snug line-clamp-2">{article.title}</h3>
                  <p className="relative z-10 text-sm leading-relaxed text-white/55 line-clamp-3 flex-1">{article.summary}</p>
                  <div className="relative z-10 flex items-center justify-between pt-4 border-t border-white/[0.07]">
                    <span className="flex items-center gap-1.5 text-xs text-white/35">
                      <Clock className="size-3.5" />{article.readTime}
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
