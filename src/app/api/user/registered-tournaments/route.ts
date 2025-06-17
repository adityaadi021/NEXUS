import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Payment from '@/lib/models/Payment';
import Tournament from '@/lib/models/Tournament';
import { verifyToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
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
    // Find all completed payments for this user
    const payments = await Payment.find({ userId: decoded.userId, status: 'completed' }).populate('tournamentId');
    // Extract tournament details
    const tournaments = payments.map((payment: any) => payment.tournamentId);
    return NextResponse.json({ tournaments });
  } catch (error) {
    console.error('Error fetching registered tournaments:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 