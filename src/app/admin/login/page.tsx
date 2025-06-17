'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Loader2, Shield } from 'lucide-react';
import Link from 'next/link';
import { z } from 'zod';

// Validation schema
const loginSchema = z.object({
  email: z.string()
    .email('Please enter a valid email address')
    .min(1, 'Email is required'),
  password: z.string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters long'),
});

export default function AdminLoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [formErrors, setFormErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  useEffect(() => {
    setMounted(true);
    // Check if already logged in
    const token = localStorage.getItem('token');
    if (token) {
      checkAuthStatus(token);
    }
  }, []);

  const checkAuthStatus = async (token: string) => {
    try {
      const response = await fetch('/api/auth/verify', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.isAdmin) {
          router.push('/admin/dashboard');
        }
      }
    } catch (error) {
      console.error('Auth check error:', error);
      localStorage.removeItem('token');
    }
  };

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

      console.log('Attempting admin login...');
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validatedData),
      });

      console.log('Login response status:', response.status);
      const data = await response.json();
      console.log('Login response data:', data);

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      if (!data.token) {
        throw new Error('No token received');
      }

      if (!data.user?.isAdmin) {
        throw new Error('Access denied. Admin privileges required.');
      }

      // Store the token only after successful login
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', data.token);
      }

      toast.success('Login successful');
      router.push('/admin/dashboard');
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

  if (!mounted) {
    return null; // Prevent hydration mismatch
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-[#000000] border border-[#23243a] shadow-lg">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Shield className="h-8 w-8 text-[#a259ff]" />
            <h1 className="text-3xl font-extrabold text-center text-[#a259ff] drop-shadow-[0_0_10px_#a259ff] tracking-widest">
              ADMIN LOGIN
            </h1>
          </div>
          <CardDescription className="text-center text-gray-300 mb-4">
            Enter your admin credentials to access the dashboard.
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
                placeholder="admin@nexus.com"
                className={`bg-[#181924] border ${
                  formErrors.email ? 'border-red-500' : 'border-[#23243a]'
                } text-white placeholder:text-gray-400 focus:border-[#a259ff] focus:ring-[#a259ff]`}
                disabled={isLoading}
                required
                autoComplete="email"
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
                autoComplete="current-password"
              />
              {formErrors.password && (
                <p className="text-sm text-red-500">{formErrors.password}</p>
              )}
            </div>
            <Button 
              type="submit" 
              className="w-full bg-[#a259ff] hover:bg-[#8e44ec] text-white text-lg font-bold rounded-lg transition-all duration-200 shadow-[0_0_10px_#a259ff]"
              disabled={isLoading}
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
          </form>
          
          <div className="mt-4 text-center">
            <Link 
              href="/login" 
              className="text-sm text-gray-400 hover:text-[#a259ff] transition-colors"
            >
              Back to regular login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
