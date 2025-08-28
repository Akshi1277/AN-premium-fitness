'use client';

import { motion } from 'framer-motion';
import InteractiveButton from '../ui/InteractiveButton';
import AnimatedCounter from '../ui/AnimatedCounter';

const CTA = () => {
  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black">
      {/* Subtle mesh gradient overlay */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-transparent to-amber-800/10" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center_top,rgba(251,191,36,0.15),transparent_50%)]" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,rgba(217,119,6,0.1),transparent_50%)]" />
      </div>

      {/* Elegant geometric patterns */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-20 right-20 w-96 h-96 border border-amber-500 rotate-45" />
        <div className="absolute bottom-20 left-20 w-64 h-64 border border-amber-400 rotate-12" />
      </div>
      
      <div className="relative z-10 container mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6 text-white"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Ready to Build Your 
            <span className="block bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 bg-clip-text text-transparent">
              Elite Home Gym?
            </span>
          </motion.h2>
          
          <p className="text-xl text-gray-300 mb-10 leading-relaxed">
            Join over 500,000 satisfied customers who have transformed their fitness with our 
            <span className="text-amber-400 font-semibold"> professional-grade equipment</span> and 
            <span className="text-amber-400 font-semibold"> lifetime support</span>.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-16">
            <motion.button
              className="bg-gradient-to-r from-amber-600 to-amber-700 text-white px-12 py-4 rounded-lg font-semibold text-lg hover:from-amber-500 hover:to-amber-600 transition-colors shadow-xl shadow-amber-900/25"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Shop Equipment Now
            </motion.button>
            
            <motion.button
              className="bg-transparent border-2 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white px-12 py-4 rounded-lg font-semibold text-lg transition-colors"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Free Consultation
            </motion.button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '500K+', label: 'Customers Served', color: 'text-blue-400' },
              { number: '1000+', label: 'Equipment Models', color: 'text-amber-400' },
              { number: '24/7', label: 'Expert Support', color: 'text-green-400' },
              { number: '100%', label: 'Satisfaction Rate', color: 'text-purple-400' },
            ].map((stat, index) => (
              <motion.div 
                key={stat.label}
                className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 hover:border-amber-600/30 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ y: -5 }}
              >
                <div className={`text-3xl md:text-4xl font-bold ${stat.color} mb-2`}>
                  {stat.number}
                </div>
                <div className="text-gray-400 text-sm font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
