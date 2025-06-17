"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Users, 
  UserPlus, 
  Settings, 
  Trash2,
  Check,
  X,
  Search,
  User,
  AlertCircle
} from 'lucide-react';
import { toast } from 'sonner';

interface TeamMember {
  id: string;
  username: string;
  role: 'leader' | 'member';
  status: 'active' | 'pending';
  joinedAt: string;
}

// Mock data for demonstration
const mockTeam = {
  id: '1',
  name: 'Phoenix Squad',
  createdAt: '2024-03-15',
  members: [
    {
      id: '1',
      username: 'PlayerOne',
      role: 'leader',
      status: 'active',
      joinedAt: '2024-03-15'
    },
    {
      id: '2',
      username: 'PlayerTwo',
      role: 'member',
      status: 'active',
      joinedAt: '2024-03-15'
    },
    {
      id: '3',
      username: 'PlayerThree',
      role: 'member',
      status: 'active',
      joinedAt: '2024-03-15'
    },
    {
      id: '4',
      username: 'PlayerFour',
      role: 'member',
      status: 'active',
      joinedAt: '2024-03-15'
    },
    {
      id: '5',
      username: 'PlayerFive',
      role: 'member',
      status: 'pending',
      joinedAt: '2024-03-16'
    }
  ] as TeamMember[]
};

export default function TeamPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [isCreatingTeam, setIsCreatingTeam] = useState(false);
  const [teamName, setTeamName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isInviting, setIsInviting] = useState(false);

  const handleCreateTeam = () => {
    if (!teamName.trim()) {
      toast.error('Please enter a team name');
      return;
    }
    // TODO: Implement team creation logic
    toast.success('Team created successfully!');
    setIsCreatingTeam(false);
    setTeamName('');
  };

  const handleInviteMember = () => {
    if (!searchQuery.trim()) {
      toast.error('Please enter a username');
      return;
    }
    if (mockTeam.members.length >= 5) {
      toast.error('Team is already full (5 players)');
      return;
    }
    // TODO: Implement member invitation logic
    toast.success('Invitation sent successfully!');
    setIsInviting(false);
    setSearchQuery('');
  };

  const handleRemoveMember = (memberId: string) => {
    // TODO: Implement member removal logic
    toast.success('Member removed successfully!');
  };

  const handleLeaveTeam = () => {
    // TODO: Implement leave team logic
    toast.success('Left team successfully!');
  };

  const isTeamFull = mockTeam?.members.length >= 5;

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-[#a259ff]">Team Management</h1>
            <p className="text-gray-400 mt-2">Manage your Free Fire squad (4-5 players)</p>
          </div>
          {!mockTeam ? (
            <Button
              onClick={() => setIsCreatingTeam(true)}
              className="bg-[#a259ff] hover:bg-[#8e44ec] text-white"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Create Team
            </Button>
          ) : (
            <Button
              onClick={() => setIsInviting(true)}
              className="bg-[#a259ff] hover:bg-[#8e44ec] text-white"
              disabled={isTeamFull}
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Invite Member
            </Button>
          )}
        </div>

        {/* Create Team Modal */}
        {isCreatingTeam && (
          <Card className="bg-[#181924] border-[#23243a]">
            <CardHeader>
              <CardTitle className="text-white">Create New Team</CardTitle>
              <CardDescription>Set up your squad for tournaments (4-5 players)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="teamName" className="text-white">Team Name</Label>
                <Input
                  id="teamName"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  placeholder="Enter team name"
                  className="bg-[#23243a] border-[#2a2b45] text-white"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setIsCreatingTeam(false)}
                  className="border-[#a259ff] text-[#a259ff] hover:bg-[#a259ff] hover:text-white"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleCreateTeam}
                  className="bg-[#a259ff] hover:bg-[#8e44ec] text-white"
                >
                  Create Team
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Invite Member Modal */}
        {isInviting && (
          <Card className="bg-[#181924] border-[#23243a]">
            <CardHeader>
              <CardTitle className="text-white">Invite Team Member</CardTitle>
              <CardDescription>Search and invite players to your squad</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="searchUser" className="text-white">Username</Label>
                <div className="flex space-x-2">
                  <Input
                    id="searchUser"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Enter username"
                    className="bg-[#23243a] border-[#2a2b45] text-white"
                  />
                  <Button
                    onClick={handleInviteMember}
                    className="bg-[#a259ff] hover:bg-[#8e44ec] text-white"
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex justify-end">
                <Button
                  variant="outline"
                  onClick={() => setIsInviting(false)}
                  className="border-[#a259ff] text-[#a259ff] hover:bg-[#a259ff] hover:text-white"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Team Information */}
        {mockTeam && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Team Details */}
            <Card className="lg:col-span-2 bg-[#181924] border-[#23243a]">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-white">{mockTeam.name}</CardTitle>
                    <CardDescription>Created on {mockTeam.createdAt}</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="text-sm text-gray-400">
                      {mockTeam.members.length}/5 Members
                    </div>
                    {isTeamFull && (
                      <div className="flex items-center text-yellow-500">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        <span className="text-sm">Team Full</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockTeam.members.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-[#23243a]"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="p-2 rounded-full bg-[#a259ff]/10">
                          <User className="h-5 w-5 text-[#a259ff]" />
                        </div>
                        <div>
                          <h3 className="text-white font-medium">{member.username}</h3>
                          <p className="text-sm text-gray-400">
                            {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {member.status === 'pending' && (
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              className="bg-green-500 hover:bg-green-600 text-white"
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              className="bg-red-500 hover:bg-red-600 text-white"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                        {member.role !== 'leader' && (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-red-500 hover:text-red-600 hover:bg-red-500/10"
                            onClick={() => handleRemoveMember(member.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Team Actions */}
            <Card className="bg-[#181924] border-[#23243a]">
              <CardHeader>
                <CardTitle className="text-white">Team Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  onClick={() => router.push('/team/settings')}
                  className="w-full bg-[#181924] border-[#23243a] hover:border-[#a259ff] hover:bg-[#23243a]"
                >
                  <Settings className="h-4 w-4 mr-2 text-[#a259ff]" />
                  Team Settings
                </Button>
                <Button
                  onClick={handleLeaveTeam}
                  className="w-full bg-red-500 hover:bg-red-600 text-white"
                >
                  Leave Team
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
} 