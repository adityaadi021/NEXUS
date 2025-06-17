import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/lib/models/User';
import { verifyToken } from '@/lib/auth';

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const token = authHeader.split(' ')[1];
  const { valid, decoded } = verifyToken(token);
  if (!valid || !decoded) {
    return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
  }
  await dbConnect();
  const user = await User.findById(decoded.userId).select('-password');
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }
  return NextResponse.json({ user });
} 