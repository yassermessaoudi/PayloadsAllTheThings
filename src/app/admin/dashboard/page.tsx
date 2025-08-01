'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Package, 
  Users, 
  DollarSign, 
  TrendingUp,
  Plus,
  Settings,
  LogOut,
  Home
} from 'lucide-react';
import Link from 'next/link';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AnalyticsDashboard from '@/components/admin/AnalyticsDashboard';
import ProductManagement from '@/components/admin/ProductManagement';
import CategoryManagement from '@/components/admin/CategoryManagement';
import CouponManagement from '@/components/admin/CouponManagement';

type DashboardSection = 'analytics' | 'products' | 'categories' | 'coupons';

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState<DashboardSection>('analytics');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      window.location.href = '/admin/login';
      return;
    }
    setIsAuthenticated(true);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    window.location.href = '/admin/login';
  };

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  const renderSection = () => {
    switch (activeSection) {
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'products':
        return <ProductManagement />;
      case 'categories':
        return <CategoryManagement />;
      case 'coupons':
        return <CouponManagement />;
      default:
        return <AnalyticsDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2 text-gray-600 hover:text-cyber-violet">
                <Home className="h-5 w-5" />
                <span className="font-medium">Back to Site</span>
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">Admin Panel</p>
                <p className="text-xs text-gray-500">yasser</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <AdminSidebar 
          activeSection={activeSection} 
          onSectionChange={setActiveSection} 
        />

        {/* Main Content */}
        <main className="flex-1 p-6">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderSection()}
          </motion.div>
        </main>
      </div>
    </div>
  );
}