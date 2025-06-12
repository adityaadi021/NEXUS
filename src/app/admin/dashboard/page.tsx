'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { LogOut, Users, Trophy, Settings, Calendar, DollarSign, AlertTriangle, Search, Filter, Download, MoreVertical } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';
import { AdminProtected } from '@/components/auth/AdminProtected';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

// Mock data - In a real app, this would come from your database
const mockUsers = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'player', status: 'active', joinedDate: '2024-03-01' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'admin', status: 'active', joinedDate: '2024-02-15' },
  { id: '3', name: 'Mike Johnson', email: 'mike@example.com', role: 'player', status: 'inactive', joinedDate: '2024-03-10' },
];

const mockPayments = [
  { id: '1', amount: 500, date: '2024-03-15', tournament: 'Weekend Warriors', status: 'completed', player: 'John Doe' },
  { id: '2', amount: 200, date: '2024-03-10', tournament: 'Daily Scrims', status: 'pending', player: 'Jane Smith' },
  { id: '3', amount: 1000, date: '2024-03-05', tournament: 'Pro League', status: 'completed', player: 'Mike Johnson' },
];

export default function AdminDashboardPage() {
  const { logout } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');

  const handleLogout = () => {
    logout();
    toast({
      title: 'Logged out successfully',
      description: 'You have been logged out of the admin panel.',
    });
  };

  return (
    <AdminProtected>
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-headline text-3xl md:text-4xl text-neon-primary mb-8">Admin Dashboard</h1>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle>Dashboard Overview</CardTitle>
                <CardDescription>Key metrics and statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
                    <div className="text-sm text-gray-400 mb-1">Total Users</div>
                    <div className="text-2xl font-semibold text-primary">{mockUsers.length}</div>
                  </div>
                  <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
                    <div className="text-sm text-gray-400 mb-1">Total Revenue</div>
                    <div className="text-2xl font-semibold text-primary">
                      ₹{mockPayments.filter(p => p.status === 'completed').reduce((sum, p) => sum + p.amount, 0)}
                    </div>
                  </div>
                  <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
                    <div className="text-sm text-gray-400 mb-1">Active Tournaments</div>
                    <div className="text-2xl font-semibold text-primary">3</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>User Management</CardTitle>
                    <CardDescription>Manage user accounts and permissions</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="relative max-w-sm">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search users..."
                      className="pl-9"
                    />
                  </div>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Joined Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={user.status === 'active' ? 'default' : 'destructive'}>
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{user.joinedDate}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Payment Management</CardTitle>
                    <CardDescription>Track and manage tournament payments</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="relative max-w-sm">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search payments..."
                      className="pl-9"
                    />
                  </div>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tournament</TableHead>
                      <TableHead>Player</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockPayments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell>{payment.tournament}</TableCell>
                        <TableCell>{payment.player}</TableCell>
                        <TableCell>₹{payment.amount}</TableCell>
                        <TableCell>{payment.date}</TableCell>
                        <TableCell>
                          <Badge variant={payment.status === 'completed' ? 'default' : 'secondary'}>
                            {payment.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Site Settings</CardTitle>
                <CardDescription>Configure global site settings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">General Settings</h3>
                    <div className="grid gap-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                        <Switch id="maintenance-mode" />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="registration">Allow New Registrations</Label>
                        <Switch id="registration" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="notifications">Enable Notifications</Label>
                        <Switch id="notifications" defaultChecked />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Tournament Settings</h3>
                    <div className="grid gap-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="auto-approval">Auto-approve Tournament Registrations</Label>
                        <Switch id="auto-approval" />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="payment-verification">Require Payment Verification</Label>
                        <Switch id="payment-verification" defaultChecked />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button>Save Changes</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminProtected>
  );
}
