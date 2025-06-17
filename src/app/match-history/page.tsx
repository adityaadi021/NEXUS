"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

// Mock data for match history
const mockMatchHistory = [
  {
    id: 'm1',
    type: 'Tournament Match',
    name: 'FF Clash 101 - Round 2',
    date: '2024-07-20',
    result: 'WIN',
    tournamentId: 't1',
  },
  {
    id: 'm2',
    type: 'Scrim',
    name: 'Daily Practice - Squads',
    date: '2024-07-19',
    result: 'DRAW',
  },
  {
    id: 'm3',
    type: 'Tournament Match',
    name: 'Sunday Scrims - Grand Finals',
    date: '2024-07-14',
    result: 'LOSS',
    tournamentId: 't2',
  },
  {
    id: 'm4',
    type: 'Tournament Match',
    name: 'Weekly Blitz - Semi-Finals',
    date: '2024-07-07',
    result: 'WIN',
    tournamentId: 't3',
  },
  {
    id: 'm5',
    type: 'Scrim',
    name: 'Evening Warm-up - Solo',
    date: '2024-07-06',
    result: 'WIN',
  },
];

export default function MatchHistoryPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-3xl mx-auto">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-accent hover:underline mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="font-headline text-3xl text-neon-primary">Your Match History</CardTitle>
            <CardDescription className="text-muted-foreground">
              Review all your past tournament and scrim matches.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {mockMatchHistory.length > 0 ? (
              <div className="space-y-4">
                {mockMatchHistory.map((match) => (
                  <div key={match.id} className="p-4 bg-card rounded-lg border flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-foreground">{match.name}</p>
                      <p className="text-sm text-muted-foreground">{match.type} - {new Date(match.date).toLocaleDateString()}</p>
                    </div>
                    <span className={
                      `px-3 py-1 rounded-full text-xs font-semibold ${
                        match.result === 'WIN' ? 'bg-green-500/20 text-green-400' :
                        match.result === 'LOSS' ? 'bg-red-500/20 text-red-400' :
                        'bg-yellow-500/20 text-yellow-400'
                      }`
                    }>
                      {match.result}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p className="text-lg">No match history available yet.</p>
                <p className="text-sm">Participate in tournaments and scrims to build your history!</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 