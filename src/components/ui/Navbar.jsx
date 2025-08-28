'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 inset-x-0 z-[110] border-b transition-all duration-300 ${
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

        <div className="flex items-center gap-3">
          <a
            href="#products"
            className="hidden sm:inline-flex px-4 py-2 rounded-lg bg-gradient-to-r from-amber-600 to-amber-700 text-white text-sm font-medium hover:from-amber-500 hover:to-amber-600 transition-colors"
          >
            Shop Now
          </a>
        </div>
      </div>
    </motion.header>
  );
}
