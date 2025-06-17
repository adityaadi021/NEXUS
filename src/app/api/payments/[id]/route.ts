import { NextResponse } from 'next/server';
import { z } from 'zod';
import { dbConnect } from '@/lib/db';
import Payment from '@/lib/models/Payment';

const updatePaymentSchema = z.object({
  status: z.enum(['pending', 'completed', 'failed']),
});

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const validatedData = updatePaymentSchema.parse(body);

    await dbConnect();

    const payment = await Payment.findById(params.id);

    if (!payment) {
      return NextResponse.json({ error: 'Payment not found' }, { status: 404 });
    }

    payment.status = validatedData.status;
    await payment.save();

    return NextResponse.json(payment);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect();

    const payment = await Payment.findById(params.id).populate('tournamentId');

    if (!payment) {
      return NextResponse.json({ error: 'Payment not found' }, { status: 404 });
    }

    return NextResponse.json(payment);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 