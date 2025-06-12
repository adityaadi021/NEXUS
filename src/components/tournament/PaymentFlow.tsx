"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import type { Tournament } from '@/lib/types';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { CheckCircle, AlertTriangle, QrCode, Copy, Loader2 } from 'lucide-react';
import { handleSuccessfulBookingAction } from '@/lib/actions'; // Import the server action

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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

const paymentFormSchema = z.object({
  transactionId: z.string().min(10, { message: "Please enter a valid Transaction ID (e.g., UPI Transaction ID)." }),
});

type PaymentFormValues = z.infer<typeof paymentFormSchema>;

interface PaymentFlowProps {
  tournament: Tournament;
}

export function PaymentFlow({ tournament }: PaymentFlowProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'processing' | 'success' | 'failed'>('pending');
  const [bookingData, setBookingData] = useState<any>(null);

  // Get UPI ID from environment variable
  const upiId = process.env.NEXT_PUBLIC_UPI_ID || "nexusslots@upi";

  useEffect(() => {
    // Retrieve booking data from session storage
    const storedData = sessionStorage.getItem('bookingData');
    if (storedData) {
      try {
        const data = JSON.parse(storedData);
        // Check if the booking data is for this tournament
        if (data.tournamentId === tournament.id) {
          // Check if the booking is still valid (within 30 minutes)
          const bookingTime = new Date(data.timestamp);
          const now = new Date();
          const diffInMinutes = (now.getTime() - bookingTime.getTime()) / (1000 * 60);
          
          if (diffInMinutes > 30) {
            toast({
              title: "Booking Expired",
              description: "Your booking session has expired. Please start over.",
              variant: "destructive",
            });
            router.push(`/tournaments/${tournament.id}/book`);
            return;
          }
          
          setBookingData(data);
        } else {
          throw new Error("Invalid booking data");
        }
      } catch (error) {
        console.error("Error parsing booking data:", error);
        toast({
          title: "Invalid Booking",
          description: "Please start the booking process again.",
          variant: "destructive",
        });
        router.push(`/tournaments/${tournament.id}/book`);
      }
    } else {
      toast({
        title: "No Booking Data",
        description: "Please complete the booking form first.",
        variant: "destructive",
      });
      router.push(`/tournaments/${tournament.id}/book`);
    }
  }, [tournament.id, router, toast]);

  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
      transactionId: "",
    },
  });

  const handleConfirmPayment = async (values: PaymentFormValues) => {
    if (paymentStatus === 'processing') return;
    setPaymentStatus('processing');

    try {
      // Verify payment with backend
      const response = await fetch('/api/tournaments/verify-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tournamentId: tournament.id,
          transactionId: values.transactionId,
          bookingData,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Payment verification failed');
      }

      if (result.success) {
        // Clear booking data from session storage
        sessionStorage.removeItem('bookingData');
        
        setPaymentStatus('success');
        toast({
          title: "Payment Successful!",
          description: `Your slot for ${tournament.name} is confirmed. Slots remaining: ${result.newSlotCount}`,
        });

        // Redirect to confirmation page after a short delay
        setTimeout(() => {
          router.push(`/tournaments/${tournament.id}/confirmation`);
        }, 2000);
      } else {
        throw new Error(result.error || 'Payment verification failed');
      }
    } catch (error) {
      console.error("Payment error:", error);
      setPaymentStatus('failed');
      toast({
        title: "Payment Failed",
        description: error instanceof Error ? error.message : "Could not verify payment. Please try again or contact support.",
        variant: "destructive",
      });
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(upiId).then(() => {
      toast({ 
        title: "UPI ID Copied!", 
        description: upiId,
      });
    }).catch(err => {
      console.error('Failed to copy:', err);
      toast({ 
        title: "Failed to copy", 
        description: "Please copy the UPI ID manually",
        variant: "destructive",
      });
    });
  };

  if (!bookingData) {
    return (
      <div className="text-center py-8">
        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
        <p>Loading booking details...</p>
      </div>
    );
  }

  return (
    <Card className="shadow-xl">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Complete Payment</CardTitle>
        <CardDescription>
          Follow these steps to complete your tournament registration
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Payment Steps */}
        <div className="space-y-4">
          <div className="flex items-start gap-4 p-4 bg-card rounded-lg border">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-primary font-semibold">1</span>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Send Payment</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Send ₹{tournament.entryFee} to our UPI ID
              </p>
              <div className="flex items-center gap-2">
                <code className="px-2 py-1 bg-muted rounded text-sm">{upiId}</code>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyToClipboard}
                  className="flex-shrink-0"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-card rounded-lg border">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-primary font-semibold">2</span>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Enter Transaction ID</h3>
              <p className="text-sm text-muted-foreground mb-4">
                After payment, enter the transaction ID from your payment app
              </p>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleConfirmPayment)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="transactionId"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Enter transaction ID"
                            {...field}
                            disabled={paymentStatus === 'processing' || paymentStatus === 'success'}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={paymentStatus === 'processing' || paymentStatus === 'success'}
                  >
                    {paymentStatus === 'processing' ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Verifying Payment...
                      </>
                    ) : paymentStatus === 'success' ? (
                      <>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Payment Verified
                      </>
                    ) : (
                      'Verify Payment'
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>

        {/* Payment Status */}
        {paymentStatus === 'failed' && (
          <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
            <h3 className="font-semibold text-destructive mb-1">Payment Verification Failed</h3>
            <p className="text-sm text-muted-foreground">
              Please check your transaction ID and try again. If the problem persists, contact support.
            </p>
          </div>
        )}

        {/* Booking Summary */}
        <div className="p-4 bg-card rounded-lg border">
          <h3 className="font-semibold mb-2">Booking Summary</h3>
          <dl className="space-y-1 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Tournament:</dt>
              <dd>{tournament.name}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Team Name:</dt>
              <dd>{bookingData.teamName}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Team Size:</dt>
              <dd className="capitalize">{bookingData.teamSize}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Entry Fee:</dt>
              <dd>₹{tournament.entryFee}</dd>
            </div>
          </dl>
        </div>
      </CardContent>
    </Card>
  );
}
