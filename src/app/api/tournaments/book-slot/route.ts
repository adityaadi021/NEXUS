import { NextRequest, NextResponse } from 'next/server';
import { decrementTournamentSlot, getTournamentById } from '@/lib/data'; // Using mock data for backend logic

export async function POST(request: NextRequest) {
  try {
    const { tournamentId, playerData } = await request.json();

    if (!tournamentId) {
      return NextResponse.json({ success: false, error: 'Tournament ID is required.' }, { status: 400 });
    }

    const tournament = getTournamentById(tournamentId);

    if (!tournament) {
      return NextResponse.json({ success: false, error: 'Tournament not found.' }, { status: 404 });
    }

    if (tournament.availableSlots <= 0) {
      return NextResponse.json({ success: false, error: 'No slots available for this tournament.' }, { status: 409 });
    }

    // In a real application, you would save playerData to a database here.
    // For now, we're just simulating the slot decrement.

    decrementTournamentSlot(tournamentId);

    return NextResponse.json({ success: true, newSlotCount: tournament.availableSlots }, { status: 200 });

  } catch (error) {
    console.error('Error in /api/tournaments/book-slot:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
} 