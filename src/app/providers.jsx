'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import ScrollProgress from '../components/ui/ScrollProgress';

const variants = {
  initial: { opacity: 0, y: 10, filter: 'blur(4px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  exit: { opacity: 0, y: -10, filter: 'blur(4px)' },
};

export default function Providers({ children }) {
  const pathname = usePathname();

  // Restore scroll to top on route change for better demo feel
  useEffect(() => {
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return (
    <>
      <ScrollProgress />
      <AnimatePresence mode="wait" initial={true}>
        <motion.main
          key={pathname}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="min-h-screen"
        >
          {children}
        </motion.main>
      </AnimatePresence>
    </>
  );
}
