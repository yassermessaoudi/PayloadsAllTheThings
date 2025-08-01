'use client';

import React, { useState, useEffect } from 'react';
import { ArrowRight, Star, ShoppingCart, Zap, Shield, Truck, Sparkles, TrendingUp, Users, Package } from 'lucide-react';
import Logo from '@/components/Logo';

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalUsers: 0,
    totalOrders: 0,
    revenue: 0
  });

  useEffect(() => {
    // Fetch featured products and stats
    fetchFeaturedProducts();
    fetchStats();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const response = await fetch('/api/products/featured');
      if (response.ok) {
        const data = await response.json();
        setFeaturedProducts(data.products || []);
      }
    } catch (error) {
      console.error('Failed to fetch featured products:', error);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/analytics/stats');
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Smart Search",
      description: "AI-powered product discovery that learns your preferences",
      color: "cyber-violet"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure Payments",
      description: "Bank-level security with multiple payment options",
      color: "deep-mint"
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Fast Delivery",
      description: "Express shipping with real-time tracking",
      color: "charcoal-gold"
    }
  ];

  const mockProducts = [
    {
      id: 1,
      name: "Smart Wireless Headphones",
      price: 299.99,
      comparePrice: 399.99,
      image: "/api/placeholder/400/300",
      rating: 4.8,
      reviews: 124,
      discount: 25
    },
    {
      id: 2,
      name: "Professional Laptop Stand",
      price: 89.99,
      comparePrice: 119.99,
      image: "/api/placeholder/400/300",
      rating: 4.9,
      reviews: 67,
      discount: 25
    },
    {
      id: 3,
      name: "Ultra HD Monitor",
      price: 549.99,
      comparePrice: 699.99,
      image: "/api/placeholder/400/300",
      rating: 4.7,
      reviews: 89,
      discount: 21
    }
  ];

  const displayProducts = featuredProducts.length > 0 ? featuredProducts : mockProducts;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 bg-cyber-violet-600/20 border border-cyber-violet-500/30 rounded-full px-4 py-2">
                  <Sparkles className="w-4 h-4 text-cyber-violet-400" />
                  <span className="text-cyber-violet-300 text-sm font-medium">New Era of Shopping</span>
                </div>
                
                <h1 className="text-5xl lg:text-7xl font-bold font-poppins">
                  <span className="bg-gradient-to-r from-cyber-violet-400 via-deep-mint-400 to-charcoal-gold-400 bg-clip-text text-transparent">
                    Shop
                  </span>
                  <br />
                  <span className="text-white">Intelligently.</span>
                  <br />
                  <span className="bg-gradient-to-r from-deep-mint-400 via-charcoal-gold-400 to-cyber-violet-400 bg-clip-text text-transparent">
                    Expand
                  </span>
                  <span className="text-white"> Infinitely.</span>
                </h1>
                
                <p className="text-xl text-charcoal-300 leading-relaxed max-w-lg">
                  Experience the future of e-commerce with AI-powered recommendations, 
                  seamless checkout, and premium products curated just for you.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="group bg-deep-mint-600 hover:bg-deep-mint-700 text-white px-8 py-4 rounded-lg font-medium transition-all duration-200 cyber-button shadow-mint flex items-center justify-center space-x-2">
                  <span>Explore Products</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <button className="border border-charcoal-600 hover:border-charcoal-500 text-white px-8 py-4 rounded-lg font-medium transition-all duration-200 cyber-button hover:bg-charcoal-800/50">
                  Watch Demo
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyber-violet-400">{stats.totalProducts || '1000'}+</div>
                  <div className="text-sm text-charcoal-400">Products</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-deep-mint-400">{stats.totalUsers || '50'}K+</div>
                  <div className="text-sm text-charcoal-400">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-charcoal-gold-400">{stats.totalOrders || '25'}K+</div>
                  <div className="text-sm text-charcoal-400">Orders Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyber-violet-400">4.9</div>
                  <div className="text-sm text-charcoal-400">Rating</div>
                </div>
              </div>
            </div>

            {/* Hero Image/Animation */}
            <div className="relative">
              <div className="relative z-10">
                <div className="bg-gradient-to-br from-cyber-violet-600/20 to-deep-mint-600/20 rounded-3xl p-8 backdrop-blur-sm border border-white/10">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <Logo size="sm" showText={false} />
                      <div className="text-right">
                        <div className="text-charcoal-gold-400 font-bold">$2.4M+</div>
                        <div className="text-charcoal-400 text-sm">Revenue</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-charcoal-800/50 rounded-lg p-4">
                        <TrendingUp className="w-6 h-6 text-deep-mint-400 mb-2" />
                        <div className="text-sm text-charcoal-300">Growth</div>
                        <div className="text-lg font-bold text-white">+284%</div>
                      </div>
                      <div className="bg-charcoal-800/50 rounded-lg p-4">
                        <Users className="w-6 h-6 text-cyber-violet-400 mb-2" />
                        <div className="text-sm text-charcoal-300">Active Users</div>
                        <div className="text-lg font-bold text-white">12.5K</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-cyber-violet-600/30 rounded-full animate-float"></div>
              <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-deep-mint-600/30 rounded-full animate-float" style={{ animationDelay: "1s" }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-charcoal-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-poppins text-white mb-4">
              Why Choose SmartCommerce?
            </h2>
            <p className="text-xl text-charcoal-300 max-w-3xl mx-auto">
              Experience next-generation shopping with features designed for the modern consumer
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group">
                <div className="bg-charcoal-800/50 rounded-2xl p-8 border border-charcoal-700/50 hover:border-charcoal-600 transition-all duration-300 hover:shadow-elegant">
                  <div className={`inline-flex p-3 rounded-lg bg-${feature.color}-600/20 text-${feature.color}-400 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-charcoal-300 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold font-poppins text-white mb-4">
                Featured Products
              </h2>
              <p className="text-xl text-charcoal-300">
                Discover our most popular items
              </p>
            </div>
            
            <button className="hidden sm:flex items-center space-x-2 text-deep-mint-400 hover:text-deep-mint-300 transition-colors">
              <span>View All</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayProducts.map((product, index) => (
              <div key={product.id || index} className="group">
                <div className="bg-charcoal-800/50 rounded-2xl overflow-hidden border border-charcoal-700/50 hover:border-charcoal-600 transition-all duration-300 hover:shadow-elegant">
                  {/* Product Image */}
                  <div className="relative h-64 bg-charcoal-700 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyber-violet-600/20 to-deep-mint-600/20"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Package className="w-16 h-16 text-charcoal-500" />
                    </div>
                    
                    {product.discount && (
                      <div className="absolute top-4 left-4 bg-charcoal-gold-600 text-white px-2 py-1 rounded-lg text-sm font-medium">
                        -{product.discount}%
                      </div>
                    )}
                    
                    <button className="absolute top-4 right-4 p-2 bg-charcoal-800/80 rounded-lg text-white hover:bg-charcoal-700 transition-colors opacity-0 group-hover:opacity-100">
                      <ShoppingCart className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-deep-mint-400 transition-colors">
                      {product.name}
                    </h3>
                    
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-charcoal-gold-400 fill-current' : 'text-charcoal-600'}`} 
                          />
                        ))}
                      </div>
                      <span className="text-charcoal-400 text-sm">({product.reviews} reviews)</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-white">${product.price}</span>
                        {product.comparePrice && (
                          <span className="text-charcoal-500 line-through text-sm">${product.comparePrice}</span>
                        )}
                      </div>
                      
                      <button className="bg-deep-mint-600 hover:bg-deep-mint-700 text-white px-4 py-2 rounded-lg transition-colors cyber-button">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-cyber-gradient">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold font-poppins text-white mb-6">
            Ready to Start Shopping Smarter?
          </h2>
          <p className="text-xl text-white/80 mb-8 leading-relaxed">
            Join thousands of satisfied customers who have transformed their shopping experience
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-cyber-violet-600 px-8 py-4 rounded-lg font-medium hover:bg-gray-100 transition-colors cyber-button">
              Browse Categories
            </button>
            <button className="border border-white/30 text-white px-8 py-4 rounded-lg font-medium hover:bg-white/10 transition-colors cyber-button">
              Contact Sales
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
