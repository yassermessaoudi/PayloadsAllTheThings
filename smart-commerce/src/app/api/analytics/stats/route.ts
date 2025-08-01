import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';

export async function GET() {
  try {
    const db = await getDatabase();
    
    // Get collections
    const usersCollection = db.collection('users');
    const productsCollection = db.collection('products');
    const ordersCollection = db.collection('orders');
    const analyticsCollection = db.collection('analytics');

    // Run aggregations in parallel
    const [
      totalUsers,
      totalProducts,
      totalOrders,
      revenueData,
      recentAnalytics
    ] = await Promise.all([
      usersCollection.countDocuments({ role: 'customer', isActive: true }),
      productsCollection.countDocuments({ isActive: true }),
      ordersCollection.countDocuments(),
      ordersCollection.aggregate([
        { $match: { paymentStatus: 'paid' } },
        { $group: { _id: null, totalRevenue: { $sum: '$total' } } }
      ]).toArray(),
      analyticsCollection
        .find({})
        .sort({ date: -1 })
        .limit(30)
        .toArray()
    ]);

    // Calculate total revenue
    const revenue = revenueData.length > 0 ? revenueData[0].totalRevenue : 0;

    // Calculate growth metrics from recent analytics
    let siteVisits = 0;
    let conversionRate = 0;
    let averageOrderValue = 0;

    if (recentAnalytics.length > 0) {
      siteVisits = recentAnalytics.reduce((sum, day) => sum + (day.siteVisits || 0), 0);
      
      const totalOrders30Days = recentAnalytics.reduce((sum, day) => sum + (day.orderCount || 0), 0);
      conversionRate = siteVisits > 0 ? (totalOrders30Days / siteVisits) * 100 : 0;
      
      const totalRevenue30Days = recentAnalytics.reduce((sum, day) => sum + (day.revenue || 0), 0);
      averageOrderValue = totalOrders30Days > 0 ? totalRevenue30Days / totalOrders30Days : 0;
    }

    const stats = {
      totalUsers,
      totalProducts,
      totalOrders,
      revenue: Math.round(revenue * 100) / 100, // Round to 2 decimal places
      siteVisits,
      conversionRate: Math.round(conversionRate * 100) / 100,
      averageOrderValue: Math.round(averageOrderValue * 100) / 100,
      lastUpdated: new Date().toISOString()
    };

    return NextResponse.json(stats);

  } catch (error) {
    console.error('Analytics stats fetch error:', error);
    
    // Return default stats if there's an error
    return NextResponse.json({
      totalUsers: 0,
      totalProducts: 0,
      totalOrders: 0,
      revenue: 0,
      siteVisits: 0,
      conversionRate: 0,
      averageOrderValue: 0,
      lastUpdated: new Date().toISOString(),
      error: 'Failed to fetch real-time stats'
    });
  }
}