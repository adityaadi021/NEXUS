import { MessageSquare, Instagram, Youtube } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="nexus-footer py-4 mt-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-4">
            <Link
              href="https://discord.gg/xPGJCWpMbM"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <MessageSquare className="h-5 w-5" />
              <span className="sr-only">Discord</span>
            </Link>
            <Link
              href="https://www.instagram.com/nexus_esports.ig/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link
              href="https://www.youtube.com/@nexus_esports_official"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Youtube className="h-5 w-5" />
              <span className="sr-only">YouTube</span>
            </Link>
          </div>
          <p className="text-center text-muted-foreground">
            &copy; {new Date().getFullYear()} Nexus Esports. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
