'use client'
import React from 'react';

const categories = [
  {
    id: 1,
    name: 'Weights',
    image: 'https://www.scienceforsport.com/wp-content/uploads/2022/08/AdobeStock_168424497-scaled-e1659941789767.jpeg',
    count: 42,
  },
  {
    id: 2,
    name: 'Cardio',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    count: 28,
  },
  {
    id: 3,
    name: 'Yoga',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    count: 35,
  },
  {
    id: 4,
    name: 'Accessories',
    image: 'https://plus.unsplash.com/premium_photo-1664536967978-cc37f620b642?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGd5bSUyMGFjY2Vzc29yaWVzfGVufDB8fDB8fHww',
    count: 51,
  },
];

const CategoryCard = ({ category, index }) => {
  return (
    <div 
      className="group relative rounded-2xl overflow-hidden h-80 cursor-pointer transition-all duration-700 ease-out hover:-translate-y-2"
      style={{
        background: 'rgba(15, 15, 15, 0.8)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(251, 191, 36, 0.1)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
      }}
    >
      {/* Image Background */}
      <div className="absolute inset-0">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover transition-all duration-1000 ease-out group-hover:scale-105 opacity-50 group-hover:opacity-65"
        />
        {/* Enhanced gradient overlay */}
        <div 
          className="absolute inset-0 transition-all duration-700"
          style={{
            background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.5) 0%, rgba(15, 15, 15, 0.6) 50%, rgba(0, 0, 0, 0.7) 100%)'
          }}
        />
      </div>
      
      {/* Subtle amber glow effect on hover */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700"
        style={{
          background: 'radial-gradient(circle at center, rgba(251, 191, 36, 0.05) 0%, transparent 70%)'
        }}
      />
      
      {/* Glass-morphism border enhancement */}
      <div 
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500"
        style={{
          border: '1px solid rgba(251, 191, 36, 0.3)',
          boxShadow: '0 0 30px rgba(251, 191, 36, 0.1)'
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center p-8">
        {/* Category Title */}
        <h3 className="text-3xl font-light text-white mb-4 tracking-wide transition-all duration-500 group-hover:text-amber-200 group-hover:transform group-hover:scale-105">
          {category.name}
        </h3>
        
        {/* Item Count */}
        <div 
          className="px-4 py-2 rounded-full text-sm font-medium text-amber-100 mb-8 transition-all duration-500 group-hover:bg-amber-600/20 group-hover:text-amber-200"
          style={{
            background: 'rgba(251, 191, 36, 0.1)',
            border: '1px solid rgba(251, 191, 36, 0.2)',
            backdropFilter: 'blur(10px)'
          }}
        >
          {category.count} items
        </div>
        
        {/* Explore Button - appears on hover */}
        <div className="transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
          <button 
            className="px-6 py-3 text-sm font-medium text-white rounded-lg transition-all duration-300 hover:bg-amber-600/30"
            style={{
              background: 'rgba(251, 191, 36, 0.15)',
              border: '1px solid rgba(251, 191, 36, 0.3)',
              backdropFilter: 'blur(10px)'
            }}
          >
            Explore Collection
          </button>
        </div>
      </div>
      
      {/* Subtle corner accents */}
      <div className="absolute top-0 left-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-all duration-700">
        <div 
          className="absolute top-0 left-0 w-full h-0.5"
          style={{ background: 'linear-gradient(90deg, rgba(251, 191, 36, 0.4), transparent)' }}
        />
        <div 
          className="absolute top-0 left-0 h-full w-0.5"
          style={{ background: 'linear-gradient(180deg, rgba(251, 191, 36, 0.4), transparent)' }}
        />
      </div>
      <div className="absolute bottom-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-all duration-700">
        <div 
          className="absolute bottom-0 right-0 w-full h-0.5"
          style={{ background: 'linear-gradient(270deg, rgba(251, 191, 36, 0.4), transparent)' }}
        />
        <div 
          className="absolute bottom-0 right-0 h-full w-0.5"
          style={{ background: 'linear-gradient(0deg, rgba(251, 191, 36, 0.4), transparent)' }}
        />
      </div>
    </div>
  );
};

const Categories = () => {
  return (
    <section 
      className="py-24 relative overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at center, rgba(15, 15, 15, 1) 0%, rgba(0, 0, 0, 1) 100%)'
      }}
    >
      {/* Sophisticated background patterns */}
      <div className="absolute inset-0">
        {/* Subtle mesh gradients */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 80% 50% at 50% 20%, rgba(251, 191, 36, 0.03), transparent 50%)'
          }}
        />
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 60% 40% at 80% 80%, rgba(217, 119, 6, 0.02), transparent 50%)'
          }}
        />
        
        {/* Minimal geometric elements */}
        <div 
          className="absolute top-1/4 right-1/4 w-px h-32 opacity-10"
          style={{ background: 'linear-gradient(180deg, transparent, rgba(251, 191, 36, 0.3), transparent)' }}
        />
        <div 
          className="absolute bottom-1/3 left-1/5 w-32 h-px opacity-10"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(251, 191, 36, 0.3), transparent)' }}
        />
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-extralight text-white mb-6 tracking-tight">
            Shop by Category
          </h2>
          <div className="w-16 h-px bg-amber-600 mx-auto mb-8" />
          <p className="text-lg text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
            Discover our curated collection of{' '}
            <span className="text-amber-200 font-normal">premium fitness equipment</span>{' '}
            designed for professionals and enthusiasts alike
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className="opacity-0 animate-fadeInUp"
              style={{
                animationDelay: `${index * 200}ms`,
                animationFillMode: 'forwards'
              }}
            >
              <CategoryCard category={category} index={index} />
            </div>
          ))}
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out;
        }
      `}</style>
    </section>
  );
};

export default Categories;