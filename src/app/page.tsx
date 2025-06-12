import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldCheck, Trophy, Users, MessageSquare, Instagram, Youtube } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      {/* Hero Section */}
      <section className="text-center mb-16 pt-8">
        <h1 className="font-headline text-5xl md:text-6xl font-bold mb-4">
          Welcome to <span className="text-neon-primary">Nexus Esports</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Your hub for competitive Free Fire tournaments and scrims. Join the battle, claim victory!
        </p>
      </section>

      {/* Why Choose Nexus Esports Section */}
      <section id="why-nexus" className="mb-16">
        <h2 className="font-headline text-4xl md:text-5xl font-bold mb-10 text-center text-neon-accent">
          Why Choose Nexus Esports?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <Card className="bg-card/60 hover:shadow-primary/20 transition-shadow duration-300">
            <CardHeader className="items-center text-center">
              <Trophy className="w-12 h-12 icon-glow-primary mb-3" />
              <CardTitle className="font-headline text-2xl">Elite Competition</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-muted-foreground">
              <p>Engage in thrilling tournaments and scrims designed for all skill levels. Test your mettle against the best.</p>
            </CardContent>
          </Card>
          <Card className="bg-card/60 hover:shadow-primary/20 transition-shadow duration-300">
            <CardHeader className="items-center text-center">
              <Users className="w-12 h-12 icon-glow-primary mb-3" />
              <CardTitle className="font-headline text-2xl">Vibrant Community</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-muted-foreground">
              <p>Connect with fellow gamers, form teams, and grow together in a supportive and passionate environment.</p>
            </CardContent>
          </Card>
          <Card className="bg-card/60 hover:shadow-primary/20 transition-shadow duration-300">
            <CardHeader className="items-center text-center">
              <ShieldCheck className="w-12 h-12 icon-glow-primary mb-3" />
              <CardTitle className="font-headline text-2xl">Fair & Secure</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-muted-foreground">
              <p>We prioritize fair play with robust anti-cheat measures and transparent rule sets for all events.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* What Makes Nexus Stand Out? Section */}
      <section id="unique-features" className="mb-16">
        <h2 className="font-headline text-4xl md:text-5xl font-bold mb-10 text-center text-neon-accent">
          What Makes Nexus Stand Out?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <Card className="bg-card/60 hover:shadow-primary/20 transition-shadow duration-300">
            <CardHeader className="items-center text-center">
              <Users className="w-12 h-12 icon-glow-primary mb-3" />
              <CardTitle className="font-headline text-2xl">Seamless Registration & Tracking</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-muted-foreground">
              <p>Easily sign up for tournaments and track your performance with our intuitive and user-friendly platform.</p>
            </CardContent>
          </Card>
          <Card className="bg-card/60 hover:shadow-primary/20 transition-shadow duration-300">
            <CardHeader className="items-center text-center">
              <Trophy className="w-12 h-12 icon-glow-primary mb-3" />
              <CardTitle className="font-headline text-2xl">Creator Spotlight Program</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-muted-foreground">
              <p>Showcase your talent! Our program highlights community content creators, giving you a platform to shine.</p>
            </CardContent>
          </Card>
          <Card className="bg-card/60 hover:shadow-primary/20 transition-shadow duration-300">
            <CardHeader className="items-center text-center">
              <ShieldCheck className="w-12 h-12 icon-glow-primary mb-3" />
              <CardTitle className="font-headline text-2xl">Exclusive Community Events</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-muted-foreground">
              <p>Participate in unique, members-only events, workshops, and Q&A sessions with pro players and streamers.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Connect With Us Section */}
      <section id="connect" className="mb-8">
        <h2 className="font-headline text-4xl md:text-5xl font-bold mb-10 text-center text-neon-accent">
          Connect With Us
        </h2>
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          <Button variant="outline" size="lg" asChild className="border-primary/50 hover:bg-primary/10 hover:border-primary text-foreground">
            <Link href="https://discord.gg/xPGJCWpMbM" target="_blank" rel="noopener noreferrer">
              <MessageSquare className="mr-2 h-5 w-5 icon-glow-primary" /> Discord
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild className="border-primary/50 hover:bg-primary/10 hover:border-primary text-foreground">
            <Link href="https://www.youtube.com/@nexus_esports_official" target="_blank" rel="noopener noreferrer">
              <Youtube className="mr-2 h-5 w-5 icon-glow-primary" /> YouTube
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild className="border-primary/50 hover:bg-primary/10 hover:border-primary text-foreground">
            <Link href="https://www.instagram.com/nexus_esports.ig/" target="_blank" rel="noopener noreferrer">
              <Instagram className="mr-2 h-5 w-5 icon-glow-primary" /> Instagram
            </Link>
          </Button>
        </div>
        <p className="text-center text-muted-foreground mt-6 text-sm">
            Follow us on social media to stay updated with the latest news, tournaments, and community events!
        </p>
      </section>
    </div>
  );
}
