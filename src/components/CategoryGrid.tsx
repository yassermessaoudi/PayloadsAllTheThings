'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Category } from '@/types';

export default function CategoryGrid() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        if (response.ok) {
          const data = await response.json();
          setCategories(data.categories);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="card p-6 animate-pulse">
            <div className="bg-gray-200 h-32 rounded-lg mb-4"></div>
            <div className="bg-gray-200 h-4 rounded mb-2"></div>
            <div className="bg-gray-200 h-3 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">No categories available at the moment.</p>
      </div>
    );
  }

  const categoryColors = [
    'from-deep-mint to-mint-accent',
    'from-cyber-violet to-violet-accent',
    'from-charcoal-gold to-gold-accent',
    'from-purple-600 to-pink-500',
    'from-blue-600 to-cyan-500',
    'from-green-600 to-emerald-500',
    'from-orange-600 to-red-500',
    'from-indigo-600 to-purple-500',
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {categories.map((category, index) => (
        <motion.div
          key={category._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Link href={`/categories/${category.slug}`}>
            <div className="card group overflow-hidden cursor-pointer">
              <div className={`h-32 bg-gradient-to-br ${categoryColors[index % categoryColors.length]} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="text-3xl font-bold mb-2">
                      {category.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="text-sm opacity-90">
                      {category.name.length > 10 ? category.name.substring(0, 10) + '...' : category.name}
                    </div>
                  </div>
                </div>
                
                {/* Hover effect */}
                <div className="absolute inset-0 bg-white/20 transform scale-0 group-hover:scale-100 transition-transform duration-300 origin-center"></div>
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-cyber-violet transition-colors">
                  {category.name}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-2">
                  {category.description || 'Explore our amazing collection'}
                </p>
                
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {Math.floor(Math.random() * 50) + 10} products
                  </span>
                  <div className="text-cyber-violet group-hover:translate-x-1 transition-transform">
                    →
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}