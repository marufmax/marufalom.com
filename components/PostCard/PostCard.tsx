import Tag from '@/components/Tag'
import { CoreContent } from '@/lib/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import { motion } from 'framer-motion'
import Link from 'next/link'
import formatDate from '@/lib/utils/formatDate'

export interface PostCardProps {
  posts: CoreContent<Blog>[]
  showTags?: boolean
}

export default function PostCard({ posts, showTags = true }: PostCardProps) {
  return (
    <ul>
      {posts.map(({ slug, title, tags, summary, readingTime, date }, index) => (
        <motion.li
          key={slug}
          className="py-2"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: index / 10 }}
        >
          <Link href={`/blog/${slug}`} aria-label={`Read "${title}"`}>
            <article className="cursor-pointer gap-3 space-y-2 bg-opacity-20 py-5 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
              <div className="space-y-4 xl:col-span-4">
                <span className="text-4xl font-bold hover:bg-gray-200 rounded-lg leading-11 tracking-tight">
                  <Link href={`/blog/${slug}`}>
                    <span className="text-primary-950 duration-300 uppercase hover:text-persian-plum-500">
                      {title}
                    </span>
                  </Link>
                </span>
                <div className="flex flex-wrap gap-2">
                  <span className="text-primary-500"> { formatDate(date)  } — { readingTime.text} </span>
                </div>
                {showTags && tags && (
                  <div className="flex flex-wrap gap-3">
                    {tags.map((tag) => (
                      <Tag key={tag} text={tag} />
                    ))}
                  </div>
                )}
                <div className="prose max-w-none text-gray-900 dark:text-gray-100">{summary}</div>
              </div>
            </article>
          </Link>
        </motion.li>
      ))}
    </ul>
  )
}
