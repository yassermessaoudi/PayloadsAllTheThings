'use client';

import React from 'react';
import { Zap, ShoppingBag } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export default function Logo({ size = 'md', showText = true, className = '' }: LogoProps) {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-3xl'
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className="relative">
        {/* Main logo container with gradient background */}
        <div className={`${sizeClasses[size]} relative bg-cyber-gradient rounded-lg p-1.5 shadow-cyber`}>
          {/* Animated glow effect */}
          <div className="absolute inset-0 bg-cyber-gradient rounded-lg animate-glow opacity-50"></div>
          
          {/* Logo icon - combination of shopping bag and lightning for innovation */}
          <div className="relative z-10 text-white">
            <ShoppingBag className="w-full h-full" strokeWidth={2} />
            <Zap className="absolute -top-0.5 -right-0.5 w-3 h-3 text-charcoal-gold-400" />
          </div>
        </div>
      </div>
      
      {showText && (
        <div className="flex flex-col">
          <h1 className={`${textSizeClasses[size]} font-bold font-poppins bg-gradient-to-r from-cyber-violet-500 via-deep-mint-500 to-charcoal-gold-500 bg-clip-text text-transparent`}>
            SmartCommerce
          </h1>
          {size !== 'sm' && (
            <p className="text-xs text-charcoal-500 font-medium tracking-wide">
              Shop Intelligently. Expand Infinitely.
            </p>
          )}
        </div>
      )}
    </div>
  );
}