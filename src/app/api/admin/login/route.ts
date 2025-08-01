import { NextRequest, NextResponse } from 'next/server';
import { generateToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    // Validate input
    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }

    // Check hardcoded admin credentials
    if (username === 'yasser' && password === 'yasser') {
      // Generate JWT token for admin
      const token = generateToken({
        userId: 'admin',
        email: 'admin@smartcommerce.com',
        role: 'admin',
      });

      return NextResponse.json({
        message: 'Admin login successful',
        user: {
          _id: 'admin',
          username: 'yasser',
          email: 'admin@smartcommerce.com',
          role: 'admin',
        },
        token,
      });
    } else {
      return NextResponse.json(
        { error: 'Invalid admin credentials' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}