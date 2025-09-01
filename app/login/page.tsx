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
    <div >
      
        <LoginForm />
     
    </div>
  );
}