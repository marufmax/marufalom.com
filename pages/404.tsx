import MainLayout from '@/layouts/MainLayout'
import Image from 'next/image'

export default function FourZeroFour() {
  return (
    <MainLayout>
      <div className="relative h-screen overflow-hidden bg-indigo-900">
        <Image
          alt="404 not found"
          src="/static/site/alone.jpeg"
          width={500}
          height={300}
          className="absolute h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-25"></div>
        <div className="container relative z-10 mx-auto flex items-center px-6 py-32 md:px-12 xl:py-40">
          <div className="relative z-10 flex w-full flex-col items-center font-mono">
            <h1 className="mt-4 text-center text-5xl font-extrabold leading-tight text-white">
              You are all alone here :(
            </h1>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
