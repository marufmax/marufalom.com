import Hero from '@/components/Hero'
import RecentPosts from '@/components/RecentPosts'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import HomeLayout from '@/layouts/HomeLayout'
import { allCoreContent, sortedBlogPost } from '@/lib/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { InferGetStaticPropsType } from 'next'
import HomepageHeader from '@/components/Header/HomepageHeader'

export const getStaticProps = async () => {
  const sortedPosts = sortedBlogPost(allBlogs)
  const posts = allCoreContent(sortedPosts)

  return { props: { posts } }
}

export default function Home({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <PageSEO title={siteMetadata.author} description={siteMetadata.description} />
      <HomepageHeader />
      <Hero />
      <div className="h-screen w-full bg-gradient-to-r from-gray-100 to-gray-300">
        <HomeLayout>
          <RecentPosts posts={posts} />
        </HomeLayout>
      </div>
    </>
  )
}
