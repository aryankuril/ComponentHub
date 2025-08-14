// components/profile/UserManagement.tsx
'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

export default function UserManagement({ currentUserEmail }: { currentUserEmail: string }) {
  const { data: session } = useSession();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    const res = await fetch('/api/user');
    const data = await res.json();
    setUsers(data);
    setLoading(false);
  };

  useEffect(() => {
    if (session?.user?.role === 'admin') {
      fetchUsers();
    }
  }, [session]);

  const handleRoleChange = async (userId: string, newRole: 'user' | 'admin') => {
    await fetch(`/api/user/${userId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role: newRole }),
    });
    fetchUsers(); // Re-fetch users to update the list
  };

  if (loading) return <p>Loading users...</p>;

  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <h3 className="text-xl font-semibold mb-4">Manage All Users</h3>
      <ul className="space-y-4">
        {users.map((user) => (
          <li key={user._id} className="flex justify-between items-center bg-gray-700 p-4 rounded-md">
            <div>
              <p className="font-medium">{user.name}</p>
              <p className="text-sm text-gray-400">{user.email}</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="capitalize px-2 py-1 text-xs font-bold rounded-full" style={{ backgroundColor: user.role === 'admin' ? 'rgba(255, 99, 132, 0.2)' : 'rgba(75, 192, 192, 0.2)', color: user.role === 'admin' ? '#ef4444' : '#60a5fa' }}>
                {user.role}
              </span>
              {user.email !== currentUserEmail && (
                <select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user._id, e.target.value as 'user' | 'admin')}
                  className="bg-gray-900 text-white border-gray-600 rounded-md text-sm p-1"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}