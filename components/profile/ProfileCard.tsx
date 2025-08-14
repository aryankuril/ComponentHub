// components/profile/ProfileCard.tsx
'use client';
import { useState } from 'react';
import { useSession } from 'next-auth/react';

export default function ProfileCard({ user }: { user: any }) {
  const { update } = useSession();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [newPassword, setNewPassword] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState('');

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    const res = await fetch(`/api/user/${user.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, newPassword }),
    });

    if (res.ok) {
      const updatedUser = await res.json();
      // Update the session client-side to reflect the changes
      update({ name: updatedUser.name, email: updatedUser.email });
      setMessage('Profile updated successfully!');
      setIsEditing(false);
    } else {
      const error = await res.json();
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="bg-gray-900 p-8 rounded-lg shadow-xl text-center">
      <div className="text-gray-400 text-sm">Role: <span className="font-bold text-red-400 capitalize">{user.role}</span></div>
      {!isEditing ? (
        <>
          <h2 className="mt-4 text-3xl font-bold">{user.name}</h2>
          <p className="text-gray-400">{user.email}</p>
          <button
            onClick={() => setIsEditing(true)}
            className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-full transition-colors"
          >
            Edit Profile
          </button>
        </>
      ) : (
        <form onSubmit={handleUpdate} className="mt-6 space-y-4 max-w-sm mx-auto">
          {message && <p className={`text-sm ${message.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>{message}</p>}
          <div>
            <label className="block text-sm font-medium text-left mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 rounded-md border border-gray-700"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-left mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 rounded-md border border-gray-700"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-left mb-1">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 rounded-md border border-gray-700"
              placeholder="Leave blank to keep current password"
            />
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="px-6 py-2 bg-green-600 hover:bg-green-500 rounded-full transition-colors"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-full transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}