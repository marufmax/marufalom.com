import Link from '@/components/Link'
import MainLayout from '@/layouts/MainLayout'
import Image from 'next/image'

export default function FourZeroFour() {
  return (
    <MainLayout>
      <div className="bg-indigo-900 relative overflow-hidden h-screen">
        <Image
        alt="404 not found"
        src="/static/site/alone.jpeg"
        width={500} height={300}
        className="absolute h-full w-full object-cover"
        />
        <div className="inset-0 bg-black opacity-25 absolute"></div>
          <div className="container mx-auto px-6 md:px-12 relative z-10 flex items-center py-32 xl:py-40">
            <div className="w-full font-mono flex flex-col items-center relative z-10">
              <h1 className="font-extrabold text-5xl text-center text-white leading-tight mt-4">
                You are all alone here :(
              </h1>
          </div>
        </div>
    </div>
</MainLayout>
  )
}
