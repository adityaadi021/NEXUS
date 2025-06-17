import { NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';
import { z } from 'zod';
import dbConnect from '@/lib/db';
import User from '@/lib/models/User';

// Middleware to verify admin token
const verifyAdmin = async (request: Request) => {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      console.log('No token provided in request');
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const token = authHeader.split(' ')[1];
    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is not configured');
      return NextResponse.json(
        { error: 'Server configuration error. Please contact support.' },
        { status: 500 }
      );
    }

    try {
      const decoded = verify(token, process.env.JWT_SECRET) as { 
        isAdmin: boolean;
        exp?: number;
      };

      // Check if token is expired
      if (decoded.exp && decoded.exp * 1000 < Date.now()) {
        console.log('Token expired');
        return NextResponse.json(
          { error: 'Token expired. Please log in again.' },
          { status: 401 }
        );
      }

      if (!decoded.isAdmin) {
        console.log('Non-admin user attempted admin access');
        return NextResponse.json(
          { error: 'Admin access required' },
          { status: 403 }
        );
      }

      console.log('Admin verification successful');
      return null;
    } catch (error) {
      console.error('Token verification error:', error);
      if (error instanceof Error) {
        if (error.name === 'TokenExpiredError') {
          return NextResponse.json(
            { error: 'Token expired. Please log in again.' },
            { status: 401 }
          );
        }
        if (error.name === 'JsonWebTokenError') {
          return NextResponse.json(
            { error: 'Invalid token. Please log in again.' },
            { status: 401 }
          );
        }
      }
      return NextResponse.json(
        { error: 'Invalid token. Please log in again.' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Admin verification error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
};

// Schema for user updates
const updateUserSchema = z.object({
  username: z.string()
    .min(3, 'Username must be at least 3 characters long')
    .max(30, 'Username cannot exceed 30 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores')
    .optional(),
  email: z.string()
    .email('Please enter a valid email address')
    .toLowerCase()
    .optional(),
  isAdmin: z.boolean().optional(),
}).refine(data => Object.keys(data).length > 0, {
  message: 'At least one field must be provided for update'
});

export async function GET(request: Request) {
  console.log('GET /api/admin/users - Starting request');
  
  try {
    // Verify admin access
    console.log('Verifying admin access...');
    const authError = await verifyAdmin(request);
    if (authError) {
      console.log('Admin verification failed:', authError);
      return authError;
    }
    console.log('Admin verification successful');

    // Connect to database
    try {
      console.log('Attempting to connect to database...');
      await dbConnect();
      console.log('Database connection successful');
    } catch (error) {
      console.error('Database connection error:', error);
      return NextResponse.json(
        { error: 'Unable to connect to the database. Please try again later.' },
        { status: 503 }
      );
    }

    // Fetch all users
    try {
      console.log('Fetching users from database...');
      const users = await User.find({}, { password: 0 })
        .sort({ createdAt: -1 })
        .lean();
      console.log(`Found ${users.length} users`);
      
      const formattedUsers = users.map(user => ({
        id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
        createdAt: user.createdAt
      }));

      console.log('Successfully formatted user data');
      return NextResponse.json({ users: formattedUsers });
    } catch (error) {
      console.error('Error fetching users:', error);
      return NextResponse.json(
        { error: 'Failed to fetch users. Please try again later.' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Unexpected error in GET /api/admin/users:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    // Verify admin access
    const authError = await verifyAdmin(request);
    if (authError) return authError;

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('id');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Connect to database
    try {
      await dbConnect();
    } catch (error) {
      console.error('Database connection error:', error);
      return NextResponse.json(
        { error: 'Unable to connect to the database. Please try again later.' },
        { status: 503 }
      );
    }

    // Delete user
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    console.log('User deleted successfully:', userId);
    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json(
      { error: 'Failed to delete user. Please try again later.' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    // Verify admin access
    const authError = await verifyAdmin(request);
    if (authError) return authError;

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('id');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Validate update data
    const updates = await request.json();
    const validatedUpdates = updateUserSchema.parse(updates);

    // Connect to database
    try {
      await dbConnect();
    } catch (error) {
      console.error('Database connection error:', error);
      return NextResponse.json(
        { error: 'Unable to connect to the database. Please try again later.' },
        { status: 503 }
      );
    }

    // Check if email is already taken
    if (validatedUpdates.email) {
      const existingUser = await User.findOne({ 
        email: validatedUpdates.email,
        _id: { $ne: userId }
      });
      if (existingUser) {
        return NextResponse.json(
          { error: 'Email is already taken' },
          { status: 400 }
        );
      }
    }

    // Check if username is already taken
    if (validatedUpdates.username) {
      const existingUser = await User.findOne({ 
        username: validatedUpdates.username,
        _id: { $ne: userId }
      });
      if (existingUser) {
        return NextResponse.json(
          { error: 'Username is already taken' },
          { status: 400 }
        );
      }
    }

    // Update user
    const user = await User.findByIdAndUpdate(
      userId,
      { $set: validatedUpdates },
      { new: true, select: '-password' }
    );

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    console.log('User updated successfully:', userId);
    return NextResponse.json({ user });
  } catch (error) {
    console.error('Error updating user:', error);
    
    if (error instanceof z.ZodError) {
      const errorMessage = error.errors.map(err => err.message).join(', ');
      return NextResponse.json(
        { error: errorMessage },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to update user. Please try again later.' },
      { status: 500 }
    );
  }
} 