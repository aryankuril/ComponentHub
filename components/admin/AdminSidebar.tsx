// components/admin/AdminSidebar.tsx
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminSidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', href: '/admin' },
    { name: 'Manage Users', href: '/admin/users' },
    { name: 'Manage Categories', href: '/admin/categories' },
    { name: 'Manage Components', href: '/admin/components' },
    { name: 'All Components', href: '/admin/allcomponents' },
  ];

  return (
    <aside className="w-64 bg-gray-900 text-white p-6 h-full border-r border-gray-800">
      <h2 className="text-2xl font-bold mb-8 text-red-400">Admin Panel</h2>
      <nav>
        <ul className="space-y-4">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`block py-2 px-4 rounded-lg transition-colors duration-200 ${
                  pathname === item.href ? 'bg-red-600 text-white' : 'hover:bg-gray-700 text-gray-300'
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}