import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '8');

    // Get featured products (active products with stock, sorted by views/sales)
    const products = await Product.find({
      isActive: true,
      stock: { $gt: 0 },
    })
      .populate('category', 'name')
      .populate('branch', 'name')
      .sort({ views: -1, sales: -1 })
      .limit(limit)
      .lean();

    return NextResponse.json({
      products,
      count: products.length,
    });
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}