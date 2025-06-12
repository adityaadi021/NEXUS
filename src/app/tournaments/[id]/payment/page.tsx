
import { notFound } from 'next/navigation';
import { PaymentFlow } from '@/components/tournament/PaymentFlow';
import { getTournamentById, mockTournaments } from '@/lib/data';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface TournamentPaymentPageProps {
  params: { id: string };
}

export async function generateStaticParams() {
  return mockTournaments.map((tournament) => ({
    id: tournament.id,
  }));
}

export default async function TournamentPaymentPage({ params }: TournamentPaymentPageProps) {
  const tournament = getTournamentById(params.id);

  if (!tournament) {
    notFound();
  }

  // If tournament is free, this page might be skipped or show a different message.
  // For this example, we assume all paid tournaments reach here.
  if (tournament.entryFee === 0) {
     // Ideally, redirect to confirmation or show a "No payment needed" message.
     // For now, just show a simple message.
     return (
      <div className="container mx-auto px-4 py-8 md:py-12 flex flex-col flex-grow items-center justify-center">
        <div className="text-center">
          <h1 className="font-headline text-3xl mb-4">No Payment Required</h1>
          <p className="text-muted-foreground mb-6">This tournament is free to enter. Your slot is being confirmed.</p>
          {/* Simulate immediate confirmation for free tournaments */}
          <meta http-equiv="refresh" content={`3;url=/tournaments/${tournament.id}/confirmation?free=true`} />
          <p className="text-sm">Redirecting to confirmation...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-md mx-auto">
          <Link href={`/tournaments/${tournament.id}/book`} className="inline-flex items-center gap-2 text-sm text-accent hover:underline mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Booking Details
          </Link>
          <PaymentFlow tournament={tournament} />
      </div>
    </div>
  );
}
