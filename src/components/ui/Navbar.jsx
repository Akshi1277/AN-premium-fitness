'use client';

import { useEffect, useState } from 'react';
import { Menu, X, Dumbbell, ChevronDown, Search, User, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { motion } from 'framer-motion';

export default function Navbar() {
  const { totals } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleSectionClick = (selector) => (e) => {
    e.preventDefault();
    const go = () => {
      const el = document.querySelector(selector);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (window.location.pathname !== '/') {
          // ensure URL shows '/'
          history.replaceState(null, '', '/');
        }
      }
    };
    if (pathname === '/') {
      go();
    } else {
      try {
        sessionStorage.setItem('scrollTarget', selector);
      } catch {}
      router.push('/');
    }
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    const goTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (window.location.pathname !== '/') {
        history.replaceState(null, '', '/');
      }
    };
    if (pathname === '/') {
      goTop();
    } else {
      try { sessionStorage.setItem('scrollTarget', 'TOP'); } catch {}
      router.push('/');
    }
  };

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
        <Link href="/" className="flex items-center gap-3" onClick={handleHomeClick}>
          <div className="relative w-9 h-9 rounded-full overflow-hidden ring-2 ring-amber-500/40">
            <Image src="/images/logo/anfitness.jpg" alt="ANFitness Logo" fill className="object-cover" priority />
          </div>
          <span className="text-white font-bold tracking-wide text-lg">
            <span className="text-amber-400">AN</span>Fitness
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm">
          <Link href="/" onClick={handleHomeClick} className="text-white/80 hover:text-white transition-colors">Home</Link>
          <a href="#products" onClick={handleSectionClick('#products')} className="text-white/80 hover:text-white transition-colors">Products</a>
          <a href="#categories" onClick={handleSectionClick('#categories')} className="text-white/80 hover:text-white transition-colors">Categories</a>
          <a href="#testimonials" onClick={handleSectionClick('#testimonials')} className="text-white/80 hover:text-white transition-colors">Testimonials</a>
          <a href="#contact" onClick={handleSectionClick('#contact')} className="text-white/80 hover:text-white transition-colors">Contact</a>
        </nav>

        {/* Mobile actions */}
        <div className="md:hidden ml-auto flex items-center gap-2">
          {/* Cart icon for mobile */}
          <Link
            href="/cart"
            className="relative inline-flex items-center justify-center w-10 h-10 rounded-lg border border-white/10 text-gray-200 hover:bg-white/10"
            aria-label="Cart"
          >
            <ShoppingBag size={18} className="text-amber-300" />
            {totals.count > 0 && (
              <span className="absolute -top-1 -right-1 text-[10px] px-1 py-0.5 rounded-full bg-amber-600 text-white">
                {totals.count}
              </span>
            )}
          </Link>

          {/* Hamburger */}
          <button
            className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-white/10 text-gray-200 hover:bg-white/10"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-3">
          <a
            href="#products"
            className="hidden sm:inline-flex px-4 py-2 rounded-lg border border-amber-500/40 text-amber-300 hover:bg-amber-500/10 hover:text-amber-200 transition-colors text-sm font-medium"
          >
            Shop Now
          </a>
          <Link
            href="/cart"
            className="relative inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-white/10 text-white/80 hover:bg-white/10 hover:text-white transition-colors"
            aria-label="Cart"
          >
            <ShoppingBag size={18} className="text-amber-300" />
            <span className="hidden md:inline">Cart</span>
            {totals.count > 0 && (
              <span className="absolute -top-2 -right-2 text-xs px-1.5 py-0.5 rounded-full bg-amber-600 text-white">
                {totals.count}
              </span>
            )}
          </Link>
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
            <Link href="/" className="block px-3 py-2 rounded text-white/80 hover:text-white hover:bg-white/5" onClick={(e) => { handleHomeClick(e); setMobileOpen(false); }}>
              Home
            </Link>
            <a href="#products" className="block px-3 py-2 rounded text-white/80 hover:text-white hover:bg-white/5" onClick={(e) => { handleSectionClick('#products')(e); setMobileOpen(false); }}>
              Products
            </a>
            <a href="#categories" className="block px-3 py-2 rounded text-white/80 hover:text-white hover:bg-white/5" onClick={(e) => { handleSectionClick('#categories')(e); setMobileOpen(false); }}>
              Categories
            </a>
            <a href="#testimonials" className="block px-3 py-2 rounded text-white/80 hover:text-white hover:bg-white/5" onClick={(e) => { handleSectionClick('#testimonials')(e); setMobileOpen(false); }}>
              Testimonials
            </a>
            <a href="#contact" className="block px-3 py-2 rounded text-white/80 hover:text-white hover:bg-white/5" onClick={(e) => { handleSectionClick('#contact')(e); setMobileOpen(false); }}>
              Contact
            </a>
            <div className="mt-4 border-t border-white/10 pt-4 flex items-center gap-3">
            </div>
            </div>
          </motion.nav>
        </>
      )}
    </motion.header>
  );
}
