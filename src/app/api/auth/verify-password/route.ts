import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { password } = await req.json();

    if (!password) {
      return new NextResponse('Password is required', { status: 400 });
    }

    // Get user from database
    const user = await db.user.findUnique({
      where: {
        email: session.user.email,
      },
      select: {
        password: true,
      },
    });

    if (!user?.password) {
      return new NextResponse('User not found', { status: 404 });
    }

    // Verify password
    const isValid = await bcrypt.compare(password, user.password);

    return NextResponse.json({ isValid });
  } catch (error) {
    console.error('Password verification error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 