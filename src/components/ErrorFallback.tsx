'use client';

import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

interface ErrorFallbackProps {
  error?: Error;
  resetErrorBoundary?: () => void;
  message?: string;
}

export function ErrorFallback({
  error,
  resetErrorBoundary,
  message = "Something went wrong while loading this content."
}: ErrorFallbackProps) {
  return (
    <Alert variant="destructive" className="my-6">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription className="mt-2">
        <p className="mb-4">{message}</p>
        {error && (
          <p className="text-sm font-mono bg-background/50 p-2 rounded mb-4">
            {error.message}
          </p>
        )}
        {resetErrorBoundary && (
          <Button
            variant="outline"
            size="sm"
            onClick={resetErrorBoundary}
          >
            Try again
          </Button>
        )}
      </AlertDescription>
    </Alert>
  );
}

export function LoadingSpinner({ className }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center ${className || 'py-12'}`}>
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  );
}

export function EmptyState({
  title = "No data available",
  description = "There's nothing to display here yet.",
  icon: Icon = AlertCircle,
  action
}: {
  title?: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
  action?: React.ReactNode;
}) {
  return (
    <div className="text-center py-12">
      <div className="flex justify-center mb-4">
        <div className="rounded-full bg-muted p-6">
          <Icon className="w-8 h-8 text-muted-foreground" />
        </div>
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">{description}</p>
      {action}
    </div>
  );
}
