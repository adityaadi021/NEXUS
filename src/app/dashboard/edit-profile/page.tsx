"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Loader2, ArrowLeft } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const profileSchema = z.object({
  username: z.string().min(3, { message: "Username must be at least 3 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  // Add more fields as needed for profile editing
  // e.g., fullName: z.string().optional(),
  //       ign: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function EditProfilePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // In a real application, you would fetch the user's current profile data here
  // For now, we'll use mock data
  const mockUserProfile = {
    username: "PlayerOne",
    email: "player.one@example.com",
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: mockUserProfile,
  });

  async function onSubmit(values: ProfileFormValues) {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      // Simulate API call to update profile
      console.log("Updating profile:", values);
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate network delay

      // In a real application, you would send this to a backend API
      // const response = await fetch('/api/user/profile', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(values),
      // });
      // const result = await response.json();
      // if (!response.ok) {
      //   throw new Error(result.error || "Failed to update profile");
      // }

      toast({
        title: "Profile Updated!",
        description: "Your profile details have been successfully updated.",
      });
      router.push('/dashboard'); // Redirect back to dashboard

    } catch (error) {
      console.error("Profile update error:", error);
      toast({
        title: "Profile Update Failed",
        description: error instanceof Error ? error.message : "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 flex flex-col flex-grow items-center justify-center">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="font-headline text-3xl text-neon-primary">Edit Your Profile</CardTitle>
          <CardDescription className="text-muted-foreground">
            Update your personal and gaming details here.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="username" className="text-foreground">Username</FormLabel>
                    <FormControl>
                      <Input id="username" placeholder="Your username" type="text" className="mt-1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="email" className="text-foreground">Email Address</FormLabel>
                    <FormControl>
                      <Input id="email" placeholder="your.email@example.com" type="email" className="mt-1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Add more fields here as needed */}
              <Button
                type="submit"
                className="w-full font-headline text-lg py-3"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </Button>
            </form>
          </Form>
          <div className="text-center mt-4">
            <Button variant="link" asChild className="p-0 h-auto text-accent hover:underline">
              <Link href="/dashboard">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 