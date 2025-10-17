'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Menu, Code2 } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ThemeSwitcher } from './theme-switcher';

const navigationItems = [
  { name: 'Home', href: '/', ariaLabel: 'Go to homepage' },
  { name: 'Languages', href: '/languages', ariaLabel: 'Browse programming languages' },
  { name: 'Career Paths', href: '/career-paths', ariaLabel: 'Explore career paths' },
  { name: 'Compare', href: '/compare', ariaLabel: 'Select Programming lanage to compare' },
  { name: 'Trends', href: '/trends', ariaLabel: 'View industry trends' },
  { name: 'Resources', href: '/resources', ariaLabel: 'Access learning resources' },
];

export function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <header
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      role="banner"
    >
      <div className="container mx-auto">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Left: Logo & Branding */}
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md px-2 py-1 -ml-2"
              aria-label="Top 10 Programming Languages - Home"
            >
              <Code2 className="h-6 w-6 text-primary" aria-hidden="true" />
              <span className="text-lg font-bold hidden sm:inline-block">
                Top 10 Languages
              </span>
              <span className="text-lg font-bold sm:hidden">
                Top 10
              </span>
            </Link>
          </div>

          {/* Center: Navigation (Desktop) */}
          <nav
            className="hidden lg:flex items-center justify-center flex-1"
            role="navigation"
            aria-label="Main navigation"
          >
            <ul className="flex items-center gap-1">
              {navigationItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      'text-sm font-medium transition-colors px-3 py-2 rounded-md',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                      'hover:text-primary hover:bg-accent',
                      isActive(item.href)
                        ? 'text-primary bg-accent'
                        : 'text-muted-foreground'
                    )}
                    aria-label={item.ariaLabel}
                    aria-current={isActive(item.href) ? 'page' : undefined}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right: Theme Toggle & Auth Buttons */}
          <div className="flex items-center gap-2">
            {/* Theme Switcher */}
            <ThemeSwitcher />

            {/* Auth Buttons (Hidden on small screens) */}
            <div className="hidden sm:flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                asChild
                aria-label="Sign in to your account"
              >
                <Link href="/signin">Sign In</Link>
              </Button>
              <Button
                size="sm"
                asChild
                aria-label="Create a new account"
              >
                <Link href="/signup">Sign Up</Link>
              </Button>
            </div>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button
                  variant="ghost"
                  size="sm"
                  className="px-2"
                  aria-label="Open navigation menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[320px]">
                <div className="flex flex-col gap-6 py-6">
                  {/* Mobile Navigation */}
                  <nav
                    role="navigation"
                    aria-label="Mobile navigation"
                    className="flex flex-col gap-2"
                  >
                    {navigationItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          'text-sm font-medium transition-colors px-4 py-3 rounded-md',
                          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                          'hover:text-primary hover:bg-accent',
                          isActive(item.href)
                            ? 'text-primary bg-accent'
                            : 'text-muted-foreground'
                        )}
                        aria-label={item.ariaLabel}
                        aria-current={isActive(item.href) ? 'page' : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </nav>

                  {/* Mobile Auth Buttons */}
                  <div className="flex flex-col gap-2 pt-4 border-t">
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="w-full"
                      onClick={() => setIsOpen(false)}
                    >
                      <Link href="/signin">Sign In</Link>
                    </Button>
                    <Button
                      size="sm"
                      asChild
                      className="w-full"
                      onClick={() => setIsOpen(false)}
                    >
                      <Link href="/signup">Sign Up</Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
