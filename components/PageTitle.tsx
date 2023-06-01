import { ReactNode, useEffect, useState } from 'react'
import { useRouter } from 'next/router';

interface Props {
  children: ReactNode
}

export default function PageTitle({ children }: Props) {
  const [isSticky, setIsSticky] = useState(false);

  return (
    <h1 className="underline-bg text-2xl font-extrabold leading-9 tracking-tight sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
      {children}
    </h1>
  )
}
