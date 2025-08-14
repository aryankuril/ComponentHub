// app/admin/components/page.tsx
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import ComponentForm from '@/components/admin/ComponentForm';
import ComponentPreview from '@/components/admin/ComponentPreview';

interface Component {
  _id: string;
  name: string;
  description: string;
  code: string;
  npmPackages: string[];
  category?: { name: string; _id: string };
  dateCreated: string;
}

export default function ManageComponentsPage() {
  const [components, setComponents] = useState<Component[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentComponent, setCurrentComponent] = useState<Component | null>(null);

  const fetchComponents = async () => {
    const res = await fetch('/api/components');
    const data = await res.json();
    setComponents(data);
  };

  useEffect(() => {
    fetchComponents();
  }, []);

  const handleDelete = async (id: string) => {
    await fetch(`/api/components/${id}`, { method: 'DELETE' });
    fetchComponents();
  };

  const handleEdit = (component: Component) => {
    setCurrentComponent(component);
    setIsEditing(true);
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">Manage Components</h1>

      <div className="bg-gray-900 p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4">{isEditing ? 'Edit Component' : 'Add New Component'}</h2>
        <ComponentForm
          onSuccess={() => {
            fetchComponents();
            setIsEditing(false);
            setCurrentComponent(null);
          }}
          initialData={currentComponent}
        />
      </div>

      <div className="bg-gray-900 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Existing Components</h2>
        <ul className="space-y-4">
          {components.map((component) => (
            <li key={component._id} className="flex justify-between items-center bg-gray-800 p-4 rounded-md">
              <div className="flex-1">
                <Link href={`/components/${component._id}`} className="font-medium text-lg hover:text-blue-400 transition-colors">
                  {component.name}
                </Link>
                <p className="text-sm text-gray-400">
                  Category: {component.category?.name || 'N/A'}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(component)}
                  className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-md text-sm transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(component._id)}
                  className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-md text-sm transition-colors"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}