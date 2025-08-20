// app/layout.tsx
import './globals.css';
import { Inter } from 'next/font/google';
import NextAuthSessionProvider from '@/components/providers/NextAuthSessionProvider';
// Update this import to match the actual export from server-auth
// For example, if the default export is 'auth', use:
import { getSession } from '@/lib/server-auth';
// Or, if the export is named differently, use the correct name:
// import { correctExportName } from '@/lib/server-auth';

const inter = Inter({ subsets: ['latin'] });

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Component Library',
  description: 'A Next.js component library with a modern dark theme.',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-black text-white`}>
        <NextAuthSessionProvider>
          {children}
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}