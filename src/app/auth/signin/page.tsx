import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Sign In | Top 10 Languages',
  description: 'Sign in to your account to access personalized features and track your learning progress.',
};

export default function SignInPage() {
  return (
    <div className="container mx-auto py-12">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            Sign In
          </h1>
          <p className="text-muted-foreground">
            Welcome back! Sign in to your account.
          </p>
        </div>

        <div className="bg-card border rounded-lg p-8">
          <p className="text-center text-muted-foreground mb-6">
            Authentication functionality coming soon.
          </p>

          <div className="space-y-4">
            <Button variant="outline" className="w-full" disabled>
              Sign in with Google
            </Button>
            <Button variant="outline" className="w-full" disabled>
              Sign in with GitHub
            </Button>
          </div>

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">Don't have an account? </span>
            <Link href="/auth/signup" className="text-primary hover:underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
