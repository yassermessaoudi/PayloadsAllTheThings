import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import Order from '@/models/Order';
import User from '@/models/User';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    // Get basic counts
    const totalProducts = await Product.countDocuments({ isActive: true });
    const totalOrders = await Order.countDocuments();
    const totalUsers = await User.countDocuments({ role: 'user' });

    // Calculate total sales
    const orders = await Order.find({ status: { $ne: 'cancelled' } });
    const totalSales = orders.reduce((sum, order) => sum + order.finalTotal, 0);

    // Get top products by sales
    const topProducts = await Product.find({ isActive: true })
      .sort({ sales: -1 })
      .limit(5)
      .select('name sales')
      .lean();

    // Get recent orders
    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('user', 'username email')
      .lean();

    // Mock sales data for the last 6 months
    const salesData = [
      { month: 'Jan', sales: 12000 },
      { month: 'Feb', sales: 19000 },
      { month: 'Mar', sales: 15000 },
      { month: 'Apr', sales: 22000 },
      { month: 'May', sales: 18000 },
      { month: 'Jun', sales: 25000 },
    ];

    // Mock category distribution
    const categoryData = [
      { name: 'Electronics', value: 35, color: '#4ade80' },
      { name: 'Clothing', value: 25, color: '#a855f7' },
      { name: 'Books', value: 20, color: '#fbbf24' },
      { name: 'Home', value: 15, color: '#ef4444' },
      { name: 'Sports', value: 5, color: '#3b82f6' },
    ];

    // Calculate conversion rate (mock data)
    const totalVisits = 15420;
    const conversionRate = totalOrders > 0 ? ((totalOrders / totalVisits) * 100).toFixed(1) : 0;

    return NextResponse.json({
      totalVisits,
      totalSales,
      totalOrders,
      totalProducts,
      totalUsers,
      conversionRate: parseFloat(conversionRate),
      topProducts,
      recentOrders,
      salesData,
      categoryData,
    });
  } catch (error) {
    console.error('Analytics error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}