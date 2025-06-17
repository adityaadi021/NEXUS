import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma, dbConnect } from '@/lib/db';
import User from '@/lib/models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

// Hardcoded admin credentials
const ADMIN_EMAIL = 'admin@nexus.com';
const ADMIN_PASSWORD = 'admin123';

export async function POST(request: Request) {
  // Ensure we're returning JSON
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };

  try {
    console.log('Login request received');
    
    // Parse request body
    let body;
    try {
      body = await request.json();
      console.log('Request body:', { ...body, password: '[REDACTED]' });
    } catch (e) {
      console.error('Failed to parse request body:', e);
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400, headers }
      );
    }

    // Validate input
    let validatedData;
    try {
      validatedData = loginSchema.parse(body);
    } catch (e) {
      if (e instanceof z.ZodError) {
        const errorMessage = e.errors.map(err => err.message).join(', ');
        console.error('Validation error:', errorMessage);
        return NextResponse.json(
          { error: errorMessage },
          { status: 400, headers }
        );
      }
      throw e;
    }

    const { email, password } = validatedData;
    console.log('Login attempt for email:', email);

    // Check for admin login first
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      console.log('Admin login successful');
      const response = {
        token: 'admin-token',
        user: {
          id: 'admin',
          username: 'admin',
          email: ADMIN_EMAIL,
          isAdmin: true
        }
      };
      console.log('Sending admin response:', { ...response, token: '[REDACTED]' });
      return NextResponse.json(response, { headers });
    }

    // Regular user login
    console.log('Attempting database connection...');
    try {
      await dbConnect();
      console.log('Database connection successful');
    } catch (dbError) {
      console.error('Database connection error:', dbError);
      return NextResponse.json(
        { error: 'Unable to connect to the database. Please try again later.' },
        { status: 503, headers }
      );
    }

    console.log('Looking up user in database...');
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      console.log('User not found:', email);
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401, headers }
      );
    }

    console.log('Comparing passwords...');
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      console.log('Password mismatch for user:', email);
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401, headers }
      );
    }

    // Remove password from user object
    const userResponse = {
      id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin
    };

    const response = {
      token: `user-token-${user._id}`,
      user: userResponse
    };

    console.log('Login successful for user:', email);
    console.log('Sending user response:', { ...response, token: '[REDACTED]' });
    return NextResponse.json(response, { headers });

  } catch (error) {
    console.error('Unhandled error in login route:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500, headers }
    );
  }
}