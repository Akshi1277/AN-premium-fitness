'use client';
import { motion, useAnimation, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Star, ShieldCheck, Truck, CreditCard, Users, Trophy, Zap } from 'lucide-react';

// Subtle floating particles for premium ambiance
const PremiumParticles = ({ mounted }) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (!mounted) return;
    
    const newParticles = [...Array(12)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 8,
    }));
    setParticles(newParticles);
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-r from-amber-400/10 to-amber-600/5 backdrop-blur-sm"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -50, -100],
            opacity: [0, 0.3, 0],
            scale: [0, 1, 0],
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

// E-commerce focused button component
const EcomButton = ({ children, variant = 'primary', className = '', ...props }) => {
  return (
    <motion.button
      className={`
        relative px-8 py-4 font-semibold text-lg tracking-wide transition-all duration-300
        ${variant === 'primary' 
          ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-xl shadow-amber-900/25' 
          : 'bg-transparent border-2 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white'
        }
        rounded-lg
        hover:shadow-2xl hover:shadow-amber-900/40 hover:-translate-y-0.5
        active:translate-y-0 active:shadow-lg
        ${className}
      `}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      <div className="relative z-10">{children}</div>
      {variant === 'primary' && (
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-600 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-lg" />
      )}
    </motion.button>
  );
};

const HeroSection = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [mounted, setMounted] = useState(false);

  // Subtle parallax effects
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const textX = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 100, damping: 30 });
  const textY = useSpring(useTransform(my, [-0.5, 0.5], [-4, 4]), { stiffness: 100, damping: 30 });
  const bgX = useSpring(useTransform(mx, [-0.5, 0.5], [-15, 15]), { stiffness: 80, damping: 40 });
  const bgY = useSpring(useTransform(my, [-0.5, 0.5], [-8, 8]), { stiffness: 80, damping: 40 });

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

  useEffect(() => {
    if (mounted && isInView) {
      controls.start('visible');
    }
  }, [mounted, isInView, controls]);

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
        damping: 20,
        stiffness: 100
      },
    },
  };

  const fadeUpItem = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 120
      },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden scroll-mt-20"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Sophisticated background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-gray-900" />
      
      {/* Subtle mesh gradient overlay */}
      <motion.div 
        className="absolute inset-0"
        style={{ x: bgX, y: bgY }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-transparent to-amber-800/10" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center_top,rgba(251,191,36,0.15),transparent_50%)]" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,rgba(217,119,6,0.1),transparent_50%)]" />
      </motion.div>

      {/* Premium particles */}
      <PremiumParticles mounted={mounted} />

      {/* Elegant geometric patterns */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-20 right-20 w-96 h-96 border border-amber-500 rotate-45" />
        <div className="absolute bottom-20 left-20 w-64 h-64 border border-amber-400 rotate-12" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-amber-600 rounded-full opacity-50" />
      </div>

      {/* Main content */}
      <div className="container mx-auto px-6 lg:px-8 text-center relative z-20 pb-20">
        <motion.div
          ref={ref}
          className="max-w-6xl mx-auto"
          variants={container}
          initial="hidden"
          animate={mounted ? controls : 'visible'}
          style={{ x: textX, y: textY }}
        >
          

          {/* Headline */}
          <motion.div variants={item} className="mb-8 mt-14">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
              BUILD YOUR
              <span className="block bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 bg-clip-text text-transparent">
                DREAM GYM
              </span>
              <span className="block text-3xl md:text-4xl lg:text-5xl font-normal text-gray-300">
                From Home
              </span>
            </h1>
          </motion.div>

          {/* Subheading */}
          <motion.p 
            variants={item}
            className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Shop premium home gym equipment with <span className="text-amber-400 font-semibold">free shipping</span>, 
            <span className="text-amber-400 font-semibold"> lifetime warranty</span>, and 
            <span className="text-amber-400 font-semibold"> 30-day money-back guarantee</span>. 
            Transform your fitness journey today.
          </motion.p>

          {/* Special Offer Banner (reduced red -> amber) */}
          <motion.div variants={item} className="mb-10">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-700 rounded-lg text-white font-bold text-lg shadow-xl shadow-amber-900/25">
              <Zap className="text-amber-200" size={20} />
              <span>LIMITED TIME: 25% OFF + FREE Installation</span>
              <div className="bg-white/15 px-3 py-1 rounded text-sm">
                CODE: FITNESS25
              </div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            variants={fadeUpItem} 
            className="flex flex-col sm:flex-row gap-6 justify-center mb-12"
          >
            <EcomButton variant="primary" className="text-xl px-12 py-5">
              🛒 Shop Now & Save 25%
            </EcomButton>
            
            <EcomButton variant="outline" className="text-xl px-12 py-5">
              📞 Call: 1-800-FIT-GEAR
            </EcomButton>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div 
            variants={fadeUpItem}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
          >
            {[
              { number: '500K+', label: 'Happy Customers', icon: Users },
              { number: '4.9★', label: 'Customer Rating', icon: Star },
              { number: '100+', label: 'Equipment Types', icon: Trophy },
              { number: 'FREE', label: 'Shipping & Setup', icon: Truck },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div 
                  key={stat.label}
                  className="text-center group p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:bg-white/10 transition-all duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  animate={mounted ? { 
                    opacity: 1, 
                    y: 0,
                    transition: { 
                      delay: 0.8 + (index * 0.1),
                      type: 'spring',
                      stiffness: 100,
                      damping: 15
                    } 
                  } : { opacity: 1, y: 0 }}
                  whileHover={{ y: -2 }}
                >
                  <Icon className="w-6 h-6 text-amber-500 mx-auto mb-2 group-hover:text-amber-400 transition-colors" />
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                    {stat.number}
                  </div>
                  <div className="text-xs text-gray-400 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Popular Categories */}
          <motion.div
            variants={fadeUpItem}
            className="max-w-5xl mx-auto"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Shop Popular Categories</h3>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              {[
                {
                  title: 'Home Gyms & Racks',
                  description: 'Complete workout systems starting at $899',
                  price: 'From $899',
                  popular: true
                },
                {
                  title: 'Cardio Equipment',
                  description: 'Treadmills, bikes, ellipticals & more',
                  price: 'From $599',
                  popular: false
                },
                {
                  title: 'Weights & Accessories',
                  description: 'Dumbbells, barbells, plates & storage',
                  price: 'From $49',
                  popular: true
                },
              ].map((category, index) => (
                <motion.div
                  key={category.title}
                  className="relative p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:bg-white/10 hover:border-amber-600/30 transition-all duration-300 cursor-pointer group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={mounted ? { 
                    opacity: 1, 
                    y: 0,
                    transition: { 
                      delay: 1.2 + (index * 0.15) 
                    } 
                  } : { opacity: 1, y: 0 }}
                  whileHover={{ y: -3 }}
                >
                  {category.popular && (
                    <div className="absolute -top-2 -right-2 bg-amber-700 text-white text-xs px-2 py-1 rounded-full font-bold">
                      POPULAR
                    </div>
                  )}
                  <h4 className="text-xl font-semibold text-white mb-2 group-hover:text-amber-400 transition-colors">
                    {category.title}
                  </h4>
                  <p className="text-gray-400 mb-3 leading-relaxed">
                    {category.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-amber-400">{category.price}</span>
                    <button className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-medium">
                      Shop Now
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* E-commerce focused bottom bar */}
<motion.div
  className="absolute bottom-0 left-0 right-0 z-10"  // Changed from z-30 to z-10
  initial={{ opacity: 0, y: 20 }}
  animate={mounted ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
  transition={{ delay: 1.5 }}
>
  <div className="backdrop-blur-md bg-black/40 border-t border-white/10 pointer-events-auto"> {/* Added pointer-events-auto */}
    <div className="container mx-auto px-6 lg:px-8 py-4">
      <div className="flex items-center justify-between">
        {/* E-commerce guarantees */}
        <div className="hidden md:flex items-center space-x-24 text-xl text-gray-300">
          <div className="flex items-center space-x-2">
            <Truck className="w-4 h-4 text-green-400" />
            <span>FREE Shipping & White Glove Setup</span>
          </div>
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            <span>Lifetime Warranty on All Equipment</span>
          </div>
          <div className="flex items-center space-x-2">
            <CreditCard className="w-4 h-4 text-amber-400" />
            <span>0% APR Financing Available</span>
          </div>
        </div>

        {/* Scroll indicator */}
        {/* <motion.button
          onClick={() => {
            const y = window.innerHeight;
            window.scrollTo({ top: y, behavior: 'smooth' });
          }}
          className="flex items-center justify-center w-10 h-10 rounded-full border border-amber-500/30 text-amber-500 hover:bg-amber-500/10 hover:border-amber-500/60 transition-all duration-300 ml-auto"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Browse products below"
        >
          <ChevronDown size={16} />
        </motion.button> */}
      </div>
    </div>
  </div>
</motion.div>
    </section>
  );
};

export default HeroSection;