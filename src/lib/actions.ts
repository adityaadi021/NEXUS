'use server';

import { revalidatePath } from 'next/cache';

export async function handleSuccessfulBookingAction(tournamentId: string, transactionId?: string) {
  try {
    console.log(`Server Action: Processing booking for tournament ID: ${tournamentId}`);

    let apiEndpoint = '';
    let requestBody: any = { tournamentId };

    if (transactionId) {
      // This means it's a paid tournament confirmation
      apiEndpoint = '/api/tournaments/confirm-payment';
      requestBody.transactionId = transactionId;
    } else {
      // This means it's a free tournament booking
      apiEndpoint = '/api/tournaments/book-slot';
      // In a real app, you might pass playerData here, but for now just tournamentId
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}${apiEndpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.error || 'Failed to process slot booking/payment confirmation.');
    }

    // Revalidate paths to ensure fresh data is fetched for subsequent navigations
    revalidatePath('/tournaments');
    revalidatePath(`/tournaments/${tournamentId}`);
    revalidatePath(`/tournaments/${tournamentId}/book`); 
    revalidatePath(`/tournaments/${tournamentId}/payment`);
    revalidatePath(`/tournaments/${tournamentId}/confirmation`);

    console.log(`Server Action: Slot processed for ${tournamentId}. New slot count: ${result.newSlotCount}`);

    return { success: true, message: result.message || 'Slot processed successfully.', newSlotCount: result.newSlotCount };
  } catch (error) {
    console.error("Server Action Error in handleSuccessfulBookingAction:", error);
    return { success: false, error: (error as Error).message || "Failed to process slot on the server.", newSlotCount: -1 };
  }
}
