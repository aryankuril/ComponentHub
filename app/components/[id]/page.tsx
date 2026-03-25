'use client'

import { useEffect, useState } from 'react'
import Navbar from '@/components/shared/Navbar'
import Footer from '@/components/shared/Footer'
import ComponentDetails from '@/components/ComponentDetails'
import { ComponentData } from '@/lib/types/component'
import { useRouter, usePathname } from 'next/navigation'

interface CategoryData {
  _id: string
  name: string
  components: {
    _id: string
    name: string
  }[]
}

export default function ComponentsPage() {
  const [categories, setCategories] = useState<CategoryData[]>([])
  const [selectedComponent, setSelectedComponent] = useState<ComponentData | null>(null)
  const [loading, setLoading] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const router = useRouter()
  const pathname = usePathname()

  /* ============================
     LOAD CATEGORIES
  ============================ */
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/categories-with-components')
        const data = await res.json()
        setCategories(data)

        // 🔥 If user is on /components only
        if (pathname === '/components') {
          if (data.length > 0 && data[0].components.length > 0) {
            const firstId = data[0].components[0]._id
            router.replace(`/components/${firstId}`)
          }
        }

      } catch (err) {
        console.error(err)
      }
    }

    fetchCategories()
  }, [])

  /* ============================
     LOAD COMPONENT BY URL ID
  ============================ */
  useEffect(() => {
    const id = pathname.split('/components/')[1]
    if (!id) return

    const fetchComponent = async () => {
      try {
        setLoading(true)

        const res = await fetch(`/api/components/${id}`)
        const data = await res.json()

        setSelectedComponent({
          ...data,
          npmPackages: data.npmPackages ?? [],
        })

        setLoading(false)

      } catch (err) {
        console.error(err)
        setLoading(false)
      }
    }

    fetchComponent()

  }, [pathname])

  return (
    <div className="">

     <Navbar /> 
      <div className="flex md:hidden min-h-screen items-center justify-center text-center px-6">
  <div>
    <h2 className="text-2xl font-bold mb-4 black-text">
      Best view on desktop
    </h2>
    <p className="black-text">
      This page isn’t optimized for mobile yet.  
      Please switch to a desktop for the full experience.
    </p>
  </div>
</div>

    <div className="  hidden md:flex min-h-screen container flex flex-col   text-gray-200">
 

      <main className=" flex flex-1 pt-16 relative">

        {/* Sidebar */}
        <aside className="hidden md:block w-64   border-r border-gray-700 p-4 ">
          <h2 className="text-xl font-bold mb-4 black-text mt-10">Components</h2>

          {categories.map((cat) => (
            <div key={cat._id} className="mb-5 ">
              <h3 className="text-primary font-semibold mb-2 capitalize">
                {cat.name}
              </h3>

              <ul className="space-y-1">
                {cat.components.map((comp) => (
                  <li
                    key={comp._id}
                    onClick={() => {
  setSelectedComponent(null) // optional loader reset
  fetch(`/api/components/${comp._id}`)
    .then(res => res.json())
    .then(data => {
      setSelectedComponent({
        ...data,
        npmPackages: data.npmPackages ?? [],
      })
    })

  window.history.pushState({}, '', `/components/${comp._id}`)
}}
                    className="cursor-pointer px-2 py-1 rounded hover:bg-[#F9B31B] black-text capitalize"
                  >
                    {comp.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </aside>

        {/* Right Panel */}
        <section className="flex-1 p-6  ">
          {loading && <p className="text-center text-black">Loading...</p>}

          {!loading && selectedComponent && (
            <ComponentDetails component={selectedComponent} />
          )}

          {!loading && !selectedComponent && (
            <p className="text-center  black-text">
              Loading components...
            </p>
          )}
        </section>

      </main>

    </div>

      <Footer />

    </div>
  )
}