'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { Star, ShoppingCart, Heart, Eye, Truck, Shield, Award, TrendingUp } from 'lucide-react';

const products = [
  {
    id: 1,
    name: 'PowerMax Elite Home Gym System',
    price: 2499.99,
    originalPrice: 3199.99,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop&crop=center',
    category: 'Home Gyms',
    rating: 4.8,
    reviews: 324,
    badge: 'Best Seller',
    features: ['150+ Exercise Options', 'Commercial Grade Steel', 'Lifetime Warranty'],
    inStock: true,
    shipping: 'Free White Glove Setup'
  },
  {
    id: 2,
    name: 'Professional Olympic Barbell Set',
    price: 899.99,
    originalPrice: 1199.99,
    image: 'https://images.unsplash.com/photo-1434596922112-19c563067271?w=600&h=400&fit=crop&crop=center',
    category: 'Weights',
    rating: 4.9,
    reviews: 156,
    badge: 'Staff Pick',
    features: ['45lb Olympic Bar', '300lb Weight Set', 'Rubber Coated Plates'],
    inStock: true,
    shipping: 'Free Shipping'
  },
  {
    id: 3,
    name: 'Commercial Adjustable Bench',
    price: 699.99,
    originalPrice: 899.99,
    image: 'https://images.unsplash.com/photo-1549476464-37392f717541?w=600&h=400&fit=crop&crop=center',
    category: 'Benches',
    rating: 4.7,
    reviews: 89,
    badge: 'New',
    features: ['12 Position Adjustments', '1000lb Weight Capacity', 'Premium Leather Padding'],
    inStock: true,
    shipping: 'Free Shipping'
  },
  {
    id: 4,
    name: 'Elite Cardio Treadmill Pro',
    price: 1899.99,
    originalPrice: 2399.99,
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&h=400&fit=crop&crop=center',
    category: 'Cardio',
    rating: 4.6,
    reviews: 203,
    badge: 'Hot Deal',
    features: ['3.5 HP Motor', '15% Incline', 'Interactive Touchscreen'],
    inStock: true,
    shipping: 'Free Installation'
  },
  {
    id: 5,
    name: 'Heavy Duty Power Rack',
    price: 1299.99,
    originalPrice: 1699.99,
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop&crop=center',
    category: 'Racks',
    rating: 4.8,
    reviews: 267,
    badge: 'Best Seller',
    features: ['1000lb Weight Capacity', 'Multi-Grip Pull-Up Bar', 'Safety Spotter Arms'],
    inStock: true,
    shipping: 'Free Installation'
  },
  {
    id: 6,
    name: 'Premium Kettlebell Set',
    price: 349.99,
    originalPrice: 449.99,
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&h=400&fit=crop&crop=center',
    category: 'Weights',
    rating: 4.7,
    reviews: 143,
    badge: 'Staff Pick',
    features: ['Cast Iron Construction', '5-50lb Range', 'Wide Handle Grip'],
    inStock: true,
    shipping: 'Free Shipping'
  },
  {
    id: 7,
    name: 'Smart Exercise Bike Pro',
    price: 1599.99,
    originalPrice: 1999.99,
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop&crop=center',
    category: 'Cardio',
    rating: 4.6,
    reviews: 189,
    badge: 'New',
    features: ['Interactive Display', 'Magnetic Resistance', 'Heart Rate Monitor'],
    inStock: true,
    shipping: 'Free Setup'
  },
  {
    id: 8,
    name: 'Multi-Station Cable Machine',
    price: 2199.99,
    originalPrice: 2799.99,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop&crop=center',
    category: 'Machines',
    rating: 4.9,
    reviews: 98,
    badge: 'Hot Deal',
    features: ['Dual Weight Stacks', '200lb Per Stack', '15+ Exercise Options'],
    inStock: true,
    shipping: 'Free White Glove Setup'
  }
];


const ProductCard = ({ product, index }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  // Subtle tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-100, 100], [5, -5]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-5, 5]), { stiffness: 300, damping: 30 });

  const onMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const posX = e.clientX - (rect.left + rect.width / 2);
    const posY = e.clientY - (rect.top + rect.height / 2);
    x.set(Math.max(-100, Math.min(100, posX / 5)));
    y.set(Math.max(-100, Math.min(100, posY / 5)));
  };

  const onMouseLeave = () => {
    x.set(0); 
    y.set(0);
    setIsHovered(false);
  };

  const onMouseEnter = () => {
    setIsHovered(true);
  };

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  const getBadgeColor = (badge) => {
    switch (badge) {
      case 'Best Seller': return 'bg-amber-600 text-white';
      case 'Staff Pick': return 'bg-blue-600 text-white';
      case 'New': return 'bg-green-600 text-white';
      case 'Hot Deal': return 'bg-amber-700 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className="group relative"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseEnter}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, type: 'spring', stiffness: 100 }}
    >
      <motion.div
        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 hover:border-amber-600/30 transition-all duration-300"
        style={{ rotateX, rotateY }}
        whileHover={{ y: -5 }}
      >
        {/* Product Image */}
        <div className="relative h-64 overflow-hidden bg-gray-800">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          
          {/* Badges */}
          <div className="absolute top-3 left-3">
            <span className={`px-2 py-1 text-xs font-semibold rounded-md ${getBadgeColor(product.badge)}`}>
              {product.badge}
            </span>
          </div>
          
          {discount > 0 && (
            <div className="absolute top-3 right-3">
              <span className="bg-amber-700 text-white px-2 py-1 text-xs font-bold rounded-md">
                -{discount}%
              </span>
            </div>
          )}

          {/* Quick Actions */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300"
            initial={{ scale: 0 }}
            whileHover={{ scale: 1 }}
          >
            <div className="flex gap-2">
              <motion.button
                className="p-2 bg-white/20 backdrop-blur-sm rounded-full shadow-lg hover:bg-white/30 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsWishlisted(!isWishlisted)}
              >
                <Heart size={18} className={`${isWishlisted ? 'fill-amber-500 text-amber-500' : 'text-white'}`} />
              </motion.button>
              <motion.button
                className="p-2 bg-white/20 backdrop-blur-sm rounded-full shadow-lg hover:bg-white/30 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Eye size={18} className="text-white" />
              </motion.button>
            </div>
          </motion.div>

          {/* Shipping Info */}
          <div className="absolute bottom-3 left-3">
            <div className="flex items-center gap-1 bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded-md text-xs">
              <Truck size={12} />
              <span>{product.shipping}</span>
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-5">
          {/* Category and Rating */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-amber-400 uppercase tracking-wider">
              {product.category}
            </span>
            <div className="flex items-center gap-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={`${i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-500'}`}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-400 ml-1">({product.reviews})</span>
            </div>
          </div>

          {/* Product Name */}
          <h3 className="font-semibold text-white mb-3 text-lg leading-tight group-hover:text-amber-400 transition-colors">
            {product.name}
          </h3>

          {/* Key Features */}
          <ul className="text-xs text-gray-400 mb-4 space-y-1">
            {product.features.slice(0, 2).map((feature, i) => (
              <li key={i} className="flex items-center gap-2">
                <div className="w-1 h-1 bg-amber-500 rounded-full"></div>
                {feature}
              </li>
            ))}
          </ul>

          {/* Pricing */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl font-bold text-white">
              ${product.price.toLocaleString()}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-lg text-gray-500 line-through">
                ${product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Stock Status */}
          <div className="flex items-center gap-2 mb-4">
            <div className={`w-2 h-2 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className={`text-xs font-medium ${product.inStock ? 'text-green-400' : 'text-red-400'}`}>
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>

          {/* Add to Cart Button */}
          <motion.button
            className="w-full bg-gradient-to-r from-amber-600 to-amber-700 text-white py-3 px-4 rounded-lg font-semibold hover:from-amber-500 hover:to-amber-600 transition-colors flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={!product.inStock}
          >
            <ShoppingCart size={18} />
            {product.inStock ? 'Add to Cart' : 'Notify When Available'}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const FeaturedProducts = () => {
  return (
    <section id="products" className="py-20 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden scroll-mt-20">
      {/* Subtle mesh gradient overlay */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/10 via-transparent to-amber-800/5" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center_top,rgba(251,191,36,0.08),transparent_50%)]" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,rgba(217,119,6,0.05),transparent_50%)]" />
      </div>

      {/* Elegant geometric patterns */}
      <div className="absolute inset-0 opacity-[0.01]">
        <div className="absolute top-20 right-20 w-96 h-96 border border-amber-500 rotate-45" />
        <div className="absolute bottom-20 left-20 w-64 h-64 border border-amber-400 rotate-12" />
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
          >
            Featured Equipment
          </motion.h2>
          
          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Professional-grade fitness equipment trusted by elite athletes and home fitness enthusiasts worldwide. 
            Each product comes with our <span className="text-amber-400 font-semibold">lifetime warranty</span> and 
            <span className="text-amber-400 font-semibold"> expert installation</span>.
          </motion.p>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-300">
            <div className="flex items-center gap-2">
              <Shield size={16} className="text-blue-400" />
              <span>Lifetime Warranty</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck size={16} className="text-green-400" />
              <span>Free Installation</span>
            </div>
            <div className="flex items-center gap-2">
              <Award size={16} className="text-amber-400" />
              <span>Industry Leading Quality</span>
            </div>
          </div>
        </motion.div>

        {/* Products Grid */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
  {products.slice(0, 8).map((product, index) => (
    <ProductCard key={product.id} product={product} index={index} />
  ))}
</div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.button
            className="bg-gradient-to-r from-amber-600 to-amber-700 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-amber-500 hover:to-amber-600 transition-colors inline-flex items-center gap-2 shadow-xl shadow-amber-900/25"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <TrendingUp size={20} />
            View All Equipment
          </motion.button>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {[
            { number: '500K+', label: 'Equipment Sold', color: 'text-blue-400' },
            { number: '4.9★', label: 'Average Rating', color: 'text-amber-400' },
            { number: '50+', label: 'Countries Served', color: 'text-green-400' },
            { number: '25+', label: 'Years Experience', color: 'text-purple-400' },
          ].map((stat, index) => (
            <motion.div 
              key={stat.label}
              className="text-center p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 hover:border-amber-600/30 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: { delay: index * 0.1 }
              }}
              whileHover={{ y: -5 }}
            >
              <div className={`text-3xl md:text-4xl font-bold ${stat.color} mb-2`}>
                {stat.number}
              </div>
              <div className="text-sm text-gray-400 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProducts;