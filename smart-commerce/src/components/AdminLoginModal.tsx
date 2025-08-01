'use client';

import React, { useState } from 'react';
import { X, Eye, EyeOff, Shield, Lock, User } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AdminLoginModal({ isOpen, onClose, onSuccess }: AdminLoginModalProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) {
      setError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.username || !formData.password) {
      setError('Please enter both username and password');
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch('/api/auth/admin-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('adminToken', data.token);
        onSuccess();
        resetForm();
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      username: '',
      password: ''
    });
    setError('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  // Auto-fill for demo purposes (can be removed in production)
  const autoFillCredentials = () => {
    setFormData({
      username: 'yasser',
      password: 'yasser'
    });
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
        <div className="inline-block w-full max-w-md p-6 my-8 text-left align-middle transition-all transform bg-charcoal-800 shadow-elegant rounded-2xl border border-cyber-violet-500/30 relative">
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 text-charcoal-400 hover:text-white transition-colors rounded-lg hover:bg-charcoal-700"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="mb-6 text-center">
            <div className="flex justify-center mb-3">
              <div className="p-3 bg-cyber-violet-600/20 rounded-full">
                <Shield className="w-8 h-8 text-cyber-violet-400" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white font-poppins">
              Admin Access
            </h3>
            <p className="text-charcoal-400 mt-1">
              Enter admin credentials to access dashboard
            </p>
          </div>

          {/* Demo Credentials Info */}
          <div className="mb-4 p-3 bg-cyber-violet-600/10 border border-cyber-violet-500/20 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-cyber-violet-300 text-sm font-medium">Demo Credentials:</p>
                <p className="text-charcoal-300 text-xs">Username: yasser | Password: yasser</p>
              </div>
              <button
                onClick={autoFillCredentials}
                className="text-xs text-cyber-violet-400 hover:text-cyber-violet-300 underline transition-colors"
              >
                Auto-fill
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-charcoal-300 mb-1">
                Admin Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-2 bg-charcoal-700 border border-charcoal-600 rounded-lg text-white placeholder-charcoal-400 focus:outline-none focus:ring-2 focus:ring-cyber-violet-500 focus:border-transparent transition-all"
                  placeholder="Enter admin username"
                />
                <User className="absolute left-3 top-2.5 h-4 w-4 text-charcoal-400" />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-charcoal-300 mb-1">
                Admin Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-10 py-2 bg-charcoal-700 border border-charcoal-600 rounded-lg text-white placeholder-charcoal-400 focus:outline-none focus:ring-2 focus:ring-cyber-violet-500 focus:border-transparent transition-all"
                  placeholder="Enter admin password"
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
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-cyber-violet-600 hover:bg-cyber-violet-700 disabled:bg-charcoal-600 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-200 cyber-button shadow-cyber disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  <span>Authenticating...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <Shield className="w-4 h-4" />
                  <span>Access Admin Panel</span>
                </div>
              )}
            </button>

            {/* Security Notice */}
            <div className="text-center pt-3">
              <p className="text-charcoal-500 text-xs">
                🔒 Secure admin access with encrypted credentials
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}