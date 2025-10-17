import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FileQuestion } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="container max-w-md text-center">
        <div className="flex justify-center mb-6">
          <div className="rounded-full bg-primary/10 p-6">
            <FileQuestion className="w-12 h-12 text-primary" />
          </div>
        </div>

        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>

        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="flex gap-4 justify-center">
          <Button size="lg" asChild>
            <Link href="/">Go to Homepage</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/#languages">Browse Languages</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
