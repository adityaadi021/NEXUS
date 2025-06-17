import Image from 'next/image';
import Link from 'next/link';
import type { Tournament } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tag, CalendarDays, Users, DollarSign } from 'lucide-react';
import { SlotCounter } from './SlotCounter';

interface TournamentCardProps {
  tournament: Tournament;
}

export function TournamentCard({ tournament }: TournamentCardProps) {
  const isFull = tournament.availableSlots === 0;
  const hasImage = Boolean(tournament.image);

  return (
    <Card className="overflow-hidden shadow-xl hover:shadow-primary/20 transition-shadow duration-300 flex flex-col h-full">
      <CardHeader className="p-0 relative">
        {hasImage ? (
          <Image
            src={tournament.image}
            alt={tournament.name}
            width={600}
            height={300}
            className="object-cover w-full h-48"
            data-ai-hint={tournament.imageAiHint || "gaming event"}
          />
        ) : (
          <div className="flex items-center justify-center w-full h-48 bg-gradient-to-br from-primary to-purple-700 animate-pulse">
            <span className="font-headline text-3xl text-white drop-shadow-lg animate-text-glow">
              {tournament.name}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <CardTitle className="font-headline text-2xl p-4 absolute bottom-0 left-0 text-white drop-shadow-md">
          {tournament.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <CardDescription className="text-muted-foreground mb-4 line-clamp-3">{tournament.description}</CardDescription>
        
        <div className="space-y-3 text-sm">
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-primary" />
            <span>{tournament.gameTitle}</span>
          </div>
          <div className="flex items-center gap-2">
            <CalendarDays className="w-4 h-4 text-primary" />
            <span>{new Date(tournament.startDate).toLocaleDateString()} - {new Date(tournament.endDate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-primary" />
            <span>Entry Fee: {tournament.entryFee > 0 ? `₹${tournament.entryFee}` : 'Free'}</span>
          </div>
        </div>
        <div className="mt-4">
          <SlotCounter initialAvailableSlots={tournament.availableSlots} maxSlots={tournament.maxSlots} />
        </div>
      </CardContent>
      <CardFooter className="p-6 border-t">
        <Button asChild className="w-full font-headline" variant={isFull ? "secondary" : "default"}>
          <Link href={`/tournaments/${tournament.id}/book`}>
            {isFull ? 'View Details (Full)' : 'Register Team'}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
