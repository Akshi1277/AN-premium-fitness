'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import InteractiveButton from '../ui/InteractiveButton';

const categories = [
  {
    id: 1,
    name: 'Weights',
    image: 'https://placehold.co/800x600/3b82f6/ffffff?text=Weights',
    count: 42,
  },
  {
    id: 2,
    name: 'Cardio',
    image: 'https://placehold.co/800x600/ef4444/ffffff?text=Cardio',
    count: 28,
  },
  {
    id: 3,
    name: 'Yoga',
    image: 'https://placehold.co/800x600/10b981/ffffff?text=Yoga',
    count: 35,
  },
  {
    id: 4,
    name: 'Accessories',
    image: 'https://placehold.co/800x600/8b5cf6/ffffff?text=Accessories',
    count: 51,
  },
];

const CategoryCard = ({ category }) => {
  return (
    <motion.div 
      className="relative rounded-xl overflow-hidden h-64 group cursor-pointer"
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
    >
      <Image
        src={category.image}
        alt={category.name}
        fill
        className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
        unoptimized
      />
      
      {/* Animated overlay */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
        whileHover={{ 
          background: 'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.3), transparent)' 
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4 text-center">
        {/* Animated icon */}
        <motion.div
          className="text-4xl mb-4"
          whileHover={{ 
            scale: 1.2,
            rotate: [0, -10, 10, 0],
            y: -10
          }}
          transition={{ duration: 0.5 }}
        >
          {category.name === 'Weights' && '🏋️'}
          {category.name === 'Cardio' && '🏃'}
          {category.name === 'Yoga' && '🧘'}
          {category.name === 'Accessories' && '💪'}
        </motion.div>
        
        <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
        
        <motion.p 
          className="text-sm bg-blue-600 px-3 py-1 rounded-full mb-4"
          whileHover={{ 
            scale: 1.1,
            backgroundColor: '#3b82f6'
          }}
        >
          {category.count} items
        </motion.p>
        
        {/* Hover button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileHover={{ opacity: 1, y: 0 }}
          className="group-hover:opacity-100 opacity-0 transition-all duration-300"
        >
          <InteractiveButton
            variant="secondary"
            size="sm"
            className="bg-white/90 text-gray-900 hover:bg-white"
          >
            Explore →
          </InteractiveButton>
        </motion.div>
      </div>
      
      {/* Floating particles on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      >
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${20 + i * 10}%`,
              top: `${30 + (i % 2) * 40}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

const Categories = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Shop by Category</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Explore our wide range of fitness equipment categories
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <CategoryCard category={category} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
