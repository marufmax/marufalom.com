import PageTitle from '@/components/PageTitle'
import PostComments from '@/components/PostComments'
import PostNavigation from '@/components/PostNavigation'
import { BlogSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import { CoreContent } from '@/lib/utils/contentlayer'
import type { Authors, Blog } from 'contentlayer/generated'
import { ReactNode } from 'react'
import formatDate from '@/lib/utils/formatDate'
import { useState, useEffect } from 'react'

interface Props {
  content: CoreContent<Blog>
  authorDetails: CoreContent<Authors>
  children: ReactNode
  next?: { slug: string; title: string }
  prev?: { slug: string; title: string }
}

export default function PostLayout({ content, authorDetails, children, next, prev }: Props) {
  const { slug, date, title, author, readingTime } = content
  const [isSticky, setIsSticky] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      setIsSticky(scrollTop > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      <BlogSEO
        url={`${siteMetadata.siteUrl}/blog/${slug}`}
        authorDetails={authorDetails}
        {...content}
      />
      <article>
        <header
          className={` top-0 z-50 bg-white text-center ${isSticky ? 'w-full p-3 text-sm' : ''}`}
        >
          <PageTitle>{title}</PageTitle>
          <dl>
            <dt className="sr-only">Published on</dt>
            <dd className="flex flex-row justify-center text-base font-medium leading-6 sm:flex-row sm:space-x-2">
              <div className="flex items-center justify-center space-x-2">
                <time dateTime={date}>{formatDate(date)}</time>
              </div>
              <span className="mx-1 sm:block">-</span>
              <span>{readingTime.text}</span>
            </dd>
          </dl>
        </header>
        <div
          className="divide-y divide-gray-200 font-medium dark:divide-gray-700 xl:grid xl:grid-cols-4 xl:gap-x-6 xl:divide-y-0"
          style={{ gridTemplateRows: 'auto 1fr' }}
        >
          <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-4 xl:row-span-2 xl:pb-0">
            <div className="dark:prose-dark prose max-w-none pt-8 pb-8">
              {children}
              <PostNavigation prev={prev} next={next} />
              <PostComments />
            </div>
          </div>
        </div>
      </article>
    </>
  )
}
