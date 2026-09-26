import type { Metadata } from 'next'
import { BlogContent } from '@/components/pages/blog-content'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: "Blog — The ISP Operator's Knowledge Hub",
  description:
    'Practical guides, MikroTik configurations, and business strategies built specifically for Indian WISPs, LCOs, and network engineers.',
  path: '/blog',
})

export default function BlogPage() {
  return <BlogContent />
}
