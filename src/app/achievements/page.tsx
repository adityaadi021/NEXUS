<<<<<<< HEAD
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

// Mock data for achievements
const mockAchievements = [
  {
    id: 'a1',
    icon: '🏆',
    title: 'First Tournament Win',
    description: 'Won your first official tournament.',
    color: 'text-yellow-400',
  },
  {
    id: 'a2',
    icon: '🏅',
    title: 'Top 3 Finisher',
    description: 'Achieved a top 3 placement in a tournament.',
    color: 'text-blue-400',
  },
  {
    id: 'a3',
    icon: '🌟',
    title: '5 Tournaments Played',
    description: 'Participated in 5 or more tournaments.',
    color: 'text-green-400',
  },
  {
    id: 'a4',
    icon: '🔥',
    title: 'Winning Streak',
    description: 'Won 3 or more matches in a row.',
    color: 'text-red-400',
  },
  {
    id: 'a5',
    icon: '🎯',
    title: 'Precision Player',
    description: 'Achieved high accuracy in multiple matches.',
    color: 'text-purple-400',
  },
  {
    id: 'a6',
    icon: '🚀',
    title: 'Rising Star',
    description: 'Showed significant improvement over time.',
    color: 'text-orange-400',
  },
  {
    id: 'a7',
    icon: '🤝',
    title: 'Team Player',
    description: 'Played 10+ team-based tournaments.',
    color: 'text-cyan-400',
  },
  {
    id: 'a8',
    icon: '💰',
    title: 'Prize Winner',
    description: 'Won total prize money of $100+.',
    color: 'text-amber-400',
  },
];

export default function AchievementsPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-3xl mx-auto">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-accent hover:underline mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="font-headline text-3xl text-neon-primary">Your Achievements</CardTitle>
            <CardDescription className="text-muted-foreground">
              Explore the milestones you've achieved in Nexus Esports.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {mockAchievements.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockAchievements.map((achievement) => (
                  <div key={achievement.id} className="p-4 bg-card rounded-lg border flex flex-col items-center text-center">
                    <span className={`text-5xl mb-3 ${achievement.color}`}>{achievement.icon}</span>
                    <h3 className="font-semibold text-foreground text-lg mb-1">{achievement.title}</h3>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p className="text-lg">No achievements unlocked yet.</p>
                <p className="text-sm">Participate in events and perform well to earn achievements!</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
=======
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

// Mock data for achievements
const mockAchievements = [
  {
    id: 'a1',
    icon: '🏆',
    title: 'First Tournament Win',
    description: 'Won your first official tournament.',
    color: 'text-yellow-400',
  },
  {
    id: 'a2',
    icon: '🏅',
    title: 'Top 3 Finisher',
    description: 'Achieved a top 3 placement in a tournament.',
    color: 'text-blue-400',
  },
  {
    id: 'a3',
    icon: '🌟',
    title: '5 Tournaments Played',
    description: 'Participated in 5 or more tournaments.',
    color: 'text-green-400',
  },
  {
    id: 'a4',
    icon: '🔥',
    title: 'Winning Streak',
    description: 'Won 3 or more matches in a row.',
    color: 'text-red-400',
  },
  {
    id: 'a5',
    icon: '🎯',
    title: 'Precision Player',
    description: 'Achieved high accuracy in multiple matches.',
    color: 'text-purple-400',
  },
  {
    id: 'a6',
    icon: '🚀',
    title: 'Rising Star',
    description: 'Showed significant improvement over time.',
    color: 'text-orange-400',
  },
  {
    id: 'a7',
    icon: '🤝',
    title: 'Team Player',
    description: 'Played 10+ team-based tournaments.',
    color: 'text-cyan-400',
  },
  {
    id: 'a8',
    icon: '💰',
    title: 'Prize Winner',
    description: 'Won total prize money of $100+.',
    color: 'text-amber-400',
  },
];

export default function AchievementsPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-3xl mx-auto">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-accent hover:underline mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="font-headline text-3xl text-neon-primary">Your Achievements</CardTitle>
            <CardDescription className="text-muted-foreground">
              Explore the milestones you've achieved in Nexus Esports.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {mockAchievements.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockAchievements.map((achievement) => (
                  <div key={achievement.id} className="p-4 bg-card rounded-lg border flex flex-col items-center text-center">
                    <span className={`text-5xl mb-3 ${achievement.color}`}>{achievement.icon}</span>
                    <h3 className="font-semibold text-foreground text-lg mb-1">{achievement.title}</h3>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p className="text-lg">No achievements unlocked yet.</p>
                <p className="text-sm">Participate in events and perform well to earn achievements!</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
>>>>>>> d7d8dcd73d27280c474949a46ea638d0eaa5206e
} 