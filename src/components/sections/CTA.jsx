'use client';

import { motion } from 'framer-motion';
import InteractiveButton from '../ui/InteractiveButton';
import AnimatedCounter from '../ui/AnimatedCounter';

const CTA = () => {
  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-6 text-white"
            whileInView={{ 
              backgroundImage: [
                'linear-gradient(45deg, #ffffff, #ffffff)',
                'linear-gradient(45deg, #3b82f6, #8b5cf6)',
                'linear-gradient(45deg, #ec4899, #f59e0b)',
                'linear-gradient(45deg, #ffffff, #ffffff)'
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{ backgroundClip: 'text', WebkitBackgroundClip: 'text' }}
          >
            Ready to Transform Your Fitness Journey?
          </motion.h2>
          
          <p className="text-xl text-gray-200 mb-8">
            Join thousands of satisfied customers who have already upgraded their fitness equipment with us.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <InteractiveButton
              variant="primary"
              size="lg"
              magnetic={true}
              ripple={true}
              glow={true}
            >
              <span className="flex items-center gap-2">
                Shop Now 🛒
              </span>
            </InteractiveButton>
            
            <InteractiveButton
              variant="secondary"
              size="lg"
              magnetic={true}
              ripple={true}
              className="bg-white/10 text-white border-2 border-white/30 hover:bg-white/20"
            >
              <span className="flex items-center gap-2">
                Learn More 📚
              </span>
            </InteractiveButton>
          </div>
          
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: 10000, label: 'Happy Customers', suffix: '+', icon: '😊' },
              { number: 500, label: 'Products', suffix: '+', icon: '📦' },
              { number: 24, label: 'Support', suffix: '/7', icon: '🛠️' },
              { number: 30, label: 'Day Returns', suffix: '-Day', icon: '↩️' },
            ].map((stat, index) => (
              <motion.div 
                key={stat.label}
                className="p-4 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 group hover:bg-white/20 transition-all duration-300"
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ 
                  scale: 1.05,
                  y: -5,
                  boxShadow: '0 10px 30px rgba(255,255,255,0.1)'
                }}
              >
                <motion.div 
                  className="text-2xl mb-2"
                  whileHover={{ 
                    scale: 1.2,
                    rotate: [0, -10, 10, 0]
                  }}
                  transition={{ duration: 0.5 }}
                >
                  {stat.icon}
                </motion.div>
                
                <AnimatedCounter
                  to={stat.number}
                  suffix={stat.suffix}
                  className="text-3xl font-bold text-white mb-2 block"
                  duration={2}
                />
                
                <div className="text-gray-300 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
