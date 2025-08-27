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

// Custom useFrame implementation
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

// Enhanced GLSL background shader with more dynamic effects
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
    
    float noise(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }
    
    float wave(vec2 uv, float speed, float scale) {
      return sin((uv.x + uv.y) * scale + uTime * speed);
    }
    
    void main(){
      vec2 uv = vUv;
      
      // Multiple wave layers for complexity
      float w1 = wave(uv, 0.8, 4.0);
      float w2 = wave(uv + 0.3, 1.2, 6.0);
      float w3 = wave(uv - 0.1, 0.5, 8.0);
      float w = (w1 + w2 + w3) * 0.15;
      
      // Add some noise for texture
      float n = noise(uv * 10.0 + uTime * 0.1) * 0.1;
      
      // Dynamic color palette
      vec3 c1 = vec3(0.1, 0.3, 0.8);  // bright blue
      vec3 c2 = vec3(0.6, 0.2, 0.8);  // purple
      vec3 c3 = vec3(0.8, 0.4, 0.6);  // pink
      vec3 c4 = vec3(0.05, 0.05, 0.15); // dark
      
      // Create flowing gradient
      vec3 grad = mix(c1, c2, sin(uv.x * 2.0 + uTime * 0.3) * 0.5 + 0.5);
      grad = mix(grad, c3, sin(uv.y * 1.5 + uTime * 0.4) * 0.5 + 0.5);
      grad += w + n;
      grad = mix(grad, c4, 0.1);
      
      gl_FragColor = vec4(grad, 0.8);
    }
  `;

  const uniforms = useRef({ uTime: { value: 0 } });

  useFrame(() => {
    if (!materialRef.current) return;
    const t = (performance.now() - start.current) / 1000;
    materialRef.current.uniforms.uTime.value = t;
  });

  return (
    <mesh ref={mesh} position={[0, 0, -3]}>
      <planeGeometry args={[40, 25, 1, 1]} />
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

// Enhanced 3D Floating Sphere with morphing effects
const FloatingSphere = () => {
  const meshRef = useRef();
  const clockRef = useRef(new THREE.Clock());

  useFrame(() => {
    if (meshRef.current) {
      const elapsedTime = clockRef.current.getElapsedTime();
      meshRef.current.rotation.y = elapsedTime * 0.2;
      meshRef.current.rotation.x = Math.sin(elapsedTime * 0.3) * 0.1;
      meshRef.current.position.y = Math.sin(elapsedTime * 0.7) * 0.3;
      meshRef.current.position.x = Math.cos(elapsedTime * 0.4) * 0.1;
      
      // Morphing scale effect
      const scale = 1.2 + Math.sin(elapsedTime * 0.6) * 0.15;
      meshRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group>
      <Sphere ref={meshRef} args={[2, 128, 128]}>
        <meshStandardMaterial
          color="#3b82f6"
          metalness={0.7}
          roughness={0.2}
          emissive="#1d4ed8"
          emissiveIntensity={0.2}
          transparent
          opacity={0.85}
        />
      </Sphere>
      
      {/* Additional floating elements */}
      {[...Array(8)].map((_, i) => (
        <Sphere key={i} args={[0.1, 16, 16]} position={[
          Math.cos(i * Math.PI / 4) * 4,
          Math.sin(i * Math.PI / 4) * 4,
          Math.sin(i * 0.5) * 2
        ]}>
          <meshStandardMaterial
            color="#8b5cf6"
            emissive="#7c3aed"
            emissiveIntensity={0.5}
            transparent
            opacity={0.6}
          />
        </Sphere>
      ))}
      
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={2} color="#3b82f6" />
      <pointLight position={[-10, -10, 5]} intensity={1} color="#8b5cf6" />
    </group>
  );
};

// Floating particles component
const FloatingParticles = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = [...Array(50)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 10 + 5,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-r from-blue-400/30 to-purple-400/30 backdrop-blur-sm"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -100, -200],
            x: [0, Math.sin(particle.id) * 50, Math.cos(particle.id) * 30],
            opacity: [0, 0.8, 0],
            scale: [0, 1, 0.5, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: 'linear',
            delay: particle.delay,
          }}
        />
      ))}
    </div>
  );
};

// Glitch text effect component
const GlitchText = ({ children, className }) => {
  return (
    <div className={`relative ${className}`}>
      <span className="relative z-10">{children}</span>
      <span 
        className="absolute top-0 left-0 text-red-500 opacity-70 animate-pulse"
        style={{ 
          transform: 'translate(-2px, -1px)',
          clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)'
        }}
      >
        {children}
      </span>
      <span 
        className="absolute top-0 left-0 text-cyan-400 opacity-70 animate-pulse"
        style={{ 
          transform: 'translate(2px, 1px)',
          clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)',
          animationDelay: '0.1s'
        }}
      >
        {children}
      </span>
    </div>
  );
};

const HeroSection = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [mounted, setMounted] = useState(false);

  // Enhanced mouse-based parallax with more layers
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const textX = useSpring(useTransform(mx, [-0.5, 0.5], [-30, 30]), { stiffness: 100, damping: 20 });
  const textY = useSpring(useTransform(my, [-0.5, 0.5], [-15, 15]), { stiffness: 100, damping: 20 });
  const sphereX = useSpring(useTransform(mx, [-0.5, 0.5], [25, -25]), { stiffness: 80, damping: 25 });
  const sphereY = useSpring(useTransform(my, [-0.5, 0.5], [15, -15]), { stiffness: 80, damping: 25 });
  const bgX = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { stiffness: 200, damping: 30 });
  const bgY = useSpring(useTransform(my, [-0.5, 0.5], [-5, 5]), { stiffness: 200, damping: 30 });

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
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { y: 30, opacity: 0, rotateX: -15 },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        type: 'spring',
        damping: 15,
        stiffness: 120,
      },
    },
  };

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
      {/* Enhanced animated background */}
      <motion.div 
        className="absolute inset-0 overflow-hidden z-0"
        style={{ x: bgX, y: bgY }}
      >
        <FloatingParticles />
        
        {/* Animated gradient orbs */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-3xl opacity-20"
            style={{
              width: `${200 + i * 50}px`,
              height: `${200 + i * 50}px`,
              background: `radial-gradient(circle, ${
                ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b', '#ef4444'][i]
              }, transparent)`,
              left: `${20 + i * 15}%`,
              top: `${10 + i * 10}%`,
            }}
            animate={{
              x: [0, 100, -50, 0],
              y: [0, -80, 60, 0],
              scale: [1, 1.2, 0.8, 1],
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              ease: 'linear',
              delay: i * 2,
            }}
          />
        ))}
      </motion.div>

      {/* Enhanced 3D Sphere */}
      <motion.div
        className="absolute right-4 sm:right-10 md:right-24 lg:right-36 xl:right-48 top-1/2 -translate-y-1/2 w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 pointer-events-none z-10"
        style={{ x: sphereX, y: sphereY }}
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ 
          type: 'spring', 
          stiffness: 80, 
          damping: 20, 
          delay: 0.5,
          duration: 1.5 
        }}
      >
        <Canvas 
          camera={{ position: [0, 0, 12], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
          dpr={typeof window !== 'undefined' ? window.devicePixelRatio : 1}
        >
          <BackgroundShader />
          <FloatingSphere />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={false}
            autoRotate
            autoRotateSpeed={1}
          />
        </Canvas>
      </motion.div>

      <div className="container mx-auto px-4 text-center relative z-20">
        <motion.div
          ref={ref}
          className="relative z-20 text-left max-w-4xl mx-auto"
          variants={container}
          initial="hidden"
          animate={controls}
          style={{ x: textX, y: textY }}
        >
          <motion.div variants={item}>
            <GlitchText className="mb-8 text-4xl md:text-6xl lg:text-8xl font-black text-white leading-tight drop-shadow-[0_8px_32px_rgba(0,0,0,0.8)]">
              Transform Your
            </GlitchText>
          </motion.div>

          <motion.div variants={item}>
            <div className="mb-8 text-4xl md:text-6xl lg:text-8xl font-black leading-tight">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
                Fitness Journey
              </span>
            </div>
          </motion.div>

          <motion.p
            variants={item}
            className="text-lg md:text-xl lg:text-2xl text-gray-100 mb-12 max-w-3xl drop-shadow-[0_4px_20px_rgba(0,0,0,0.7)] leading-relaxed"
          >
            Discover premium gym equipment and accessories designed to elevate your workout experience with 
            <span className="text-blue-400 font-semibold"> cutting-edge technology</span> and 
            <span className="text-purple-400 font-semibold"> unmatched quality</span>.
          </motion.p>

          <motion.div 
            variants={item} 
            className="flex flex-col sm:flex-row gap-6 justify-center sm:justify-start mb-16"
          >
            <motion.button
              whileHover={{ 
                scale: 1.08, 
                boxShadow: '0 20px 40px rgba(59, 130, 246, 0.4)',
                y: -2
              }}
              whileTap={{ scale: 0.95 }}
              className="relative px-10 py-5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-bold text-lg rounded-full overflow-hidden group shadow-2xl"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Shop Now
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>
            
            <motion.button
              whileHover={{ 
                scale: 1.05, 
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                y: -2
              }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-transparent border-2 border-blue-400 text-blue-400 font-bold text-lg rounded-full hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all duration-300"
            >
              Learn More
            </motion.button>
          </motion.div>

          <motion.div 
            variants={item}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
          >
            {[
              { number: '10K+', label: 'Happy Customers', color: 'from-blue-400 to-cyan-400' },
              { number: '500+', label: 'Products', color: 'from-purple-400 to-pink-400' },
              { number: '24/7', label: 'Support', color: 'from-green-400 to-emerald-400' },
              { number: '30-Day', label: 'Guarantee', color: 'from-orange-400 to-red-400' },
            ].map((stat, index) => (
              <motion.div 
                key={stat.label}
                className="relative p-6 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-xl"
                initial={{ opacity: 0, y: 30, rotateY: -15 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  rotateY: 0,
                  transition: { 
                    delay: 0.8 + (index * 0.15),
                    type: 'spring',
                    stiffness: 100,
                    damping: 15
                  } 
                }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -5,
                  boxShadow: '0 20px 40px rgba(255,255,255,0.1)'
                }}
              >
                <div className={`text-3xl md:text-4xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                  {stat.number}
                </div>
                <div className="text-sm text-gray-300 font-medium">{stat.label}</div>
                
                {/* Animated border */}
                <motion.div
                  className="absolute inset-0 rounded-2xl border-2 border-transparent"
                  style={{
                    background: `linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent) border-box`,
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center z-30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
      >
        <motion.span 
          className="text-sm text-gray-300 mb-3 font-medium"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Scroll to Explore
        </motion.span>
        <motion.div
          animate={{
            y: [0, 15, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: 'loop',
          }}
          className="w-8 h-12 border-2 border-gray-300 rounded-full flex justify-center p-2 bg-white/5 backdrop-blur-sm"
        >
          <motion.div
            className="w-2 h-3 bg-gradient-to-b from-blue-400 to-purple-400 rounded-full"
            animate={{
              y: [0, 8],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 2,
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