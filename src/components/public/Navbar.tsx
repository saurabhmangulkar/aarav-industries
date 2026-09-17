'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight, Phone } from 'lucide-react';

interface NavbarProps {
  phone?: string;
}

export default function Navbar({ phone = '+91 98765 43210' }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      <div className="bg-industrial-950 text-industrial-300 text-xs py-2 px-4 border-b border-industrial-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-accent" />
              <span>Direct Sales: {phone}</span>
            </span>
            <span className="hidden md:inline-block text-industrial-500">|</span>
            <span className="hidden md:inline-block">MIDC Nagpur Plant Operations</span>
          </div>
          <div className="flex items-center space-x-3">
            <Link href="/admin/login" className="hover:text-white transition-colors">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>

      <nav
        className={`bg-white border-b border-industrial-200 transition-all ${
          scrolled ? 'py-3 shadow-md' : 'py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-industrial-900 border border-industrial-700 flex items-center justify-center font-black text-xl text-white tracking-widest">
                AI
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-industrial-900 leading-none">
                  AARAV INDUSTRIES
                </span>
                <span className="text-[10px] uppercase tracking-widest text-industrial-500 font-semibold mt-0.5">
                  Precision Manufacturing
                </span>
              </div>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-colors ${
                    pathname === link.href
                      ? 'text-accent font-semibold'
                      : 'text-industrial-700 hover:text-industrial-950'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/contact"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium bg-industrial-900 text-white hover:bg-industrial-800 transition-colors shadow-sm"
              >
                Send Enquiry
                <ArrowRight className="ml-2 w-4 h-4 text-accent" />
              </Link>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-industrial-700 hover:text-industrial-900 focus:outline-none"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden border-t border-industrial-100 bg-white px-4 pt-3 pb-6 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 text-base font-medium rounded-sm ${
                  pathname === link.href
                    ? 'bg-industrial-50 text-accent font-semibold'
                    : 'text-industrial-700 hover:bg-industrial-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-2">
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center justify-center px-4 py-2.5 bg-industrial-900 text-white font-medium"
              >
                Send Industrial Enquiry
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}