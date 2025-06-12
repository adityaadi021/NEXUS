import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTournamentById } from '@/lib/data'; // Removed mockTournaments import as getTournamentById uses the live one
import type { Tournament } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { SlotCounter } from '@/components/tournament/SlotCounter';
import { WaitlistButton } from '@/components/tournament/WaitlistButton';
import { CalendarDays, Users, DollarSign, Info, Gamepad2 } from 'lucide-react';

interface TournamentPageProps {
  params: { id: string };
}

export const dynamic = 'force-dynamic'; // Ensures the page is always dynamically rendered

// generateStaticParams should be removed if we want the page to be fully dynamic for slot updates
// export async function generateStaticParams() {
//   // This would need to use the initial state of mockTournaments if kept
//   // For dynamic slot updates in a mock, it's better to remove this
//   const tournaments = mockTournaments; // This line would cause issues if mockTournaments is not available here
//   return tournaments.map((tournament) => ({
//     id: tournament.id,
//   }));
// }


export default async function TournamentPage({ params }: TournamentPageProps) {
  const tournament = getTournamentById(params.id);

  if (!tournament) {
    notFound();
  }

  const isFull = tournament.availableSlots === 0;

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <Card className="overflow-hidden shadow-2xl">
        <CardHeader className="p-0 relative">
          <Image
            src={tournament.image}
            alt={tournament.name}
            width={1200}
            height={400}
            className="object-cover w-full h-64 md:h-96"
            priority
            data-ai-hint={tournament.imageAiHint || "gaming action"}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6 md:p-8">
            <h1 className="font-headline text-3xl md:text-5xl font-bold text-white drop-shadow-lg">
              {tournament.name}
            </h1>
            <p className="text-lg text-primary-foreground/80 mt-2">{tournament.gameTitle}</p>
          </div>
        </CardHeader>
        <CardContent className="p-6 md:p-8 grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <section>
              <h2 className="font-headline text-2xl font-semibold mb-3 text-primary">About Tournament</h2>
              <CardDescription className="text-base leading-relaxed whitespace-pre-line">
                {tournament.description}
              </CardDescription>
            </section>
            
            <section className="space-y-3">
               <div className="flex items-center gap-3 p-3 bg-card rounded-md border">
                <Gamepad2 className="w-6 h-6 text-accent" />
                <div>
                  <p className="font-medium">Game</p>
                  <p className="text-muted-foreground">{tournament.gameTitle}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-card rounded-md border">
                <CalendarDays className="w-6 h-6 text-accent" />
                <div>
                  <p className="font-medium">Dates</p>
                  <p className="text-muted-foreground">
                    {new Date(tournament.startDate).toLocaleDateString()} - {new Date(tournament.endDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-card rounded-md border">
                <DollarSign className="w-6 h-6 text-accent" />
                <div>
                  <p className="font-medium">Entry Fee</p>
                  <p className="text-muted-foreground">
                    {tournament.entryFee > 0 ? `₹${tournament.entryFee}` : 'Free Entry'}
                  </p>
                </div>
              </div>
               <div className="flex items-center gap-3 p-3 bg-card rounded-md border">
                <Users className="w-6 h-6 text-accent" />
                <div>
                  <p className="font-medium">Maximum Teams</p>
                  <p className="text-muted-foreground">{tournament.maxSlots} Teams</p>
                </div>
              </div>
            </section>
          </div>
          
          <aside className="md:col-span-1 space-y-6">
            <Card className="bg-card/50 p-6">
              <CardTitle className="font-headline text-xl mb-4">Slot Status</CardTitle>
              {/* Ensure SlotCounter receives the most up-to-date slot count */}
              <SlotCounter initialAvailableSlots={tournament.availableSlots} maxSlots={tournament.maxSlots} />
              <div className="mt-6">
                {isFull ? (
                  <WaitlistButton tournamentName={tournament.name} />
                ) : (
                  <Button asChild className="w-full font-headline text-lg py-6" size="lg">
                    <Link href={`/tournaments/${tournament.id}/book`}>Book Your Slot</Link>
                  </Button>
                )}
              </div>
            </Card>
            <Card className="bg-card/50 p-6">
               <CardTitle className="font-headline text-xl mb-3 flex items-center gap-2">
                  <Info className="w-5 h-5 text-accent"/> Rules & Info
               </CardTitle>
               <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm">
                  <li>Be respectful to all participants.</li>
                  <li>No cheating or hacking allowed.</li>
                  <li>Follow admin instructions.</li>
                  <li>Check-in 10 mins before match time.</li>
               </ul>
            </Card>
          </aside>
        </CardContent>
      </Card>
    </div>
  );
}
