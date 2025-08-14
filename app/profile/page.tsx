// app/profile/page.tsx
import { auth } from '@/lib/server-auth';
import { redirect } from 'next/navigation';
import ProfileCard from '@/components/profile/ProfileCard';
import UserManagement from '@/components/profile/UserManagement';

export default async function ProfilePage() {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen pt-24 px-4 bg-black text-white">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-center">My Profile</h1>
        <ProfileCard user={session.user} />

        {session.user.role === 'admin' && (
          <div className="mt-12 p-8 bg-gray-900 rounded-lg shadow-xl">
            <h2 className="text-3xl font-bold mb-6 text-red-400">Admin Controls</h2>
            <UserManagement currentUserEmail={session.user.email} />
          </div>
        )}
      </div>
    </div>
  );
}