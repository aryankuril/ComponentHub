'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Navbar() {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();

  /* ===============================
     FETCH FIRST COMPONENT + NAVIGATE
  =============================== */
  const handleComponentsClick = async () => {
    try {
      const res = await fetch('/api/components');

      if (!res.ok) {
        throw new Error('Failed to fetch components');
      }

      const components = await res.json();

      if (Array.isArray(components) && components.length > 0) {
        router.push(`/components/${components[0]._id}`);
      } else {
        console.warn('No components found');
      }
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, type: 'spring' }}
      className="fixed top-0 w-full z-50 bg-black border-b border-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="ComponentHub Logo"
              width={230}
              height={40}
              className="object-contain -ml-4"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6 items-center">

            {/* Normal Links */}
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className="white-text hover:text-[#F9B31B] transition duration-300"
              >
                {item.name}
              </Link>
            ))}

            {/* Components Button */}
           <Link
  href="/components"
  className="white-text hover:text-[#F9B31B] transition duration-300"
>
  Components
</Link>

          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center space-x-4 white-text">
            {!session ? (
              <>
                <Link href="/login">Login</Link>
                <Link
                  href="/signup"
                  className="bg-[#F9B31B] text-black font-semibold rounded-md px-6 py-2"
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
                <button className="p-2 rounded-full hover:bg-gray-700">
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
                        className="block px-4 py-2 text-sm hover:bg-gray-700"
                      >
                        My Profile
                      </Link>

                      {session.user?.role === 'admin' && (
                        <Link
                          href="/admin"
                          className="block px-4 py-2 text-sm hover:bg-gray-700"
                        >
                          Admin Panel
                        </Link>
                      )}

                      <button
                        onClick={() => signOut()}
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-700"
                      >
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black border-t border-border">
          <div className="px-4 py-5 space-y-3">

            <Link
              href="/"
              onClick={() => setIsMenuOpen(false)}
              className="block text-white"
            >
              Home
            </Link>

           <Link
  href="/components"
  onClick={() => setIsMenuOpen(false)}
  className="block text-white"
>
  Components
</Link>

            <Link
              href="/about"
              onClick={() => setIsMenuOpen(false)}
              className="block text-white"
            >
              About
            </Link>

            <Link
              href="/contact"
              onClick={() => setIsMenuOpen(false)}
              className="block text-white"
            >
              Contact
            </Link>

            <hr className="border-gray-700" />

            {!session ? (
              <>
                <Link
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-white"
                >
                  Login
                </Link>

                <Link
                  href="/signup"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-white"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <button
                onClick={() => {
                  signOut();
                  setIsMenuOpen(false);
                }}
                className="block text-white"
              >
                Logout
              </button>
            )}

          </div>
        </div>
      )}
    </motion.nav>
  );
}