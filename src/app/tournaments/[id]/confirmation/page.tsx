
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { getTournamentById, mockTournaments } from '@/lib/data';
import { CheckCircle, PartyPopper } from 'lucide-react';

interface ConfirmationPageProps {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export async function generateStaticParams() {
  return mockTournaments.map((tournament) => ({
    id: tournament.id,
  }));
}

export default async function ConfirmationPage({ params, searchParams }: ConfirmationPageProps) {
  const tournament = getTournamentById(params.id);

  if (!tournament) {
    notFound();
  }

  const isFreeBooking = searchParams?.free === 'true';

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 flex flex-col flex-grow items-center justify-center">
      <Card className="w-full max-w-lg text-center p-8 md:p-12 shadow-2xl">
        <CardHeader>
          <PartyPopper className="w-20 h-20 text-primary mx-auto mb-6 animate-bounce" />
          <CardTitle className="font-headline text-3xl md:text-4xl text-neon-primary">
            {isFreeBooking ? 'Registration Confirmed!' : 'Booking Confirmed!'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-lg text-muted-foreground mb-8">
            Congratulations! Your slot for{' '}
            <strong className="text-foreground">{tournament.name}</strong> has been successfully{' '}
            {isFreeBooking ? 'registered' : 'booked and paid'}.
          </CardDescription>
          <p className="text-foreground mb-2">
            Tournament: <span className="font-semibold">{tournament.name}</span>
          </p>
          <p className="text-foreground mb-6">
            Dates: {new Date(tournament.startDate).toLocaleDateString()} - {new Date(tournament.endDate).toLocaleDateString()}
          </p>
          <p className="text-sm text-muted-foreground mb-8">
            You will receive a confirmation email shortly with more details. Get ready to compete!
          </p>
          <Button asChild size="lg" className="font-headline w-full sm:w-auto">
            <Link href="/">Explore More Tournaments</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
