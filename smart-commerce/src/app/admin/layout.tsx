'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  ShoppingCart, 
  BarChart3, 
  Settings, 
  Tag, 
  Folder,
  LogOut,
  Menu,
  X,
  Shield
} from 'lucide-react';
import Logo from '@/components/Logo';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const adminToken = localStorage.getItem('adminToken');
    
    if (!adminToken) {
      router.push('/');
      return;
    }

    try {
      const response = await fetch('/api/auth/profile', {
        headers: { Authorization: `Bearer ${adminToken}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.role === 'admin') {
          setIsAuthenticated(true);
        } else {
          router.push('/');
        }
      } else {
        localStorage.removeItem('adminToken');
        router.push('/');
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      router.push('/');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/');
  };

  const navigationItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
    { icon: Package, label: 'Products', href: '/admin/products' },
    { icon: Folder, label: 'Categories', href: '/admin/categories' },
    { icon: ShoppingCart, label: 'Orders', href: '/admin/orders' },
    { icon: Users, label: 'Customers', href: '/admin/customers' },
    { icon: Tag, label: 'Coupons', href: '/admin/coupons' },
    { icon: BarChart3, label: 'Analytics', href: '/admin/analytics' },
    { icon: Settings, label: 'Settings', href: '/admin/settings' },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-charcoal-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-cyber-violet-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-white">Authenticating...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-charcoal-900 flex">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-charcoal-800 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-4 border-b border-charcoal-700">
          <Logo size="sm" showText={true} />
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="p-2 text-charcoal-400 hover:text-white lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="mt-8 px-4">
          <div className="space-y-2">
            {navigationItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="flex items-center space-x-3 px-3 py-2 text-charcoal-300 hover:text-white hover:bg-charcoal-700 rounded-lg transition-colors"
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </a>
            ))}
          </div>

          <div className="mt-8 pt-8 border-t border-charcoal-700">
            <div className="flex items-center space-x-3 px-3 py-2 bg-cyber-violet-600/20 rounded-lg mb-4">
              <Shield className="w-5 h-5 text-cyber-violet-400" />
              <div>
                <p className="text-sm font-medium text-white">Admin</p>
                <p className="text-xs text-charcoal-400">yasser</p>
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg transition-colors w-full"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:pl-0">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between h-16 px-4 bg-charcoal-800 border-b border-charcoal-700">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 text-charcoal-400 hover:text-white"
          >
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="text-white font-semibold">Admin Panel</h1>
          <div></div>
        </div>

        {/* Page Content */}
        <main className="min-h-screen bg-charcoal-900">
          {children}
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}