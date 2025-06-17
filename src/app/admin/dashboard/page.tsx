"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TournamentCard } from "@/components/tournament/TournamentCard";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";

const TeamsList = dynamic(() => import("./teams"), { ssr: false });

interface Tournament {
  id: string;
  _id?: string; // MongoDB may use _id
  name: string;
  image: string;
  description: string;
  gameTitle: string;
  startDate: string;
  endDate: string;
  entryFee: number;
  maxSlots: number;
  availableSlots: number;
  minTeamSize: number;
  maxTeamSize: number;
}

export default function AdminDashboard() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true);
  const [showTeams, setShowTeams] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchTournaments();
  }, []);

  const fetchTournaments = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/tournaments");
      const data = await res.json();
      // Ensure all tournaments have a valid ID
      const validatedTournaments = (data.tournaments || []).map(t => ({
        ...t,
        id: t.id || t._id || `temp-${Math.random().toString(36).substring(2, 9)}`
      }));
      setTournaments(validatedTournaments);
    } catch (error) {
      console.error("Failed to fetch tournaments:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this tournament?")) return;
    try {
      await fetch(`/api/tournaments/${id}`, { method: "DELETE" });
      fetchTournaments();
    } catch (error) {
      console.error("Failed to delete tournament:", error);
      alert("Failed to delete tournament");
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-headline">Admin Tournament Manager</h1>
        <Button asChild className="gap-2">
          <Link href="/admin/dashboard/create">
            <Plus className="w-5 h-5" /> Create Tournament
          </Link>
        </Button>
      </div>

      {showTeams && (
        <TeamsList 
          key={`teams-${showTeams}`}
          tournamentId={showTeams} 
          onClose={() => setShowTeams(null)} 
        />
      )}

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-pulse text-lg">Loading tournaments...</div>
        </div>
      ) : tournaments.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          No tournaments found
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {tournaments.map((tournament) => {
            const uniqueKey = tournament.id || `temp-${Math.random().toString(36).substring(2, 9)}`;
            return (
              <div 
                key={`tournament-${uniqueKey}`}
                className="relative group"
              >
                <TournamentCard 
                  tournament={{
                    ...tournament,
                    minTeamSize: tournament.minTeamSize ?? 1,
                    maxTeamSize: tournament.maxTeamSize ?? 4
                  }} 
                />
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button 
                    size="icon" 
                    variant="secondary" 
                    onClick={() => router.push(`/admin/dashboard/edit/${tournament.id}`)}
                    aria-label="Edit tournament"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button 
                    size="icon" 
                    variant="destructive" 
                    onClick={() => handleDelete(tournament.id)}
                    aria-label="Delete tournament"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                  <Button 
                    size="icon" 
                    variant="outline" 
                    onClick={() => setShowTeams(tournament.id)}
                    aria-label="View teams"
                  >
                    Teams
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}