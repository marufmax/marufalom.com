import { PageSEO } from '@/components/SEO'
import type { Authors } from 'contentlayer/generated'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  content: Omit<Authors, '_id' | '_raw' | 'body'>
}

export default function AuthorLayout({ children, content }: Props) {
  const { name, occupation, company, companyLink } = content

  return (
    <>
      <PageSEO title={`About - ${name}`} description={`About me - ${name}`} />
      <div className="pt-8">
        <div className="mb-8 flex flex-col-reverse items-center justify-between sm:flex-row sm:items-center">
          <div className="text-center sm:text-left">
            <h1 className="text-xl font-bold md:text-3xl lg:text-4xl">Maruf Alom</h1>
            <h2 className="text-sm font-normal md:text-base">
              {occupation} <span className="font-semibold"><a href={companyLink}> {company} </a></span>
            </h2>
          </div>
        </div>
        <div className="prose max-w-none pb-8 text-justify text-sm dark:prose-dark md:text-lg xl:col-span-2">
          {children}
        </div>
      </div>
    </>
  )
}
