import headerNavLinks from '@/data/headerNavLinks'
import classNames from 'classnames'
import Link from 'next/link'
import MobileNav from './../MobileNav'
import { useRouter } from 'next/router'

export default function HomepageHeader() {
  const router = useRouter()

  return (
    <header className="z-40 bg-ondhokar-950 py-5 text-white md:py-10">
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        <div>
          <Link href="/" className="flex items-center justify-between" aria-label="Home">
            <div className="horizontal-underline sm:blockhorizontal-underline-active hidden text-3xl font-extrabold">
              Home
            </div>
          </Link>
        </div>
        <div className={`flex items-center space-x-3 text-base leading-5`}>
          <div className="hidden space-x-5 sm:flex">
            {headerNavLinks.map(({ title, href }) => {
              const active = router.pathname.includes(href)
              return (
                <Link
                  key={title}
                  href={href}
                  className={classNames('horizontal-underline text-base', {
                    'horizontal-underline-active': active,
                  })}
                  aria-label={title}
                >
                  <span className="font-bold tracking-wide text-white dark:text-gray-100">
                    {title}
                  </span>
                </Link>
              )
            })}
          </div>
          <div className="flex items-center">
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  )
}
