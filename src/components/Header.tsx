import Link from 'next/link';
import { Code2, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { languages } from '@/data/languages';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 font-bold text-xl">
          <Code2 className="w-6 h-6" />
          <span>Top 10 Languages 2026</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link href="/" className="transition-colors hover:text-foreground/80">
            Home
          </Link>
          <Link href="/compare" className="transition-colors hover:text-foreground/80">
            Compare
          </Link>
          <Link href="/career-paths" className="transition-colors hover:text-foreground/80">
            Career Paths
          </Link>
          <ThemeSwitcher />
        </nav>

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeSwitcher />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col space-y-4 mt-8">
                <Link href="/" className="text-lg font-medium hover:text-primary transition-colors">
                  Home
                </Link>
                <Link href="/compare" className="text-lg font-medium hover:text-primary transition-colors">
                  Compare Languages
                </Link>
                <Link href="/career-paths" className="text-lg font-medium hover:text-primary transition-colors">
                  Career Paths
                </Link>
                <div className="pt-4 border-t">
                  <p className="text-sm font-semibold mb-3 text-muted-foreground">Languages</p>
                  <div className="flex flex-col space-y-2">
                    {languages.map((lang) => (
                      <Link
                        key={lang.id}
                        href={`/language/${lang.id}`}
                        className="text-sm hover:text-primary transition-colors pl-2"
                      >
                        {lang.icon} {lang.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
