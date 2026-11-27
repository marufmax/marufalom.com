import Logo from '@/components/Logo'
import ThemeToggle from '@/components/ThemeToggle'
import headerNavLinks from '@/data/headerNavLinks'
import siteMetadata from '@/data/siteMetadata'
import classNames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import MobileNav from './../MobileNav'

export default function GeneralHeader() {
  const router = useRouter()

  return (
    <header className="py-5 md:py-8">
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        <Link href="/" className="py-2" aria-label={`${siteMetadata.author}, home`}>
          <Logo />
        </Link>
        <div className="flex items-center gap-2 sm:gap-6">
          <nav className="hidden gap-8 sm:flex">
            {headerNavLinks.map(({ title, href }) => (
              <Link
                key={title}
                href={href}
                className={classNames('horizontal-underline py-1 font-semibold', {
                  'horizontal-underline-active': router.pathname.startsWith(href),
                })}
              >
                {title}
              </Link>
            ))}
          </nav>
          <ThemeToggle />
          <MobileNav />
        </div>
      </div>
    </header>
  )
}
