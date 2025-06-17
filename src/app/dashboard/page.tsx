"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Trophy, 
  Users, 
  Calendar, 
  Youtube,
  ChevronRight,
  Clock,
  Gamepad2,
  UserPlus,
  Users as TeamIcon
} from 'lucide-react';

interface User {
  id: string;
  username: string;
  email: string;
  isAdmin: boolean;
}

// Mock data for demonstration
const mockStats = {
  tournamentsPlayed: 12,
  teamMembers: 3,
  upcomingMatches: 2,
  activeTeams: 1
};

const mockRecentActivity = [
  { id: 1, type: 'tournament', title: 'Weekend Warriors', result: 'Victory', date: '2 hours ago' },
  { id: 2, type: 'team', title: 'Team Invitation', result: 'Accepted', date: '5 hours ago' },
  { id: 3, type: 'match', title: 'Squad Battle', result: 'Completed', date: '1 day ago' },
];

const mockUpcomingEvents = [
  { 
    id: 1, 
    type: 'tournament', 
    title: 'Summer Championship', 
    date: '2024-06-15', 
    participants: 32,
    streamLink: 'https://youtube.com/live/example'
  },
  { 
    id: 2, 
    type: 'match', 
    title: 'Squad Practice', 
    date: '2024-06-10', 
    participants: 8,
    streamLink: null
  },
];

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, loading } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.replace('/login');
      } else if (user?.isAdmin) {
        router.replace('/admin/dashboard');
      } else {
        setIsLoading(false);
      }
    }
  }, [isAuthenticated, loading, user, router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
    router.replace('/');
  };

  if (loading || isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Welcome Section */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-[#a259ff]">Welcome back, {user.username}!</h1>
            <p className="text-gray-400 mt-2">Manage your Free Fire tournaments and teams</p>
          </div>
          <Button
            onClick={() => router.push('/settings')}
            variant="outline"
            className="border-[#a259ff] text-[#a259ff] hover:bg-[#a259ff] hover:text-white"
          >
            Settings
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-[#181924] border-[#23243a] hover:border-[#a259ff] transition-colors">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Tournaments</CardTitle>
              <Trophy className="h-4 w-4 text-[#a259ff]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{mockStats.tournamentsPlayed}</div>
              <p className="text-xs text-gray-400 mt-1">Tournaments played</p>
            </CardContent>
          </Card>

          <Card className="bg-[#181924] border-[#23243a] hover:border-[#a259ff] transition-colors">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Team Members</CardTitle>
              <Users className="h-4 w-4 text-[#a259ff]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{mockStats.teamMembers}/4</div>
              <p className="text-xs text-gray-400 mt-1">Current team size</p>
            </CardContent>
          </Card>

          <Card className="bg-[#181924] border-[#23243a] hover:border-[#a259ff] transition-colors">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Upcoming</CardTitle>
              <Calendar className="h-4 w-4 text-[#a259ff]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{mockStats.upcomingMatches}</div>
              <p className="text-xs text-gray-400 mt-1">Scheduled matches</p>
            </CardContent>
          </Card>

          <Card className="bg-[#181924] border-[#23243a] hover:border-[#a259ff] transition-colors">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Active Teams</CardTitle>
              <TeamIcon className="h-4 w-4 text-[#a259ff]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{mockStats.activeTeams}</div>
              <p className="text-xs text-gray-400 mt-1">Teams registered</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <Card className="lg:col-span-2 bg-[#181924] border-[#23243a]">
            <CardHeader>
              <CardTitle className="text-white">Recent Activity</CardTitle>
              <CardDescription>Your latest matches and team updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockRecentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-[#23243a] hover:bg-[#2a2b45] transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="p-2 rounded-full bg-[#a259ff]/10">
                        {activity.type === 'tournament' ? (
                          <Trophy className="h-5 w-5 text-[#a259ff]" />
                        ) : activity.type === 'team' ? (
                          <UserPlus className="h-5 w-5 text-[#a259ff]" />
                        ) : (
                          <Gamepad2 className="h-5 w-5 text-[#a259ff]" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-white font-medium">{activity.title}</h3>
                        <p className="text-sm text-gray-400">{activity.result}</p>
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-gray-400">
                      <Clock className="h-4 w-4 mr-1" />
                      {activity.date}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card className="bg-[#181924] border-[#23243a]">
            <CardHeader>
              <CardTitle className="text-white">Upcoming Events</CardTitle>
              <CardDescription>Your scheduled matches</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockUpcomingEvents.map((event) => (
                  <div
                    key={event.id}
                    className="p-4 rounded-lg bg-[#23243a] hover:bg-[#2a2b45] transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {event.type === 'tournament' ? (
                          <Trophy className="h-4 w-4 text-[#a259ff]" />
                        ) : (
                          <Gamepad2 className="h-4 w-4 text-[#a259ff]" />
                        )}
                        <h3 className="text-white font-medium">{event.title}</h3>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-[#a259ff] hover:text-white hover:bg-[#a259ff]"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {event.date}
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {event.participants} players
                      </div>
                    </div>
                    {event.streamLink && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full mt-2 border-[#a259ff] text-[#a259ff] hover:bg-[#a259ff] hover:text-white"
                        onClick={() => window.open(event.streamLink, '_blank')}
                      >
                        <Youtube className="h-4 w-4 mr-2" />
                        Watch Live
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Button
            onClick={() => router.push('/tournaments')}
            className="h-24 bg-[#181924] border-[#23243a] hover:border-[#a259ff] hover:bg-[#23243a] transition-all"
          >
            <div className="flex flex-col items-center">
              <Trophy className="h-6 w-6 text-[#a259ff] mb-2" />
              <span className="text-white">Tournaments</span>
            </div>
          </Button>
          <Button
            onClick={() => router.push('/team')}
            className="h-24 bg-[#181924] border-[#23243a] hover:border-[#a259ff] hover:bg-[#23243a] transition-all"
          >
            <div className="flex flex-col items-center">
              <TeamIcon className="h-6 w-6 text-[#a259ff] mb-2" />
              <span className="text-white">My Team</span>
            </div>
          </Button>
          <Button
            onClick={() => router.push('/matches')}
            className="h-24 bg-[#181924] border-[#23243a] hover:border-[#a259ff] hover:bg-[#23243a] transition-all"
          >
            <div className="flex flex-col items-center">
              <Gamepad2 className="h-6 w-6 text-[#a259ff] mb-2" />
              <span className="text-white">Matches</span>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}
