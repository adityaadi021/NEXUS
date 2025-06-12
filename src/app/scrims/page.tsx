import { Button } from '@/components/ui/button';
import { MessageSquare, Users, Calendar, Trophy } from 'lucide-react';
import Link from 'next/link';

export default function ScrimsPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <h1 className="font-headline text-3xl md:text-4xl text-neon-primary">Scrims</h1>
        <p className="text-lg text-gray-300 mt-2">
          Join our practice matches and improve your gameplay with fellow competitive players.
        </p>

        <div className="grid gap-6 md:grid-cols-2 mt-8">
          {/* Scrim Information Card */}
          <div className="p-6 bg-gray-800 rounded-lg border border-gray-700">
            <h2 className="font-headline text-xl text-accent mb-4">Scrim Details</h2>
            <div className="space-y-4 text-left">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <h3 className="font-medium text-primary">Schedule</h3>
                  <p className="text-gray-300">Daily practice matches</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-primary" />
                <div>
                  <h3 className="font-medium text-primary">Team Size</h3>
                  <p className="text-gray-300">4 players per team</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Trophy className="h-5 w-5 text-primary" />
                <div>
                  <h3 className="font-medium text-primary">Format</h3>
                  <p className="text-gray-300">Custom room matches</p>
                </div>
              </div>
            </div>
          </div>

          {/* WhatsApp Group Card */}
          <div className="p-6 bg-gray-800 rounded-lg border border-gray-700">
            <h2 className="font-headline text-xl text-accent mb-4">Join Our Community</h2>
            <p className="text-gray-300 mb-4 text-left">
              Join our dedicated WhatsApp group to:
            </p>
            <ul className="text-gray-300 mb-6 text-left space-y-2">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                Coordinate practice matches
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                Find team members
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                Get match updates
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                Participate in tournaments
              </li>
            </ul>
            <Button asChild className="w-full">
              <Link
                href="https://chat.whatsapp.com/HBL0gvNVDSbCZQevt3Yyo6"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <MessageSquare className="h-5 w-5" />
                Join Scrims WhatsApp Group
              </Link>
            </Button>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-8 p-6 bg-gray-800 rounded-lg border border-gray-700">
          <h2 className="font-headline text-xl text-accent mb-4">How to Participate</h2>
          <div className="grid gap-4 md:grid-cols-3 text-left">
            <div className="space-y-2">
              <h3 className="font-medium text-primary">1. Join the Group</h3>
              <p className="text-gray-300">Click the button above to join our WhatsApp group</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium text-primary">2. Form a Team</h3>
              <p className="text-gray-300">Find teammates or join existing teams</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium text-primary">3. Start Playing</h3>
              <p className="text-gray-300">Join daily practice matches and improve together</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
