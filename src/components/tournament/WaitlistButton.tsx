"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { MailPlus, CheckCircle } from 'lucide-react';

export function WaitlistButton({ tournamentName }: { tournamentName: string }) {
  const [isWaitlisted, setIsWaitlisted] = useState(false);
  const { toast } = useToast();

  const handleWaitlist = () => {
    // Simulate API call
    setIsWaitlisted(true);
    toast({
      title: "Joined Waitlist!",
      description: `You'll be notified if a slot opens up for ${tournamentName}.`,
      variant: "default",
    });
  };

  return (
    <Button 
      onClick={handleWaitlist} 
      disabled={isWaitlisted}
      className="w-full font-headline flex items-center gap-2"
      variant="outline"
    >
      {isWaitlisted ? (
        <>
          <CheckCircle className="w-5 h-5 text-green-500" />
          <span>On Waitlist</span>
        </>
      ) : (
        <>
          <MailPlus className="w-5 h-5" />
          <span>Join Waitlist</span>
        </>
      )}
    </Button>
  );
}
