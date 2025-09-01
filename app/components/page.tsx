// app/components-page/page.tsx
'use client';

import { useState, useEffect } from 'react';
import ComponentDetails from '@/components/ComponentDetails';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';

interface ComponentData {
  _id: string;
  name: string;
  description: string;
  code: string;
  npmPackages: string[];
  category?: { name: string };
}

interface CategoryData {
  _id: string;
  name: string;
  components: ComponentData[];
}

export default function ComponentsPage() {
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [selectedComponent, setSelectedComponent] = useState<ComponentData | null>(null);

  // ✅ Fetch categories + components
  useEffect(() => {
    fetch('/api/components') // Adjust API endpoint if needed
      .then((res) => res.json())
      .then((data: CategoryData[]) => setCategories(data))
      .catch((err) => console.error(err));
  }, []);
// 
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-200">
      <Navbar />

  <main className="flex flex-1 pt-24 relative z-0">
  {/* Sidebar */}
  <aside className="w-64 bg-gray-800 border-r border-gray-700 h-[calc(100vh-6rem)] overflow-y-auto p-4 sticky top-24 z-10">
    <h2 className="text-xl font-bold mb-4">Components</h2>
    {categories?.length > 0 ? (
      categories.map((category) => (
        <div key={category._id} className="mb-4">
          <h3 className="font-semibold text-blue-400 mb-2">{category.name}</h3>
          <ul>
            {category.components?.map((comp) => (
              <li
                key={comp._id}
                onClick={() => setSelectedComponent(comp)}
                className={`cursor-pointer py-1 px-2 rounded transition-colors
                  ${selectedComponent?._id === comp._id
                    ? 'bg-blue-600 text-white'
                    : 'hover:bg-blue-600 hover:text-white'
                  }`}
              >
                {comp.name}
              </li>
            ))}
          </ul>
        </div>
      ))
    ) : (
      <p className="text-gray-400">No categories available.</p>
    )}
  </aside>

  {/* Component Details */}
  <section className="flex-1 p-6 overflow-y-auto z-0">
    {selectedComponent ? (
      <ComponentDetails component={selectedComponent} />
    ) : (
      <div className="text-gray-400 text-center mt-20">
        Select a component from the sidebar to view details.
      </div>
    )}
  </section>
</main>


      <Footer />
    </div>
  );
}
