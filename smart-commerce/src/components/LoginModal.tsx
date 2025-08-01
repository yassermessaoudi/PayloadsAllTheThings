'use client';

import React, { useState } from 'react';
import { X, Eye, EyeOff, Mail, Lock, User, UserPlus } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: any) => void;
}

export default function LoginModal({ isOpen, onClose, onSuccess }: LoginModalProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    username: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (isSignUp) {
      if (!formData.firstName) {
        newErrors.firstName = 'First name is required';
      }
      
      if (!formData.lastName) {
        newErrors.lastName = 'Last name is required';
      }

      if (!formData.username) {
        newErrors.username = 'Username is required';
      }

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      const endpoint = isSignUp ? '/api/auth/signup' : '/api/auth/login';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        onSuccess(data.user);
        resetForm();
      } else {
        setErrors({ general: data.message || 'Authentication failed' });
      }
    } catch (error) {
      setErrors({ general: 'Network error. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      username: ''
    });
    setErrors({});
    setIsSignUp(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div 
          className="fixed inset-0 transition-opacity bg-charcoal-900/75 backdrop-blur-sm"
          onClick={handleClose}
        />

        {/* Modal panel */}
        <div className="inline-block w-full max-w-md p-6 my-8 text-left align-middle transition-all transform bg-charcoal-800 shadow-elegant rounded-2xl border border-charcoal-700/50 relative">
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 text-charcoal-400 hover:text-white transition-colors rounded-lg hover:bg-charcoal-700"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-white font-poppins">
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </h3>
            <p className="text-charcoal-400 mt-1">
              {isSignUp 
                ? 'Join our smart commerce platform' 
                : 'Sign in to your account'
              }
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* General Error */}
            {errors.general && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="text-red-400 text-sm">{errors.general}</p>
              </div>
            )}

            {/* Sign Up Fields */}
            {isSignUp && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-charcoal-300 mb-1">
                      First Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-2 bg-charcoal-700 border rounded-lg text-white placeholder-charcoal-400 focus:outline-none focus:ring-2 transition-all ${
                          errors.firstName 
                            ? 'border-red-500 focus:ring-red-500' 
                            : 'border-charcoal-600 focus:ring-deep-mint-500'
                        }`}
                        placeholder="John"
                      />
                      <User className="absolute left-3 top-2.5 h-4 w-4 text-charcoal-400" />
                    </div>
                    {errors.firstName && <p className="text-red-400 text-xs mt-1">{errors.firstName}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal-300 mb-1">
                      Last Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-2 bg-charcoal-700 border rounded-lg text-white placeholder-charcoal-400 focus:outline-none focus:ring-2 transition-all ${
                          errors.lastName 
                            ? 'border-red-500 focus:ring-red-500' 
                            : 'border-charcoal-600 focus:ring-deep-mint-500'
                        }`}
                        placeholder="Doe"
                      />
                      <User className="absolute left-3 top-2.5 h-4 w-4 text-charcoal-400" />
                    </div>
                    {errors.lastName && <p className="text-red-400 text-xs mt-1">{errors.lastName}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal-300 mb-1">
                    Username
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-2 bg-charcoal-700 border rounded-lg text-white placeholder-charcoal-400 focus:outline-none focus:ring-2 transition-all ${
                        errors.username 
                          ? 'border-red-500 focus:ring-red-500' 
                          : 'border-charcoal-600 focus:ring-deep-mint-500'
                      }`}
                      placeholder="johndoe"
                    />
                    <UserPlus className="absolute left-3 top-2.5 h-4 w-4 text-charcoal-400" />
                  </div>
                  {errors.username && <p className="text-red-400 text-xs mt-1">{errors.username}</p>}
                </div>
              </>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-charcoal-300 mb-1">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-2 bg-charcoal-700 border rounded-lg text-white placeholder-charcoal-400 focus:outline-none focus:ring-2 transition-all ${
                    errors.email 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-charcoal-600 focus:ring-deep-mint-500'
                  }`}
                  placeholder="john@example.com"
                />
                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-charcoal-400" />
              </div>
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-charcoal-300 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-10 py-2 bg-charcoal-700 border rounded-lg text-white placeholder-charcoal-400 focus:outline-none focus:ring-2 transition-all ${
                    errors.password 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-charcoal-600 focus:ring-deep-mint-500'
                  }`}
                  placeholder="••••••••"
                />
                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-charcoal-400" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-charcoal-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
            </div>

            {/* Confirm Password (Sign Up only) */}
            {isSignUp && (
              <div>
                <label className="block text-sm font-medium text-charcoal-300 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-2 bg-charcoal-700 border rounded-lg text-white placeholder-charcoal-400 focus:outline-none focus:ring-2 transition-all ${
                      errors.confirmPassword 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-charcoal-600 focus:ring-deep-mint-500'
                    }`}
                    placeholder="••••••••"
                  />
                  <Lock className="absolute left-3 top-2.5 h-4 w-4 text-charcoal-400" />
                </div>
                {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-deep-mint-600 hover:bg-deep-mint-700 disabled:bg-charcoal-600 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-200 cyber-button shadow-mint disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  <span>Processing...</span>
                </div>
              ) : (
                isSignUp ? 'Create Account' : 'Sign In'
              )}
            </button>

            {/* Toggle Sign Up / Sign In */}
            <div className="text-center pt-4 border-t border-charcoal-600">
              <p className="text-charcoal-400 text-sm">
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                <button
                  type="button"
                  onClick={() => {
                    setIsSignUp(!isSignUp);
                    setErrors({});
                  }}
                  className="ml-2 text-deep-mint-400 hover:text-deep-mint-300 font-medium transition-colors"
                >
                  {isSignUp ? 'Sign In' : 'Sign Up'}
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}