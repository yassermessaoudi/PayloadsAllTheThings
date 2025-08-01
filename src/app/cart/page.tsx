'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trash2, ShoppingCart, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import { CartItem } from '@/types';

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would fetch from localStorage or API
    setCartItems([]);
    setLoading(false);
  }, []);

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCartItems(items => items.filter(item => item.product._id !== productId));
    } else {
      setCartItems(items =>
        items.map(item =>
          item.product._id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const removeItem = (productId: string) => {
    setCartItems(items => items.filter(item => item.product._id !== productId));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  };

  const calculateTotal = () => {
    return calculateSubtotal();
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="bg-gray-200 h-8 w-48 rounded mb-8"></div>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <div className="flex items-center space-x-4">
                    <div className="bg-gray-200 h-20 w-20 rounded"></div>
                    <div className="flex-1 space-y-2">
                      <div className="bg-gray-200 h-4 w-3/4 rounded"></div>
                      <div className="bg-gray-200 h-4 w-1/2 rounded"></div>
                    </div>
                    <div className="bg-gray-200 h-8 w-20 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-poppins font-bold text-gray-900 mb-2">
            Shopping Cart
          </h1>
          <p className="text-gray-600">
            Review your items and proceed to checkout
          </p>
        </div>

        {cartItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <ShoppingCart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-6">
              Looks like you haven't added any products to your cart yet.
            </p>
            <a
              href="/products"
              className="btn-primary inline-flex items-center space-x-2"
            >
              <span>Start Shopping</span>
              <ArrowRight className="h-5 w-5" />
            </a>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Cart Items ({cartItems.length})
                  </h2>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {cartItems.map((item, index) => (
                    <motion.div
                      key={item.product._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="p-6"
                    >
                      <div className="flex items-center space-x-4">
                        <img
                          src={item.product.images[0] || '/placeholder-product.jpg'}
                          alt={item.product.name}
                          className="h-20 w-20 rounded-lg object-cover"
                        />
                        
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">
                            {item.product.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {item.product.description.substring(0, 100)}...
                          </p>
                          <p className="text-lg font-semibold text-gray-900 mt-2">
                            ${item.product.price.toFixed(2)}
                          </p>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <select
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.product._id, parseInt(e.target.value))}
                            className="border border-gray-300 rounded px-3 py-1 text-sm"
                          >
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                              <option key={num} value={num}>
                                {num}
                              </option>
                            ))}
                          </select>
                          
                          <button
                            onClick={() => removeItem(item.product._id)}
                            className="text-red-600 hover:text-red-800 p-1"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 sticky top-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Order Summary
                </h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${calculateSubtotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">Free</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">$0.00</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span>${calculateTotal().toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                <button className="btn-primary w-full mb-4">
                  Proceed to Checkout
                </button>
                
                <button className="btn-outline w-full">
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}