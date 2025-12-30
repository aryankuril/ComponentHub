// components/admin/AdminSidebar.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Users, FolderTree, List, Layers, LogOut } from 'lucide-react';

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
const [activeTab, setActiveTab] = useState<"dashboard" | "admin" | "categories" | "users" | "components" | "allcomponents">('dashboard');
  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Manage Users', href: '/admin/users', icon: Users },
    { name: 'Manage Categories', href: '/admin/categories', icon: FolderTree },
    { name: 'Manage Components', href: '/admin/components', icon: Layers },
    { name: 'All Components', href: '/admin/allcomponents', icon: List },
  ];

  const handleLogout = () => {
    // TODO: add your logout logic here (clear cookies, redirect, etc.)
    router.push('/login');
  };

  return (

    <div className="w-full md:w-64 bg-black  white-text  p-6 flex flex-col justify-between rounded-r-2xl shadow-xl"> 
      <button
  onClick={handleLogout}
  className="absolute top-4 right-6 rounded-[5px] bg-[#262626] shadow-[2px_2px_0px_0px_#F9B31B] 
             flex justify-center items-center gap-[10px] px-[30px] py-[10px] 
             text-[#F9B31B] font-semibold transition-colors w-full sm:w-auto"
>
  <LogOut size={18} />
  Logout
</button>
   <aside >
      <div>
        <h2 className="text-3xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#FFD54F] to-[#EBEBEB]">
            Admin Panel
          </h2>

        {/* Navigation */}
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.name}
                onClick={() => router.push(item.href)}
                className={`flex items-center gap-3 py-3 px-1 rounded-lg font-semibold transition-colors ${
              activeTab === "dashboard"
                ? "bg-gray-800 text-[#F9B31B] "
                : "hover:bg-gray-800"
            }`}
              >
                <Icon size={20} />
                {item.name}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Logout Button */}
      {/* <div className="mt-8">
        <button
          onClick={handleLogout}
          className="flex items-center w-full justify-center gap-3 py-3 px-4 rounded-lg font-semibold transition-colors bg-red-600 hover:bg-red-700"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div> */}
    </aside>
    </div>
  );
}
