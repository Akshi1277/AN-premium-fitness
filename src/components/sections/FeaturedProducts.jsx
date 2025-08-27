'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

const products = [
  {
    id: 1,
    name: 'Premium Dumbbell Set',
    price: 199.99,
    image: 'https://placehold.co/600x400/3b82f6/ffffff?text=Dumbbell+Set',
    category: 'Weights',
  },
  {
    id: 2,
    name: 'Yoga Mat Pro',
    price: 49.99,
    image: 'https://placehold.co/600x400/10b981/ffffff?text=Yoga+Mat',
    category: 'Yoga',
  },
  {
    id: 3,
    name: 'Adjustable Bench',
    price: 299.99,
    image: 'https://placehold.co/600x400/6366f1/ffffff?text=Gym+Bench',
    category: 'Equipment',
  },
  {
    id: 4,
    name: 'Resistance Bands Set',
    price: 29.99,
    image: 'https://placehold.co/600x400/8b5cf6/ffffff?text=Resistance+Bands',
    category: 'Accessories',
  },
];

const ProductCard = ({ product }) => {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [ -50, 50 ], [ 8, -8 ]), { stiffness: 200, damping: 15 });
  const rotateY = useSpring(useTransform(x, [ -50, 50 ], [ -8, 8 ]), { stiffness: 200, damping: 15 });

  const btnX = useSpring(0, { stiffness: 200, damping: 20 });
  const btnY = useSpring(0, { stiffness: 200, damping: 20 });

  const onMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const posX = e.clientX - (rect.left + rect.width / 2);
    const posY = e.clientY - (rect.top + rect.height / 2);
    x.set(Math.max(-50, Math.min(50, posX / 4)));
    y.set(Math.max(-50, Math.min(50, posY / 4)));
    // magnetic button pulls slightly
    btnX.set(posX * 0.05);
    btnY.set(posY * 0.05);
  };

  const onMouseLeave = () => {
    x.set(0); y.set(0);
    btnX.set(0); btnY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className="group relative bg-white/90 dark:bg-gray-800/90 rounded-2xl overflow-hidden shadow-lg border border-white/10 dark:border-white/5 backdrop-blur-sm"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {/* glossy shine */}
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ transform: 'translateZ(40px)' }}>
        <div className="absolute -top-1/2 left-0 right-0 h-full bg-gradient-to-b from-white/20 to-transparent" />
      </div>

      <div className="relative h-64 w-full" style={{ transform: 'translateZ(30px)' }}>
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          unoptimized
        />
        <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded shadow">
          {product.category}
        </div>
      </div>
      <div className="p-4" style={{ transform: 'translateZ(50px)' }}>
        <h3 className="font-bold text-lg mb-1">{product.name}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-3">${product.price.toFixed(2)}</p>
        <motion.button
          whileTap={{ scale: 0.97 }}
          className="relative w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white py-2 rounded-lg overflow-hidden"
          style={{ x: btnX, y: btnY }}
        >
          <span className="relative z-10">Add to Cart</span>
          <span className="absolute inset-0 -z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(120px_60px_at_var(--x,50%)_-20px,#ffffff40,transparent)]" />
        </motion.button>
      </div>

      {/* border glow */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/10 group-hover:ring-purple-400/40 transition-colors duration-300" />
    </motion.div>
  );
};

const FeaturedProducts = () => {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">Featured Products</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover our premium selection of fitness equipment to enhance your workout routine
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: product.id * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
