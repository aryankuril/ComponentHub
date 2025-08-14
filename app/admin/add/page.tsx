'use client';
import { useRouter } from 'next/navigation';
import ComponentForm from '@/components/admin/ComponentForm';

export default function AddComponentPage() {
  const router = useRouter();

  const handleSuccess = () => {
    // Navigate back to the components list after a successful save
    router.push('/admin/components');
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-white mb-8">Add New Component</h1>
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
        <ComponentForm onSuccess={handleSuccess} />
      </div>
    </div>
  );
}
