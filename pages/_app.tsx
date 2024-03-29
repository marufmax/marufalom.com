import '@/css/prism.css'
import '@/css/tailwind.css'
import '@fontsource-variable/baloo-da-2'

import LogRocket from '@/components/Logrocket'
import ProgressBar from '@/components/ProgressBar'
import siteMetadata from '@/data/siteMetadata'
import { AnimatePresence } from 'framer-motion'
import { ThemeProvider } from 'next-themes'
import { Analytics } from '@vercel/analytics/react'
import type { AppProps } from 'next/app'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme}>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <AnimatePresence exitBeforeEnter initial={false}>
        <LogRocket />
        <ProgressBar />
        <Component {...pageProps} />
        <Analytics />
      </AnimatePresence>
    </ThemeProvider>
  )
}
