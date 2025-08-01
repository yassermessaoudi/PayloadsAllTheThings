import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Category from '@/models/Category';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const categories = await Category.find({ isActive: true })
      .sort({ name: 1 })
      .lean();

    return NextResponse.json({
      categories,
      count: categories.length,
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}