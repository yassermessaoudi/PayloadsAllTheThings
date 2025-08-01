'use client';

import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, User, Menu, X, Shield, LogOut } from 'lucide-react';
import Logo from './Logo';
import LoginModal from './LoginModal';
import AdminLoginModal from './AdminLoginModal';

export default function Header() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    // Check for existing user session
    const token = localStorage.getItem('token');
    const adminToken = localStorage.getItem('adminToken');
    
    if (token) {
      // Verify user token and set user state
      fetchUserProfile(token);
    }
    
    if (adminToken) {
      setIsAdmin(true);
    }

    // Load cart item count
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItemCount(cart.reduce((total: number, item: any) => total + item.quantity, 0));
  }, []);

  const fetchUserProfile = async (token: string) => {
    try {
      const response = await fetch('/api/auth/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      }
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('adminToken');
    setUser(null);
    setIsAdmin(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-charcoal-900/95 backdrop-blur-md border-b border-charcoal-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Logo size="md" showText={true} />
            </div>

            {/* Center Navigation & Admin Login */}
            <div className="hidden md:flex items-center space-x-8">
              <nav className="flex items-center space-x-6">
                <a href="/" className="text-white hover:text-deep-mint-400 transition-colors font-medium">
                  Home
                </a>
                <a href="/products" className="text-white hover:text-deep-mint-400 transition-colors font-medium">
                  Products
                </a>
                <a href="/categories" className="text-white hover:text-deep-mint-400 transition-colors font-medium">
                  Categories
                </a>
                <a href="/about" className="text-white hover:text-deep-mint-400 transition-colors font-medium">
                  About
                </a>
              </nav>

              {/* Admin Login Button - Center positioned */}
              {!isAdmin ? (
                <button
                  onClick={() => setIsAdminModalOpen(true)}
                  className="flex items-center space-x-2 bg-cyber-violet-600 hover:bg-cyber-violet-700 text-white px-4 py-2 rounded-lg transition-all duration-200 cyber-button shadow-cyber"
                >
                  <Shield className="w-4 h-4" />
                  <span className="font-medium">Admin</span>
                </button>
              ) : (
                <a
                  href="/admin"
                  className="flex items-center space-x-2 bg-charcoal-gold-600 hover:bg-charcoal-gold-700 text-white px-4 py-2 rounded-lg transition-all duration-200 cyber-button shadow-gold"
                >
                  <Shield className="w-4 h-4" />
                  <span className="font-medium">Dashboard</span>
                </a>
              )}
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full bg-charcoal-800 border border-charcoal-600 rounded-lg pl-10 pr-4 py-2 text-white placeholder-charcoal-400 focus:outline-none focus:ring-2 focus:ring-deep-mint-500 focus:border-transparent transition-all"
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-charcoal-400" />
              </div>
            </div>

            {/* Right Side - Cart & User Login */}
            <div className="flex items-center space-x-4">
              {/* Shopping Cart */}
              <button className="relative p-2 text-white hover:text-deep-mint-400 transition-colors">
                <ShoppingCart className="w-6 h-6" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-charcoal-gold-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {cartItemCount}
                  </span>
                )}
              </button>

              {/* User Authentication */}
              {!user ? (
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="flex items-center space-x-2 bg-deep-mint-600 hover:bg-deep-mint-700 text-white px-4 py-2 rounded-lg transition-all duration-200 cyber-button shadow-mint"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline font-medium">Login</span>
                </button>
              ) : (
                <div className="flex items-center space-x-3">
                  <div className="hidden sm:block text-right">
                    <p className="text-white font-medium text-sm">
                      {user.firstName || user.username || 'User'}
                    </p>
                    <p className="text-charcoal-400 text-xs">{user.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="p-2 text-white hover:text-red-400 transition-colors"
                    title="Logout"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              )}

              {/* Mobile Menu Toggle */}
              <button
                onClick={toggleMobileMenu}
                className="md:hidden p-2 text-white hover:text-deep-mint-400 transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-charcoal-700/50 py-4">
              <div className="flex flex-col space-y-4">
                {/* Mobile Search */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full bg-charcoal-800 border border-charcoal-600 rounded-lg pl-10 pr-4 py-2 text-white placeholder-charcoal-400 focus:outline-none focus:ring-2 focus:ring-deep-mint-500 focus:border-transparent"
                  />
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-charcoal-400" />
                </div>

                {/* Mobile Navigation */}
                <nav className="flex flex-col space-y-2">
                  <a href="/" className="text-white hover:text-deep-mint-400 transition-colors py-2 font-medium">
                    Home
                  </a>
                  <a href="/products" className="text-white hover:text-deep-mint-400 transition-colors py-2 font-medium">
                    Products
                  </a>
                  <a href="/categories" className="text-white hover:text-deep-mint-400 transition-colors py-2 font-medium">
                    Categories
                  </a>
                  <a href="/about" className="text-white hover:text-deep-mint-400 transition-colors py-2 font-medium">
                    About
                  </a>
                </nav>

                {/* Mobile Admin Button */}
                {!isAdmin ? (
                  <button
                    onClick={() => setIsAdminModalOpen(true)}
                    className="flex items-center justify-center space-x-2 bg-cyber-violet-600 hover:bg-cyber-violet-700 text-white px-4 py-2 rounded-lg transition-all duration-200 cyber-button"
                  >
                    <Shield className="w-4 h-4" />
                    <span className="font-medium">Admin Login</span>
                  </button>
                ) : (
                  <a
                    href="/admin"
                    className="flex items-center justify-center space-x-2 bg-charcoal-gold-600 hover:bg-charcoal-gold-700 text-white px-4 py-2 rounded-lg transition-all duration-200 cyber-button"
                  >
                    <Shield className="w-4 h-4" />
                    <span className="font-medium">Admin Dashboard</span>
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSuccess={(userData) => {
          setUser(userData);
          setIsLoginModalOpen(false);
        }}
      />

      {/* Admin Login Modal */}
      <AdminLoginModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        onSuccess={() => {
          setIsAdmin(true);
          setIsAdminModalOpen(false);
        }}
      />
    </>
  );
}