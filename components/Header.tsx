import headerNavLinks from '@/data/headerNavLinks'
import classNames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import CommandPalette from './CommandPalette/CommandPalette'
import MobileNav from './MobileNav'

export default function Header() {
  const router = useRouter()
  const rootPageClass = 'bg-ondhokar-950 text-white'
  const isRootPage = (): boolean => router.pathname === '/'

  return (
    <header className={`${isRootPage() ? rootPageClass : ''} z-40 bg-transparent py-5 md:py-10`}>
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        <div>
          <Link href="/" className="flex items-center justify-between" aria-label="Home">
            <div
              className={classNames(
                'horizontal-underline hidden text-3xl font-extrabold sm:block',
                {
                  'horizontal-underline-active': router.pathname === '/',
                }
              )}
            >
              maruf
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
                  <span className="${isRootPage() ? 'text-white' : 'text-gray-900'} font-bold tracking-wide dark:text-gray-100">
                    {title}
                  </span>
                </Link>
              )
            })}
          </div>
          <div className="flex items-center">
            <CommandPalette />
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  )
}
