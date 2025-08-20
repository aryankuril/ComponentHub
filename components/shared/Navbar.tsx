'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Code, Zap, User } from 'lucide-react';
import { useState } from 'react';
// import { button } from '@/components/ui/button';

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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for the profile dropdown

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Categories', path: '/categories' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

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
              <Code className="h-8 w-8 text-neon-cyan group-hover:animate-pulse" />
              <Zap className="h-4 w-4 text-neon-purple absolute -top-1 -right-1 animate-float" />
            </div>
            <span className="text-xl font-bold bg-gradient-neon bg-clip-text text-transparent">
              ComponentHub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className="block px-3 py-2 text-white rounded-md text-base font-medium transition-all duration-300  hover:text-neon-cyan hover:bg-neon-cyan/5" 
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Auth buttons or Profile Dropdown */}
          <div className="hidden md:flex items-center space-x-4 text-white">
            {!session ? (
              // Login/Signup for unauthenticated users
              <>
                <button className="text-purple ">
                  <Link href="/login">Login</Link>
                </button>
                <button className="flex-1 bg-gradient-to-r from-neon-cyan to-neon-purple text-black font-semibold rounded-md px-6 py-3 flex gap-2 transition-all duration-300 hover:shadow-[0_0_20px_hsl(180,100%,50%),0_0_40px_hsl(262,83%,70%)] hover:-translate-y-0.5 text-sm  hover:bg-neon-cyan/80">
                  <Link href="/signup">Sign Up</Link>
                </button>
              </>
            ) : (
              // Profile dropdown for authenticated users
              <div
                className="relative"
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                {/* Profile Icon */}
                <button className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-700 transition-colors duration-200">
                  <User className="h-6 w-6 text-neon-cyan" />
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none"
                    >
                      <div className="py-1">
                        <Link
                          href="/profile"
                          className="block px-4 py-2 text-sm text-white hover:bg-gray-700 transition-colors duration-200"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          My Profile
                        </Link>
                        {session?.user?.role === 'admin' && (
                          <Link
                            href="/admin"
                            className="block px-4 py-2 text-sm text-neon-purple hover:bg-gray-700 transition-colors duration-200"
                            onClick={() => setIsDropdownOpen(false)}
                          >
                            Admin Panel
                          </Link>
                        )}
                        <button
                          onClick={() => {
                            signOut();
                            setIsDropdownOpen(false);
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700 transition-colors duration-200"
                        >
                          Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Mobile Menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-foreground hover:text-neon-cyan"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden animate-slide-up">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background/95 backdrop-blur-xl border-b border-border">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className="block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 text-foreground hover:text-neon-cyan hover:bg-neon-cyan/5"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 pb-3 border-t border-border">
              {!session ? (
                <div className="flex items-center space-x-3">
                  <button className="flex-1 border border-neon-cyan text-neon-cyan px-4 py-2 rounded-md text-sm font-medium bg-transparent hover:bg-neon-cyan/10">
                    <Link href="/login">Login</Link>
                  </button>
                  {/* <button className="w-full items-center justify-center group bg-gradient-to-r from-neon-cyan to-neon-purple text-black font-semibold rounded-full px-6 py-3 flex gap-2 transition-all duration-300 hover:shadow-[0_0_20px_hsl(180,100%,50%),0_0_40px_hsl(262,83%,70%)] hover:-translate-y-0.5"> */}
                  <button className="flex-1 bg-gradient-to-r from-neon-cyan to-neon-purple text-black font-semibold rounded-full px-6 py-3 flex gap-2 transition-all duration-300 hover:shadow-[0_0_20px_hsl(180,100%,50%),0_0_40px_hsl(262,83%,70%)] hover:-translate-y-0.5 text-sm  hover:bg-neon-cyan/80">
                    <Link href="/signup">Sign Up</Link>
                  </button>
                </div>
              ) : (
                <>
                  <Link
                    href="/profile"
                    className="block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 text-foreground hover:text-neon-cyan hover:bg-neon-cyan/5"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Profile
                  </Link>
                  {session?.user?.role === 'admin' && (
                    <Link
                      href="/admin"
                      className="block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 text-white hover:text-neon-cyan hover:bg-neon-cyan/5"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Admin Panel
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      signOut();
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-md text-base font-medium transition-all duration-300 text-foreground hover:text-neon-cyan hover:bg-neon-cyan/5"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </motion.nav>
  );
}
