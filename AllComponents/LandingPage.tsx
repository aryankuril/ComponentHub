'use client'

import { useRouter } from 'next/navigation'
import ComponentCardList from '@/AllComponents/ComponentCardList'
import Button from "@/AllComponents/shared/Button";

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
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3">
            <span className=" black-text ">Latest </span>
            <span className=" text-primary ">Components</span>
          </h2>

          <p className="text-xl  black-text  max-w-3xl mx-auto">
            Handpicked components showcasing the best of modern design with 3D animations.
          </p>
        </div>

        <ComponentCardList components={[...components].reverse().slice(0, 6)} />


<div className="flex items-center justify-center ">
  <Button
    onClick={handleViewMore}
    className="black-text flex items-center"
    text="View Documentation"
  />
</div>
    

      </div>
    </section>
  )
}
