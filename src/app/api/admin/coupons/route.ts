import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Coupon from '@/models/Coupon';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const coupons = await Coupon.find()
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      coupons,
      count: coupons.length,
    });
  } catch (error) {
    console.error('Error fetching coupons:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const couponData = await request.json();

    const coupon = new Coupon(couponData);
    await coupon.save();

    return NextResponse.json({
      message: 'Coupon created successfully',
      coupon,
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating coupon:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}