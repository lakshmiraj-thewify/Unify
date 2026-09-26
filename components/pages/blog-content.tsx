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
      (entries) => { if (entries[0]?.isIntersecting) setInView(true) },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, inView }
}

function ArticleCard({ article, index, inView }: { article: BlogArticle; index: number; inView: boolean }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      className="group relative rounded-2xl bg-white border border-slate-200 hover:border-violet-300 hover:shadow-xl hover:shadow-violet-100/60 transition-all duration-300 overflow-hidden flex flex-col"
    >
      {/* Category color bar */}
      <div className="h-1 w-full bg-gradient-to-r from-violet-500 to-cyan-400" />

      <div className="p-6 flex flex-col flex-1 gap-4">
        {/* Meta row */}
        <div className="flex items-center gap-3 flex-wrap">
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-violet-50 text-violet-600 border border-violet-200">
            <Tag className="w-3 h-3" />
            {article.tag}
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] text-slate-400">
            <Clock className="w-3 h-3" />
            {article.readTime}
          </span>
          <span className="text-[11px] text-slate-400 ml-auto">{article.publishedDate}</span>
        </div>

        {/* Title */}
        <h2 className="text-base font-bold text-slate-900 group-hover:text-violet-700 transition-colors leading-snug line-clamp-3">
          {article.title}
        </h2>

        {/* Summary */}
        <p className="text-sm text-slate-500 leading-relaxed line-clamp-3 flex-1">
          {article.summary}
        </p>

        {/* Read CTA */}
        <div className="flex items-center gap-1.5 text-sm font-semibold text-violet-600 group-hover:gap-2.5 transition-all mt-auto pt-2 border-t border-slate-100">
          <BookOpen className="w-4 h-4" />
          Read article
          <ArrowRight className="w-3.5 h-3.5" />
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
      <section className="relative overflow-hidden pt-32 pb-20" style={{background: 'radial-gradient(ellipse 80% 100% at 50% 0%, #9061FF 0%, #6332F6 35%, #2A115E 72%, #150833 100%)'}}>
        {/* Dot grid overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px] opacity-10 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(116,60,255,0.25)_0%,transparent_70%)]" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-violet-400 tracking-wider uppercase mb-5">
              {blogMeta.eyebrow}
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight mb-5">
              {blogMeta.heading}
            </h1>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              {blogMeta.lead}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sticky filter bar */}
      <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-3 flex-wrap">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px] max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search articles…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent bg-slate-50"
            />
          </div>
          {/* Tags */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {blogTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`px-3 py-1 text-xs font-semibold rounded-full border transition-colors ${
                  activeTag === tag
                    ? 'bg-violet-600 text-white border-violet-600'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-violet-300 hover:text-violet-600'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Articles grid */}
      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {filtered.length === 0 ? (
          <div className="text-center py-24 text-slate-400">
            <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p className="text-lg font-medium">No articles match your filter.</p>
            <button onClick={() => { setActiveTag('All'); setSearch('') }} className="mt-4 text-violet-600 text-sm underline">
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
                className="mb-10 group relative rounded-3xl bg-gradient-to-br from-violet-600 to-indigo-700 text-white overflow-hidden flex flex-col sm:flex-row gap-8 p-8 sm:p-10 shadow-2xl shadow-violet-900/30 hover:shadow-violet-900/50 transition-shadow"
              >
                <div className="flex-1 flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 rounded-full bg-white/20 text-[11px] font-bold uppercase tracking-wider">Featured</span>
                    <span className="text-white/60 text-xs">{featured.readTime}</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold leading-snug">{featured.title}</h2>
                  <p className="text-white/75 text-sm leading-relaxed">{featured.summary}</p>
                  <Link
                    href={`/blog/${featured.slug}`}
                    className="mt-auto inline-flex items-center gap-2 text-sm font-bold bg-white text-violet-700 rounded-full px-5 py-2.5 w-fit hover:bg-violet-50 transition-colors"
                  >
                    Read article <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            )}

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
        <div className="max-w-xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-white mb-3">New guides every month</h2>
          <p className="text-white/60 text-sm mb-8">Practical MikroTik and ISP operations content — no fluff, no generic advice.</p>
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
