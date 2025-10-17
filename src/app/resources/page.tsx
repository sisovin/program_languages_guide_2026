import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Learning Resources | Top 10 Languages',
  description: 'Discover curated learning resources, tutorials, and tools for mastering programming languages.',
};

export default function ResourcesPage() {
  return (
    <div className="container mx-auto py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Learning Resources
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Access curated learning resources, tutorials, documentation, and tools to help you master programming languages.
        </p>

        <div className="bg-muted/50 rounded-lg p-8 text-center">
          <p className="text-muted-foreground">
            Content coming soon. Check back later for comprehensive learning resources.
          </p>
        </div>
      </div>
    </div>
  );
}
