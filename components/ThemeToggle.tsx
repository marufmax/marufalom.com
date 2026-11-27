import { useTheme } from 'next-themes'
import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi2'

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()

  // Both icons are rendered and CSS picks one, so server and client markup match.
  return (
    <button
      type="button"
      aria-label="Toggle dark mode"
      className="flex h-11 w-11 items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-neutral-800"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
    >
      <HiOutlineMoon className="h-5 w-5 dark:hidden" />
      <HiOutlineSun className="hidden h-5 w-5 dark:block" />
    </button>
  )
}
