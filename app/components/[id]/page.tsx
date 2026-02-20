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
    <div className="min-h-screen flex flex-col bg-black text-gray-200">
      <Navbar />

      <main className="flex flex-1 pt-16 relative">

        {/* Sidebar */}
        <aside className="hidden md:block w-64 bg-black border-r border-gray-700 p-4">
          <h2 className="text-xl font-bold mb-4">Components</h2>

          {categories.map((cat) => (
            <div key={cat._id} className="mb-5">
              <h3 className="text-primary font-semibold mb-2 capitalize">
                {cat.name}
              </h3>

              <ul className="space-y-1">
                {cat.components.map((comp) => (
                  <li
                    key={comp._id}
                    onClick={() => router.push(`/components/${comp._id}`)}
                    className="cursor-pointer px-2 py-1 rounded hover:bg-[#F9B31B] capitalize"
                  >
                    {comp.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </aside>

        {/* Right Panel */}
        <section className="flex-1 p-6 bg-black">
          {loading && <p className="text-center">Loading...</p>}

          {!loading && selectedComponent && (
            <ComponentDetails component={selectedComponent} />
          )}

          {!loading && !selectedComponent && (
            <p className="text-center grey-text">
              Loading components...
            </p>
          )}
        </section>

      </main>

      <Footer />
    </div>
  )
}