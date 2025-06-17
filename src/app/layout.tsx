import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import './app.css';
import { Toaster } from 'sonner';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { AuthProvider } from '@/contexts/AuthContext';
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
    <html lang="en" className={`dark ${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      </head>
      <body className="nexus-layout">
        <AuthProvider>
          <div className="min-h-screen flex flex-col bg-background">
            <div className="static-bg" />
            <Header />
            <main className="flex-grow relative z-10 container mx-auto px-4 py-8">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster position="top-center" />
          <SettingsButton />
        </AuthProvider>
      </body>
    </html>
  );
}