import { NextRequest, NextResponse } from 'next/server';
import { decrementTournamentSlot, getTournamentById } from '@/lib/data'; // Using mock data for backend logic

export async function POST(request: NextRequest) {
  try {
    const { tournamentId, transactionId } = await request.json();

    if (!tournamentId || !transactionId) {
      return NextResponse.json({ success: false, error: 'Tournament ID and Transaction ID are required.' }, { status: 400 });
    }

    const tournament = getTournamentById(tournamentId);

    if (!tournament) {
      return NextResponse.json({ success: false, error: 'Tournament not found.' }, { status: 404 });
    }

    if (tournament.availableSlots <= 0) {
      return NextResponse.json({ success: false, error: 'No slots available for this tournament.' }, { status: 409 });
    }

    // In a real application, you would verify the transactionId with your payment gateway provider here.
    // For this mock backend, we'll simulate success or failure based on a random chance.
    const isPaymentVerified = Math.random() > 0.1; // 90% chance of successful verification

    if (!isPaymentVerified) {
      return NextResponse.json({ success: false, error: 'Payment verification failed. Please check your transaction ID or contact support.' }, { status: 400 });
    }

    decrementTournamentSlot(tournamentId);

    return NextResponse.json({ success: true, newSlotCount: tournament.availableSlots }, { status: 200 });

  } catch (error) {
    console.error('Error in /api/tournaments/confirm-payment:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
} 