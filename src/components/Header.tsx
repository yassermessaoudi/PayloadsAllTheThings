'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingCart, User, Menu, X, Sparkles } from 'lucide-react';
import { cn } from '@/utils/cn';
import LoginForm from './LoginForm';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass-effect border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative">
              <Sparkles className="h-8 w-8 text-cyber-violet animate-glow" />
              <div className="absolute -top-1 -right-1 h-3 w-3 bg-mint-accent rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-xl font-poppins font-bold gradient-text">
                Smart Commerce
              </h1>
              <p className="text-xs text-gray-600 font-medium">
                Shop Intelligently. Expand Infinitely.
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-cyber-violet font-medium transition-colors"
            >
              Home
            </Link>
            <Link 
              href="/products" 
              className="text-gray-700 hover:text-cyber-violet font-medium transition-colors"
            >
              Products
            </Link>
            <Link 
              href="/categories" 
              className="text-gray-700 hover:text-cyber-violet font-medium transition-colors"
            >
              Categories
            </Link>
            <Link 
              href="/about" 
              className="text-gray-700 hover:text-cyber-violet font-medium transition-colors"
            >
              About
            </Link>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Admin Login Button - Center positioned */}
            <Link 
              href="/admin/login"
              className="btn-outline text-sm px-4 py-2"
            >
              Admin
            </Link>

            {/* Cart */}
            <Link 
              href="/cart"
              className="relative p-2 text-gray-700 hover:text-cyber-violet transition-colors"
            >
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 bg-cyber-violet text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Link>

            {/* User Login */}
            <button
              onClick={() => setShowLoginForm(!showLoginForm)}
              className="flex items-center space-x-2 text-gray-700 hover:text-cyber-violet transition-colors"
            >
              <User className="h-6 w-6" />
              <span className="hidden sm:inline font-medium">Login</span>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-cyber-violet transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Login Form Dropdown */}
        {showLoginForm && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full right-4 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-100 p-6"
          >
            <LoginForm onClose={() => setShowLoginForm(false)} />
          </motion.div>
        )}

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-200 py-4"
          >
            <nav className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className="text-gray-700 hover:text-cyber-violet font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/products" 
                className="text-gray-700 hover:text-cyber-violet font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <Link 
                href="/categories" 
                className="text-gray-700 hover:text-cyber-violet font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Categories
              </Link>
              <Link 
                href="/about" 
                className="text-gray-700 hover:text-cyber-violet font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  );
}