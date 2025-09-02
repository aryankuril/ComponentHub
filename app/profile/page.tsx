// app/profile/page.tsx
import { auth } from '@/lib/server-auth';
import { redirect } from 'next/navigation';
import ProfileCard from '@/components/profile/ProfileCard';
import UserManagement from '@/components/profile/UserManagement';

export default async function ProfilePage() {
  const session = await auth();

  // Redirect if no session
  if (!session || !session.user) {
    redirect('/login');
  }

  // Type narrowing for TS
  const user = session.user;

  // Construct a user object with default values for missing fields
  const profileUser = {
    id: user.id,
    name: user.name ?? '',
    email: user.email ?? '',
    role: user.role,
    dateCreated: user.dateCreated ?? new Date(),
    // phone: user.phone ?? '',
    // joinDate: user.joinDate ?? new Date(),
    image: user.image ?? null,
  };

  return (
    <div className="min-h-screen pt-24 px-4 bg-black text-white">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-center">My Profile</h1>
        <ProfileCard user={profileUser} />

        {profileUser.role === 'admin' && (
          <div className="mt-12 p-8 bg-gray-900 rounded-lg shadow-xl">
            <h2 className="text-3xl font-bold mb-6 text-red-400">Admin Controls</h2>
            <UserManagement currentUserEmail={profileUser.email} />
          </div>
        )}
      </div>
    </div>
  );
}
