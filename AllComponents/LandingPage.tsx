'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import ComponentCardList from '@/AllComponents/ComponentCardList'
import Button from "@/AllComponents/shared/Button";

export default function LandingPage({ components }: { components: any[] }) {
  const router = useRouter()

  // ✅ search state
  const [search, setSearch] = useState("")

  const handleViewMore = () => {
    if (components?.length > 0) {
      router.push(`/components/${components[0]._id}`)
    }
  }

  // ✅ filter logic (case insensitive)
  const filteredComponents = [...components]
    .reverse()
    .filter((comp) =>
      comp.name.toLowerCase().includes(search.toLowerCase())
    )
    .slice(0, 6)

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-5">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 font-miso">
            <span className=" black-text ">Latest </span>
            <span className=" text-primary ">Components</span>
          </h2>

          <p className="text-xl black-text max-w-3xl mx-auto font-poppins">
            Handpicked components showcasing the best of modern design with 3D animations.
          </p>
        </div>

        {/* ✅ SEARCH BAR */}
        <div className="mb-10 flex justify-center">
          <input
            type="text"
            placeholder="Search components..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md px-4 py-3 rounded-[20px]  border border-[#fab31e] black-text focus:outline-none focus:border-primary transition"
          />
        </div>

        {/* ✅ PASS FILTERED DATA */}
        {/* ✅ PASS FILTERED DATA */}
{filteredComponents.length > 0 ? (
  <ComponentCardList components={filteredComponents} />
) : (
  <div className="text-center py-10 min-h-[300px] flex items-center justify-center">
  <p className="text-lg font-semibold black-text font-miso">
    No components found
  </p>
</div>
)}

        <div className="flex items-center justify-center">
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