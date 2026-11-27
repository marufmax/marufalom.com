import Footer from '@/components/Footer'
import GeneralHeader from '@/components/Header/GeneralHeader'
import { PageSEO } from '@/components/SEO'
import openSource from '@/data/openSource'
import projects from '@/data/projects'
import siteMetadata from '@/data/siteMetadata'
import { allCoreContent, sortedBlogPost } from '@/lib/utils/contentlayer'
import formatDate from '@/lib/utils/formatDate'
import { allBlogs } from 'contentlayer/generated'
import { InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import { ReactNode } from 'react'

const MAX_POSTS = 4

const agentWork = [
  'Browser bots that heal themselves when a page changes.',
  'Agents that investigate a failure, fix it and remember the fix.',
  'MCP tools that connect agents to real systems.',
]

// The resume is a static PDF, so these are plain anchors.
const links = [
  { title: 'GitHub', href: siteMetadata.github },
  { title: 'LinkedIn', href: siteMetadata.linkedin },
  { title: 'Email', href: `mailto:${siteMetadata.email}` },
  { title: 'Resume', href: '/static/Maruf-Alom-Resume.pdf' },
]

const textLink =
  'font-medium text-slate-900 dark:text-neutral-100 underline decoration-slate-300 dark:decoration-neutral-600 underline-offset-4 hover:decoration-slate-900 dark:hover:decoration-neutral-100'

export const getStaticProps = async () => {
  const posts = allCoreContent(sortedBlogPost(allBlogs)).slice(0, MAX_POSTS)

  return { props: { posts } }
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-16">
      <h2 className="mb-4 font-mono text-xs font-medium uppercase tracking-widest text-slate-500 dark:text-neutral-400">
        {title}
      </h2>
      {children}
    </section>
  )
}

export default function Home({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className="mx-auto max-w-2xl px-5">
      <PageSEO title={siteMetadata.author} description={siteMetadata.description} />
      <GeneralHeader />
      <main className="pb-8">
        <section className="pt-10 md:pt-16">
          <h1 className="text-3xl font-semibold leading-tight tracking-tight text-slate-900 dark:text-neutral-50 md:text-4xl">
            Backend engineer.
            <br />I make software and AI do the boring work.
          </h1>
          <p className="mt-5 leading-7 text-slate-600 dark:text-neutral-400">
            PHP, Go and AI agents. 11+ years of APIs, queues and automation, from Dhaka. I like
            simple things that ship.
          </p>
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
            {links.map(({ title, href }) => (
              <li key={title}>
                <a href={href} className={`inline-block py-1 ${textLink}`}>
                  {title}
                </a>
              </li>
            ))}
          </ul>
        </section>

        <Section title="Building now">
          <div className="grid gap-3 sm:grid-cols-2">
            {projects.map(({ name, href, description, stack }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="group flex flex-col rounded-xl border border-slate-200 p-5 transition-colors hover:border-slate-900 dark:border-neutral-800 dark:hover:border-neutral-300"
              >
                <h3 className="flex justify-between font-semibold text-slate-900 dark:text-neutral-50">
                  {name}
                  <span
                    aria-hidden="true"
                    className="text-slate-400 group-hover:text-slate-900 dark:text-neutral-500 dark:group-hover:text-neutral-100"
                  >
                    ↗
                  </span>
                </h3>
                <p className="mt-2 grow text-sm leading-6 text-slate-600 dark:text-neutral-400">
                  {description}
                </p>
                <p className="mt-4 font-mono text-xs text-slate-500 dark:text-neutral-400">
                  {stack}
                </p>
              </a>
            ))}
          </div>
        </Section>

        <Section title="AI and automation">
          <ul className="space-y-2">
            {agentWork.map((item) => (
              <li key={item} className="flex gap-3 leading-7 text-slate-700 dark:text-neutral-300">
                <span
                  aria-hidden="true"
                  className="font-mono text-emerald-600 dark:text-emerald-400"
                >
                  →
                </span>
                {item}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Open source">
          <ul className="divide-y divide-slate-100 border-y border-slate-100 dark:divide-neutral-800 dark:border-neutral-800">
            {openSource.map(({ name, description, language, stars }) => (
              <li key={name}>
                <a
                  href={`${siteMetadata.github}/${name}`}
                  target="_blank"
                  rel="noreferrer"
                  className="group block py-4"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="break-all font-mono text-sm font-medium text-slate-900 group-hover:underline dark:text-neutral-50">
                      {name}
                    </h3>
                    <span className="shrink-0 font-mono text-xs text-slate-500 dark:text-neutral-400">
                      {language} · ★ {stars}
                    </span>
                  </div>
                  <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-neutral-400">
                    {description}
                  </p>
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm">
            <a href={`${siteMetadata.github}?tab=repositories`} className={textLink}>
              All repositories
            </a>
          </p>
        </Section>

        <Section title="Writing">
          <ul>
            {posts.map(({ slug, title, date }) => (
              <li key={slug}>
                <Link
                  href={`/blog/${slug}`}
                  className="group flex flex-col py-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                >
                  <span className="text-slate-900 group-hover:underline dark:text-neutral-100">
                    {title}
                  </span>
                  <span className="shrink-0 font-mono text-xs text-slate-500 dark:text-neutral-400">
                    {formatDate(date)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm">
            <Link href="/blog" className={textLink}>
              All posts
            </Link>
          </p>
        </Section>
      </main>
      <Footer />
    </div>
  )
}
