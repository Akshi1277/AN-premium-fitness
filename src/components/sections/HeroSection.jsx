'use client';

import { motion, useAnimation, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import * as THREE from 'three';

// Dynamically import Three.js components with SSR disabled
const Canvas = dynamic(
  () => import('@react-three/fiber').then((mod) => mod.Canvas),
  { ssr: false }
);

const Sphere = dynamic(
  () => import('@react-three/drei').then((mod) => mod.Sphere),
  { ssr: false }
);

const OrbitControls = dynamic(
  () => import('@react-three/drei').then((mod) => mod.OrbitControls),
  { ssr: false }
);

// Custom useFrame implementation (no args passed to callback)
const useFrame = (callback) => {
  const frameRef = useRef();
  useEffect(() => {
    frameRef.current = callback;
    let frameId;
    const animate = () => {
      if (typeof frameRef.current === 'function') frameRef.current();
      frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [callback]);
};

// Subtle GLSL background shader plane
const BackgroundShader = () => {
  const mesh = useRef();
  const materialRef = useRef();
  const start = useRef(performance.now());

  const vertexShader = `
    varying vec2 vUv;
    void main(){
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    precision mediump float;
    varying vec2 vUv;
    uniform float uTime;
    // simple moving gradient with slight noise-like waves
    float wave(vec2 uv, float speed, float scale) {
      return sin((uv.x + uv.y) * scale + uTime * speed);
    }
    void main(){
      vec2 uv = vUv;
      float w1 = wave(uv, 0.4, 3.0);
      float w2 = wave(uv + 0.2, 0.7, 5.0);
      float w = (w1 + w2) * 0.25;
      vec3 c1 = vec3(0.08, 0.2, 0.6);  // blue
      vec3 c2 = vec3(0.4, 0.1, 0.6);  // purple
      vec3 c3 = vec3(0.06, 0.06, 0.1); // dark
      vec3 grad = mix(c1, c2, uv.x) + w * 0.1;
      grad = mix(grad, c3, 0.15);
      gl_FragColor = vec4(grad, 0.6);
    }
  `;

  const uniforms = useRef({ uTime: { value: 0 } });

  useFrame(() => {
    if (!materialRef.current) return;
    const t = (performance.now() - start.current) / 1000;
    materialRef.current.uniforms.uTime.value = t;
  });

  return (
    <mesh ref={mesh} position={[0, 0, -2]}>
      <planeGeometry args={[30, 18, 1, 1]} />
      <shaderMaterial
        ref={materialRef}
        attach="material"
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms.current}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
};

// 3D Floating Sphere Component
const FloatingSphere = () => {
  const meshRef = useRef();
  const clockRef = useRef(new THREE.Clock());

  useFrame(() => {
    if (meshRef.current) {
      const elapsedTime = clockRef.current.getElapsedTime();
      meshRef.current.rotation.y = elapsedTime * 0.15;
      meshRef.current.position.y = Math.sin(elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <Sphere ref={meshRef} args={[2, 64, 64]} scale={1.35}>
      <meshStandardMaterial
        color="#2563eb"
        metalness={0.35}
        roughness={0.35}
        emissive="#1d4ed8"
        emissiveIntensity={0.12}
        transparent
        opacity={0.75}
      />
      <pointLight position={[10, 10, 10]} intensity={1} color="#3b82f6" />
    </Sphere>
  );
};

// Animated Text Component
const AnimatedText = ({ text, className, delay = 0 }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  // Show content immediately to avoid hidden state issues
  useEffect(() => {
    controls.start('visible');
  }, [controls]);

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.04 * i + delay },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={container}
      initial="hidden"
      animate={controls}
      custom={1}
    >
      {text.split('').map((char, index) => (
        <motion.span key={index} variants={child}>
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.div>
  );
};

const HeroSection = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  };

  const [mounted, setMounted] = useState(false);

  // Mouse-based parallax
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const textX = useSpring(useTransform(mx, [-0.5, 0.5], [-20, 20]), { stiffness: 120, damping: 15 });
  const textY = useSpring(useTransform(my, [-0.5, 0.5], [-10, 10]), { stiffness: 120, damping: 15 });
  const sphereX = useSpring(useTransform(mx, [-0.5, 0.5], [15, -15]), { stiffness: 120, damping: 18 });
  const sphereY = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { stiffness: 120, damping: 18 });

  const handleMouseMove = (e) => {
    if (!mounted) return;
    const { innerWidth, innerHeight } = window;
    mx.set(e.clientX / innerWidth - 0.5);
    my.set(e.clientY / innerHeight - 0.5);
  };

  const handleMouseLeave = () => {
    mx.set(0);
    my.set(0);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-gray-900">
        <div className="container mx-auto px-4 text-center">
          <div className="h-96"></div>
        </div>
      </section>
    );
  }

  return (
    <section
      className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-gray-900"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {mounted && [...Array(20)].map((_, i) => {
          // Generate stable random values on the client side only
          const width = 10 + Math.random() * 20;
          const height = 10 + Math.random() * 20;
          const left = Math.random() * 100;
          const top = Math.random() * 100;
          const duration = 5 + Math.random() * 5;
          const delay = Math.random() * 5;
          
          return (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white/10"
              style={{
                width: `${width}px`,
                height: `${height}px`,
                left: `${left}%`,
                top: `${top}%`,
              }}
              initial={false}
              animate={{
                y: [0, -100],
                opacity: [0, 0.5, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: duration,
                repeat: Infinity,
                ease: 'linear',
                delay: delay,
              }}
            />
          );
        })}
      </div>

      {/* 3D Sphere */}
      <motion.div
        className="absolute right-4 sm:right-10 md:right-24 lg:right-36 xl:right-48 top-1/2 -translate-y-1/2 w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 pointer-events-none z-0"
        style={{ x: sphereX, y: sphereY }}
      >
        {mounted && (
          <Canvas 
            camera={{ position: [0, 0, 10], fov: 50 }}
            gl={{ antialias: true, alpha: true }}
            dpr={typeof window !== 'undefined' ? window.devicePixelRatio : 1}
            className="z-0"
          >
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#3b82f6" />
            {/* Background shader behind sphere (hidden on small screens via CSS if needed) */}
            <BackgroundShader />
            <FloatingSphere />
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              enableRotate={false}
              autoRotate
              autoRotateSpeed={0.5}
            />
          </Canvas>
        )}
      </motion.div>

      <div className="container mx-auto px-4 text-center relative z-50">
        <motion.div
          ref={ref}
          className="relative z-50 text-left max-w-3xl mx-auto"
          variants={container}
          initial="visible"
          animate="visible"
          style={{ x: textX, y: textY }}
        >
          <motion.h1
            variants={item}
            className="mb-8 text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight drop-shadow-[0_4px_14px_rgba(0,0,0,0.55)]"
          >
            Transform Your Fitness Journey
          </motion.h1>

          <motion.p
            variants={item}
            className="text-lg md:text-xl text-gray-100 mb-10 max-w-2xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]"
          >
            Discover premium gym equipment and accessories designed to elevate your workout experience to the next level.
          </motion.p>

          <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full overflow-hidden group"
            >
              <span className="relative z-10">Shop Now</span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-transparent border-2 border-blue-500 text-blue-400 font-semibold rounded-full hover:bg-blue-500/10 transition-colors duration-300"
            >
              Learn More
            </motion.button>
          </motion.div>

          <motion.div 
            variants={item}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 text-center"
          >
            {[
              { number: '10K+', label: 'Happy Customers' },
              { number: '500+', label: 'Products' },
              { number: '24/7', label: 'Support' },
              { number: '30-Day', label: 'Guarantee' },
            ].map((stat, index) => (
              <motion.div 
                key={stat.label}
                className="p-4 bg-white/5 backdrop-blur-sm rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { 
                    delay: 0.5 + (index * 0.1),
                    type: 'spring',
                    stiffness: 100
                  } 
                }}
              >
                <div className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 mb-1">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
      >
        <span className="text-sm text-gray-400 mb-2">Scroll Down</span>
        <motion.div
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: 'loop',
          }}
          className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center p-1"
        >
          <motion.div
            className="w-1 h-2 bg-gray-400 rounded-full"
            animate={{
              y: [0, 5],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: 'loop',
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
