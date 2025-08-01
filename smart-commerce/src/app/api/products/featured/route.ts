import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';

export async function GET() {
  try {
    const db = await getDatabase();
    const productsCollection = db.collection('products');

    // Fetch featured products (products with isFeatured: true)
    const featuredProducts = await productsCollection
      .find({ 
        isActive: true, 
        isFeatured: true 
      })
      .sort({ createdAt: -1 })
      .limit(6)
      .toArray();

    // If no featured products exist, get the most recent products
    if (featuredProducts.length === 0) {
      const recentProducts = await productsCollection
        .find({ isActive: true })
        .sort({ createdAt: -1 })
        .limit(6)
        .toArray();

      return NextResponse.json({
        products: recentProducts,
        total: recentProducts.length,
        message: 'Showing recent products (no featured products found)'
      });
    }

    // Convert ObjectId to string for frontend compatibility
    const serializedProducts = featuredProducts.map(product => ({
      ...product,
      _id: product._id.toString(),
      categoryId: product.categoryId.toString()
    }));

    return NextResponse.json({
      products: serializedProducts,
      total: featuredProducts.length
    });

  } catch (error) {
    console.error('Featured products fetch error:', error);
    return NextResponse.json(
      { message: 'Failed to fetch featured products' },
      { status: 500 }
    );
  }
}