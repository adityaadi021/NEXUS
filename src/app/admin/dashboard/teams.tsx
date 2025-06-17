"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface Team {
  id: string;
  name: string;
  leader: { username: string; email: string; };
  members: { username: string; email: string; confirmed: boolean; }[];
  isComplete: boolean;
  type: string;
}

export default function TeamsList({ tournamentId, onClose }: { tournamentId: string; onClose: () => void }) {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeams();
  }, [tournamentId]);

  const fetchTeams = async () => {
    setLoading(true);
    const res = await fetch(`/api/tournaments/${tournamentId}/teams`);
    const data = await res.json();
    setTeams(data.teams || []);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-lg p-6 w-full max-w-2xl relative">
        <Button className="absolute top-2 right-2" size="sm" onClick={onClose}>Close</Button>
        <h2 className="text-xl font-bold mb-4">Registered Teams</h2>
        {loading ? (
          <div>Loading teams...</div>
        ) : teams.length === 0 ? (
          <div>No teams registered yet.</div>
        ) : (
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {teams.map((team) => (
              <div key={team.id} className="border rounded p-4 bg-muted">
                <div className="font-semibold">{team.name} ({team.type}) {team.isComplete ? <span className="text-green-600">[Complete]</span> : <span className="text-yellow-600">[Pending]</span>}</div>
                <div>Leader: {team.leader.username} ({team.leader.email})</div>
                <div>Members:
                  <ul className="ml-4 list-disc">
                    {team.members.map((m, i) => (
                      <li key={i}>{m.username} ({m.email}) {m.confirmed ? <span className="text-green-600">[Confirmed]</span> : <span className="text-red-600">[Pending]</span>}</li>
                    ))}
                  </ul>
                </div>
                {/* Add admin actions here, e.g., Remove/Disqualify */}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
