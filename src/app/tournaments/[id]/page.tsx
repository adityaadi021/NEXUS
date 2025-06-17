'use client';

import Image from 'next/image';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { getTournamentById } from '@/lib/data';
import type { Tournament } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';
import { SlotCounter } from '@/components/tournament/SlotCounter';
import { WaitlistButton } from '@/components/tournament/WaitlistButton';
import { CalendarDays, Users, DollarSign, Info, Gamepad2, User } from 'lucide-react';

interface TeamMember {
  name: string;
  ign: string;
  email: string;
}

export default function TournamentDetailPage() {
  const params = useParams();
  const [tournament, setTournament] = useState<Tournament | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRegistering, setIsRegistering] = useState(false);
  const [teamName, setTeamName] = useState('');
  const [isWaitlisted, setIsWaitlisted] = useState(false);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    { name: '', ign: '', email: '' },
    { name: '', ign: '', email: '' },
    { name: '', ign: '', email: '' },
    { name: '', ign: '', email: '' }
  ]);

  useEffect(() => {
    const fetchTournament = async () => {
      try {
        const id = params.id as string;
        const data = getTournamentById(id);
        if (!data) {
          notFound();
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
  }, [params.id]);

  const handleMemberChange = (index: number, field: keyof TeamMember, value: string) => {
    const newMembers = [...teamMembers];
    newMembers[index] = { ...newMembers[index], [field]: value };
    setTeamMembers(newMembers);
  };

  const handleRegister = async () => {
    if (!teamName.trim()) {
      toast.error('Please enter your team name');
      return;
    }

    // Validate team members
    const emptyFields = teamMembers.some(member => 
      !member.name.trim() || !member.ign.trim() || !member.email.trim()
    );

    if (emptyFields) {
      toast.error('Please fill in all team member details');
      return;
    }

    setIsRegistering(true);
    try {
      // TODO: Implement registration logic
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      toast.success('Successfully registered for the tournament!');
      // TODO: Redirect to team management or confirmation page
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Failed to register for the tournament');
    } finally {
      setIsRegistering(false);
    }
  };

  const handleWaitlist = async () => {
    setIsWaitlisted(true);
    try {
      // TODO: Implement waitlist logic
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      toast.success('Successfully added to waitlist!');
    } catch (error) {
      console.error('Waitlist error:', error);
      toast.error('Failed to join waitlist');
      setIsWaitlisted(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading tournament details...</div>
      </div>
    );
  }

  if (!tournament) {
    return notFound();
  }

  const isFull = tournament.availableSlots === 0;

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        {/* Tournament Header */}
        <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden mb-8">
          <Image
            src={tournament.image}
            alt={tournament.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 md:p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              {tournament.name}
            </h1>
            <p className="text-gray-300 text-lg">
              {tournament.description}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Tournament Info */}
            <Card className="bg-[#181924] border-[#23243a]">
              <CardHeader>
                <CardTitle className="text-white">Tournament Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <CalendarDays className="h-5 w-5 text-[#a259ff]" />
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
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-5 w-5 text-[#a259ff]" />
                    <div>
                      <p className="text-sm text-gray-400">Entry Fee</p>
                      <p className="text-white">${tournament.entryFee}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Gamepad2 className="h-5 w-5 text-[#a259ff]" />
                    <div>
                      <p className="text-sm text-gray-400">Game Mode</p>
                      <p className="text-white">Squad</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Rules */}
            <Card className="bg-[#181924] border-[#23243a]">
              <CardHeader>
                <CardTitle className="text-white">Tournament Rules</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {tournament.rules?.map((rule, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <Info className="h-5 w-5 text-[#a259ff] mt-0.5" />
                      <span className="text-gray-300">{rule}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Registration Card */}
            <Card className="bg-[#181924] border-[#23243a]">
              <CardHeader>
                <CardTitle className="text-white">Register Your Team</CardTitle>
                <CardDescription>
                  {isFull ? 'Tournament is full' : `${tournament.availableSlots} slots remaining`}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="teamName" className="text-white">Team Name</Label>
                  <Input
                    id="teamName"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    placeholder="Enter your team name"
                    className="bg-[#23243a] border-[#2a2b45] text-white"
                    disabled={isFull}
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="text-white font-medium">Team Members (Required)</h3>
                  {teamMembers.map((member, index) => (
                    <div key={index} className="space-y-2 p-4 bg-[#23243a] rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <User className="h-4 w-4 text-[#a259ff]" />
                        <span className="text-white">Player {index + 1}</span>
                      </div>
                      <div className="space-y-2">
                        <div>
                          <Label htmlFor={`name-${index}`} className="text-white">Full Name</Label>
                          <Input
                            id={`name-${index}`}
                            value={member.name}
                            onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                            placeholder="Enter full name"
                            className="bg-[#181924] border-[#2a2b45] text-white"
                            disabled={isFull}
                          />
                        </div>
                        <div>
                          <Label htmlFor={`ign-${index}`} className="text-white">In-Game Name</Label>
                          <Input
                            id={`ign-${index}`}
                            value={member.ign}
                            onChange={(e) => handleMemberChange(index, 'ign', e.target.value)}
                            placeholder="Enter in-game name"
                            className="bg-[#181924] border-[#2a2b45] text-white"
                            disabled={isFull}
                          />
                        </div>
                        <div>
                          <Label htmlFor={`email-${index}`} className="text-white">Email</Label>
                          <Input
                            id={`email-${index}`}
                            type="email"
                            value={member.email}
                            onChange={(e) => handleMemberChange(index, 'email', e.target.value)}
                            placeholder="Enter email"
                            className="bg-[#181924] border-[#2a2b45] text-white"
                            disabled={isFull}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {isFull ? (
                  <WaitlistButton
                    onClick={handleWaitlist}
                    isWaitlisted={isWaitlisted}
                  />
                ) : (
                  <Button
                    onClick={handleRegister}
                    className="w-full bg-[#a259ff] hover:bg-[#8e44ec] text-white"
                    disabled={isRegistering}
                  >
                    {isRegistering ? 'Registering...' : 'Register Team'}
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Stream Link */}
            {tournament.streamLink && (
              <Card className="bg-[#181924] border-[#23243a]">
                <CardHeader>
                  <CardTitle className="text-white">Watch Live</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button
                    asChild
                    className="w-full bg-red-600 hover:bg-red-700 text-white"
                  >
                    <Link href={tournament.streamLink} target="_blank">
                      Watch on YouTube
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
