'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle, Home, RefreshCw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Error boundary caught:', error);

    // Send to external error tracking (Sentry, etc.)
    if (typeof window !== 'undefined' && (window as any).Sentry) {
      (window as any).Sentry.captureException(error, {
        tags: {
          errorBoundary: 'app-error',
          digest: error.digest,
        },
      });
    }
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="container max-w-md text-center">
        <div className="flex justify-center mb-6">
          <div className="rounded-full bg-destructive/10 p-6">
            <AlertCircle className="w-12 h-12 text-destructive" />
          </div>
        </div>

        <h1 className="text-4xl font-bold mb-4">Something went wrong!</h1>

        <p className="text-muted-foreground mb-8">
          We encountered an error while loading this page. This could be due to a temporary issue.
        </p>

        {error.message && (
          <div className="bg-muted p-4 rounded-lg mb-8 text-left">
            <p className="text-sm font-mono text-muted-foreground break-all">
              {error.message}
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={() => reset()} size="lg" className="gap-2">
            <RefreshCw className="w-4 h-4" />
            Try again
          </Button>
          <Button variant="outline" size="lg" asChild className="gap-2">
            <a href="/">
              <Home className="w-4 h-4" />
              Go home
            </a>
          </Button>
        </div>

        {error.digest && (
          <p className="text-xs text-muted-foreground mt-8">
            Error ID: {error.digest}
          </p>
        )}
      </div>
    </div>
  );
}
