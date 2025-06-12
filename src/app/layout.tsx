import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import Link from 'next/link';
import { Settings as SettingsIcon } from 'lucide-react';
import { AuthProvider } from '@/contexts/AuthContext';
import { FontLoader } from '@/components/FontLoader';
import { SettingsButton } from '@/components/ui/SettingsButton';

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter',
  display: 'swap',
  preload: true,
});

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'], 
  variable: '--font-space-grotesk',
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  title: 'Nexus Esports',
  description: 'Your hub for competitive Free Fire tournaments and scrims.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <FontLoader />
        <style dangerouslySetInnerHTML={{ __html: `
          :root {
            --font-inter: 'Inter', sans-serif;
            --font-space-grotesk: 'Space Grotesk', sans-serif;
          }

          @keyframes settingsClick {
            0% { 
              transform: scale(1) rotate(0deg);
              box-shadow: 0 0 5px hsl(var(--primary) / 0.5);
            }
            25% { 
              transform: scale(0.95) rotate(-45deg);
              box-shadow: 0 0 15px hsl(var(--primary) / 0.7),
                         0 0 20px hsl(var(--primary) / 0.5);
            }
            50% { 
              transform: scale(1.1) rotate(45deg);
              box-shadow: 0 0 20px hsl(var(--primary) / 0.8),
                         0 0 30px hsl(var(--accent) / 0.6);
            }
            75% { 
              transform: scale(0.95) rotate(-45deg);
              box-shadow: 0 0 15px hsl(var(--primary) / 0.7),
                         0 0 20px hsl(var(--primary) / 0.5);
            }
            100% { 
              transform: scale(1) rotate(0deg);
              box-shadow: 0 0 5px hsl(var(--primary) / 0.5);
            }
          }

          .settings-button {
            transition: all 0.2s ease;
          }

          .settings-button:hover {
            background-color: hsl(var(--primary) / 0.9);
          }

          .settings-button.clicked {
            animation: settingsClick 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .settings-button.clicked svg {
            animation: settingsClick 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          }
        `}} />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${inter.className}`}>
        <AuthProvider>
          <div className="min-h-screen flex flex-col bg-background">
            {/* Static background */}
            <div className="static-bg" />
            
            <Header />
            <main className="flex-grow relative z-10">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster />
          <SettingsButton />
        </AuthProvider>
      </body>
    </html>
  );
}