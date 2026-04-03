'use client'

import { useEffect, useState } from 'react'
import Navbar from '@/AllComponents/shared/Navbar'
import Footer from '@/AllComponents/shared/Footer'
import ComponentDetails from '@/AllComponents/ComponentDetails'
import { ComponentData } from '@/lib/types/component'
import { useRouter, usePathname } from 'next/navigation'
import PageLoader from '@/AllComponents/PageLoader' // ✅ ADD THIS

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

  // ✅ FIXED LOADING STATES
  const [categoryLoading, setCategoryLoading] = useState(true)
  const [componentLoading, setComponentLoading] = useState(false)

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

        // redirect logic
        if (pathname === '/components') {
          if (data.length > 0 && data[0].components.length > 0) {
            const firstId = data[0].components[0]._id
            router.replace(`/components/${firstId}`)
          }
        }

        setCategoryLoading(false) // ✅ IMPORTANT

      } catch (err) {
        console.error(err)
        setCategoryLoading(false) // ✅ IMPORTANT
      }
    }

    fetchCategories()
  }, [])

  /* ============================
     LOAD COMPONENT BY URL ID
  ============================ */
  useEffect(() => {
    const id = pathname.startsWith('/components/')
      ? pathname.replace('/components/', '')
      : null

    if (!id) return

    const fetchComponent = async () => {
      try {
        setComponentLoading(true)

        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
        const res = await fetch(`${baseUrl}/api/components/${id}`)
        const data = await res.json()

        setSelectedComponent({
          ...data,
          npmPackages: data.npmPackages ?? [],
        })

        setComponentLoading(false)

      } catch (err) {
        console.error(err)
        setComponentLoading(false)
      }
    }

    fetchComponent()

  }, [pathname])


  const activeId = pathname.startsWith('/components/')
  ? pathname.replace('/components/', '')
  : null
  return (
    <PageLoader loading={categoryLoading || componentLoading}>
      <div>

        <Navbar />

        {/* MOBILE BLOCK */}
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

        {/* DESKTOP */}
        <div className="hidden md:flex min-h-screen container flex flex-col text-gray-200">

          <main className="flex flex-1 pt-16 relative">

            {/* Sidebar */}
            <aside className="hidden md:block w-64 bg-white shadow-[4px_0_10px_rgba(0,0,0,0.08)] p-4 relative z-10">
              <h2 className="text-xl font-bold mb-4 black-text mt-10">
                Components
              </h2>

              {categories.map((cat) => (
                <div key={cat._id} className="mb-5">
                  <h3 className="text-primary font-semibold mb-2 capitalize">
                    {cat.name}
                  </h3>

                  <ul className="space-y-1">
                    {cat.components.map((comp) => (
                      <li
                        key={comp._id}
                        onClick={() => {
                          setSelectedComponent(null)

                          fetch(`/api/components/${comp._id}`)
                            .then(res => res.json())
                            .then(data => {
                              setSelectedComponent({
                                ...data,
                                npmPackages: data.npmPackages ?? [],
                              })
                            })

                          router.push(`/components/${comp._id}`)
                        }}
className={`cursor-pointer px-2 py-1 rounded capitalize transition
  ${activeId === comp._id 
    ? "bg-[#F9B31B] text-black font-semibold" 
    : "hover:bg-[#F9B31B] black-text"}
`}                      >
                        {comp.name}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </aside>

            {/* Right Panel */}
            <section className="flex-1 p-6">

              {selectedComponent && (
                <ComponentDetails component={selectedComponent} />
              )}

              {!selectedComponent && (
                <p className="text-center black-text">
                  Loading components...
                </p>
              )}

            </section>

          </main>

        </div>

        <Footer />

      </div>
    </PageLoader>
  )
}