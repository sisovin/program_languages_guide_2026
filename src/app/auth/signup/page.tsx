import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Sign Up | Top 10 Languages',
  description: 'Create an account to unlock personalized features and track your programming language learning journey.',
};

export default function SignUpPage() {
  return (
    <div className="container mx-auto py-12">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            Create Account
          </h1>
          <p className="text-muted-foreground">
            Join us to track your learning progress and access exclusive features.
          </p>
        </div>

        <div className="bg-card border rounded-lg p-8">
          <p className="text-center text-muted-foreground mb-6">
            Registration functionality coming soon.
          </p>

          <div className="space-y-4">
            <Button variant="outline" className="w-full" disabled>
              Sign up with Google
            </Button>
            <Button variant="outline" className="w-full" disabled>
              Sign up with GitHub
            </Button>
          </div>

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">Already have an account? </span>
            <Link href="/auth/signin" className="text-primary hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
