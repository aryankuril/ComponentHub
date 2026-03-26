// app/layout.tsx
import './globals.css';
import { Inter } from 'next/font/google';
import NextAuthSessionProvider from '@/AllComponents/providers/NextAuthSessionProvider';
import { getSession } from '@/lib/server-auth';
import localFont from "next/font/local";
import { Poppins } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";

const miso = localFont({
  src: "/fonts/VAG-Regular2.otf",
  variable: "--font-miso",
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en" className={`${miso.variable} ${poppins.variable}`}>
      <head>
        <link rel="icon" href="/images/favicon.png" type="image/png" />
      </head>
      <body>
        <NextAuthSessionProvider>
          {children}
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}