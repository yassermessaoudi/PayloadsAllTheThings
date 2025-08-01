import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Category from '@/models/Category';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const categories = await Category.find()
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

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const categoryData = await request.json();

    const category = new Category(categoryData);
    await category.save();

    return NextResponse.json({
      message: 'Category created successfully',
      category,
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}