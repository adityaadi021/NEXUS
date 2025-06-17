'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { CheckCircle2, UserPlus, Users, Calendar, Info, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { getTournamentById } from '@/lib/data';
import type { Tournament } from '@/lib/types';

interface TeamMember {
  name: string;
  ign: string;
  email: string;
}

export default function RegistrationConfirmationPage() {
  const params = useParams();
  const router = useRouter();
  const [tournament, setTournament] = useState<Tournament | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingPlayer, setIsAddingPlayer] = useState(false);
  const [fifthPlayer, setFifthPlayer] = useState<TeamMember>({
    name: '',
    ign: '',
    email: ''
  });

  useEffect(() => {
    const fetchTournament = async () => {
      try {
        const id = params.id as string;
        const data = getTournamentById(id);
        if (!data) {
          router.push('/tournaments');
          return;
        }
        setTournament(data);
      } catch (error) {
        console.error('Error fetching tournament:', error);
        toast.error('Failed to load tournament details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTournament();
  }, [params.id, router]);

  const handleAddFifthPlayer = async () => {
    if (!fifthPlayer.name.trim() || !fifthPlayer.ign.trim() || !fifthPlayer.email.trim()) {
      toast.error('Please fill in all player details');
      return;
    }

    setIsAddingPlayer(true);
    try {
      // TODO: Implement adding fifth player logic
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      toast.success('Successfully added fifth player!');
      setFifthPlayer({ name: '', ign: '', email: '' });
    } catch (error) {
      console.error('Error adding player:', error);
      toast.error('Failed to add player');
    } finally {
      setIsAddingPlayer(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!tournament) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Success Message */}
          <Card className="bg-[#181924] border-[#23243a]">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <CheckCircle2 className="h-16 w-16 text-green-500" />
                <h1 className="text-3xl font-bold text-white">Registration Successful!</h1>
                <p className="text-gray-300">
                  Your team has been successfully registered for {tournament.name}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Tournament Details */}
          <Card className="bg-[#181924] border-[#23243a]">
            <CardHeader>
              <CardTitle className="text-white">Tournament Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-[#a259ff]" />
                  <div>
                    <p className="text-sm text-gray-400">Start Date</p>
                    <p className="text-white">{tournament.startDate}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-[#a259ff]" />
                  <div>
                    <p className="text-sm text-gray-400">Team Size</p>
                    <p className="text-white">4 Players (5th Optional)</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Add Fifth Player */}
          <Card className="bg-[#181924] border-[#23243a]">
            <CardHeader>
              <CardTitle className="text-white">Add Optional Fifth Player</CardTitle>
              <CardDescription>
                You can add a fifth player as a substitute. This is optional.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fifth-name" className="text-white">Full Name</Label>
                <Input
                  id="fifth-name"
                  value={fifthPlayer.name}
                  onChange={(e) => setFifthPlayer({ ...fifthPlayer, name: e.target.value })}
                  placeholder="Enter full name"
                  className="bg-[#23243a] border-[#2a2b45] text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fifth-ign" className="text-white">In-Game Name</Label>
                <Input
                  id="fifth-ign"
                  value={fifthPlayer.ign}
                  onChange={(e) => setFifthPlayer({ ...fifthPlayer, ign: e.target.value })}
                  placeholder="Enter in-game name"
                  className="bg-[#23243a] border-[#2a2b45] text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fifth-email" className="text-white">Email</Label>
                <Input
                  id="fifth-email"
                  type="email"
                  value={fifthPlayer.email}
                  onChange={(e) => setFifthPlayer({ ...fifthPlayer, email: e.target.value })}
                  placeholder="Enter email"
                  className="bg-[#23243a] border-[#2a2b45] text-white"
                />
              </div>
              <Button
                onClick={handleAddFifthPlayer}
                className="w-full bg-[#a259ff] hover:bg-[#8e44ec] text-white"
                disabled={isAddingPlayer}
              >
                <UserPlus className="h-4 w-4 mr-2" />
                {isAddingPlayer ? 'Adding Player...' : 'Add Fifth Player'}
              </Button>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="bg-[#181924] border-[#23243a]">
            <CardHeader>
              <CardTitle className="text-white">Next Steps</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-2">
                <Info className="h-5 w-5 text-[#a259ff] mt-0.5" />
                <div className="text-gray-300">
                  <p>1. Check your email for registration confirmation</p>
                  <p>2. Join our Discord server for tournament updates</p>
                  <p>3. Be ready 15 minutes before the tournament starts</p>
                </div>
              </div>
              <Button
                asChild
                className="w-full bg-[#a259ff] hover:bg-[#8e44ec] text-white"
              >
                <Link href="/tournaments">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Back to Tournaments
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
