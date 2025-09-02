'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Edit, ExternalLink, Trash } from 'lucide-react';

interface Component {
  _id: string;
  name: string;
  description: string;
  dateCreated: string; // 👈 add this
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
      setComponents(
      data.sort(
        (a: Component, b: Component) =>
          new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime()
      )
    );
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

  if (loading) return <div className="p-8 text-center text-black">Loading components...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-black">All Components</h1>
      
      </div>

      <div className=" rounded-lg shadow-lg overflow-hidden">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-white text-black uppercase text-sm leading-normal border-b border-gray-700">
              <th className="py-3 px-6 text-left">Component Name</th>
              <th className="py-3 px-6 text-left">Preview Link</th>
              <th className="py-3 px-6 text-left">Category</th>
              <th className="py-3 px-6 text-left">Created Date</th> {/* 👈 new column */}
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-black text-sm font-light bg-[#FFFFFF79]">
  {components.map((component) => (
    <tr key={component._id} className="border-b border-gray-700">
      <td className="py-3 px-6 text-left capitalize">{component.name}</td>
      <td className="py-3 px-6 text-left">
        <Link
          href={`/components/${component._id}`}
          className="text-[#F9B31B] flex items-center gap-2"
        >
          {component.name}
          <ExternalLink size={16} />
        </Link>
      </td>
      <td className="py-3 px-6 text-left capitalize">{component.category?.name || 'N/A'}</td>
      <td className="py-3 px-6 text-left">
        {new Date(component.dateCreated).toLocaleDateString('en-GB')}
      </td>
      <td className="py-3 px-6 text-center">
        <div className="flex item-center justify-center space-x-4">
          <button
  onClick={() => router.push(`/admin/components?id=${component._id}`)}
  className="p-2 rounded-lg text-[#FFD54F] hover:bg-gray-300 transition-colors"
>
  <Edit size={18} />
</button>
          <button
            onClick={() => handleDelete(component._id)}
            className="p-2 rounded-lg text-red-600 hover:bg-gray-300 transition-colors"
          >
            <Trash size={18} />
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
