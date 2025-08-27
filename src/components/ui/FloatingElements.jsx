'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const FloatingIcon = ({ icon, delay = 0, duration = 4 }) => {
  return (
    <motion.div
      className="absolute text-4xl opacity-20 pointer-events-none"
      initial={{ 
        x: Math.random() * window.innerWidth,
        y: window.innerHeight + 100,
        rotate: 0,
        scale: 0
      }}
      animate={{
        y: -100,
        rotate: 360,
        scale: [0, 1, 1, 0],
        x: Math.random() * window.innerWidth
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatDelay: Math.random() * 5,
        ease: "linear"
      }}
    >
      {icon}
    </motion.div>
  );
};

const FloatingElements = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const icons = ['💪', '🏋️', '🤸', '🧘', '⚡', '🔥', '💯', '🎯', '🚀', '⭐'];

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {icons.map((icon, index) => (
        <FloatingIcon
          key={index}
          icon={icon}
          delay={index * 0.5}
          duration={4 + Math.random() * 3}
        />
      ))}
    </div>
  );
};

export default FloatingElements;