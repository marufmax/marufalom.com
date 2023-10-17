import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import Footer from '../components/Footer'
import SectionContainer from '../components/SectionContainer'
import GeneralHeader from '@/components/Header/GeneralHeader'

interface Props {
  children: ReactNode
}

export default function MainLayout({ children }: Props) {
  const variants = {
    hidden: { opacity: 0, x: -200 },
    enter: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 0 },
  }

  return (
    <SectionContainer>
      <GeneralHeader />
      <div className="flex h-screen flex-col justify-between">
        <motion.main
          className="mb-auto"
          initial="hidden"
          animate="enter"
          exit="exit"
          variants={variants}
          transition={{ type: 'linear' }}
        >
          {children}
        </motion.main>
        <Footer />
      </div>
    </SectionContainer>
  )
}
