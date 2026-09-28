import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { blogArticles } from '@/content/blog'
import { pageMetadata } from '@/lib/seo'
import { ArticleReader } from '@/components/pages/article-reader'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return blogArticles.map((article) => ({
    slug: article.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const article = blogArticles.find((a) => a.slug === slug)
  if (!article) return {}

  return pageMetadata({
    title: `${article.title} — Unify Knowledge Hub`,
    description: article.summary,
    path: `/blog/${article.slug}`,
  })
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params
  const article = blogArticles.find((a) => a.slug === slug)

  if (!article) {
    notFound()
  }

  const related = blogArticles
    .filter((a) => a.slug !== article.slug && (a.tag === article.tag || a.category === article.category))
    .slice(0, 3)

  const fallbackRelated =
    related.length >= 3
      ? related
      : [...related, ...blogArticles.filter((a) => a.slug !== article.slug && !related.includes(a))].slice(0, 3)

  return <ArticleReader article={article} relatedArticles={fallbackRelated} />
}
