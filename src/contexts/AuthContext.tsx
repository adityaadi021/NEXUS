'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

interface User {
  email: string;
  username: string;
  isAdmin: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (token: string, userData: User) => void;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const checkAuth = async () => {
    try {
      const token = Cookies.get('token');
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      const response = await fetch('/api/auth/verify', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.user) {
          setUser(data.user);
        } else {
          setUser(null);
          Cookies.remove('token');
        }
      } else {
        setUser(null);
        Cookies.remove('token');
      }
    } catch (error) {
      console.error('Auth check error:', error);
      setUser(null);
      Cookies.remove('token');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = (token: string, userData: User) => {
    Cookies.set('token', token, { expires: 7 }); // Expires in 7 days
    setUser(userData);
  };

  const logout = () => {
    Cookies.remove('token');
    setUser(null);
    router.replace('/');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      isAuthenticated: !!user,
      login, 
      logout, 
      checkAuth 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 