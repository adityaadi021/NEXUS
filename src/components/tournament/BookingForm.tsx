"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import type { Tournament } from "@/lib/types";
import { User, Users, Mail, Gamepad, MessageSquare, Instagram, Youtube } from "lucide-react";
import { handleSuccessfulBookingAction } from '@/lib/actions';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";

const bookingFormSchema = z.object({
  playerName: z.string().min(2, {
    message: "Player name must be at least 2 characters.",
  }),
  ign: z.string().min(2, {
    message: "In-Game Name (IGN) must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  teamName: z.string().min(2, { message: "Team Name is required." }),
  teamSize: z.enum(['solo', 'duo', 'squad'], {
    required_error: "Please select your team size.",
  }),
  player2Name: z.string().optional(),
  player3Name: z.string().optional(),
  player4Name: z.string().optional(),
  player5Name: z.string().optional(),
  player6Name: z.string().optional(),
}).refine((data) => {
  // Validate team size requirements
  switch (data.teamSize) {
    case 'solo':
      return true; // Only player1 is required
    case 'duo':
      return !!data.player2Name; // player1 + player2 required
    case 'squad':
      return !!data.player2Name && !!data.player3Name && !!data.player4Name && !!data.player5Name; // All 5 players required
    default:
      return false;
  }
}, {
  message: "Please fill in all required team member names based on your team size.",
  path: ["teamSize"], // This will show the error on the teamSize field
});

type BookingFormValues = z.infer<typeof bookingFormSchema>;

interface BookingFormProps {
  tournament: Tournament;
}

export function BookingForm({ tournament }: BookingFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      playerName: "",
      ign: "",
      email: "",
      teamName: "",
      teamSize: "squad", // Default to squad
      player2Name: "",
      player3Name: "",
      player4Name: "",
      player5Name: "",
      player6Name: "",
    },
  });

  const teamSize = form.watch("teamSize");

  async function onSubmit(data: BookingFormValues) {
    if (isSubmitting) return; // Prevent double submission
    setIsSubmitting(true);

    try {
      // Validate slot availability first
      const response = await fetch(`/api/tournaments/${tournament.id}/check-availability`);
      const { available } = await response.json();

      if (!available) {
        toast({
          title: "Slot Unavailable",
          description: "This slot was just taken. Please try another tournament.",
          variant: "destructive",
        });
        router.refresh(); // Refresh to get updated slot count
        return;
      }

      if (tournament.entryFee === 0) {
        const result = await handleSuccessfulBookingAction(tournament.id);
        if (result.success) {
          toast({
            title: "Slot Reserved!",
            description: `Your slot for ${tournament.name} is confirmed.`,
          });
          router.push(`/tournaments/${tournament.id}/confirmation?free=true`);
        } else {
          throw new Error(result.error || "Could not reserve slot");
        }
      } else {
        // Store booking data in session storage for payment page
        sessionStorage.setItem('bookingData', JSON.stringify({
          tournamentId: tournament.id,
          ...data,
          timestamp: new Date().toISOString(),
        }));
        router.push(`/tournaments/${tournament.id}/payment`);
      }
    } catch (error) {
      console.error("Booking error:", error);
      toast({
        title: "Booking Failed",
        description: error instanceof Error ? error.message : "Could not process your booking. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSubmitting) {
    return (
      <div className="text-center space-y-6">
        <h3 className="font-headline text-2xl text-neon-primary">Processing...</h3>
        <p className="text-muted-foreground">Please wait while we process your booking.</p>
        <Button 
          onClick={() => router.push('/tournaments')} 
          className="mt-8 font-headline text-lg py-6" 
          size="lg"
          disabled={isSubmitting}
        >
          Back to Tournaments
        </Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="playerName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2"><User className="w-4 h-4 text-primary" />Player 1 Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter player 1's full name" {...field} />
              </FormControl>
              <FormDescription>This name will be used for registration.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ign"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2"><Gamepad className="w-4 h-4 text-primary" />In-Game Name (IGN)</FormLabel>
              <FormControl>
                <Input placeholder="Your Free Fire IGN" {...field} />
              </FormControl>
              <FormDescription>Your unique name in Free Fire.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2"><Mail className="w-4 h-4 text-primary" />Email Address</FormLabel>
              <FormControl>
                <Input type="email" placeholder="your.email@example.com" {...field} />
              </FormControl>
              <FormDescription>We'll send booking confirmation here.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="teamSize"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                Team Size
              </FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select team size" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="solo">Solo (1 Player)</SelectItem>
                  <SelectItem value="duo">Duo (2 Players)</SelectItem>
                  <SelectItem value="squad">Squad (5 Players)</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Choose your team size for this tournament
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="teamName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                Team Name
              </FormLabel>
              <FormControl>
                <Input placeholder="Your team's name" {...field} />
              </FormControl>
              <FormDescription>
                {teamSize === 'solo' ? 'Your display name' : 'Your team name'}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {teamSize !== 'solo' && (
          <FormField
            control={form.control}
            name="player2Name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <User className="w-4 h-4 text-primary" />
                  Player 2 Name
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter player 2's full name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        {teamSize === 'squad' && (
          <>
            <FormField
              control={form.control}
              name="player3Name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <User className="w-4 h-4 text-primary" />
                    Player 3 Name
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter player 3's full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="player4Name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <User className="w-4 h-4 text-primary" />
                    Player 4 Name
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter player 4's full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="player5Name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <User className="w-4 h-4 text-primary" />
                    Player 5 Name
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter player 5's full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="player6Name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <User className="w-4 h-4 text-primary" />
                    Player 6 Name (Optional)
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter player 6's full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}
        <Button 
          type="submit" 
          className="w-full font-headline text-lg py-6" 
          size="lg"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            'Book Your Slot'
          )}
        </Button>
      </form>
    </Form>
  );
}
