'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const GlitchText = ({ 
  children, 
  className = "",
  intensity = 'medium',
  trigger = 'hover' // 'hover', 'always', 'once'
}) => {
  const [isGlitching, setIsGlitching] = useState(trigger === 'always');

  useEffect(() => {
    if (trigger === 'once') {
      setIsGlitching(true);
      const timer = setTimeout(() => setIsGlitching(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [trigger]);

  const intensitySettings = {
    low: { maxOffset: 2, layers: 2, duration: 0.1 },
    medium: { maxOffset: 4, layers: 3, duration: 0.15 },
    high: { maxOffset: 8, layers: 4, duration: 0.2 }
  };

  const settings = intensitySettings[intensity];

  const glitchVariants = {
    normal: { x: 0, y: 0, opacity: 1 },
    glitch: {
      x: [0, -settings.maxOffset, settings.maxOffset, 0],
      y: [0, settings.maxOffset, -settings.maxOffset, 0],
      opacity: [1, 0.8, 0.9, 1],
      transition: {
        duration: settings.duration,
        repeat: Infinity,
        repeatType: 'mirror'
      }
    }
  };

  return (
    <div 
      className={`relative inline-block ${className}`}
      onMouseEnter={() => trigger === 'hover' && setIsGlitching(true)}
      onMouseLeave={() => trigger === 'hover' && setIsGlitching(false)}
    >
      {/* Main text */}
      <motion.span
        className="relative z-10"
        variants={glitchVariants}
        animate={isGlitching ? 'glitch' : 'normal'}
      >
        {children}
      </motion.span>

      {/* Glitch layers */}
      {Array.from({ length: settings.layers }).map((_, i) => (
        <motion.span
          key={i}
          className={`absolute top-0 left-0 ${
            i === 0 ? 'text-red-500' : 
            i === 1 ? 'text-cyan-400' : 
            i === 2 ? 'text-yellow-400' : 'text-green-400'
          } opacity-70`}
          style={{
            clipPath: `polygon(0 ${i * 25}%, 100% ${i * 25}%, 100% ${(i + 1) * 25}%, 0 ${(i + 1) * 25}%)`
          }}
          animate={isGlitching ? {
            x: [0, Math.random() * settings.maxOffset - settings.maxOffset/2],
            y: [0, Math.random() * settings.maxOffset - settings.maxOffset/2],
            opacity: [0.7, 0.3, 0.7]
          } : { x: 0, y: 0, opacity: 0 }}
          transition={{
            duration: settings.duration,
            repeat: Infinity,
            repeatType: 'mirror',
            delay: i * 0.05
          }}
        >
          {children}
        </motion.span>
      ))}
    </div>
  );
};

export default GlitchText;