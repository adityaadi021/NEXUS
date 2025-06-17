import { NextResponse } from 'next/server';
import { z } from 'zod';
import dbConnect from '@/lib/db';
import User from '@/lib/models/User';

const registerSchema = z.object({
  username: z.string()
    .min(3, 'Username must be at least 3 characters long')
    .max(30, 'Username cannot exceed 30 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
  email: z.string()
    .email('Please enter a valid email address')
    .toLowerCase(),
  password: z.string()
    .min(6, 'Password must be at least 6 characters long')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log('Registration attempt for email:', body.email);
    
    const { username, email, password } = registerSchema.parse(body);

    // Connect to database
    console.log('Attempting to connect to database...');
    try {
      await dbConnect();
      console.log('Database connection successful');
    } catch (dbError) {
      console.error('Database connection error:', dbError);
      return NextResponse.json(
        { error: 'Unable to connect to the database. Please try again later.' },
        { status: 503 }
      );
    }

    // Check if user already exists
    console.log('Checking for existing user...');
    const existingUser = await User.findOne({ 
      $or: [{ email }, { username }] 
    });

    if (existingUser) {
      console.log('User already exists:', existingUser.email === email ? 'email' : 'username');
      return NextResponse.json(
        { error: existingUser.email === email ? 'Email already registered' : 'Username already taken' },
        { status: 400 }
      );
    }

    // Create user (password will be hashed by the User model's pre-save hook)
    console.log('Creating new user...');
    const user = await User.create({
      username,
      email,
      password, // The model will hash this password
    });

    console.log('User registered successfully:', email);
    return NextResponse.json({ 
      message: 'User registered successfully',
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    
    // Handle specific error types
    if (error instanceof z.ZodError) {
      const errorMessage = error.errors.map(err => err.message).join(', ');
      console.error('Validation error:', errorMessage);
      return NextResponse.json(
        { error: errorMessage },
        { status: 400 }
      );
    }

    if (error instanceof Error) {
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
      return NextResponse.json(
        { error: 'An unexpected error occurred. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
} 