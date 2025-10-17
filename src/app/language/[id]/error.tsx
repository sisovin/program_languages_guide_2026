'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Language page error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="container max-w-md text-center">
        <div className="flex justify-center mb-6">
          <div className="rounded-full bg-destructive/10 p-6">
            <AlertTriangle className="w-12 h-12 text-destructive" />
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-4">Failed to Load Language</h1>

        <p className="text-muted-foreground mb-8">
          We couldn't load the details for this programming language. The language may not exist or there might be a temporary connection issue.
        </p>

        <div className="flex gap-4 justify-center flex-wrap">
          <Button onClick={() => reset()}>
            Try again
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">View all languages</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
