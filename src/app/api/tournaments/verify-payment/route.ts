import { NextRequest, NextResponse } from 'next/server';
import { decrementTournamentSlot, getTournamentById } from '@/lib/data';

export async function POST(request: NextRequest) {
  try {
    const { tournamentId, transactionId, bookingData } = await request.json();

    if (!tournamentId || !transactionId || !bookingData) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields.' },
        { status: 400 }
      );
    }

    // Validate tournament exists and has slots
    const tournament = getTournamentById(tournamentId);
    if (!tournament) {
      return NextResponse.json(
        { success: false, error: 'Tournament not found.' },
        { status: 404 }
      );
    }

    if (tournament.availableSlots <= 0) {
      return NextResponse.json(
        { success: false, error: 'No slots available for this tournament.' },
        { status: 409 }
      );
    }

    // Validate booking data
    if (!bookingData.teamName || !bookingData.teamSize) {
      return NextResponse.json(
        { success: false, error: 'Invalid booking data.' },
        { status: 400 }
      );
    }

    // Validate booking timestamp (should be within last 30 minutes)
    const bookingTime = new Date(bookingData.timestamp);
    const now = new Date();
    const diffInMinutes = (now.getTime() - bookingTime.getTime()) / (1000 * 60);
    if (diffInMinutes > 30) {
      return NextResponse.json(
        { success: false, error: 'Booking session expired. Please start over.' },
        { status: 400 }
      );
    }

    // In a real application, you would:
    // 1. Verify the transaction ID with your payment gateway
    // 2. Check if the transaction amount matches the tournament entry fee
    // 3. Ensure the transaction hasn't been used before
    // 4. Store the booking and payment details in your database

    // For now, we'll simulate a basic verification
    // In production, replace this with actual payment gateway verification
    const isValidTransaction = /^[A-Z0-9]{8,}$/.test(transactionId);
    if (!isValidTransaction) {
      return NextResponse.json(
        { success: false, error: 'Invalid transaction ID format.' },
        { status: 400 }
      );
    }

    // Decrement the slot count
    decrementTournamentSlot(tournamentId);

    // In a real application, you would:
    // 1. Store the booking in your database
    // 2. Send confirmation emails
    // 3. Update user's tournament history
    // 4. Create team records if applicable

    return NextResponse.json({
      success: true,
      newSlotCount: tournament.availableSlots,
      message: 'Payment verified and slot confirmed.',
    });

  } catch (error) {
    console.error('Error in /api/tournaments/verify-payment:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error.' },
      { status: 500 }
    );
  }
} 