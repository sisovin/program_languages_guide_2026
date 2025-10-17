import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Programming Language Trends | Top 10 Languages',
  description: 'Stay updated with the latest trends in programming languages, job market demand, and technology adoption.',
};

export default function TrendsPage() {
  return (
    <div className="container mx-auto py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Programming Language Trends
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Stay informed about the latest trends in programming languages, job market demand, and industry adoption.
        </p>

        <div className="bg-muted/50 rounded-lg p-8 text-center">
          <p className="text-muted-foreground">
            Content coming soon. Check back later for industry trends and insights.
          </p>
        </div>
      </div>
    </div>
  );
}
