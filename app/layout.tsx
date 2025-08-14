// app/layout.tsx
import './globals.css';
import { Inter } from 'next/font/google';
import NextAuthSessionProvider from '@/components/providers/NextAuthSessionProvider';
import { auth } from '@/lib/server-auth';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Component Library',
  description: 'A Next.js component library with a modern dark theme.',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-black text-white`}>
        <NextAuthSessionProvider session={session}>
          {children}
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}