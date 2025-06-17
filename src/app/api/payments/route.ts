import { NextResponse } from 'next/server';
import { z } from 'zod';
import { dbConnect } from '@/lib/db';
import Payment from '@/lib/models/Payment';
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const paymentSchema = z.object({
  userId: z.string(),
  tournamentId: z.string(),
  amount: z.number().positive(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = paymentSchema.parse(body);

    await dbConnect();

    const order = await razorpay.orders.create({
      amount: validatedData.amount * 100, // Convert to paise
      currency: 'INR',
    });

    const payment = await Payment.create({
      userId: validatedData.userId,
      tournamentId: validatedData.tournamentId,
      amount: validatedData.amount,
      status: 'pending',
    });

    return NextResponse.json({ payment, orderId: order.id }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    await dbConnect();

    const payments = await Payment.find({ userId }).populate('tournamentId');

    return NextResponse.json(payments);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 