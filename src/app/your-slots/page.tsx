import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Users, Trophy, Clock } from 'lucide-react';
import Link from 'next/link';

interface Slot {
  id: string;
  tournamentName: string;
  date: string;
  time: string;
  teamName: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  type: 'tournament' | 'scrim';
}

// Mock data - In a real app, this would come from your database
const mockSlots: Slot[] = [
  {
    id: '1',
    tournamentName: 'Weekend Warriors',
    date: '2024-03-20',
    time: '18:00',
    teamName: 'Team Alpha',
    status: 'upcoming',
    type: 'tournament'
  },
  {
    id: '2',
    tournamentName: 'Daily Scrims',
    date: '2024-03-19',
    time: '20:00',
    teamName: 'Team Alpha',
    status: 'upcoming',
    type: 'scrim'
  }
];

export default function YourSlotsPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="font-headline text-3xl md:text-4xl text-neon-primary">Your Booked Slots</h1>
          <p className="text-lg text-gray-300">
            Manage your tournament and scrim registrations
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button asChild variant="outline" className="h-auto py-4">
            <Link href="/tournaments" className="flex items-center justify-center gap-2">
              <Trophy className="h-5 w-5" />
              <span>Browse Tournaments</span>
            </Link>
          </Button>
          <Button asChild variant="outline" className="h-auto py-4">
            <Link href="/scrims" className="flex items-center justify-center gap-2">
              <Users className="h-5 w-5" />
              <span>Join Scrims</span>
            </Link>
          </Button>
        </div>

        {/* Slots List */}
        <div className="space-y-4">
          {mockSlots.length > 0 ? (
            mockSlots.map((slot) => (
              <Card key={slot.id} className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl">{slot.tournamentName}</CardTitle>
                      <CardDescription className="text-gray-400">
                        {slot.type === 'tournament' ? 'Tournament Entry' : 'Scrim Match'}
                      </CardDescription>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      slot.status === 'upcoming' ? 'bg-green-500/20 text-green-400' :
                      slot.status === 'completed' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {slot.status.charAt(0).toUpperCase() + slot.status.slice(1)}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span className="text-gray-300">{slot.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <span className="text-gray-300">{slot.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-primary" />
                      <span className="text-gray-300">{slot.teamName}</span>
                    </div>
                    <div className="flex justify-end">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="py-8 text-center">
                <p className="text-gray-300 mb-2">No slots booked yet</p>
                <p className="text-gray-400 text-sm">
                  Join tournaments or scrims to see your bookings here
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
