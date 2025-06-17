import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/lib/models/User';

export async function GET(request: Request) {
  try {
    // Ensure we're returning JSON
    const headers = {
      'Content-Type': 'application/json',
    };

    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'No token provided' },
        { status: 401, headers }
      );
    }

    const token = authHeader.split(' ')[1];
    console.log('Verifying token:', token);

    // Check for admin token
    if (token === 'admin-token') {
      return NextResponse.json({
        isAdmin: true,
        user: {
          id: 'admin',
          username: 'admin',
          email: 'admin@nexus.com',
          isAdmin: true
        }
      }, { headers });
    }

    // For regular users, check the token format and user existence
    if (!token.startsWith('user-token-')) {
      return NextResponse.json(
        { error: 'Invalid token format' },
        { status: 401, headers }
      );
    }

    const userId = token.replace('user-token-', '');
    console.log('Looking up user:', userId);

    try {
      await dbConnect();
    } catch (dbError) {
      console.error('Database connection error:', dbError);
      return NextResponse.json(
        { error: 'Database connection failed' },
        { status: 503, headers }
      );
    }

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 401, headers }
      );
    }

    return NextResponse.json({
      isAdmin: user.isAdmin,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin
      }
    }, { headers });

  } catch (error) {
    console.error('Token verification error:', error);
    return NextResponse.json(
      { error: 'Token verification failed' },
      { 
        status: 401,
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );
  }
} 