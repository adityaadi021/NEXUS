import { NextRequest, NextResponse } from 'next/server';
import { getTournamentById } from '@/lib/data';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const tournament = getTournamentById(params.id);

    if (!tournament) {
      return NextResponse.json(
        { success: false, error: 'Tournament not found.' },
        { status: 404 }
      );
    }

    // In a real application, you would:
    // 1. Check if the tournament is still active
    // 2. Verify if the user is eligible to join
    // 3. Check if there are any team size restrictions
    // 4. Consider waitlist status

    const isAvailable = tournament.availableSlots > 0;

    return NextResponse.json({
      success: true,
      available: isAvailable,
      availableSlots: tournament.availableSlots,
      maxSlots: tournament.maxSlots,
    });

  } catch (error) {
    console.error('Error in /api/tournaments/[id]/check-availability:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error.' },
      { status: 500 }
    );
  }
} 