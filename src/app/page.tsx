import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, TrendingUp, Shield, Zap } from 'lucide-react';
import Header from '@/components/Header';
import FeaturedProducts from '@/components/FeaturedProducts';
import CategoryGrid from '@/components/CategoryGrid';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-deep-mint via-cyber-violet to-charcoal-gold">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white"
            >
              <div className="flex items-center space-x-2 mb-6">
                <Sparkles className="h-6 w-6 text-mint-accent animate-glow" />
                <span className="text-mint-accent font-medium">Next-Gen Shopping</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-poppins font-bold mb-6 leading-tight">
                Shop Intelligently.
                <br />
                <span className="text-mint-accent">Expand Infinitely.</span>
              </h1>
              
              <p className="text-xl text-gray-200 mb-8 leading-relaxed">
                Experience the future of e-commerce with our intelligent platform. 
                Discover products that match your style, powered by cutting-edge technology.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="btn-secondary group">
                  Explore Products
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="btn-outline border-white text-white hover:bg-white hover:text-cyber-violet">
                  Learn More
                </button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="bg-mint-accent/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                        <TrendingUp className="h-8 w-8 text-mint-accent" />
                      </div>
                      <h3 className="text-white font-semibold mb-2">Smart Analytics</h3>
                      <p className="text-gray-300 text-sm">AI-powered insights</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-violet-accent/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                        <Shield className="h-8 w-8 text-violet-accent" />
                      </div>
                      <h3 className="text-white font-semibold mb-2">Secure Shopping</h3>
                      <p className="text-gray-300 text-sm">Bank-level security</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-gold-accent/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                        <Zap className="h-8 w-8 text-gold-accent" />
                      </div>
                      <h3 className="text-white font-semibold mb-2">Lightning Fast</h3>
                      <p className="text-gray-300 text-sm">Instant checkout</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-cyber-violet/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                        <Sparkles className="h-8 w-8 text-cyber-violet" />
                      </div>
                      <h3 className="text-white font-semibold mb-2">Premium Experience</h3>
                      <p className="text-gray-300 text-sm">Luxury shopping</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-mint-accent/20 rounded-full blur-xl animate-float"></div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-violet-accent/20 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-poppins font-bold gradient-text mb-4">
              Explore Categories
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Discover our carefully curated collection of products across various categories
            </p>
          </motion.div>
          
          <Suspense fallback={<div>Loading categories...</div>}>
            <CategoryGrid />
          </Suspense>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-gradient-to-br from-light-mint to-light-violet">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-poppins font-bold gradient-text mb-4">
              Featured Products
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Handpicked products that represent the best of our collection
            </p>
          </motion.div>
          
          <Suspense fallback={<div>Loading products...</div>}>
            <FeaturedProducts />
          </Suspense>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-dark-charcoal text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="text-3xl lg:text-4xl font-bold text-mint-accent mb-2">10K+</div>
              <div className="text-gray-300">Happy Customers</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-3xl lg:text-4xl font-bold text-violet-accent mb-2">500+</div>
              <div className="text-gray-300">Products</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-3xl lg:text-4xl font-bold text-gold-accent mb-2">50+</div>
              <div className="text-gray-300">Categories</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="text-3xl lg:text-4xl font-bold text-cyber-violet mb-2">24/7</div>
              <div className="text-gray-300">Support</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-deep-mint to-cyber-violet">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-poppins font-bold text-white mb-6">
              Ready to Experience the Future?
            </h2>
            <p className="text-xl text-gray-200 mb-8">
              Join thousands of customers who have already discovered the power of intelligent shopping.
            </p>
            <button className="btn-secondary text-lg px-8 py-4">
              Start Shopping Now
              <ArrowRight className="ml-2 h-6 w-6" />
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}