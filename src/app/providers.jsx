'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import ScrollProgress from '../components/ui/ScrollProgress';
import { CartProvider } from '../context/CartContext';

// Use opacity-only transitions to avoid creating a containing block that breaks position: fixed
const variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export default function Providers({ children }) {
  const pathname = usePathname();

  // On route change, if a target is set (from Navbar), scroll to it without adding a hash.
  // Otherwise, default to scrolling to top for this demo.
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let target = null;
    try {
      target = sessionStorage.getItem('scrollTarget');
    } catch {}

    if (target && pathname === '/') {
      // Give the page a tick to render before measuring
      const id = window.setTimeout(() => {
        if (target === 'TOP') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          const el = document.querySelector(target);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        try { sessionStorage.removeItem('scrollTarget'); } catch {}
      }, 50);
      return () => window.clearTimeout(id);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname]);

  return (
    <CartProvider>
      <ScrollProgress />
      <AnimatePresence mode="wait" initial={true}>
        <motion.main
          key={pathname}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="min-h-screen"
        >
          {children}
        </motion.main>
      </AnimatePresence>
    </CartProvider>
  );
}
