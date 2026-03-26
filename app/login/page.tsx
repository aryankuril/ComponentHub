// app/login/page.tsx
import { signIn } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { auth } from '@/lib/server-auth';
import LoginForm from '@/AllComponents/auth/LoginForm';

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Login | Bombay Blokes Ready Components",
  description:
    "Login to your Bombay Blokes account to access premium Next.js, React, and Tailwind CSS components and boost your development workflow.",
};

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