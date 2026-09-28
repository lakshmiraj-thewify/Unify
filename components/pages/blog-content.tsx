'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence, useMotionValue, useMotionTemplate } from 'framer-motion'
import {
  Clock,
  ArrowRight,
  Search,
  Sparkles,
  BookOpen,
  Layers,
  ChevronRight,
  Terminal,
  ShieldCheck,
  Zap,
} from 'lucide-react'
import { InteractiveHoverButton } from '@/registry/magicui/interactive-hover-button'
import { NoiseTexture } from '@/registry/magicui/noise-texture'
import {
  blogArticles,
  blogTags,
  blogMeta,
  tagColors,
  type BlogArticle,
} from '@/content/blog'

function SpotlightCard({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0D0F17]/85 backdrop-blur-xl transition-all duration-300 hover:border-white/25 hover:shadow-2xl hover:shadow-violet-950/40 ${className}`}
    >
      {/* Dynamic Cursor Spotlight Beam */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              450px circle at ${mouseX}px ${mouseY}px,
              rgba(94, 231, 228, 0.15),
              rgba(116, 60, 255, 0.08),
              transparent 80%
            )
          `,
        }}
      />
      <NoiseTexture className="opacity-20 pointer-events-none" />
      {children}
    </div>
  )
}

function ArticleCard({
  article,
  index,
}: {
  article: BlogArticle
  index: number
}) {
  const accentColor = tagColors[article.tag] ?? '#5EE7E4'

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{
        delay: index * 0.04,
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="h-full"
    >
      <SpotlightCard className="h-full">
        {/* Cover Image with Dark Bezel & Vignette */}
        {article.coverImage && (
          <Link
            href={`/blog/${article.slug}`}
            className="relative aspect-[16/9] w-full overflow-hidden bg-[#07050E] border-b border-white/[0.08]"
          >
            <Image
              src={article.coverImage}
              alt={article.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
            />
            {/* Ambient Dark Tech Vignette to unify warm/cold photos */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D0F17] via-[#07050E]/40 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-75" />

            {/* Floating Tech Pill */}
            <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5">
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase backdrop-blur-md"
                style={{
                  background: `${accentColor}25`,
                  color: accentColor,
                  border: `1px solid ${accentColor}50`,
                }}
              >
                {article.tag}
              </span>
            </div>

            {/* Read Time Chip over image */}
            <div className="absolute bottom-2.5 right-3 z-20">
              <span className="inline-flex items-center gap-1 rounded-full bg-black/70 px-2 py-0.5 text-[10px] text-white/60 backdrop-blur-md border border-white/10 font-mono">
                <Clock className="size-2.5 text-[#5EE7E4]" />
                {article.readTime}
              </span>
            </div>
          </Link>
        )}

        {/* Content Body */}
        <div className="relative z-20 flex flex-1 flex-col gap-3 p-5 sm:p-6">
          {!article.coverImage && (
            <div className="flex items-center justify-between">
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase"
                style={{
                  background: `${accentColor}20`,
                  color: accentColor,
                  border: `1px solid ${accentColor}35`,
                }}
              >
                {article.tag}
              </span>
              <span className="flex items-center gap-1 text-[11px] text-white/40 font-mono">
                <Clock className="size-2.5 text-white/40" />
                {article.readTime}
              </span>
            </div>
          )}

          {/* Title */}
          <h3 className="line-clamp-2 text-base leading-snug font-bold text-white transition-colors duration-200 group-hover:text-[#5EE7E4]">
            <Link href={`/blog/${article.slug}`}>
              {article.title}
            </Link>
          </h3>

          {/* Excerpt */}
          <p className="line-clamp-2 flex-1 text-xs sm:text-sm leading-relaxed text-white/60">
            {article.summary}
          </p>

          {/* Card Footer */}
          <div className="mt-auto pt-4 border-t border-white/[0.08] flex items-center justify-between">
            <span className="text-[11px] text-white/40 truncate max-w-[170px]">
              {article.author.name}
            </span>
            <Link
              href={`/blog/${article.slug}`}
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#5EE7E4] transition-all duration-200 group-hover:gap-2 group-hover:text-white"
            >
              Read Guide
              <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </SpotlightCard>
    </motion.div>
  )
}

export function BlogContent() {
  const [activeTag, setActiveTag] = useState<string>('All')
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    return blogArticles.filter((a) => {
      const matchTag = activeTag === 'All' || a.tag === activeTag
      const matchSearch =
        search === '' ||
        a.title.toLowerCase().includes(search.toLowerCase()) ||
        a.summary.toLowerCase().includes(search.toLowerCase()) ||
        a.tag.toLowerCase().includes(search.toLowerCase())
      return matchTag && matchSearch
    })
  }, [activeTag, search])

  const featured = blogArticles.find((a) => a.featured)
  const isDefaultView = !search && activeTag === 'All'

  // Asymmetric Bento breakdown for default view
  const deepDives = isDefaultView ? blogArticles.filter((a) => !a.featured).slice(0, 2) : []
  const restArticles = isDefaultView
    ? blogArticles.filter((a) => !a.featured).slice(2)
    : filtered.filter((a) => a.slug !== featured?.slug || search || activeTag !== 'All')

  return (
    <main className="min-h-screen bg-[#07050E] text-white pt-28 pb-32">
      {/* Background Ambient Glows */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1100px] h-[650px] rounded-full bg-gradient-to-b from-[#743CFF]/20 via-[#5EE7E4]/10 to-transparent blur-[140px]" />
        <div className="absolute top-[35%] -left-48 w-[650px] h-[650px] rounded-full bg-[#743CFF]/10 blur-[140px]" />
        <div className="absolute top-[60%] -right-48 w-[650px] h-[650px] rounded-full bg-[#5EE7E4]/10 blur-[140px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-xs text-white/40">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight className="size-3" />
          <span className="text-[#5EE7E4] font-medium">Knowledge Hub</span>
        </nav>

        {/* Hero Header */}
        <div className="mx-auto max-w-3xl text-center mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1 text-xs font-semibold tracking-wider text-[#5EE7E4] uppercase backdrop-blur-md mb-6 shadow-[0_0_20px_rgba(94,231,228,0.15)]">
            <Sparkles className="size-3.5 text-[#5EE7E4]" />
            {blogMeta.eyebrow}
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl mb-6">
            The Wi-Fi & ISP Operator{' '}
            <span className="bg-gradient-to-r from-[#5EE7E4] via-[#743CFF] to-[#C084FC] bg-clip-text text-transparent">
              Knowledge Hub
            </span>
          </h1>
          <p className="text-base sm:text-lg leading-relaxed text-white/60">
            {blogMeta.lead}
          </p>

          {/* Search Box with Ambient Focus Aura */}
          <div className="mt-8 relative max-w-xl mx-auto group">
            <div className="pointer-events-none absolute -inset-0.5 rounded-full bg-gradient-to-r from-[#5EE7E4]/25 via-[#743CFF]/25 to-[#C084FC]/25 opacity-0 blur-md transition-opacity duration-300 group-focus-within:opacity-100" />
            <div className="relative flex items-center rounded-full border border-white/10 bg-[#0D0F17]/90 px-4 py-1 backdrop-blur-xl transition-all duration-300 group-hover:border-white/20 group-focus-within:border-[#5EE7E4]/60 group-focus-within:bg-[#121624]">
              <Search className="size-4 shrink-0 text-white/40 group-focus-within:text-[#5EE7E4] transition-colors" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search blueprints, RouterOS scripts, RADIUS, VLANs..."
                className="w-full bg-transparent px-3 py-2.5 text-sm text-white placeholder-white/40 outline-none"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch('')}
                  className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs text-white/60 hover:bg-white/20 hover:text-white transition-colors"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Animated Sliding Category Tabs */}
        <div className="mb-14 flex flex-wrap items-center justify-center gap-1.5 p-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-xl max-w-4xl mx-auto">
          {blogTags.map((tag) => {
            const isActive = activeTag === tag
            const accent = tagColors[tag] ?? '#5EE7E4'
            return (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`relative px-4 py-1.5 text-xs font-semibold rounded-full transition-colors duration-200 ${
                  isActive ? 'text-white' : 'text-white/60 hover:text-white'
                }`}
              >
                {/* Smooth Animated Sliding Capsule */}
                {isActive && (
                  <motion.div
                    layoutId="activeBlogTab"
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: `linear-gradient(135deg, ${accent}30, ${accent}15)`,
                      border: `1px solid ${accent}60`,
                      boxShadow: `0 0 16px ${accent}25`,
                    }}
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tag}</span>
              </button>
            )
          })}
        </div>

        {/* Bento Hero Spotlight Card (Visible in Default View) */}
        {isDefaultView && featured && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="mb-10"
          >
            <SpotlightCard className="overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-[#0D0F17]/95 via-[#131626]/90 to-[#0D0F17]/95 p-6 sm:p-8 hover:border-[#5EE7E4]/50">
              <div className="relative z-20 grid gap-8 lg:grid-cols-12 lg:items-center">
                {/* Media on Left with reflection frame */}
                <div className="lg:col-span-7">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/15 bg-black/50 shadow-2xl shadow-cyan-950/20 group-hover:border-[#5EE7E4]/40 transition-colors">
                    {featured.coverImage && (
                      <Image
                        src={featured.coverImage}
                        alt={featured.title}
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 60vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#07050E]/80 via-transparent to-transparent" />

                    <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#5EE7E4] to-[#743CFF] px-3 py-1 text-xs font-extrabold text-black uppercase tracking-wider shadow-lg">
                        <Sparkles className="size-3" />
                        Flagship Blueprint
                      </span>
                    </div>

                    <div className="absolute bottom-3 right-3 z-20">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-black/80 px-3 py-1 text-xs font-mono text-[#5EE7E4] border border-[#5EE7E4]/30 backdrop-blur-md">
                        <Terminal className="size-3" />
                        RouterOS 7 Certified
                      </span>
                    </div>
                  </div>
                </div>

                {/* Text Info on Right */}
                <div className="lg:col-span-5 flex flex-col gap-4">
                  <div className="flex items-center gap-3 text-xs text-white/50">
                    <span className="inline-flex items-center gap-1 text-[#5EE7E4] font-semibold">
                      <Layers className="size-3.5" />
                      {featured.category}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 font-mono">
                      <Clock className="size-3.5" />
                      {featured.readTime}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-bold leading-snug text-white group-hover:text-[#5EE7E4] transition-colors">
                    <Link href={`/blog/${featured.slug}`}>
                      {featured.title}
                    </Link>
                  </h2>

                  <p className="text-sm leading-relaxed text-white/70">
                    {featured.summary}
                  </p>

                  {featured.keyTakeaways && (
                    <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-3.5 my-1">
                      <ul className="space-y-1.5 text-xs text-white/70">
                        {featured.keyTakeaways.slice(0, 3).map((takeaway, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-[#5EE7E4] font-bold">✓</span>
                            <span>{takeaway}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="pt-2 flex items-center gap-4">
                    <InteractiveHoverButton
                      href={`/blog/${featured.slug}`}
                      className="px-6 py-2.5 text-xs font-semibold"
                    >
                      Read Full Blueprint
                    </InteractiveHoverButton>
                    <span className="text-xs text-white/40">
                      By {featured.author.name}
                    </span>
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>
        )}

        {/* Bento Row 2: Two Asymmetric "Deep Dive" Cards (Visible in Default View) */}
        {isDefaultView && deepDives.length === 2 && (
          <div className="mb-12 grid gap-6 md:grid-cols-2">
            {deepDives.map((article, idx) => {
              const accentColor = tagColors[article.tag] ?? '#5EE7E4'
              const Icon = idx === 0 ? Zap : ShieldCheck

              return (
                <SpotlightCard
                  key={article.slug}
                  className="p-6 border-white/15 bg-gradient-to-br from-[#0D0F17] to-[#121626]"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold tracking-wider uppercase backdrop-blur-md"
                      style={{
                        background: `${accentColor}20`,
                        color: accentColor,
                        border: `1px solid ${accentColor}40`,
                      }}
                    >
                      <Icon className="size-3.5" />
                      {article.tag} Deep-Dive
                    </span>
                    <span className="text-xs text-white/40 font-mono flex items-center gap-1">
                      <Clock className="size-3" />
                      {article.readTime}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-[#5EE7E4] transition-colors mb-3 leading-snug">
                    <Link href={`/blog/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h3>

                  <p className="text-xs sm:text-sm text-white/60 leading-relaxed mb-6 flex-1">
                    {article.summary}
                  </p>

                  {/* Thumbnail snippet */}
                  {article.coverImage && (
                    <div className="relative aspect-[21/9] w-full overflow-hidden rounded-xl border border-white/10 mb-4 bg-black/40">
                      <Image
                        src={article.coverImage}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0D0F17] via-transparent to-transparent opacity-80" />
                    </div>
                  )}

                  <div className="mt-auto pt-3 border-t border-white/[0.08] flex items-center justify-between">
                    <span className="text-xs text-white/40">{article.author.name}</span>
                    <Link
                      href={`/blog/${article.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5EE7E4] hover:text-white transition-colors"
                    >
                      Explore Technical Guide
                      <ArrowRight className="size-3.5" />
                    </Link>
                  </div>
                </SpotlightCard>
              )
            })}
          </div>
        )}

        {/* Section Heading */}
        <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <BookOpen className="size-4 text-[#5EE7E4]" />
            <h2 className="text-lg font-bold text-white">
              {search
                ? `Search results for "${search}"`
                : activeTag === 'All'
                ? 'Curated Guides & Operational Blueprints'
                : `${activeTag} Articles`}
            </h2>
          </div>
          <span className="text-xs text-white/40 font-mono">
            {restArticles.length + (isDefaultView ? 3 : 0)} articles
          </span>
        </div>

        {/* Articles Grid with Spotlight */}
        {restArticles.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-12 text-center backdrop-blur-xl">
            <p className="text-base text-white/60 mb-4">
              No articles found matching &quot;{search}&quot;.
            </p>
            <button
              onClick={() => {
                setSearch('')
                setActiveTag('All')
              }}
              className="text-xs font-semibold text-[#5EE7E4] hover:underline"
            >
              Reset search & filters
            </button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {restArticles.map((article, idx) => (
                <ArticleCard key={article.slug} article={article} index={idx} />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </main>
  )
}
