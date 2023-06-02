import Header from '@/components/Header'
import Hero from '@/components/Hero'
import RecentPosts from '@/components/RecentPosts'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import HomeLayout from '@/layouts/HomeLayout'
import { allCoreContent, sortedBlogPost } from '@/lib/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { InferGetStaticPropsType } from 'next'

export const getStaticProps = async () => {
  const sortedPosts = sortedBlogPost(allBlogs)
  const posts = allCoreContent(sortedPosts)

  return { props: { posts } }
}

export default function Home({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <PageSEO title={siteMetadata.author} description={siteMetadata.description} />
        <Header />
      <Hero />
      <HomeLayout>
        <RecentPosts posts={posts} />
      </HomeLayout>
    </>
  )
}
