'use client';

import Link from 'next/link';
import { NexusLogo } from '@/components/icons/NexusLogo';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Menu, X, Home, Trophy, Shield, Info, LayoutDashboard, Ticket, History, Settings as SettingsIcon, UserPlus, LogIn } from 'lucide-react';
import { usePathname } from 'next/navigation';
import React from 'react';
import { cn } from '@/lib/utils';

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
  { href: '/register', label: 'Register', icon: UserPlus },
  { href: '/admin/login', label: 'Admin Login', icon: LogIn },
];

const NavLink = ({ href, label, icon: Icon, closeMenu, isActive }: { href: string; label: string; icon: React.ElementType; closeMenu?: () => void; isActive: boolean }) => (
  <Link
    href={href}
    onClick={closeMenu}
    className={cn(
      `flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap`,
      isActive
        ? 'bg-primary/10 text-primary' // Active link styling
        : 'text-foreground/70 hover:text-foreground hover:bg-primary/5'
    )}
  >
    <Icon className={cn('w-5 h-5', isActive ? 'icon-glow-primary' : 'text-primary/80 group-hover:text-primary')} />
    <span>{label}</span>
  </Link>
);

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const checkIsActive = (href: string) => {
    if (href === '/') return pathname === href;
    return pathname.startsWith(href);
  };

  const renderNavLinks = (items: Array<{ href: string; label: string; icon: React.ElementType }>, closeMenu?: () => void) =>
    items.map((item) => <NavLink key={item.href} {...item} isActive={checkIsActive(item.href)} closeMenu={closeMenu} />);

  const allNavLinksForMobile = [
    ...mainNavItems,
    ...userNavItems,
    ...authNavItems,
  ];

  return (
    <header className="py-3 border-b border-border/50 shadow-sm bg-background/90 backdrop-blur-md sticky top-0 z-30 h-16 flex items-center">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <NexusLogo className="h-10 w-auto text-primary" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {renderNavLinks(mainNavItems)}
          <div className="w-px h-6 bg-border/50 mx-1 opacity-50"></div> {/* Separator */}
          {renderNavLinks(userNavItems)}
          <div className="w-px h-6 bg-border/50 mx-1 opacity-50"></div> {/* Separator */}
          {renderNavLinks(authNavItems)}
        </nav>

        {/* Mobile Navigation Trigger */}
        <div className="md:hidden">
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
                <div className="my-2 border-t border-border/50"></div>
                <h3 className="px-3 pt-2 pb-1 text-xs font-semibold uppercase text-muted-foreground tracking-wider">Account</h3>
                {renderNavLinks(userNavItems, () => setMobileMenuOpen(false))}
                <div className="my-2 border-t border-border/50"></div>
                <h3 className="px-3 pt-2 pb-1 text-xs font-semibold uppercase text-muted-foreground tracking-wider">Auth</h3>
                {renderNavLinks(authNavItems, () => setMobileMenuOpen(false))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
