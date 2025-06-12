import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function DashboardPage() {
  // This would be a protected route in a real application
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="font-headline text-3xl md:text-4xl text-neon-primary text-center">Player Dashboard</h1>
        <p className="text-lg text-muted-foreground text-center">
          Manage your profile, view your registered tournaments, and track your progress.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="font-headline text-xl text-accent mb-4 text-center">Your Profile</h2>
            <p className="text-muted-foreground text-center">Edit your profile details here.</p>
            <div className="flex justify-center">
              <Button asChild variant="outline" className="mt-4">
                <Link href="/dashboard/edit-profile">Edit Profile</Link>
              </Button>
            </div>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="font-headline text-xl text-accent mb-4 text-center">Quick Links</h2>
            <div className="space-y-2 flex flex-col items-center">
              <Button asChild variant="link" className="p-0 h-auto text-foreground hover:text-primary">
                <Link href="/your-slots">View Your Slots</Link>
              </Button>
              <Button asChild variant="link" className="p-0 h-auto text-foreground hover:text-primary">
                <Link href="/payment-history">View Payment History</Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-md mt-6">
          <h2 className="font-headline text-xl text-accent mb-4 text-center">Registered Tournaments</h2>
          <ul className="list-disc list-inside text-muted-foreground space-y-1 text-left">
            <li>FF Clash 101 (Upcoming)</li>
            <li>Sunday Scrims (Completed)</li>
            <li>Weekly Blitz (Completed)</li>
          </ul>
          <div className="flex justify-center">
            <Button variant="link" className="p-0 h-auto text-primary mt-4" asChild><Link href="/tournaments">View All Tournaments</Link></Button>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-md mt-6">
          <h2 className="font-headline text-xl text-accent mb-4 text-center">Tournament Statistics</h2>
          <div className="grid grid-cols-2 gap-4 text-muted-foreground text-center">
            <div>
              <p className="text-sm">Tournaments Played:</p>
              <p className="text-lg font-bold text-gray-200">5</p>
            </div>
            <div>
              <p className="text-sm">Wins:</p>
              <p className="text-lg font-bold text-gray-200">2</p>
            </div>
            <div>
              <p className="text-sm">Top 3 Finishes:</p>
              <p className="text-lg font-bold text-gray-200">3</p>
            </div>
            <div>
              <p className="text-sm">Total Prize Money:</p>
              <p className="text-lg font-bold text-gray-200">$250</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-md mt-6">
          <h2 className="font-headline text-xl text-accent mb-4 text-center">Match History</h2>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex justify-between items-center">
              <span><span className="font-bold text-primary">Tournament Match:</span> FF Clash 101 - Round 2</span>
              <span className="text-sm text-green-400">WIN</span>
            </li>
            <li className="flex justify-between items-center">
              <span><span className="font-bold text-primary">Scrim:</span> Daily Practice - Squads</span>
              <span className="text-sm text-yellow-400">DRAW</span>
            </li>
            <li className="flex justify-between items-center">
              <span><span className="font-bold text-primary">Tournament Match:</span> Sunday Scrims - Grand Finals</span>
              <span className="text-sm text-red-400">LOSS</span>
            </li>
            <li className="flex justify-between items-center">
              <span><span className="font-bold text-primary">Tournament Match:</span> Weekly Blitz - Semi-Finals</span>
              <span className="text-sm text-green-400">WIN</span>
            </li>
          </ul>
          <div className="flex justify-center">
            <Button variant="link" className="p-0 h-auto text-primary mt-4" asChild><Link href="/match-history">View Full Match History</Link></Button>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-md mt-6">
          <h2 className="font-headline text-xl text-accent mb-4 text-center">Achievements</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
            <div className="flex flex-col items-center">
              <span className="text-4xl text-yellow-400">🏆</span>
              <p className="text-sm text-muted-foreground mt-2">First Tournament Win</p>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl text-blue-400">🏅</span>
              <p className="text-sm text-muted-foreground mt-2">Top 3 Finisher</p>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl text-green-400">🌟</span>
              <p className="text-sm text-muted-foreground mt-2">5 Tournaments Played</p>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl text-red-400">🔥</span>
              <p className="text-sm text-muted-foreground mt-2">Winning Streak (3+)</p>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl text-purple-400">🎯</span>
              <p className="text-sm text-muted-foreground mt-2">Precision Player</p>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl text-orange-400">🚀</span>
              <p className="text-sm text-muted-foreground mt-2">Rising Star</p>
            </div>
          </div>
          <div className="flex justify-center">
            <Button variant="link" className="p-0 h-auto text-primary mt-4" asChild><Link href="/achievements">View All Achievements</Link></Button>
          </div>
        </div>
      </div>
    </div>
  );
}
