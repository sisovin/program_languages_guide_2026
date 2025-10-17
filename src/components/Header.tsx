import Link from 'next/link';
import { Button } from './ui/button';

export function Header() {
  return (
    <header
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      role="banner"
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-md"
            aria-label="Top 10 Programming Languages - Home"
          >
            <span className="text-xl font-bold">Top 10 Languages</span>
          </Link>

          <nav
            className="hidden md:flex items-center gap-6"
            role="navigation"
            aria-label="Main navigation"
          >
            <Link
              href="/"
              className="text-sm font-medium transition-colors hover:text-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-md px-2 py-1"
              aria-label="Browse programming languages"
            >
              Languages
            </Link>
            <Link
              href="/career-paths"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-md px-2 py-1"
              aria-label="Explore career paths"
            >
              Career Paths
            </Link>
            <Link
              href="/compare"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-md px-2 py-1"
              aria-label="Compare programming languages"
            >
              Compare
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            aria-label="Sign in to your account"
          >
            Sign In
          </Button>
        </div>
      </div>
    </header>
  );
}
