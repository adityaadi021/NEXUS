import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export default function SettingsPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <h1 className="font-headline text-3xl md:text-4xl text-neon-primary">User Settings</h1>
        <p className="text-lg text-gray-300 mt-2">
          Manage your personal preferences and account details.
        </p>

        <div className="space-y-6 text-left">
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="font-headline text-xl text-accent mb-4">Profile Information</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="username" className="text-gray-300 mb-1 block">Username</Label>
                <Input id="username" type="text" defaultValue="PlayerOne" />
              </div>
              <div>
                <Label htmlFor="email" className="text-gray-300 mb-1 block">Email</Label>
                <Input id="email" type="email" defaultValue="player.one@example.com" />
              </div>
              <div>
                <Label htmlFor="bio" className="text-gray-300 mb-1 block">Bio</Label>
                <Input id="bio" type="text" defaultValue="A passionate gamer." />
              </div>
            </div>
            <Button className="mt-4">Save Profile</Button>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="font-headline text-xl text-accent mb-4">Notification Preferences</h2>
            <div className="flex items-center justify-between space-x-2 py-2">
              <Label htmlFor="tournament-notifications" className="text-gray-300">New Tournament Announcements</Label>
              <Switch id="tournament-notifications" defaultChecked />
            </div>
            <div className="flex items-center justify-between space-x-2 py-2">
              <Label htmlFor="scrim-notifications" className="text-gray-300">Scrim Updates</Label>
              <Switch id="scrim-notifications" />
            </div>
            <div className="flex items-center justify-between space-x-2 py-2">
              <Label htmlFor="email-updates" className="text-gray-300">Receive Email Updates</Label>
              <Switch id="email-updates" defaultChecked />
            </div>
            <Button className="mt-4">Save Notifications</Button>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="font-headline text-xl text-accent mb-4">Privacy Settings</h2>
            <div className="flex items-center justify-between space-x-2 py-2">
              <Label htmlFor="profile-public" className="text-gray-300">Make Profile Public</Label>
              <Switch id="profile-public" defaultChecked />
            </div>
            <div className="flex items-center justify-between space-x-2 py-2">
              <Label htmlFor="share-stats" className="text-gray-300">Share Game Statistics</Label>
              <Switch id="share-stats" />
            </div>
            <Button className="mt-4">Save Privacy</Button>
          </div>

          <div className="flex justify-center mt-8">
            <Button>Apply All Settings</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
