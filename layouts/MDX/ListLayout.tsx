import Pagination from '@/components/Pagination'
import PostCard from '@/components/PostCard'
import { CoreContent } from '@/lib/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import { ComponentProps, useState } from 'react'

interface Props {
  posts: CoreContent<Blog>[]
  title: string
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: ComponentProps<typeof Pagination>
}

export default function ListLayout({ posts, title, initialDisplayPosts = [], pagination }: Props) {
  const [searchValue, setSearchValue] = useState('')
  const filteredBlogPosts = posts.filter((post) => {
    const searchContent = post.title + post.summary + post.tags?.join(' ')
    return searchContent.toLowerCase().includes(searchValue.toLowerCase())
  })

  // If initialDisplayPosts exist, display it if no searchValue is specified.
  const displayPosts =
    initialDisplayPosts.length > 0 && !searchValue ? initialDisplayPosts : filteredBlogPosts

  return (
    <>
      <div className="">
        <div className="space-y-2 rounded-lg pt-8 pb-3 md:space-y-5">
          <h1 className=" font-extrabold uppercase leading-9 tracking-2 text-persian-plum-500 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-3xl md:leading-12">
            {title}
          </h1>
        </div>
        <PostCard posts={displayPosts} />
      </div>
      {pagination && pagination.totalPages > 1 && (
        <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
      )}
    </>
  )
}
