'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Menu, X, User, LogOut } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => pathname === path;

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/tournaments', label: 'Tournaments' },
    { href: '/scrims', label: 'Scrims' },
    { href: '/leaderboard', label: 'Leaderboard' },
  ];

  const handleLogout = async () => {
    await logout();
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#181924]/80 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-headline text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#a259ff] to-[#8e44ec]">
              Nexus Esports
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm font-medium transition-colors duration-200 hover:text-[#a259ff] ${
                  isActive(link.href) ? 'text-[#a259ff]' : 'text-gray-300'
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#a259ff]" />
                )}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-300">
                  Welcome, {user?.username || 'User'}
                </span>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-red-500 bg-transparent text-red-500 h-9 px-4 py-2 [&:hover]:bg-red-500 [&:hover]:text-white"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="border-[#a259ff] text-[#a259ff] hover:bg-[#a259ff] hover:text-white transition-all duration-300"
                >
                  <Link href="/login">Login</Link>
                </Button>
                <Button
                  asChild
                  size="sm"
                  className="bg-[#a259ff] hover:bg-[#8e44ec] text-white transition-all duration-300"
                >
                  <Link href="/register">Register</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-300 hover:text-[#a259ff] transition-colors duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#181924]/95 backdrop-blur-md transition-all duration-300">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors duration-200 hover:text-[#a259ff] ${
                    isActive(link.href) ? 'text-[#a259ff]' : 'text-gray-300'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              {isAuthenticated ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-red-500 bg-transparent text-red-500 h-9 px-4 py-2 [&:hover]:bg-red-500 [&:hover]:text-white"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </button>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="border-[#a259ff] text-[#a259ff] hover:bg-[#a259ff] hover:text-white transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Link href="/login">Login</Link>
                  </Button>
                  <Button
                    asChild
                    size="sm"
                    className="bg-[#a259ff] hover:bg-[#8e44ec] text-white transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Link href="/register">Register</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
} 