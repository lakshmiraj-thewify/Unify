'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useSpring } from 'framer-motion'
import {
  Clock,
  ChevronRight,
  ArrowLeft,
  Copy,
  Check,
  Share2,
  Terminal,
  AlertTriangle,
  Lightbulb,
  Info,
  Layers,
  Sparkles,
  BookOpen,
} from 'lucide-react'
import { NoiseTexture } from '@/registry/magicui/noise-texture'
import { InteractiveHoverButton } from '@/registry/magicui/interactive-hover-button'
import {
  type BlogArticle,
  type CodeSnippet,
  type Callout,
  tagColors,
} from '@/content/blog'

function CodeBlock({ snippet }: { snippet: CodeSnippet }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="my-6 overflow-hidden rounded-xl border border-white/15 bg-[#0a0c13] shadow-2xl">
      {/* Terminal Titlebar */}
      <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-4 py-2.5">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="size-2.5 rounded-full bg-rose-500/80" />
            <div className="size-2.5 rounded-full bg-amber-500/80" />
            <div className="size-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <span className="ml-2 flex items-center gap-1.5 font-mono text-xs text-white/50">
            <Terminal className="size-3 text-[#5EE7E4]" />
            {snippet.title ?? 'RouterOS Terminal'}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/70 transition-all hover:bg-white/10 hover:text-white"
        >
          {copied ? (
            <>
              <Check className="size-3 text-[#5EE7E4]" />
              <span className="text-[#5EE7E4]">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="size-3 text-white/50" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Area */}
      <div className="overflow-x-auto p-4 font-mono text-xs leading-relaxed text-[#5EE7E4]/90 selection:bg-[#743CFF]/40">
        <pre className="whitespace-pre">{snippet.code}</pre>
      </div>
    </div>
  )
}

function CalloutBox({ callout }: { callout: Callout }) {
  const isTip = callout.type === 'tip'
  const isWarning = callout.type === 'warning'

  const borderColor = isTip
    ? 'border-[#5EE7E4]/40 bg-[#5EE7E4]/5 text-[#5EE7E4]'
    : isWarning
    ? 'border-amber-500/40 bg-amber-500/5 text-amber-400'
    : 'border-violet-500/40 bg-violet-500/5 text-violet-400'

  const Icon = isTip ? Lightbulb : isWarning ? AlertTriangle : Info

  return (
    <div
      className={`my-6 rounded-xl border p-4.5 backdrop-blur-md ${borderColor}`}
    >
      <div className="flex items-start gap-3">
        <Icon className="size-5 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="text-sm font-bold tracking-wide">{callout.title}</h4>
          <p className="text-xs leading-relaxed text-white/70">{callout.text}</p>
        </div>
      </div>
    </div>
  )
}

export function ArticleReader({
  article,
  relatedArticles,
}: {
  article: BlogArticle
  relatedArticles: BlogArticle[]
}) {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  const [copiedLink, setCopiedLink] = useState(false)
  const accentColor = tagColors[article.tag] ?? '#5EE7E4'

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href)
      setCopiedLink(true)
      setTimeout(() => setCopiedLink(false), 2000)
    }
  }

  return (
    <article className="min-h-screen bg-[#07050E] text-white pt-24 pb-32">
      {/* Reading Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-gradient-to-r from-[#5EE7E4] via-[#743CFF] to-[#C084FC] origin-left"
        style={{ scaleX }}
      />

      {/* Ambient background glows */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-gradient-to-b from-[#743CFF]/15 to-transparent blur-[140px]" />
        <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#5EE7E4]/10 blur-[130px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Navigation / Breadcrumbs */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-semibold text-white/60 transition-colors hover:text-[#5EE7E4]"
          >
            <ArrowLeft className="size-3.5" />
            Back to Knowledge Hub
          </Link>

          <nav className="hidden sm:flex items-center gap-2 text-xs text-white/40">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="size-3" />
            <Link href="/blog" className="hover:text-white transition-colors">
              Blog
            </Link>
            <ChevronRight className="size-3" />
            <span className="text-[#5EE7E4] truncate max-w-[200px]">
              {article.title}
            </span>
          </nav>
        </div>

        {/* Article Header */}
        <header className="mx-auto max-w-4xl text-center mb-12">
          {/* Tag Pill */}
          <div className="mb-4 inline-flex items-center gap-2">
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold tracking-wider uppercase backdrop-blur-md"
              style={{
                background: `${accentColor}20`,
                color: accentColor,
                border: `1px solid ${accentColor}40`,
              }}
            >
              <Layers className="size-3" />
              {article.tag}
            </span>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl leading-tight sm:leading-tight mb-6">
            {article.title}
          </h1>

          <p className="text-base sm:text-lg leading-relaxed text-white/65 max-w-2xl mx-auto mb-8">
            {article.summary}
          </p>

          {/* Author & Meta Row */}
          <div className="flex flex-wrap items-center justify-center gap-6 border-y border-white/10 py-4 text-xs text-white/50">
            <div className="flex items-center gap-2">
              <div className="size-7 rounded-full bg-gradient-to-tr from-[#743CFF] to-[#5EE7E4] flex items-center justify-center font-bold text-black text-[10px]">
                UW
              </div>
              <div className="text-left">
                <span className="block font-semibold text-white">
                  {article.author.name}
                </span>
                <span className="block text-[11px] text-white/40">
                  {article.author.role}
                </span>
              </div>
            </div>

            <span className="hidden sm:inline text-white/20">•</span>

            <div className="flex items-center gap-1.5">
              <Clock className="size-3.5 text-white/40" />
              <span>{article.readTime}</span>
            </div>

            <span className="hidden sm:inline text-white/20">•</span>

            <span>Published {article.publishedDate}</span>

            <span className="hidden sm:inline text-white/20">•</span>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70 hover:text-white transition-all hover:bg-white/10"
            >
              {copiedLink ? (
                <>
                  <Check className="size-3 text-[#5EE7E4]" />
                  <span className="text-[#5EE7E4]">Link Copied</span>
                </>
              ) : (
                <>
                  <Share2 className="size-3" />
                  <span>Share</span>
                </>
              )}
            </button>
          </div>
        </header>

        {/* Featured Image */}
        {article.coverImage && (
          <div className="relative mx-auto max-w-5xl mb-16 overflow-hidden rounded-3xl border border-white/15 bg-black/40 shadow-2xl">
            <div className="relative aspect-[21/9] w-full">
              <Image
                src={article.coverImage}
                alt={article.title}
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07050E]/80 via-transparent to-transparent" />
            </div>
          </div>
        )}

        {/* 2-Column Article Body with Sticky Sidebar */}
        <div className="mx-auto max-w-6xl grid gap-12 lg:grid-cols-12">
          {/* Main Content Column */}
          <div className="lg:col-span-8 space-y-10">
            {/* Key Takeaways Box */}
            {article.keyTakeaways && article.keyTakeaways.length > 0 && (
              <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent p-6 backdrop-blur-xl">
                <div className="flex items-center gap-2 mb-4 text-[#5EE7E4]">
                  <Sparkles className="size-4" />
                  <h3 className="text-sm font-bold tracking-wider uppercase">
                    Key Implementation Takeaways
                  </h3>
                </div>
                <ul className="space-y-2.5 text-sm text-white/75">
                  {article.keyTakeaways.map((takeaway, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="text-[#5EE7E4] font-bold mt-0.5">✓</span>
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Structured Sections */}
            {article.sections && article.sections.length > 0 ? (
              article.sections.map((section) => (
                <section key={section.id} id={section.id} className="scroll-mt-28 space-y-4">
                  <h2 className="text-2xl font-bold tracking-tight text-white border-b border-white/10 pb-3">
                    {section.title}
                  </h2>
                  <p className="text-base leading-relaxed text-white/70">
                    {section.content}
                  </p>

                  {section.callout && <CalloutBox callout={section.callout} />}

                  {section.codeSnippet && (
                    <CodeBlock snippet={section.codeSnippet} />
                  )}
                </section>
              ))
            ) : (
              <div className="space-y-6 text-base leading-relaxed text-white/70">
                <p>
                  This guide details production-verified network configurations tested on MikroTik CCR,
                  hEX, and CRS hardware clusters powered by Unify Wi-Fi & TheWiFy cloud controllers.
                </p>
                <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
                  <h4 className="text-base font-bold text-white mb-2">Need direct configuration support?</h4>
                  <p className="text-sm text-white/60 mb-4">
                    Our network operations center is available to assist enterprise venues, ISPs, and MSPs
                    with custom RADIUS dictionaries, CoA integration, and guest captive portal deployments.
                  </p>
                  <InteractiveHoverButton href="/contact" className="px-5 py-2 text-xs font-semibold">
                    Schedule Engineering Consult
                  </InteractiveHoverButton>
                </div>
              </div>
            )}

            {/* Bottom Article CTA Card */}
            <div className="mt-14 rounded-3xl border border-white/15 bg-gradient-to-r from-[#743CFF]/20 via-[#0D0F17] to-[#5EE7E4]/15 p-8 backdrop-blur-2xl relative overflow-hidden">
              <NoiseTexture className="opacity-20 pointer-events-none" />
              <div className="relative z-10">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#5EE7E4] mb-3">
                  <Sparkles className="size-3.5" />
                  Automate Your Network
                </span>
                <h3 className="text-2xl font-bold text-white mb-3">
                  Ready to deploy cloud captive portals on your MikroTik fleet?
                </h3>
                <p className="text-sm text-white/65 max-w-xl mb-6">
                  Get high-conversion guest onboarding, automated WhatsApp renewal notifications, and
                  telecom compliance logging in less than 10 minutes.
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <InteractiveHoverButton href="/contact" className="px-6 py-2.5 text-xs font-semibold">
                    Request Live Demo
                  </InteractiveHoverButton>
                  <Link
                    href="/blog"
                    className="text-xs font-semibold text-white/60 hover:text-white transition-colors"
                  >
                    Browse all guides →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Sticky Sidebar on Right */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="sticky top-28 space-y-6">
              {/* Table of Contents */}
              {article.sections && article.sections.length > 0 && (
                <div className="rounded-2xl border border-white/10 bg-[#0D0F17]/90 p-5 backdrop-blur-xl">
                  <div className="flex items-center gap-2 mb-3 text-xs font-bold tracking-wider text-white/40 uppercase">
                    <BookOpen className="size-3.5 text-[#5EE7E4]" />
                    On This Page
                  </div>
                  <nav className="space-y-2">
                    {article.sections.map((sec) => (
                      <a
                        key={sec.id}
                        href={`#${sec.id}`}
                        className="block text-xs text-white/60 hover:text-[#5EE7E4] transition-colors leading-snug py-1"
                      >
                        {sec.title}
                      </a>
                    ))}
                  </nav>
                </div>
              )}

              {/* Quick Action Box */}
              <div className="rounded-2xl border border-white/10 bg-[#0D0F17]/90 p-5 backdrop-blur-xl">
                <h4 className="text-sm font-bold text-white mb-2">
                  Need Help Configuring?
                </h4>
                <p className="text-xs text-white/55 leading-relaxed mb-4">
                  Connect your MikroTik routers to Unify Cloud RADIUS today with zero setup fee.
                </p>
                <InteractiveHoverButton
                  href="/contact"
                  className="w-full py-2 text-xs font-semibold text-center"
                >
                  Talk to Sales
                </InteractiveHoverButton>
              </div>

              {/* Share Box */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-xl">
                <span className="text-xs font-semibold text-white/40 block mb-3">
                  Share this blueprint
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleShare}
                    className="flex-1 flex items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/5 py-2 text-xs text-white/70 hover:bg-white/10 hover:text-white transition-all"
                  >
                    <Share2 className="size-3.5" />
                    {copiedLink ? 'Link Copied' : 'Copy Link'}
                  </button>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Related Articles Row */}
        {relatedArticles.length > 0 && (
          <div className="mt-24 border-t border-white/10 pt-16">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-white">Related Technical Blueprints</h3>
              <Link href="/blog" className="text-xs font-semibold text-[#5EE7E4] hover:underline">
                View all articles →
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedArticles.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/blog/${rel.slug}`}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0D0F17]/80 p-5 backdrop-blur-xl hover:border-[#743CFF]/50 transition-all duration-300 hover:-translate-y-1"
                >
                  <span className="text-[11px] font-bold text-[#5EE7E4] uppercase mb-2">
                    {rel.tag}
                  </span>
                  <h4 className="line-clamp-2 text-sm font-bold text-white group-hover:text-[#5EE7E4] transition-colors mb-2">
                    {rel.title}
                  </h4>
                  <p className="line-clamp-2 text-xs text-white/50 mb-4">
                    {rel.summary}
                  </p>
                  <span className="mt-auto text-xs text-white/35 flex items-center gap-1">
                    <Clock className="size-3" />
                    {rel.readTime}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  )
}
