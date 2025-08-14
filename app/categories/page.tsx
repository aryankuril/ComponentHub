import Link from 'next/link';
import dbConnect from '@/lib/mongodb';
import Component from '@/lib/schemas/Component';
import Category from '@/lib/schemas/Category';

// This is a Server Component, so data fetching happens on the server.
export default async function CategoriesPage() {
  await dbConnect();
  // Ensure the Component model is registered.
  Component.modelName;

  const categories = await Category.find({}).populate('components').lean();

  return (
    <div className="min-h-screen pt-24 px-4 bg-gray-900 text-white">
        
      <div className="container mx-auto max-w-5xl">
        <h1 className="text-4xl font-bold text-blue-400 mb-8">Component Categories</h1>
        <div className="space-y-8">
          {categories.map((category) => (
            <div key={category._id} className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
              <h2 className="text-3xl font-semibold text-blue-300 mb-4">{category.name}</h2>
              <ul className="space-y-2">
                {/* The conditional check below prevents the error if components is null or undefined */}
                {category.components && category.components.map((component: any) => (
                  <li key={component._id} className="bg-gray-700 hover:bg-gray-600 transition-colors duration-200 rounded-md p-3">
                    <Link href={`/components/${component._id}`} className="block">
                      <h3 className="text-xl font-medium text-white">{component.name}</h3>
                      <p className="text-sm text-gray-400 mt-1">{component.description}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      
    </div>
  );
}
