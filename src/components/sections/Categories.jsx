'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

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
      className="relative rounded-xl overflow-hidden h-64 group"
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
    >
      <Image
        src={category.image}
        alt={category.name}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110"
        unoptimized
      />
      <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-white p-4 text-center">
        <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
        <p className="text-sm bg-blue-600 px-3 py-1 rounded-full">
          {category.count} items
        </p>
      </div>
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
