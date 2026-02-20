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
  previewImage: {
  type: String,
  default: "",
},
}

export default function ComponentsPage() {
  const [categories, setCategories] = useState<CategoryData[]>([])
  const [selectedComponent, setSelectedComponent] = useState<ComponentData | null>(null)
  const [loading, setLoading] = useState(false)

  // 🔹 mobile sidebar toggle
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    fetch('/api/categories-with-components/')
      .then((res) => res.json())
      .then(setCategories)
      .catch(console.error)
  }, [])

  useEffect(() => {
    const id = pathname.split('/components/')[1]
    if (id) {
      openComponent(id)
    }
  }, [pathname])

const openComponent = async (id: string) => {
  setLoading(true);

  router.push(`/components/${id}`, { scroll: false });

  try {
    const res = await fetch(`/api/components/${id}`);

    if (!res.ok) {
      console.error("Fetch failed:", res.status);
      setSelectedComponent(null);
      setLoading(false);
      return;
    }

    const data = await res.json();

    setSelectedComponent({
      ...data,
      npmPackages: data.npmPackages ?? [],
    });

    setSidebarOpen(false);
  } catch (error) {
    console.error("Error fetching component:", error);
  }

  setLoading(false);
};

  return (
    <div className="min-h-screen flex flex-col bg-black text-gray-200">
      <Navbar />

      <main className="flex flex-1 pt-16 relative">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`
            fixed md:static z-10
            top-16 md:top-auto left-0 h-full
            w-72 md:w-64
            bg-black border-r border-gray-700 p-4
            transform transition-transform duration-300
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            md:translate-x-0
          `}
        >
          <h2 className="text-xl font-bold mb-4">Components</h2>

          <div className=" h-full pr-2">
            {categories.map((cat) => (
              <div key={cat._id} className="mb-5">
                <h3 className="text-primary font-semibold mb-2 capitalize">
                  {cat.name}
                </h3>

                <ul className="space-y-1">
                  {(cat.components ?? []).map((comp) => (
                    <li
                      key={comp._id}
                      onClick={() => openComponent(comp._id)}
                      className="cursor-pointer px-2 py-1 rounded hover:bg-[#F9B31B] capitalize"
                    >
                      {comp.name}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </aside>

        {/* Right panel */}
        <section className="flex-1 p-4 md:p-6 bg-black">
          {/* Mobile toggle button */}
          <button
            className="md:hidden mb-4 px-4 py-2 bg-[#F9B31B] text-black rounded-md font-semibold"
            onClick={() => setSidebarOpen(true)}
          >
            ☰ Components
          </button>

          {loading && <p className="text-center">Loading...</p>}

          {!loading && selectedComponent && (
            <ComponentDetails component={selectedComponent} />
          )}

          {!loading && !selectedComponent && (
            <p className="text-center grey-text">
              Select a component from the sidebar
            </p>
          )}
        </section>
      </main>

      <Footer />
    </div>
  )
}
