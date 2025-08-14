// app/admin/users/page.tsx
'use client';
import { useState, useEffect } from 'react';

interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  dateCreated: string;
}

export default function ManageUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/users');
      if (!res.ok) {
        throw new Error('Failed to fetch users. You might not be an admin.');
      }
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId: string, newRole: 'user' | 'admin') => {
    try {
      await fetch('/api/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: userId, role: newRole }),
      });
      fetchUsers(); // Re-fetch users to update the list
    } catch (err) {
      console.error('Failed to update user role:', err);
    }
  };

  const handleDelete = async (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await fetch('/api/users', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: userId }),
        });
        fetchUsers(); // Re-fetch users to update the list
      } catch (err) {
        console.error('Failed to delete user:', err);
      }
    }
  };

  if (loading) return <div className="p-8 text-center">Loading users...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">Manage Users</h1>
      <div className="bg-gray-900 rounded-lg shadow-lg overflow-hidden">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-800 text-gray-400 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Joined</th>
              <th className="py-3 px-6 text-left">Role</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-white text-sm font-light">
            {users.map((user) => (
              <tr key={user._id} className="border-b border-gray-700 hover:bg-gray-800">
                <td className="py-3 px-6 text-left whitespace-nowrap">{user.name}</td>
                <td className="py-3 px-6 text-left">{user.email}</td>
                <td className="py-3 px-6 text-left">{new Date(user.dateCreated).toLocaleDateString()}</td>
                <td className="py-3 px-6 text-left">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value as 'user' | 'admin')}
                    className="bg-gray-700 border border-gray-600 rounded-md py-1 px-2"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className="py-3 px-6 text-center">
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="bg-red-600 hover:bg-red-500 text-white font-bold py-1 px-3 rounded-md transition-colors"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}