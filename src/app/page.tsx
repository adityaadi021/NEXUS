'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldCheck, Trophy, Users, MessageSquare, Instagram, Youtube } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function HomePage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#0a0a0a] to-black">
      {/* Hero Section */}
      <section className="relative text-center mb-16 pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="relative container mx-auto px-4">
          <h1 className="font-headline text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#a259ff] to-[#8e44ec] animate-gradient">
            Welcome to <span className="text-neon-primary drop-shadow-[0_0_10px_#a259ff]">Nexus Esports</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
            Your hub for competitive Free Fire tournaments and scrims. Join the battle, claim victory!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {isAuthenticated ? (
              <Button asChild className="bg-[#a259ff] hover:bg-[#8e44ec] text-white text-lg px-8 py-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_20px_#a259ff]">
                <Link href={user?.isAdmin ? "/admin/dashboard" : "/dashboard"}>Go to Dashboard</Link>
              </Button>
            ) : (
              <>
                <Button asChild className="bg-[#a259ff] hover:bg-[#8e44ec] text-white text-lg px-8 py-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_20px_#a259ff]">
                  <Link href="/login">Get Started</Link>
                </Button>
                <Button asChild variant="outline" className="border-[#a259ff] text-[#a259ff] hover:bg-[#a259ff] hover:text-white text-lg px-8 py-6 rounded-lg transition-all duration-300 transform hover:scale-105">
                  <Link href="/register">Join Now</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Why Choose Nexus Esports Section */}
      <section id="why-nexus" className="mb-16 relative">
        <div className="container mx-auto px-4">
          <h2 className="font-headline text-4xl md:text-5xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-[#a259ff] to-[#8e44ec]">
            Why Choose Nexus Esports?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-[#181924]/50 backdrop-blur-sm border-[#23243a] hover:border-[#a259ff] transition-all duration-300 transform hover:scale-105">
              <CardHeader className="items-center text-center">
                <div className="p-3 rounded-full bg-[#a259ff]/10 mb-4">
                  <Trophy className="w-12 h-12 text-[#a259ff] icon-glow-primary" />
                </div>
                <CardTitle className="font-headline text-2xl text-white">Elite Competition</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-gray-300">
                <p>Engage in thrilling tournaments and scrims designed for all skill levels. Test your mettle against the best.</p>
              </CardContent>
            </Card>
            <Card className="bg-[#181924]/50 backdrop-blur-sm border-[#23243a] hover:border-[#a259ff] transition-all duration-300 transform hover:scale-105">
              <CardHeader className="items-center text-center">
                <div className="p-3 rounded-full bg-[#a259ff]/10 mb-4">
                  <Users className="w-12 h-12 text-[#a259ff] icon-glow-primary" />
                </div>
                <CardTitle className="font-headline text-2xl text-white">Vibrant Community</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-gray-300">
                <p>Connect with fellow gamers, form teams, and grow together in a supportive and passionate environment.</p>
              </CardContent>
            </Card>
            <Card className="bg-[#181924]/50 backdrop-blur-sm border-[#23243a] hover:border-[#a259ff] transition-all duration-300 transform hover:scale-105">
              <CardHeader className="items-center text-center">
                <div className="p-3 rounded-full bg-[#a259ff]/10 mb-4">
                  <ShieldCheck className="w-12 h-12 text-[#a259ff] icon-glow-primary" />
                </div>
                <CardTitle className="font-headline text-2xl text-white">Fair & Secure</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-gray-300">
                <p>We prioritize fair play with robust anti-cheat measures and transparent rule sets for all events.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What Makes Nexus Stand Out? Section */}
      <section id="unique-features" className="mb-16 relative">
        <div className="container mx-auto px-4">
          <h2 className="font-headline text-4xl md:text-5xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-[#a259ff] to-[#8e44ec]">
            What Makes Nexus Stand Out?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-[#181924]/50 backdrop-blur-sm border-[#23243a] hover:border-[#a259ff] transition-all duration-300 transform hover:scale-105">
              <CardHeader className="items-center text-center">
                <div className="p-3 rounded-full bg-[#a259ff]/10 mb-4">
                  <Users className="w-12 h-12 text-[#a259ff] icon-glow-primary" />
                </div>
                <CardTitle className="font-headline text-2xl text-white">Seamless Registration & Tracking</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-gray-300">
                <p>Easily sign up for tournaments and track your performance with our intuitive and user-friendly platform.</p>
              </CardContent>
            </Card>
            <Card className="bg-[#181924]/50 backdrop-blur-sm border-[#23243a] hover:border-[#a259ff] transition-all duration-300 transform hover:scale-105">
              <CardHeader className="items-center text-center">
                <div className="p-3 rounded-full bg-[#a259ff]/10 mb-4">
                  <Trophy className="w-12 h-12 text-[#a259ff] icon-glow-primary" />
                </div>
                <CardTitle className="font-headline text-2xl text-white">Creator Spotlight Program</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-gray-300">
                <p>Showcase your talent! Our program highlights community content creators, giving you a platform to shine.</p>
              </CardContent>
            </Card>
            <Card className="bg-[#181924]/50 backdrop-blur-sm border-[#23243a] hover:border-[#a259ff] transition-all duration-300 transform hover:scale-105">
              <CardHeader className="items-center text-center">
                <div className="p-3 rounded-full bg-[#a259ff]/10 mb-4">
                  <ShieldCheck className="w-12 h-12 text-[#a259ff] icon-glow-primary" />
                </div>
                <CardTitle className="font-headline text-2xl text-white">Exclusive Community Events</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-gray-300">
                <p>Participate in unique, members-only events, workshops, and Q&A sessions with pro players and streamers.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Connect With Us Section */}
      <section id="connect" className="mb-16 relative">
        <div className="container mx-auto px-4">
          <h2 className="font-headline text-4xl md:text-5xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-[#a259ff] to-[#8e44ec]">
            Connect With Us
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            <Button variant="outline" size="lg" asChild className="border-[#a259ff] text-[#a259ff] hover:bg-[#a259ff] hover:text-white px-8 py-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_20px_#a259ff]">
              <Link href="https://discord.gg/xPGJCWpMbM" target="_blank" rel="noopener noreferrer">
                <MessageSquare className="mr-2 h-5 w-5 icon-glow-primary" /> Discord
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="border-[#a259ff] text-[#a259ff] hover:bg-[#a259ff] hover:text-white px-8 py-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_20px_#a259ff]">
              <Link href="https://www.youtube.com/@nexus_esports_official" target="_blank" rel="noopener noreferrer">
                <Youtube className="mr-2 h-5 w-5 icon-glow-primary" /> YouTube
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="border-[#a259ff] text-[#a259ff] hover:bg-[#a259ff] hover:text-white px-8 py-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_20px_#a259ff]">
              <Link href="https://www.instagram.com/nexus_esports.ig/" target="_blank" rel="noopener noreferrer">
                <Instagram className="mr-2 h-5 w-5 icon-glow-primary" /> Instagram
              </Link>
            </Button>
          </div>
          <p className="text-center text-gray-400 mt-8 text-sm">
            Follow us on social media to stay updated with the latest news, tournaments, and community events!
          </p>
        </div>
      </section>
    </div>
  );
}
