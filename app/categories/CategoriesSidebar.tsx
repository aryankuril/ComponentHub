'use client';

import { useState } from 'react';
import ComponentDetails from '@/components/ComponentDetails';

interface ComponentType {
  _id: string;
  name: string;
  description: string;
}

interface CategoryType {
  _id: string;
  name: string;
  components?: ComponentType[];
}

interface CategoriesSidebarProps {
  initialCategories: CategoryType[];
}

export default function CategoriesSidebar({ initialCategories }: CategoriesSidebarProps) {
  const [categories] = useState<CategoryType[]>(initialCategories);
  const [selectedComponent, setSelectedComponent] = useState<ComponentType | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const toggleCategory = (id: string) => {
    setExpandedCategories((prev) =>
      prev.includes(id) ? prev.filter((cat) => cat !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Sidebar */}
      <aside className="w-72 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4 overflow-y-auto h-screen sticky top-0">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          Components
        </h2>

        {categories.map((category) => (
          <div key={category._id} className="mb-4">
            <h3
              className="text-lg font-semibold text-gray-700 dark:text-gray-300 cursor-pointer flex justify-between items-center"
              onClick={() => toggleCategory(category._id)}
            >
              {category.name}
              <span className="text-gray-500">
                {expandedCategories.includes(category._id) ? '−' : '+'}
              </span>
            </h3>

            {expandedCategories.includes(category._id) && (
              <ul className="mt-2 space-y-1">
                {category.components?.map((component) => (
                  <li
                    key={component._id}
                    className={`p-2 rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${
                      selectedComponent?._id === component._id
                        ? 'bg-gray-200 dark:bg-gray-700'
                        : ''
                    }`}
                    onClick={() => setSelectedComponent(component)}
                  >
                    {component.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </aside>

      {/* Right Panel */}
      <main className="flex-1 p-6 overflow-y-auto">
        {selectedComponent ? (
          <ComponentDetails component={selectedComponent} />
        ) : (
          <div className="text-gray-500 dark:text-gray-400">
            Select a component from the left to view details
          </div>
        )}
      </main>
    </div>
  );
}