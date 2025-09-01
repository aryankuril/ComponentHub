'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend,
  PieChart, Pie, Cell,
  AreaChart, Area
} from 'recharts';

interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  dateCreated: string;
}

interface Category {
  _id: string;
  name: string;
}

interface Component {
  _id: string;
  name: string;
  dateCreated: string;
  category?: Category;
}

import { format } from 'date-fns';

export default function AdminDashboardPage() {
const [users, setUsers] = useState<User[]>([]);
const [categories, setCategories] = useState<Category[]>([]);
const [components, setComponents] = useState<Component[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, categoriesRes, componentsRes] = await Promise.all([
          fetch('/api/users'),
          fetch('/api/categories'),
          fetch('/api/components'),
        ]);

        const [usersData, categoriesData, componentsData] = await Promise.all([
          usersRes.json(),
          categoriesRes.json(),
          componentsRes.json(),
        ]);

        setUsers(usersData);
        setCategories(categoriesData);
        setComponents(componentsData);
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="p-8 text-center text-black">Loading dashboard...</div>;

  // ----------- Users Chart Data -----------
  const usersData = users.map((u) => ({ name: u.name, signups: 1 }));

  // ----------- Categories Chart Data -----------
  const categoryData = categories.map((c) => ({
    name: c.name,
    value: Math.max(
      components.filter((comp) => comp.category?._id === c._id).length,
      0.1
    ),
  }));

  // ----------- Components Growth Data -----------
  const componentsData = Object.values(
    components.reduce(
      (acc: Record<string, { name: string; submissions: number; timestamp: number }>, comp) => {
        if (!comp.dateCreated) return acc;

const parsedDate = new Date(comp.dateCreated);

        if (isNaN(parsedDate.getTime())) return acc;

        const dateKey = format(parsedDate, 'yyyy-MM-dd'); // sorting key
        if (!acc[dateKey]) acc[dateKey] = {
          name: format(parsedDate, 'MMM dd'), // label for XAxis
          submissions: 0,
          timestamp: parsedDate.getTime()
        };
        acc[dateKey].submissions += 1;
        return acc;
      },
      {}
    )
  ).sort((a, b) => a.timestamp - b.timestamp); // sort by actual timestamp

  const COLORS = [
    '#3b82f6', '#22c55e', '#eab308', '#ef4444', '#8b5cf6',
    '#ec4899', '#14b8a6', '#f97316', '#0ea5e9', '#84cc16',
    '#f43f5e', '#6366f1', '#06b6d4', '#d946ef', '#f59e0b',
    '#10b981', '#4b5563', '#71717a', '#a855f7', '#f87171'
  ];

  return (
    <div className="p-10 ">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {/* Users Growth */}
        <div className="bg-white p-4 rounded-2xl shadow-lg text-black">
          <h2 className="text-xl font-semibold mb-4 ml-5">User Signups</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={usersData}>
              <XAxis dataKey="name" hide />
              <YAxis stroke="black" />
              <Tooltip />
              <Legend wrapperStyle={{ color: '#000' }} />
              <Bar dataKey="signups" fill="#3b82f6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Categories */}
        <div className="bg-white p-4 rounded-2xl shadow-lg text-black">
          <h2 className="text-xl font-semibold mb-4 ml-5">Categories Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData.filter(c => c.value > 0)}
                dataKey="value"
                outerRadius={100}
                label
              >
                {categoryData.filter(c => c.value > 0).map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Components Growth */}
        <div className="col-span-1 md:col-span-2 bg-white p-4 rounded-2xl shadow-lg text-black">
          <h2 className="text-xl font-semibold mb-4 ml-5">Components Growth</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={componentsData.length ? componentsData : [{ name: 'No Data', submissions: 0 }]}>
              <defs>
                <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" stroke="black" />
              <YAxis stroke="black" />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="submissions"
                stroke="#3b82f6"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorGrowth)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
}
 