'use client';

import Link from 'next/link';
import { NexusLogo } from '@/components/icons/NexusLogo';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Menu, X, Home, Trophy, Shield, Info, LayoutDashboard, Ticket, History, Settings as SettingsIcon, UserPlus, LogIn, LogOut } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

const mainNavItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/tournaments', label: 'Tournaments', icon: Trophy },
  { href: '/scrims', label: 'Scrims', icon: Shield },
  { href: '/about-us', label: 'About Us', icon: Info },
];

const userNavItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/your-slots', label: 'Your Slots', icon: Ticket },
  { href: '/payment-history', label: 'Payment History', icon: History },
];

const authNavItems = [
  { href: '/login', label: 'Login', icon: LogIn },
  { href: '/register', label: 'Register', icon: UserPlus },
];

const adminNavItems = [
  { href: '/admin/login', label: 'Admin', icon: Shield },
];

const NavLink = ({ href, label, icon: Icon, closeMenu, isActive }: { href: string; label: string; icon: React.ElementType; closeMenu?: () => void; isActive: boolean }) => (
  <Link
    href={href}
    onClick={closeMenu}
    className={cn(
      `flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200`,
      isActive
        ? 'text-primary hover:bg-primary/10'
        : 'text-muted-foreground hover:text-foreground hover:bg-accent/5'
    )}
  >
    <Icon className={cn(
      'w-5 h-5 transition-colors duration-200',
      isActive
        ? 'text-primary'
        : 'text-muted-foreground group-hover:text-foreground'
    )} />
    {label && <span>{label}</span>}
  </Link>
);

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const checkIsActive = (href: string) => {
    if (href === '/') return pathname === href;
    return pathname.startsWith(href);
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const renderNavLinks = (items: Array<{ href: string; label: string; icon: React.ElementType }>, closeMenu?: () => void) =>
    items.map((item) => <NavLink key={item.href} {...item} isActive={checkIsActive(item.href)} closeMenu={closeMenu} />);

  if (!mounted) {
    return (    <header className="nexus-header sticky top-0 z-30 h-16 flex items-center">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <NexusLogo className="h-10 w-auto text-primary" />
        </Link>
      </div>
    </header>
    );
  }

  return (
    <header className="py-3 border-b border-border/50 shadow-sm bg-background/90 backdrop-blur-md sticky top-0 z-30 h-16 flex items-center">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <NexusLogo className="h-10 w-auto text-primary" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 overflow-x-auto [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-muted-foreground/20 hover:[&::-webkit-scrollbar-thumb]:bg-muted-foreground/40 transition-colors duration-200">
          <div className="flex items-center space-x-1 min-w-max">
            {renderNavLinks(mainNavItems)}
            {isAuthenticated && (
              <>
                <div className="w-px h-6 bg-border/50 mx-1 opacity-50 shrink-0"></div>
                {renderNavLinks(userNavItems)}
              </>
            )}
            <div className="w-px h-6 bg-border/50 mx-1 opacity-50 shrink-0"></div>
            {isAuthenticated ? (
              <Button variant="ghost" className="ml-2 flex items-center gap-2" onClick={handleLogout}>
                <LogOut className="w-5 h-5" />
                <span className="hidden md:inline">Logout</span>
              </Button>
            ) : (
              <>
                {renderNavLinks(authNavItems)}
                <div className="w-px h-6 bg-border/50 mx-1 opacity-50 shrink-0"></div>
                {renderNavLinks(adminNavItems)}
              </>
            )}
          </div>
        </nav>

        {/* Mobile Navigation Trigger */}
        <div className="md:hidden shrink-0">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6 icon-glow-primary" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs bg-background p-0 flex flex-col">
              <div className="p-4 flex justify-between items-center border-b border-border/50">
                <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                  <NexusLogo className="h-8 w-auto" />
                </Link>
                <SheetClose asChild>
                  <Button variant="ghost" size="icon">
                    <X className="h-6 w-6" />
                    <span className="sr-only">Close menu</span>
                  </Button>
                </SheetClose>
              </div>
              <nav className="flex-grow p-4 space-y-1 overflow-y-auto">
                <h3 className="px-3 pt-2 pb-1 text-xs font-semibold uppercase text-muted-foreground tracking-wider">Main</h3>
                {renderNavLinks(mainNavItems, () => setMobileMenuOpen(false))}
                {isAuthenticated && (
                  <>
                    <div className="my-2 border-t border-border/50"></div>
                    <h3 className="px-3 pt-2 pb-1 text-xs font-semibold uppercase text-muted-foreground tracking-wider">Account</h3>
                    {renderNavLinks(userNavItems, () => setMobileMenuOpen(false))}
                  </>
                )}
                <div className="my-2 border-t border-border/50"></div>
                {isAuthenticated ? (
                  <Button variant="ghost" className="w-full flex items-center gap-2" onClick={() => { setMobileMenuOpen(false); handleLogout(); }}>
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </Button>
                ) : (
                  <>
                    <h3 className="px-3 pt-2 pb-1 text-xs font-semibold uppercase text-muted-foreground tracking-wider">Auth</h3>
                    {renderNavLinks(authNavItems, () => setMobileMenuOpen(false))}
                    <div className="my-2 border-t border-border/50"></div>
                    <h3 className="px-3 pt-2 pb-1 text-xs font-semibold uppercase text-muted-foreground tracking-wider">Admin</h3>
                    {renderNavLinks(adminNavItems, () => setMobileMenuOpen(false))}
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
