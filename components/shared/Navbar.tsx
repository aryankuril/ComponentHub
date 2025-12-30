'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Code, Zap, User } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  interface SessionUser {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string | null;
  }

  interface Session {
    user?: SessionUser;
    [key: string]: unknown;
  }

  const { data: session } = useSession() as { data: Session | null };
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Components', path: '/categories' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  /* ===============================
     Categories click handler
  =============================== */
  const handleCategoriesClick = async () => {
    try {
      const res = await fetch('/api/components');
      const components = await res.json();

      if (components?.length > 0) {
        router.push(`/components/${components[0]._id}`);
      } else {
        router.push('/categories');
      }
    } catch (error) {
      console.error(error);
      router.push('/categories');
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, type: 'spring' }}
      className="fixed top-0 w-full z-50 bg-black backdrop-blur-xl border-b border-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <Code className="h-8 w-8 white-text group-hover:animate-pulse" />
              <Zap className="h-4 w-4 white-text absolute -top-1 -right-1 animate-float" />
            </div>
            <span className="text-xl font-bold text-[#F9B31B]">
              ComponentHub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-4">
            {navItems.map((item) =>
              item.name === 'Components' ? (
                <button
                  key={item.name}
                  onClick={handleCategoriesClick}
                  className="px-3 py-2 white-text rounded-md text-base font-medium  
                             transition-all duration-300 hover:text-[#F9B31B] hover:bg-[#F9B31B]/5 cursor-pointer"
                >
                  {item.name}
                </button>
              ) : (
                <Link
                  key={item.name}
                  href={item.path}
                  className="px-3 py-2 white-text rounded-md text-base font-medium 
                             transition-all duration-300 hover:text-[#F9B31B] hover:bg-[#F9B31B]/5"
                >
                  {item.name}
                </Link>
              )
            )}
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center space-x-4 white-text">
            {!session ? (
              <>
                <Link href="/login" className="text-purple">
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="bg-[#F9B31B] text-black font-semibold rounded-md px-6 py-2 
                             transition-all duration-300 hover:shadow-lg"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <div
                className="relative"
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <button className="p-2 rounded-full hover:bg-gray-700 cursor-pointer">
                  <User className="h-6 w-6 text-[#F9B31B]" />
                </button>

                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 rounded-md bg-gray-800 shadow-lg"
                    >
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-sm white-text hover:bg-gray-700"
                      >
                        My Profile
                      </Link>

                      {session.user?.role === 'admin' && (
                        <Link
                          href="/admin"
                          className="block px-4 py-2 text-sm white-text hover:bg-gray-700"
                        >
                          Admin Panel
                        </Link>
                      )}

                      <button
                        onClick={() => signOut()}
                        className="block w-full text-left px-4 py-2 text-sm white-text hover:bg-gray-700"
                      >
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {/* Mobile Navigation */}
{isMenuOpen && (
  <div className="md:hidden bg-black border-t border-border h-screen">
    <div className="px-2 py-5 space-y-2">

      {/* Main Nav Items */}
      {navItems.map((item) =>
        item.name === 'Components' ? (
          <button
            key={item.name}
            onClick={() => {
              handleCategoriesClick();
              setIsMenuOpen(false);
            }}
            className="block w-full text-left px-3 py-2 text-base font-medium text-white"
          >
            {item.name}
          </button>
        ) : (
          <Link
            key={item.name}
            href={item.path}
            onClick={() => setIsMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-white"
          >
            {item.name}
          </Link>
        )
      )}

      <hr className="my-2 border-border" />

      {/* 🔓 LOGGED OUT (FIX) */}
      {!session && (
        <>
          <Link
            href="/login"
            onClick={() => setIsMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-white"
          >
            Login
          </Link>

          <Link
            href="/signup"
            onClick={() => setIsMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-white"
          >
            Sign Up
          </Link>
        </>
      )}

      {/* 🔐 LOGGED IN */}
      {session && (
        <>
          <Link
            href="/profile"
            onClick={() => setIsMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-white"
          >
            My Profile
          </Link>

          {session.user?.role === 'admin' && (
            <Link
              href="/admin"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-white"
            >
              Admin Panel
            </Link>
          )}

          <button
            onClick={() => {
              signOut();
              setIsMenuOpen(false);
            }}
            className="block w-full text-left px-3 py-2 text-base font-medium text-white"
          >
            Logout
          </button>
        </>
      )}
    </div>
  </div>
)}

    </motion.nav>
  );
}
