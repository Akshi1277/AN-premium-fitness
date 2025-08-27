'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const MorphingBlob = ({ 
  size = 200, 
  colors = ['#3b82f6', '#8b5cf6', '#ec4899'], 
  className = "",
  animationSpeed = 3 
}) => {
  const [path, setPath] = useState('');

  useEffect(() => {
    const generatePath = () => {
      const points = 8;
      const radius = size / 2;
      const centerX = size / 2;
      const centerY = size / 2;
      
      let pathString = '';
      
      for (let i = 0; i <= points; i++) {
        const angle = (i / points) * Math.PI * 2;
        const variation = 0.3 + Math.random() * 0.4;
        const x = centerX + Math.cos(angle) * radius * variation;
        const y = centerY + Math.sin(angle) * radius * variation;
        
        if (i === 0) {
          pathString += `M ${x} ${y}`;
        } else {
          const prevAngle = ((i - 1) / points) * Math.PI * 2;
          const prevVariation = 0.3 + Math.random() * 0.4;
          const prevX = centerX + Math.cos(prevAngle) * radius * prevVariation;
          const prevY = centerY + Math.sin(prevAngle) * radius * prevVariation;
          
          const cp1x = prevX + Math.cos(prevAngle + Math.PI / 2) * radius * 0.2;
          const cp1y = prevY + Math.sin(prevAngle + Math.PI / 2) * radius * 0.2;
          const cp2x = x + Math.cos(angle - Math.PI / 2) * radius * 0.2;
          const cp2y = y + Math.sin(angle - Math.PI / 2) * radius * 0.2;
          
          pathString += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x} ${y}`;
        }
      }
      
      pathString += ' Z';
      return pathString;
    };

    const interval = setInterval(() => {
      setPath(generatePath());
    }, 1000 / animationSpeed);

    setPath(generatePath());

    return () => clearInterval(interval);
  }, [size, animationSpeed]);

  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="absolute inset-0">
        <defs>
          <linearGradient id={`gradient-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
            {colors.map((color, index) => (
              <stop
                key={index}
                offset={`${(index / (colors.length - 1)) * 100}%`}
                stopColor={color}
                stopOpacity={0.8}
              />
            ))}
          </linearGradient>
          <filter id={`glow-${size}`}>
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        <motion.path
          d={path}
          fill={`url(#gradient-${size})`}
          filter={`url(#glow-${size})`}
          animate={{
            d: path,
          }}
          transition={{
            duration: 1 / animationSpeed,
            ease: "easeInOut"
          }}
        />
      </svg>
    </div>
  );
};

export default MorphingBlob;