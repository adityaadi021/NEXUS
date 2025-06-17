import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/lib/models/User';

export async function GET() {
  console.log('Testing database connection...');
  
  try {
    // Check environment variables
    console.log('Environment check:', {
      NODE_ENV: process.env.NODE_ENV,
      MONGODB_URI_EXISTS: !!process.env.MONGODB_URI,
      MONGODB_URI_PREFIX: process.env.MONGODB_URI ? process.env.MONGODB_URI.substring(0, 20) + '...' : 'not set'
    });

    // Try to connect to database
    console.log('Attempting database connection...');
    await dbConnect();
    console.log('Database connection successful');

    // Try to count users
    console.log('Counting users...');
    const userCount = await User.countDocuments();
    console.log(`Found ${userCount} users in database`);

    return NextResponse.json({
      status: 'success',
      message: 'Database connection successful',
      userCount,
      environment: {
        nodeEnv: process.env.NODE_ENV,
        hasMongoUri: !!process.env.MONGODB_URI
      }
    });
  } catch (error) {
    console.error('Database test failed:', error);
    return NextResponse.json({
      status: 'error',
      message: 'Database connection failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      environment: {
        nodeEnv: process.env.NODE_ENV,
        hasMongoUri: !!process.env.MONGODB_URI
      }
    }, { status: 500 });
  }
} 