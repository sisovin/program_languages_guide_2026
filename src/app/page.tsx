import Link from 'next/link';
import { Button } from '@/components/ui/button';
import LanguageCard from '@/components/LanguageCard';
import { api, Language } from '@/lib/api';
import { ArrowRight } from 'lucide-react';

export default async function Page() {
  // Fetch languages from API
  const response = await api.getLanguages({ limit: 10, sort: 'popularityIndex', order: 'desc' });
  const languages = response.data;

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