'use client';

import { TournamentCard } from '@/components/tournament/TournamentCard';
import { mockTournaments } from '@/lib/data';
import type { Tournament } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Trophy, Users, Calendar } from 'lucide-react';
import { useState } from 'react';

export const dynamic = 'force-dynamic'; // Ensures the page is always dynamically rendered

type TournamentStatus = 'all' | 'upcoming' | 'ongoing' | 'completed';

export default function TournamentsPage() {
  const [activeFilter, setActiveFilter] = useState<TournamentStatus>('all');
  const tournaments: Tournament[] = mockTournaments; // In a real app, fetch this data

  const getFilteredTournaments = () => {
    const now = new Date();
    return tournaments.filter(tournament => {
      const startDate = new Date(tournament.startDate);
      const endDate = new Date(tournament.endDate);

      switch (activeFilter) {
        case 'upcoming':
          return startDate > now;
        case 'ongoing':
          return startDate <= now && endDate >= now;
        case 'completed':
          return endDate < now;
        default:
          return true;
      }
    });
  };

  const filteredTournaments = getFilteredTournaments();

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <section id="all-tournaments" className="mb-12">
        <div className="text-center mb-8">
          <h1 className="font-headline text-4xl md:text-5xl font-bold mb-4 text-neon-primary">
            All Tournaments
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Join our competitive tournaments and showcase your skills. Win exciting prizes and climb the ranks!
          </p>
        </div>

        {/* Tournament Filters */}
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <Button 
            variant={activeFilter === 'all' ? 'default' : 'outline'} 
            className={activeFilter === 'all' ? 'bg-primary text-primary-foreground' : 'border-primary/50 hover:bg-primary/10'}
            onClick={() => setActiveFilter('all')}
          >
            All Tournaments
          </Button>
          <Button 
            variant={activeFilter === 'upcoming' ? 'default' : 'outline'} 
            className={activeFilter === 'upcoming' ? 'bg-primary text-primary-foreground' : 'border-primary/50 hover:bg-primary/10'}
            onClick={() => setActiveFilter('upcoming')}
          >
            Upcoming
          </Button>
          <Button 
            variant={activeFilter === 'ongoing' ? 'default' : 'outline'} 
            className={activeFilter === 'ongoing' ? 'bg-primary text-primary-foreground' : 'border-primary/50 hover:bg-primary/10'}
            onClick={() => setActiveFilter('ongoing')}
          >
            Ongoing
          </Button>
          <Button 
            variant={activeFilter === 'completed' ? 'default' : 'outline'} 
            className={activeFilter === 'completed' ? 'bg-primary text-primary-foreground' : 'border-primary/50 hover:bg-primary/10'}
            onClick={() => setActiveFilter('completed')}
          >
            Completed
          </Button>
        </div>

        {/* Tournament Grid */}
        {filteredTournaments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredTournaments.map((tournament) => (
              <TournamentCard key={tournament.id} tournament={tournament} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-800 rounded-lg border border-gray-700">
            <p className="text-xl text-muted-foreground mb-2">No tournaments available in this category</p>
            <p className="text-gray-400">Check other categories or come back later!</p>
          </div>
        )}
      </section>

      {/* Tournament Features */}
      <section className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-6 bg-gray-800 rounded-lg border border-gray-700 text-center">
          <Trophy className="h-12 w-12 text-primary mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Win Big Prizes</h3>
          <p className="text-gray-300">
            Compete for exciting prizes and rewards in our tournaments
          </p>
        </div>
        <div className="p-6 bg-gray-800 rounded-lg border border-gray-700 text-center">
          <Users className="h-12 w-12 text-primary mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Team Up</h3>
          <p className="text-gray-300">
            Form teams and compete together in squad tournaments
          </p>
        </div>
        <div className="p-6 bg-gray-800 rounded-lg border border-gray-700 text-center">
          <Calendar className="h-12 w-12 text-primary mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Regular Events</h3>
          <p className="text-gray-300">
            Join daily and weekly tournaments with different formats
          </p>
        </div>
      </section>
    </div>
  );
}
