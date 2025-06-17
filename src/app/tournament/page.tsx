"use client";

import { useEffect, useState } from "react";
import { TournamentCard } from "@/components/tournament/TournamentCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Tournament {
  id: string;
  _id?: string;
  name: string;
  image?: string;
  description: string;
  gameTitle: string;
  startDate: string;
  endDate: string;
  entryFee: number;
  maxTeams: number;
  registeredTeams: number;
  minTeamSize: number;
  maxTeamSize: number;
  status: 'upcoming' | 'live' | 'completed';
  createdBy: string;
  streamLink?: string;
}

export default function TournamentPage() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/tournaments");
        
        if (!res.ok) {
          throw new Error("Failed to fetch tournaments");
        }

        const data = await res.json();
        
        // Filter tournaments created by admin and ensure they have valid IDs
        const adminTournaments = (data.tournaments || [])
          .filter((tournament: Tournament) => tournament.createdBy === "admin")
          .map((t: Tournament) => ({
            ...t,
            id: t.id || t._id || `temp-${Math.random().toString(36).substring(2, 9)}`
          }));

        setTournaments(adminTournaments);
      } catch (err) {
        console.error("Tournament fetch error:", err);
        setError(err instanceof Error ? err.message : "Failed to load tournaments");
      } finally {
        setLoading(false);
      }
    };

    fetchTournaments();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-pulse text-xl">Loading tournaments...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold text-primary">Featured Tournaments</h1>
        <Button asChild variant="outline">
          <Link href="/tournaments/all">View All Tournaments</Link>
        </Button>
      </div>

      {tournaments.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold text-muted-foreground">
            No featured tournaments available
          </h2>
          <p className="mt-4 text-muted-foreground">
            Check back later for upcoming events
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tournaments.map((tournament) => (
            <TournamentCard
              key={`tournament-${tournament.id}`}
              tournament={{
                ...tournament,
                minTeamSize: tournament.minTeamSize ?? 1,
                maxTeamSize: tournament.maxTeamSize ?? 4
              }}
              actionButton={
                <Button asChild className="w-full mt-4">
                  <Link href={`/tournaments/${tournament.id}`}>
                    View Details
                  </Link>
                </Button>
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}