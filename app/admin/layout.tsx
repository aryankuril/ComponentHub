// app/admin/layout.tsx
import { auth } from '@/lib/server-auth';
import { redirect } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';
// import Navbar from '@/components/shared/Navbar';
// import Footer from '@/components/shared/Footer';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session || session.user.role !== 'admin') {
    redirect('/');
  }

  return (
    <div  style={{ background: "linear-gradient(153deg, #EBEBEB 23.63%, #FFD54F 140.11%)" }} 
    className="flex flex-col min-h-screen text-white">
      {/* <Navbar /> */}
      <div className="flex flex-1 ">
         {/* pt-16 for the fixed navbar */}
        <AdminSidebar />
        <main className="flex-1 p-8 overflow-y-auto">
          {children}
        </main>
      </div>
      {/* <Footer /> */}
    </div>
  );
}