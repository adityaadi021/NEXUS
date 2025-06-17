"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { z } from 'zod';
import { useAuth } from '@/contexts/AuthContext';
import Cookies from 'js-cookie';

// Validation schema
const loginSchema = z.object({
  email: z.string()
    .email('Please enter a valid email address')
    .min(1, 'Email is required'),
  password: z.string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters long'),
});

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated, user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  // Check if user is already logged in
  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.isAdmin) {
        router.replace('/admin/dashboard');
      } else {
        router.replace('/dashboard');
      }
    }
  }, [isAuthenticated, user, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setFormErrors({});

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      // Validate input
      const validatedData = loginSchema.parse({ email, password });

      console.log('Attempting login...');
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(validatedData),
      });console.log('Login response status:', response.status);
      
      // Check content type
      const contentType = response.headers.get('content-type');
      console.log('Response content type:', contentType);
      
      if (!contentType?.includes('application/json')) {
        const text = await response.text();
        console.error('Non-JSON response received:', text);
        throw new Error('Server returned invalid response format');
      }

      const data = await response.json();
      console.log('Login response data:', { ...data, token: '[REDACTED]' });

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      if (!data.token) {
        throw new Error('No token received');
      }

      // Store token in cookie
      Cookies.set('token', data.token, { expires: 7 }); // Expires in 7 days

      // Use the login function from AuthContext
      login(data.token, data.user);
      toast.success('Login successful!');
      
      // Redirect based on user type
      if (data.user.isAdmin) {
        router.replace('/admin/dashboard');
      } else {
        router.replace('/dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
      
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
        toast.error('Login failed', {
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
            LOGIN
          </h1>
          <CardDescription className="text-center text-gray-300 mb-4">
            Enter your credentials to access your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
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
                suppressHydrationWarning
              />
              {formErrors.password && (
                <p className="text-sm text-red-500">{formErrors.password}</p>
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
                  Logging in...
                </>
              ) : (
                'LOGIN'
              )}
            </Button>
            <p className="text-center text-gray-400 mt-4">
              Don't have an account?{' '}
              <Link href="/register" className="text-[#a259ff] hover:text-[#8e44ec]">
                Register here
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 