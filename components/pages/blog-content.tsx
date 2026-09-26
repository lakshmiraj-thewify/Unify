'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { BookOpen, Clock, Tag, ArrowRight, Search } from 'lucide-react'
import { InteractiveHoverButton } from '@/registry/magicui/interactive-hover-button'
import { blogArticles, blogTags, blogMeta, type BlogArticle } from '@/content/blog'

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) setInView(true)
      },
      { threshold },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, inView }
}

function ArticleCard({
  article,
  index,
  inView,
}: {
  article: BlogArticle
  index: number
  inView: boolean
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: index * 0.08,
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:border-violet-300 hover:shadow-xl hover:shadow-violet-100/60"
    >
      {/* Category color bar */}
      <div className="h-1 w-full bg-gradient-to-r from-violet-500 to-cyan-400" />

      <div className="flex flex-1 flex-col gap-4 p-6">
        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-1 rounded-full border border-violet-200 bg-violet-50 px-2.5 py-1 text-[11px] font-semibold tracking-wider text-violet-600 uppercase">
            <Tag className="h-3 w-3" />
            {article.tag}
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] text-slate-400">
            <Clock className="h-3 w-3" />
            {article.readTime}
          </span>
          <span className="ml-auto text-[11px] text-slate-400">{article.publishedDate}</span>
        </div>

        {/* Title */}
        <h2 className="line-clamp-3 text-base leading-snug font-bold text-slate-900 transition-colors group-hover:text-violet-700">
          {article.title}
        </h2>

        {/* Summary */}
        <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-slate-500">
          {article.summary}
        </p>

        {/* Read CTA */}
        <div className="mt-auto flex items-center gap-1.5 border-t border-slate-100 pt-2 text-sm font-semibold text-violet-600 transition-all group-hover:gap-2.5">
          <BookOpen className="h-4 w-4" />
          Read article
          <ArrowRight className="h-3.5 w-3.5" />
        </div>
      </div>
    </motion.article>
  )
}

export function BlogContent() {
  const [activeTag, setActiveTag] = useState<string>('All')
  const [search, setSearch] = useState('')
  const { ref, inView } = useInView(0.05)

  const filtered = blogArticles.filter((a) => {
    const matchTag = activeTag === 'All' || a.tag === activeTag
    const matchSearch =
      search === '' ||
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.summary.toLowerCase().includes(search.toLowerCase())
    return matchTag && matchSearch
  })

  const featured = filtered.find((a) => a.featured)
  const rest = filtered.filter((a) => !a.featured)

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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(116,60,255,0.25)_0%,transparent_70%)]" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
            }}
          >
            <div className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold tracking-wider text-violet-400 uppercase">
              {blogMeta.eyebrow}
            </div>
            <h1 className="mb-5 text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
              {blogMeta.heading}
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-white/60">{blogMeta.lead}</p>
          </motion.div>
        </div>
      </section>

      {/* Sticky filter bar */}
      <div className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 shadow-sm backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
          {/* Search */}
          <div className="relative max-w-xs min-w-[200px] flex-1">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search articles…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 py-1.5 pr-3 pl-9 text-sm focus:border-transparent focus:ring-2 focus:ring-violet-400 focus:outline-none"
            />
          </div>
          {/* Tags */}
          <div className="flex flex-wrap items-center gap-1.5">
            {blogTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`rounded-full border px-3 py-1 text-xs font-semibold transition-colors ${
                  activeTag === tag
                    ? 'border-violet-600 bg-violet-600 text-white'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-violet-300 hover:text-violet-600'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Articles grid */}
      <div ref={ref} className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        {filtered.length === 0 ? (
          <div className="py-24 text-center text-slate-400">
            <BookOpen className="mx-auto mb-3 h-10 w-10 opacity-40" />
            <p className="text-lg font-medium">No articles match your filter.</p>
            <button
              onClick={() => {
                setActiveTag('All')
                setSearch('')
              }}
              className="mt-4 text-sm text-violet-600 underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <>
            {/* Featured */}
            {featured && activeTag === 'All' && search === '' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55 }}
                className="group relative mb-10 flex flex-col gap-8 overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 to-indigo-700 p-8 text-white shadow-2xl shadow-violet-900/30 transition-shadow hover:shadow-violet-900/50 sm:flex-row sm:p-10"
              >
                <div className="flex flex-1 flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-white/20 px-2.5 py-1 text-[11px] font-bold tracking-wider uppercase">
                      Featured
                    </span>
                    <span className="text-xs text-white/60">{featured.readTime}</span>
                  </div>
                  <h2 className="text-2xl leading-snug font-extrabold sm:text-3xl">
                    {featured.title}
                  </h2>
                  <p className="text-sm leading-relaxed text-white/75">{featured.summary}</p>
                  <Link
                    href={`/blog/${featured.slug}`}
                    className="mt-auto inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-violet-700 transition-colors hover:bg-violet-50"
                  >
                    Read article <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            )}

            {/* Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {(activeTag === 'All' && search === '' ? rest : filtered).map((article, i) => (
                <Link key={article.slug} href={`/blog/${article.slug}`} className="contents">
                  <ArticleCard article={article} index={i} inView={inView} />
                </Link>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Bottom CTA */}
      <section className="bg-[#0D0F17] py-20 text-center">
        <div className="mx-auto max-w-xl px-4">
          <h2 className="mb-3 text-2xl font-bold text-white">New guides every month</h2>
          <p className="mb-8 text-sm text-white/60">
            Practical MikroTik and ISP operations content — no fluff, no generic advice.
          </p>
          <InteractiveHoverButton
            href="/contact"
            variant="primary"
            className="px-6 py-3 text-sm font-semibold"
          >
            Book a live demo
          </InteractiveHoverButton>
        </div>
      </section>
    </main>
  )
}
