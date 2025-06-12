
import { notFound } from 'next/navigation';
import { BookingForm } from '@/components/tournament/BookingForm';
import { getTournamentById, mockTournaments } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface TournamentBookingPageProps {
  params: { id: string };
}

export async function generateStaticParams() {
  return mockTournaments.map((tournament) => ({
    id: tournament.id,
  }));
}

export default async function TournamentBookingPage({ params }: TournamentBookingPageProps) {
  const tournament = getTournamentById(params.id);

  if (!tournament) {
    notFound();
  }

  if (tournament.availableSlots === 0) {
    // Redirect or show message if tournament is full and somehow user reached here
    // For simplicity, we assume this page is only reachable if slots are available.
    // A robust app would handle this state more gracefully.
    return (
      <div className="container mx-auto px-4 py-8 md:py-12 flex flex-col flex-grow items-center justify-center">
         <Card className="w-full max-w-md text-center p-8">
           <CardTitle className="font-headline text-2xl mb-4">Tournament Full</CardTitle>
           <CardDescription>
             Unfortunately, all slots for {tournament.name} are currently booked.
           </CardDescription>
           <Button asChild className="mt-6">
              <Link href={`/tournaments/${tournament.id}`}>Back to Tournament</Link>
           </Button>
         </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-2xl mx-auto">
        <Link href={`/tournaments/${tournament.id}`} className="inline-flex items-center gap-2 text-sm text-accent hover:underline mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Tournament Details
        </Link>
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="font-headline text-3xl">Book Slot for {tournament.name}</CardTitle>
            <CardDescription>
              Enter your details below to register. Entry Fee: {tournament.entryFee > 0 ? `₹${tournament.entryFee}` : 'Free'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <BookingForm tournament={tournament} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
