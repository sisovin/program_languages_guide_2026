import Link from 'next/link';
import { Button } from '@/components/ui/button';
import LanguageCard from '@/components/LanguageCard';
import { api, Language } from '@/lib/api';
import { ArrowRight } from 'lucide-react';

export default async function Page() {
  // Fetch languages from API with error handling for build time
  let languages: Language[] = [];
  try {
    const response = await api.getLanguages({ limit: 10, sort: 'popularityIndex', order: 'desc' });
    languages = response.data;
  } catch (error) {
    // During build time or when API is unavailable, use fallback data
    // This prevents build failures while maintaining functionality
    console.warn('Failed to fetch languages for home page, using fallback data:', error);
    languages = [
      {
        id: 1,
        name: 'Python',
        description: 'Versatile programming language known for its simplicity and readability.',
        useCases: ['Web Development', 'Data Science', 'AI/ML'],
        advantages: ['Easy to learn', 'Large community', 'Extensive libraries'],
        salaryRange: { min: 70000, max: 150000, currency: 'USD' },
        popularityIndex: 95,
        releaseYear: 1991,
        logoUrl: '/logos/python.svg',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 2,
        name: 'JavaScript',
        description: 'The language of the web, powering both frontend and backend development.',
        useCases: ['Web Development', 'Mobile Apps', 'Server-side Development'],
        advantages: ['Ubiquitous', 'Fast execution', 'Rich ecosystem'],
        salaryRange: { min: 65000, max: 140000, currency: 'USD' },
        popularityIndex: 98,
        releaseYear: 1995,
        logoUrl: '/logos/javascript.svg',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 3,
        name: 'TypeScript',
        description: 'JavaScript with static typing for better code quality and developer experience.',
        useCases: ['Large-scale applications', 'Enterprise software', 'Frontend frameworks'],
        advantages: ['Type safety', 'Better IDE support', 'Scalable'],
        salaryRange: { min: 75000, max: 160000, currency: 'USD' },
        popularityIndex: 90,
        releaseYear: 2012,
        logoUrl: '/logos/typescript.svg',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
  }

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="container py-16 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Master the Top 10 Programming Languages of 2026
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Make informed career decisions with comprehensive guides, salary insights, and market trends
        </p>
        <div className="flex justify-center gap-4 mb-8">
          <Button size="lg" asChild>
            <Link href="#languages">Explore Languages</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/career-paths">View Career Paths</Link>
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 opacity-75 mt-8">
          {/* Display language logos */}
          {languages.slice(0, 5).map((lang: Language) => (
            <div key={lang.id} className="flex items-center justify-center p-4">
              <img src={lang.logoUrl} alt={lang.name} className="w-12 h-12 object-contain" />
            </div>
          ))}
        </div>
      </section>

      {/* Featured Languages Grid */}
      <section id="languages" className="container py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Top Programming Languages</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {languages.map((lang: Language) => (
            <LanguageCard key={lang.id} language={lang} />
          ))}
        </div>
      </section>

      {/* Key Statistics Section */}
      <section className="bg-muted py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-4xl font-bold mb-2">{languages.length} Languages</h3>
              <p className="text-muted-foreground">Covered</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold mb-2">$130,000+</h3>
              <p className="text-muted-foreground">Average Salary</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold mb-2">22%</h3>
              <p className="text-muted-foreground">Job Market Growth</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}