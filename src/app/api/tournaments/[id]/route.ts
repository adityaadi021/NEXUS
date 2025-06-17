import { NextResponse } from 'next/server';
import { z } from 'zod';
import dbConnect from '@/lib/db';
import Tournament from '@/lib/models/Tournament';

const updateTournamentSchema = z.object({
  name: z.string().min(3).optional(),
  date: z.string().transform((str) => new Date(str)).optional(),
  entryFee: z.number().positive().optional(),
  maxTeams: z.number().positive().optional(),
});

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const { registeredTeams } = await request.json();

    await dbConnect();

    const tournament = await Tournament.findById(id);
    if (!tournament) {
      return NextResponse.json({ error: 'Tournament not found' }, { status: 404 });
    }

    tournament.registeredTeams = registeredTeams;
    tournament.remainingSlots = tournament.maxTeams - registeredTeams;
    await tournament.save();

    return NextResponse.json({ message: 'Tournament updated successfully!', tournament });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    await dbConnect();

    const tournament = await Tournament.findById(id);
    if (!tournament) {
      return NextResponse.json({ error: 'Tournament not found' }, { status: 404 });
    }

    await tournament.deleteOne();

    return NextResponse.json({ message: 'Tournament deleted successfully!' });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const body = await request.json();
    const updates = updateTournamentSchema.parse(body);

    await dbConnect();

    const tournament = await Tournament.findById(id);
    if (!tournament) {
      return NextResponse.json({ error: 'Tournament not found' }, { status: 404 });
    }

    if (updates.name) tournament.name = updates.name;
    if (updates.date) tournament.date = updates.date;
    if (updates.entryFee) tournament.entryFee = updates.entryFee;
    if (updates.maxTeams) {
      tournament.maxTeams = updates.maxTeams;
      tournament.remainingSlots = updates.maxTeams - tournament.registeredTeams;
    }

    await tournament.save();

    return NextResponse.json({ message: 'Tournament updated successfully!', tournament });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 