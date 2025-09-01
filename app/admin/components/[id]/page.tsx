'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import ComponentForm from '@/components/admin/ComponentForm';

export default function EditComponentPage() {
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const params = useParams();
  const componentId = params.id;

  useEffect(() => {
    if (componentId) {
      const fetchComponent = async () => {
        try {
          const res = await fetch(`/api/components/${componentId}`);
          if (!res.ok) {
            throw new Error('Failed to fetch component data.');
          }
          const data = await res.json();
          setInitialData(data);
        } catch (err) {
          setError((err as Error).message);
        } finally {
          setLoading(false);
        }
      };
      fetchComponent();
    }
  }, [componentId]);

  const handleSuccess = () => {
    // Navigate back to the components list after a successful update
    router.push('/admin/components');
  };

  if (loading) return <div className="p-8 text-center text-black">Loading component data...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-white mb-8">Edit Component</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <ComponentForm onSuccess={handleSuccess} initialData={initialData} />
      </div>
    </div>
  );
}
