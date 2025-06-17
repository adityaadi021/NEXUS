import { NextResponse } from 'next/server';
import { z } from 'zod';
import { dbConnect } from '@/lib/db';
import Tournament from '@/lib/models/Tournament';
import Payment from '@/lib/models/Payment';

const registrationSchema = z.object({
  userId: z.string(),
  amount: z.number().positive(),
});

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const validatedData = registrationSchema.parse(body);

    await dbConnect();

    const tournament = await Tournament.findById(params.id);

    if (!tournament) {
      return NextResponse.json({ error: 'Tournament not found' }, { status: 404 });
    }

    if (tournament.remainingSlots <= 0) {
      return NextResponse.json({ error: 'No remaining slots available' }, { status: 400 });
    }

    const payment = await Payment.create({
      userId: validatedData.userId,
      tournamentId: params.id,
      amount: validatedData.amount,
    });

    tournament.registeredTeams += 1;
    tournament.remainingSlots = tournament.maxTeams - tournament.registeredTeams;
    await tournament.save();

    return NextResponse.json({ payment, tournament }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 