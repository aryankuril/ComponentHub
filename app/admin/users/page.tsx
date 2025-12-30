// app/admin/users/page.tsx
'use client';
import { Trash } from 'lucide-react';
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
      // setUsers(data);
      setUsers(
      data.sort(
        (a: User, b: User) =>
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

  if (loading) return <div className="p-8 text-center text-black">Loading users...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="p-8 " >
      <h1 className="text-4xl font-bold mb-8 text-black">Manage Users</h1>
      <div className=" rounded-lg shadow-lg overflow-hidden ">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-[#FFFFFF] text-[#1D1D1B] uppercase text-sm leading-normal border-b border-gray-700">
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Joined</th>
              <th className="py-3 px-6 text-left">Role</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-black text-sm font-light bg-[#FFFFFF79]">
            {users.map((user) => (
              <tr key={user._id} className="border-b border-gray-700">
                <td className="py-3 px-6 text-left whitespace-nowrap capitalize">{user.name}</td>
                <td className="py-3 px-6 text-left">{user.email}</td>
 <td className="py-3 px-6 text-left">
  {user.dateCreated
    ? new Date(user.dateCreated).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    : 'N/A'}
</td>

                <td className="py-3 px-6 text-left">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value as 'user' | 'admin')}
                    className="bg-black border border-black rounded-md py-1 px-2  white-text "
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className="py-3 px-6 text-center">
                  <button
                    onClick={() => handleDelete(user._id)}
                     className="p-2 rounded-lg text-red-400 hover:bg-red-900 transition-colors"
                  >
                   <Trash size={18} />
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