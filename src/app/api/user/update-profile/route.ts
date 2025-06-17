import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { username, email, ign, inGameId, bio } = await req.json();

    // Validate required fields
    if (!username || !email) {
      return new NextResponse('Username and email are required', { status: 400 });
    }

    // Check if email is already taken by another user
    const existingUser = await db.user.findFirst({
      where: {
        email,
        NOT: {
          email: session.user.email,
        },
      },
    });

    if (existingUser) {
      return new NextResponse('Email is already taken', { status: 400 });
    }

    // Update user profile
    const updatedUser = await db.user.update({
      where: {
        email: session.user.email,
      },
      data: {
        username,
        email,
        ign,
        inGameId,
        bio,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Profile update error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 