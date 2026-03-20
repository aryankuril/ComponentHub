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

 <div className="  container py-5 px-10  inset-x-0 z-[100000]">
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, type: 'spring' }}
               className="  container h-[90px] bg-[rgba(142,142,142,0.20)] rounded-[20px] backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.1)] items-center absolute inset-x-0 z-[100001]"

    >
      <div className=" px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/bblogo.webp" 
              alt="ComponentHub Logo"
              width={230}
              height={40}
              className="object-contain -ml-4"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6 items-end">

            {/* Normal Links */}
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className="black-text hover:text-[#F9B31B] transition duration-300"
              >
                {item.name}
              </Link>
            ))}

            {/* Components Button */}
           <Link
  href="/components"
  className="black-text hover:text-[#F9B31B] transition duration-300"
>
  Components
</Link>

          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center space-x-4 black-text">
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
    {isMenuOpen ? (
      <X className="w-8 h-8 text-black" />
    ) : (
      <Menu className="w-8 h-8 text-black" />
    )}
  </button>
</div>
        </div>
      </div>

      {/* Mobile Menu */}
     {isMenuOpen && (
  <div className="md:hidden fixed inset-0 min-h-screen bg-white z-[9999] lg:mt-0 -mt-5">

    {/* Close Button */}
    <button
      onClick={() => setIsMenuOpen(false)}
      className="absolute top-6 right-6"
    >
      <X className="w-8 h-8 text-black" />
    </button>

    <div className="px-6 py-20 space-y-6 text-black text-lg">

      <Link
        href="/"
        onClick={() => setIsMenuOpen(false)}
        className="block"
      >
        Home
      </Link>

      <Link
        href="/components"
        onClick={() => setIsMenuOpen(false)}
        className="block"
      >
        Components
      </Link>

      <Link
        href="/about"
        onClick={() => setIsMenuOpen(false)}
        className="block"
      >
        About
      </Link>

      <Link
        href="/contact"
        onClick={() => setIsMenuOpen(false)}
        className="block"
      >
        Contact
      </Link>

      <hr className="border-gray-300" />

      {!session ? (
        <>
          <Link
            href="/login"
            onClick={() => setIsMenuOpen(false)}
            className="block"
          >
            Login
          </Link>

          <Link
            href="/signup"
            onClick={() => setIsMenuOpen(false)}
            className="block font-semibold"
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
          className="block"
        >
          Logout
        </button>
      )}
    </div>
  </div>
)}
    </motion.nav>
    </div>
  );
}