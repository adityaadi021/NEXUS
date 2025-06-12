'use client';

import Link from 'next/link';
import { Settings as SettingsIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

export function SettingsButton() {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
    }, 600);
  };

  return (
    <>
      <style jsx global>{`
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
      `}</style>
      <Link 
        href="/settings" 
        className={`settings-button fixed bottom-4 right-4 z-50 p-3 bg-primary text-primary-foreground rounded-full shadow-lg transition-all duration-200 flex items-center justify-center ${isClicked ? 'clicked' : ''}`}
        aria-label="Settings"
        onClick={handleClick}
      >
        <SettingsIcon className="h-6 w-6 transition-transform duration-200" />
      </Link>
    </>
  );
} 