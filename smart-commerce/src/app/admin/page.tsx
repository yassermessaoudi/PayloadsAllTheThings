'use client';

import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Users, 
  Package, 
  ShoppingCart, 
  DollarSign,
  Eye,
  Star,
  Calendar,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

interface DashboardStats {
  totalUsers: number;
  totalProducts: number;
  totalOrders: number;
  revenue: number;
  siteVisits: number;
  conversionRate: number;
  averageOrderValue: number;
  lastUpdated: string;
}

interface RecentOrder {
  _id: string;
  orderNumber: string;
  customerName: string;
  total: number;
  status: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    revenue: 0,
    siteVisits: 0,
    conversionRate: 0,
    averageOrderValue: 0,
    lastUpdated: ''
  });
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsResponse, ordersResponse] = await Promise.all([
        fetch('/api/analytics/stats'),
        fetch('/api/admin/orders/recent')
      ]);

      if (statsResponse.ok) {
        const statsData = await statsResponse.json();
        setStats(statsData);
      }

      if (ordersResponse.ok) {
        const ordersData = await ordersResponse.json();
        setRecentOrders(ordersData.orders || []);
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const statCards = [
    {
      title: 'Total Revenue',
      value: formatCurrency(stats.revenue),
      icon: DollarSign,
      color: 'charcoal-gold',
      change: '+12.5%',
      trend: 'up'
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders.toLocaleString(),
      icon: ShoppingCart,
      color: 'deep-mint',
      change: '+8.2%',
      trend: 'up'
    },
    {
      title: 'Total Customers',
      value: stats.totalUsers.toLocaleString(),
      icon: Users,
      color: 'cyber-violet',
      change: '+15.3%',
      trend: 'up'
    },
    {
      title: 'Products',
      value: stats.totalProducts.toLocaleString(),
      icon: Package,
      color: 'deep-mint',
      change: '+2.1%',
      trend: 'up'
    },
    {
      title: 'Site Visits',
      value: stats.siteVisits.toLocaleString(),
      icon: Eye,
      color: 'cyber-violet',
      change: '+24.8%',
      trend: 'up'
    },
    {
      title: 'Conversion Rate',
      value: `${stats.conversionRate.toFixed(1)}%`,
      icon: TrendingUp,
      color: 'charcoal-gold',
      change: '+1.2%',
      trend: 'up'
    }
  ];

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-charcoal-700 rounded w-64"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-32 bg-charcoal-700 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white font-poppins mb-2">
          Dashboard
        </h1>
        <p className="text-charcoal-400">
          Welcome back! Here's what's happening with your store today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {statCards.map((card, index) => (
          <div
            key={index}
            className="bg-charcoal-800/50 rounded-xl p-6 border border-charcoal-700/50 hover:border-charcoal-600 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg bg-${card.color}-600/20`}>
                <card.icon className={`w-6 h-6 text-${card.color}-400`} />
              </div>
              <div className={`flex items-center space-x-1 text-sm ${
                card.trend === 'up' ? 'text-green-400' : 'text-red-400'
              }`}>
                {card.trend === 'up' ? (
                  <ArrowUp className="w-4 h-4" />
                ) : (
                  <ArrowDown className="w-4 h-4" />
                )}
                <span>{card.change}</span>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-white mb-1">
                {card.value}
              </h3>
              <p className="text-charcoal-400 text-sm">{card.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Revenue Chart Placeholder */}
        <div className="bg-charcoal-800/50 rounded-xl p-6 border border-charcoal-700/50">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Revenue Overview</h2>
            <div className="flex items-center space-x-2 text-sm text-charcoal-400">
              <Calendar className="w-4 h-4" />
              <span>Last 30 days</span>
            </div>
          </div>
          
          <div className="h-64 bg-charcoal-700/30 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <TrendingUp className="w-12 h-12 text-charcoal-500 mx-auto mb-3" />
              <p className="text-charcoal-400">Revenue chart will appear here</p>
              <p className="text-charcoal-500 text-sm mt-1">Connect Recharts for visualization</p>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-charcoal-800/50 rounded-xl p-6 border border-charcoal-700/50">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Recent Orders</h2>
            <a 
              href="/admin/orders" 
              className="text-deep-mint-400 hover:text-deep-mint-300 text-sm transition-colors"
            >
              View all
            </a>
          </div>

          <div className="space-y-4">
            {recentOrders.length > 0 ? (
              recentOrders.slice(0, 5).map((order) => (
                <div
                  key={order._id}
                  className="flex items-center justify-between p-3 bg-charcoal-700/30 rounded-lg"
                >
                  <div>
                    <p className="text-white font-medium">#{order.orderNumber}</p>
                    <p className="text-charcoal-400 text-sm">{order.customerName}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-medium">{formatCurrency(order.total)}</p>
                    <p className="text-charcoal-400 text-sm">{formatDate(order.createdAt)}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <ShoppingCart className="w-12 h-12 text-charcoal-500 mx-auto mb-3" />
                <p className="text-charcoal-400">No recent orders</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-white mb-6">Quick Actions</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <a
            href="/admin/products/new"
            className="bg-deep-mint-600/20 border border-deep-mint-500/30 rounded-lg p-4 hover:bg-deep-mint-600/30 transition-colors"
          >
            <Package className="w-6 h-6 text-deep-mint-400 mb-2" />
            <h3 className="text-white font-medium">Add Product</h3>
            <p className="text-charcoal-400 text-sm">Create a new product</p>
          </a>
          
          <a
            href="/admin/categories/new"
            className="bg-cyber-violet-600/20 border border-cyber-violet-500/30 rounded-lg p-4 hover:bg-cyber-violet-600/30 transition-colors"
          >
            <Package className="w-6 h-6 text-cyber-violet-400 mb-2" />
            <h3 className="text-white font-medium">Add Category</h3>
            <p className="text-charcoal-400 text-sm">Create a new category</p>
          </a>
          
          <a
            href="/admin/coupons/new"
            className="bg-charcoal-gold-600/20 border border-charcoal-gold-500/30 rounded-lg p-4 hover:bg-charcoal-gold-600/30 transition-colors"
          >
            <Star className="w-6 h-6 text-charcoal-gold-400 mb-2" />
            <h3 className="text-white font-medium">Create Coupon</h3>
            <p className="text-charcoal-400 text-sm">Add a discount coupon</p>
          </a>
          
          <a
            href="/admin/analytics"
            className="bg-charcoal-600/20 border border-charcoal-500/30 rounded-lg p-4 hover:bg-charcoal-600/30 transition-colors"
          >
            <TrendingUp className="w-6 h-6 text-charcoal-400 mb-2" />
            <h3 className="text-white font-medium">View Analytics</h3>
            <p className="text-charcoal-400 text-sm">Check detailed reports</p>
          </a>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 pt-8 border-t border-charcoal-700">
        <p className="text-charcoal-500 text-sm text-center">
          Last updated: {stats.lastUpdated ? formatDate(stats.lastUpdated) : 'Never'}
        </p>
      </div>
    </div>
  );
}