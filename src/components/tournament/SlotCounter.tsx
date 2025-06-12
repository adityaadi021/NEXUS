"use client";

import { Progress } from "@/components/ui/progress";
import { cn } from '@/lib/utils';

interface SlotCounterProps {
  initialAvailableSlots: number;
  maxSlots: number;
}

export function SlotCounter({ initialAvailableSlots, maxSlots }: SlotCounterProps) {
  // The availableSlots state and useEffect for simulation have been removed.
  // The component now directly uses initialAvailableSlots.

  const percentage = maxSlots > 0 ? (initialAvailableSlots / maxSlots) * 100 : 0;
  const currentAvailableSlots = initialAvailableSlots < 0 ? 0 : initialAvailableSlots; // Ensure it doesn't go below 0

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <p className={cn(
          "text-sm font-medium transition-colors duration-300", // Removed scale animation trigger for simplicity
          currentAvailableSlots === 0 ? "text-destructive" : "text-foreground"
        )}>
          Teams Available: {currentAvailableSlots}/{maxSlots}
        </p>
        {currentAvailableSlots === 0 && <span className="text-xs text-destructive font-semibold">FULL</span>}
      </div>
      <Progress value={percentage} className="h-3 transition-all duration-500 ease-out" 
        indicatorClassName={ // Ensure correct property name for Radix Progress
          currentAvailableSlots === 0 ? "bg-destructive" : 
          percentage < 25 ? "bg-orange-500" : 
          percentage < 50 ? "bg-yellow-500" : 
          "bg-primary"
        }
      />
    </div>
  );
}
