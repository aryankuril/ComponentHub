// app/admin/components/page.tsx
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import ComponentForm from '@/components/admin/ComponentForm';
import ComponentPreview from '@/components/admin/ComponentPreview';
import { Edit, Trash } from 'lucide-react';

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
      <h1 className="text-4xl font-bold mb-8 text-black">Manage Components</h1>

      <div className="bg-white/50 p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-black">{isEditing ? 'Edit Component' : 'Add New Component'}</h2>
        <ComponentForm
          onSuccess={() => {
            fetchComponents();
            setIsEditing(false);
            setCurrentComponent(null);
          }}
          initialData={currentComponent}
        />
      </div>

      <div className="bg-white/50 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4 text-black">Existing Components</h2>
        <ul className="space-y-4">
          {components.map((component) => (
            <li key={component._id} className="flex justify-between items-center bg-white text-black p-4 rounded-md">
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
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}