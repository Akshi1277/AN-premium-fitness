'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
      if (window.scrollY > 0) setMobileOpen(false);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 inset-x-0 z-[120] border-b transition-all duration-300 ${
        scrolled
          ? 'bg-black/80 backdrop-blur-md border-white/10'
          : 'bg-transparent backdrop-blur-0 border-transparent'
      }`}
      role="banner"
    >
      <div className="container mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="#home" className="flex items-center gap-3">
          <div className="relative w-9 h-9 rounded-full overflow-hidden ring-2 ring-amber-500/40">
            <Image src="/images/logo/anfitness.jpg" alt="ANFitness Logo" fill className="object-cover" priority />
          </div>
          <span className="text-white font-bold tracking-wide text-lg">
            <span className="text-amber-400">AN</span>Fitness
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm">
          {[
            { href: '#home', label: 'Home' },
            { href: '#products', label: 'Products' },
            { href: '#categories', label: 'Categories' },
            { href: '#testimonials', label: 'Testimonials' },
            { href: '#contact', label: 'Contact' },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-gray-300 hover:text-amber-400 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden ml-auto inline-flex items-center justify-center w-10 h-10 rounded-lg border border-white/10 text-gray-200 hover:bg-white/10"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <div className="hidden sm:flex items-center gap-3">
          <a
            href="#products"
            className="hidden sm:inline-flex px-4 py-2 rounded-lg border border-amber-500/40 text-amber-300 hover:bg-amber-500/10 hover:text-amber-200 transition-colors text-sm font-medium"
          >
            Shop Now
          </a>
        </div>
      </div>

      {/* Mobile menu panel + overlay */}
      {mobileOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-16 inset-x-0 bottom-0 z-[100] bg-black/50"
            onClick={() => setMobileOpen(false)}
          />
          {/* Panel */}
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="fixed top-16 inset-x-0 z-[110] md:hidden border-t border-white/10 bg-black/80 backdrop-blur-md"
          >
            <div className="px-6 py-4 space-y-2">
            {[
              { href: '#home', label: 'Home' },
              { href: '#products', label: 'Products' },
              { href: '#categories', label: 'Categories' },
              { href: '#testimonials', label: 'Testimonials' },
              { href: '#contact', label: 'Contact' },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block w-full text-left px-3 py-3 rounded-md text-gray-200 hover:bg-white/10 hover:text-amber-400 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </a>
            ))}
            </div>
          </motion.nav>
        </>
      )}
    </motion.header>
  );
}
