import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { hashPassword, generateToken, createUserSession } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { email, password, firstName, lastName, username } = await request.json();

    if (!email || !password || !firstName || !lastName || !username) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate password length
    if (password.length < 6) {
      return NextResponse.json(
        { message: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    const usersCollection = db.collection('users');

    // Check if user already exists
    const existingUser = await usersCollection.findOne({
      $or: [
        { email: email.toLowerCase() },
        { username: username.toLowerCase() }
      ]
    });

    if (existingUser) {
      if (existingUser.email === email.toLowerCase()) {
        return NextResponse.json(
          { message: 'Email already exists' },
          { status: 409 }
        );
      } else {
        return NextResponse.json(
          { message: 'Username already exists' },
          { status: 409 }
        );
      }
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create new user
    const newUser = {
      email: email.toLowerCase(),
      username: username.toLowerCase(),
      password: hashedPassword,
      firstName,
      lastName,
      role: 'customer' as const,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await usersCollection.insertOne(newUser);

    // Generate JWT token
    const token = generateToken(result.insertedId.toString(), newUser.role);

    // Create user session (without password)
    const userSession = createUserSession({
      ...newUser,
      _id: result.insertedId
    });

    // Update analytics
    try {
      const analyticsCollection = db.collection('analytics');
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      await analyticsCollection.updateOne(
        { date: today },
        {
          $inc: { siteVisits: 1, uniqueVisitors: 1 },
          $setOnInsert: {
            pageViews: 0,
            productViews: {},
            orderCount: 0,
            revenue: 0,
            conversionRate: 0,
            averageOrderValue: 0,
            topProducts: [],
            topCategories: [],
            trafficSources: {},
            deviceTypes: {},
            browserTypes: {},
            createdAt: new Date()
          }
        },
        { upsert: true }
      );
    } catch (analyticsError) {
      console.error('Analytics update error:', analyticsError);
      // Don't fail the signup if analytics fails
    }

    return NextResponse.json({
      message: 'Account created successfully',
      token,
      user: userSession
    }, { status: 201 });

  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}