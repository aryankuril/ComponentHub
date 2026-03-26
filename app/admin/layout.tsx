// app/admin/layout.tsx
import { auth } from '@/lib/server-auth';
import { redirect } from 'next/navigation';
import AdminSidebar from '@/AllComponents/admin/AdminSidebar';
import Navbar from '@/AllComponents/shared/Navbar'
import Footer from '@/AllComponents/shared/Footer'


import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Admin Dashboard | Bombay Blokes",
  description:
    "Manage components, users, and platform settings through the Bombay Blokes admin dashboard with full control and insights.",
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  // Use optional chaining to avoid TS error
  if (!session?.user || session.user.role !== 'admin') {
    redirect('/');
  }

  return (
    <div
      style={{ background: 'linear-gradient(153deg, #EBEBEB 23.63%, #FFD54F 140.11%)' }}
      className="flex flex-col min-h-screen  black-text "
    > <Navbar />


      <div className="flex flex-1">
        <AdminSidebar />
        <main className="flex-1 p-8 overflow-y-auto">{children}</main>
      </div>


      {/* <Footer /> */}
    </div>
  );
}
