'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Component {
  _id: string;
  name: string;
  description: string;
  category?: {
    _id: string;
    name: string;
  };
}

export default function ManageComponentsPage() {
  const [components, setComponents] = useState<Component[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchComponents = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/components');
      if (!res.ok) {
        throw new Error('Failed to fetch components. You might not be an admin.');
      }
      const data = await res.json();
      setComponents(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComponents();
  }, []);

  const handleDelete = async (componentId: string) => {
    if (window.confirm('Are you sure you want to delete this component?')) {
      try {
        const res = await fetch(`/api/components/${componentId}`, {
          method: 'DELETE',
        });
        if (res.ok) {
          fetchComponents(); // Re-fetch to update the list
        } else {
          throw new Error('Failed to delete component.');
        }
      } catch (err) {
        console.error('Failed to delete component:', err);
        alert((err as Error).message);
      }
    }
  };

  if (loading) return <div className="p-8 text-center text-white">Loading components...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-white">All Components</h1>
      
      </div>

      <div className="bg-gray-900 rounded-lg shadow-lg overflow-hidden">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-800 text-gray-400 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Component Name</th>
              <th className="py-3 px-6 text-left">Category</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-white text-sm font-light">
            {components.map((component) => (
              <tr key={component._id} className="border-b border-gray-700 hover:bg-gray-800">
                <td className="py-3 px-6 text-left">
                  <Link href={`/components/${component._id}`} className="text-blue-400 hover:underline">
                    {component.name}
                  </Link>
                </td>
                <td className="py-3 px-6 text-left">{component.category?.name || 'N/A'}</td>
                <td className="py-3 px-6 text-center">
                  <div className="flex item-center justify-center space-x-4">
                    <button
                      onClick={() => router.push(`/admin/components/${component._id}`)}
                      className="text-white bg-blue-600 hover:bg-blue-500 font-bold py-1 px-3 rounded-md transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(component._id)}
                      className="text-white bg-red-600 hover:bg-red-500 font-bold py-1 px-3 rounded-md transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
