// app/login/page.tsx
import { signIn } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { auth } from '@/lib/server-auth';
import LoginForm from '@/components/auth/LoginForm';

export default async function LoginPage() {
  const session = await auth();
  if (session) {
    redirect('/profile'); // Redirect logged-in users
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="p-8 rounded-lg shadow-lg bg-gray-900 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>
        <LoginForm />
      </div>
    </div>
  );
}