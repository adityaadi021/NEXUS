"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { z } from 'zod';

// Validation schema
const registerSchema = z.object({
  username: z.string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be less than 20 characters'),
  email: z.string()
    .email('Please enter a valid email address')
    .min(1, 'Email is required'),
  password: z.string()
    .min(6, 'Password must be at least 6 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  confirmPassword: z.string()
    .min(1, 'Please confirm your password')
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<{
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setFormErrors({});

    const formData = new FormData(e.currentTarget);
    const data = {
      username: formData.get('username') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      confirmPassword: formData.get('confirmPassword') as string,
    };

    try {
      // Validate input
      const validatedData = registerSchema.parse(data);

      console.log('Attempting registration...');
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validatedData),
      });

      console.log('Registration response status:', response.status);
      const responseData = await response.json();
      console.log('Registration response data:', responseData);

      if (!response.ok) {
        throw new Error(responseData.error || 'Registration failed');
      }

      toast.success('Registration successful! Please log in.');
      router.push('/login');
    } catch (error) {
      console.error('Registration error:', error);
      
      if (error instanceof z.ZodError) {
        const errors: { [key: string]: string } = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            errors[err.path[0] as string] = err.message;
          }
        });
        setFormErrors(errors);
        toast.error('Please fix the form errors');
      } else {
        toast.error('Registration failed', {
          description: error instanceof Error ? error.message : 'Please try again',
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-[#000000] border border-[#23243a] shadow-lg">
        <CardHeader className="space-y-1">
          <h1 className="text-3xl font-extrabold text-center text-[#a259ff] drop-shadow-[0_0_10px_#a259ff] tracking-widest mb-2">
            REGISTER
          </h1>
          <CardDescription className="text-center text-gray-300 mb-4">
            Create your account to get started.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="username" className="block text-white font-semibold">Username</label>
              <Input
                id="username"
                type="text"
                name="username"
                placeholder="Enter your username"
                className={`bg-[#181924] border ${
                  formErrors.username ? 'border-red-500' : 'border-[#23243a]'
                } text-white placeholder:text-gray-400 focus:border-[#a259ff] focus:ring-[#a259ff]`}
                disabled={isLoading}
                required
                minLength={3}
                maxLength={20}
                suppressHydrationWarning
              />
              {formErrors.username && (
                <p className="text-sm text-red-500">{formErrors.username}</p>
              )}
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="block text-white font-semibold">Email Address</label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="your.email@example.com"
                className={`bg-[#181924] border ${
                  formErrors.email ? 'border-red-500' : 'border-[#23243a]'
                } text-white placeholder:text-gray-400 focus:border-[#a259ff] focus:ring-[#a259ff]`}
                disabled={isLoading}
                required
                suppressHydrationWarning
              />
              {formErrors.email && (
                <p className="text-sm text-red-500">{formErrors.email}</p>
              )}
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="block text-white font-semibold">Password</label>
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="Enter your password"
                className={`bg-[#181924] border ${
                  formErrors.password ? 'border-red-500' : 'border-[#23243a]'
                } text-white placeholder:text-gray-400 focus:border-[#a259ff] focus:ring-[#a259ff]`}
                disabled={isLoading}
                required
                minLength={6}
                suppressHydrationWarning
              />
              {formErrors.password && (
                <p className="text-sm text-red-500">{formErrors.password}</p>
              )}
              <p className="text-xs text-gray-400">
                Password must contain at least 6 characters, one uppercase letter, one lowercase letter, and one number.
              </p>
            </div>
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-white font-semibold">Confirm Password</label>
              <Input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                className={`bg-[#181924] border ${
                  formErrors.confirmPassword ? 'border-red-500' : 'border-[#23243a]'
                } text-white placeholder:text-gray-400 focus:border-[#a259ff] focus:ring-[#a259ff]`}
                disabled={isLoading}
                required
                suppressHydrationWarning
              />
              {formErrors.confirmPassword && (
                <p className="text-sm text-red-500">{formErrors.confirmPassword}</p>
              )}
            </div>
            <Button 
              type="submit" 
              className="w-full bg-[#a259ff] hover:bg-[#8e44ec] text-white text-lg font-bold rounded-lg transition-all duration-200 shadow-[0_0_10px_#a259ff]"
              disabled={isLoading}
              suppressHydrationWarning
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating Account...
                </>
              ) : (
                'REGISTER'
              )}
            </Button>
          </form>
          
          <div className="mt-4 text-center">
            <Link 
              href="/login" 
              className="text-sm text-gray-400 hover:text-[#a259ff] transition-colors"
            >
              Already have an account? Log in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
