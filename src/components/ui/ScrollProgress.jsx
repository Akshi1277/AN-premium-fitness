'use client';

import { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const p = docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;
      setProgress(p);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    controls.start({ width: `${progress * 100}%` });
  }, [progress, controls]);

  return (
    <div aria-hidden className="fixed top-0 left-0 right-0 h-[3px] z-[100]">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-700/10 via-purple-700/10 to-pink-700/10 backdrop-blur-[1px]" />
      <motion.div
        className="h-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 shadow-[0_0_12px_rgba(99,102,241,0.6)]"
        initial={{ width: 0 }}
        animate={controls}
        transition={{ type: 'tween', ease: 'easeOut', duration: 0.2 }}
      />
    </div>
  );
}

