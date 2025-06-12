<<<<<<< HEAD
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');
  const isLoginPage = request.nextUrl.pathname === '/admin/login';
  
  // Get the user from localStorage (this will be handled client-side)
  // The middleware can only access cookies, not localStorage
  // So we'll just let the client-side handle the auth check
  
  // If it's the login page, allow access
  if (isLoginPage) {
    return NextResponse.next();
  }

  // For other admin routes, we'll let the client-side handle the auth check
  // The AuthContext will handle redirects if needed
  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
=======
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');
  const isLoginPage = request.nextUrl.pathname === '/admin/login';
  
  // Get the user from localStorage (this will be handled client-side)
  // The middleware can only access cookies, not localStorage
  // So we'll just let the client-side handle the auth check
  
  // If it's the login page, allow access
  if (isLoginPage) {
    return NextResponse.next();
  }

  // For other admin routes, we'll let the client-side handle the auth check
  // The AuthContext will handle redirects if needed
  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
>>>>>>> d7d8dcd73d27280c474949a46ea638d0eaa5206e
}; 