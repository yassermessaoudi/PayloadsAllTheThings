import { NextRequest, NextResponse } from 'next/server';
import { authenticateAdmin, generateToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { message: 'Username and password are required' },
        { status: 400 }
      );
    }

    // Authenticate admin with hardcoded credentials
    const isValidAdmin = await authenticateAdmin(username, password);

    if (!isValidAdmin) {
      return NextResponse.json(
        { message: 'Invalid admin credentials' },
        { status: 401 }
      );
    }

    // Generate JWT token for admin
    const token = generateToken('admin', 'admin');

    return NextResponse.json({
      message: 'Admin login successful',
      token,
      admin: {
        username: 'yasser',
        role: 'admin',
        loginTime: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}