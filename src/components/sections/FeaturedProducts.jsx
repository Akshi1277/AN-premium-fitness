'use client';

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useRef, useState } from 'react';

const products = [
  {
    id: 1,
    name: 'Premium Dumbbell Set',
    price: 199.99,
    originalPrice: 249.99,
    image: 'https://placehold.co/600x400/3b82f6/ffffff?text=Dumbbell+Set',
    category: 'Weights',
    rating: 4.8,
    reviews: 124,
    badge: 'Best Seller',
    features: ['Adjustable Weight', 'Non-Slip Grip', 'Premium Steel'],
  },
  {
    id: 2,
    name: 'Yoga Mat Pro',
    price: 49.99,
    originalPrice: 69.99,
    image: 'https://placehold.co/600x400/10b981/ffffff?text=Yoga+Mat',
    category: 'Yoga',
    rating: 4.9,
    reviews: 89,
    badge: 'Eco-Friendly',
    features: ['Non-Toxic Material', 'Extra Thick', 'Anti-Slip Surface'],
  },
  {
    id: 3,
    name: 'Adjustable Bench',
    price: 299.99,
    originalPrice: 399.99,
    image: 'https://placehold.co/600x400/6366f1/ffffff?text=Gym+Bench',
    category: 'Equipment',
    rating: 4.7,
    reviews: 156,
    badge: 'New Arrival',
    features: ['7 Positions', 'Heavy Duty Frame', 'Comfortable Padding'],
  },
  {
    id: 4,
    name: 'Resistance Bands Set',
    price: 29.99,
    originalPrice: 39.99,
    image: 'https://placehold.co/600x400/8b5cf6/ffffff?text=Resistance+Bands',
    category: 'Accessories',
    rating: 4.6,
    reviews: 203,
    badge: 'Hot Deal',
    features: ['5 Resistance Levels', 'Portable Design', 'Exercise Guide'],
  },
];

const ProductCard = ({ product, index }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  
  // Enhanced 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-100, 100], [15, -15]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-15, 15]), { stiffness: 300, damping: 30 });

  // Magnetic button effect
  const btnX = useSpring(0, { stiffness: 400, damping: 25 });
  const btnY = useSpring(0, { stiffness: 400, damping: 25 });

  const onMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const posX = e.clientX - (rect.left + rect.width / 2);
    const posY = e.clientY - (rect.top + rect.height / 2);
    x.set(Math.max(-100, Math.min(100, posX / 3)));
    y.set(Math.max(-100, Math.min(100, posY / 3)));
    btnX.set(posX * 0.08);
    btnY.set(posY * 0.08);
  };

  const onMouseLeave = () => {
    x.set(0); 
    y.set(0);
    btnX.set(0); 
    btnY.set(0);
    setIsHovered(false);
  };

  const onMouseEnter = () => {
    setIsHovered(true);
  };

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <motion.div
      ref={cardRef}
      className="group relative perspective-1000"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseEnter}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, type: 'spring', stiffness: 100 }}
    >
      <motion.div
        className="relative w-full h-[500px] preserve-3d cursor-pointer"
        style={{ rotateX, rotateY }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front of card */}
        <motion.div
          className="absolute inset-0 w-full h-full backface-hidden bg-white/95 dark:bg-gray-800/95 rounded-3xl overflow-hidden shadow-2xl border border-white/20 dark:border-white/10 backdrop-blur-lg"
          whileHover={{ y: -10 }}
        >
          {/* Discount badge */}
          <div className="absolute top-4 left-4 z-20">
            <motion.div
              className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              -{discount}%
            </motion.div>
          </div>

          {/* Category badge */}
          <div className="absolute top-4 right-4 z-20">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
              {product.badge}
            </div>
          </div>

          {/* Product image with hover effects */}
          <div className="relative h-64 w-full overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-all duration-700 group-hover:scale-110"
              unoptimized
            />
            
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Floating elements */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-white/60 rounded-full"
                      style={{
                        left: `${20 + i * 15}%`,
                        top: `${30 + (i % 2) * 40}%`,
                      }}
                      animate={{
                        y: [0, -20, 0],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Product info */}
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded-full">
                {product.category}
              </span>
              <div className="flex items-center space-x-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <motion.svg
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </motion.svg>
                  ))}
                </div>
                <span className="text-sm text-gray-500">({product.reviews})</span>
              </div>
            </div>

            <h3 className="font-bold text-xl text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {product.name}
            </h3>

            <div className="flex items-center space-x-2">
              <span className="text-2xl font-black text-gray-900 dark:text-white">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-lg text-gray-500 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              className="relative w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 text-white py-3 rounded-2xl overflow-hidden font-bold text-lg shadow-lg"
              style={{ x: btnX, y: btnY }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Add to Cart
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  🛒
                </motion.span>
              </span>
              
              {/* Animated background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
            </motion.button>
          </div>
        </motion.div>

        {/* Back of card */}
        <motion.div
          className="absolute inset-0 w-full h-full backface-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-3xl overflow-hidden shadow-2xl"
          style={{ rotateY: 180 }}
        >
          <div className="p-6 h-full flex flex-col justify-center text-white">
            <h3 className="text-2xl font-bold mb-6 text-center">{product.name}</h3>
            
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Key Features:</h4>
              <ul className="space-y-2">
                {product.features.map((feature, i) => (
                  <motion.li
                    key={i}
                    className="flex items-center space-x-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <span className="w-2 h-2 bg-white rounded-full"></span>
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="mt-8 text-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-blue-600 px-6 py-2 rounded-full font-bold hover:bg-gray-100 transition-colors"
              >
                View Details
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 blur-xl -z-10"
        animate={{
          opacity: isHovered ? 0.6 : 0,
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

const FeaturedProducts = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-blue-400/10 to-purple-400/10 blur-xl"
            style={{
              width: `${100 + i * 50}px`,
              height: `${100 + i * 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, 100, -50, 0],
              y: [0, -100, 50, 0],
              scale: [1, 1.2, 0.8, 1],
            }}
            transition={{
              duration: 20 + i * 2,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-4xl md:text-6xl font-black mb-6"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
          >
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Featured Products
            </span>
          </motion.h2>
          
          <motion.p
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Discover our premium selection of fitness equipment designed to transform your workout experience with 
            <span className="text-blue-600 font-semibold"> innovative technology</span> and 
            <span className="text-purple-600 font-semibold"> superior craftsmanship</span>
          </motion.p>

          {/* Interactive hint */}
          <motion.div
            className="mt-8 text-sm text-gray-500 dark:text-gray-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <motion.span
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              💡 Click cards to flip and see features
            </motion.span>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* Call to action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <motion.button
            whileHover={{ 
              scale: 1.05, 
              boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)' 
            }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            View All Products →
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProducts;