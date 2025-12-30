'use client'

import { useRouter } from 'next/navigation'
import ComponentCardList from '@/components/ComponentCardList'

export default function LandingPage({ components }: { components: any[] }) {
  const router = useRouter()

  const handleViewMore = () => {
    if (components?.length > 0) {
      router.push(`/components/${components[0]._id}`)
    }
  }

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            <span className=" white-text ">Latest </span>
            <span className=" text-primary ">Components</span>
          </h2>

          <p className="text-xl  white-text  max-w-3xl mx-auto">
            Handpicked components showcasing the best of modern design with 3D animations.
          </p>
        </div>

        <ComponentCardList components={[...components].reverse().slice(0, 6)} />



        <button
          onClick={handleViewMore}
          className="group border-2 border-[#F9B31B]  text-primary  font-semibold rounded-full px-6 py-3 flex items-center gap-2 transition-all mx-auto duration-300 hover:shadow-[0_0_20px_#F9B31B,0_0_40px_#F9B31B] hover:-translate-y-0.5"
        >
          <span>View Documentation</span>
        </button>

      </div>
    </section>
  )
}
