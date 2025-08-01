'use client';

import { BarChart3, Package, Tag, Gift, Settings } from 'lucide-react';
import { cn } from '@/utils/cn';

interface AdminSidebarProps {
  activeSection: string;
  onSectionChange: (section: any) => void;
}

export default function AdminSidebar({ activeSection, onSectionChange }: AdminSidebarProps) {
  const menuItems = [
    {
      id: 'analytics',
      label: 'Analytics',
      icon: BarChart3,
      description: 'View site statistics and metrics',
    },
    {
      id: 'products',
      label: 'Products',
      icon: Package,
      description: 'Manage products and inventory',
    },
    {
      id: 'categories',
      label: 'Categories',
      icon: Tag,
      description: 'Organize product categories',
    },
    {
      id: 'coupons',
      label: 'Coupons',
      icon: Gift,
      description: 'Manage discounts and promotions',
    },
  ];

  return (
    <aside className="w-64 bg-white shadow-sm border-r border-gray-200 min-h-screen">
      <div className="p-6">
        <h2 className="text-xl font-poppins font-bold gradient-text mb-6">
          Admin Dashboard
        </h2>
        
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={cn(
                  'w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200',
                  isActive
                    ? 'bg-gradient-to-r from-cyber-violet to-deep-mint text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-cyber-violet'
                )}
              >
                <Icon className={cn(
                  'h-5 w-5',
                  isActive ? 'text-white' : 'text-gray-500'
                )} />
                <div>
                  <div className="font-medium">{item.label}</div>
                  <div className={cn(
                    'text-xs',
                    isActive ? 'text-white/80' : 'text-gray-500'
                  )}>
                    {item.description}
                  </div>
                </div>
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}