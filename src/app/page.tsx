import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import LanguageCard from '@/components/LanguageCard';
import { languages } from '@/data/languages';
import { ArrowRight, Code2, Sparkles, TrendingUp } from 'lucide-react';

export default function Page() {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b bg-gradient-to-b from-background to-secondary/20">
        <div className="container py-16 md:py-24">
          <div className="mx-auto max-w-4xl text-center space-y-6">
            <Badge className="mb-4" variant="secondary">
              <Sparkles className="w-3 h-3 mr-1" />
              Updated for 2026
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Top 10 Programming Languages
              <span className="block text-primary mt-2">to Learn in 2026</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover the most in-demand programming languages, explore career paths, 
              and make informed decisions about your tech journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="#languages">
                <Button size="lg" className="gap-2">
                  Explore Languages
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/compare">
                <Button size="lg" variant="outline" className="gap-2">
                  <Code2 className="w-4 h-4" />
                  Compare Languages
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container py-12 border-b">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center space-y-2">
            <div className="text-4xl font-bold text-primary">10</div>
            <p className="text-sm text-muted-foreground">Top Languages Analyzed</p>
          </div>
          <div className="text-center space-y-2">
            <div className="text-4xl font-bold text-primary">$125K</div>
            <p className="text-sm text-muted-foreground">Average Salary Range</p>
          </div>
          <div className="text-center space-y-2">
            <div className="text-4xl font-bold text-primary">4</div>
            <p className="text-sm text-muted-foreground">Tech Domains Covered</p>
          </div>
        </div>
      </section>

      {/* Domain Filter Info */}
      <section className="container py-12 border-b">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Languages by Domain</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20 border-2 border-blue-200 dark:border-blue-800 text-center">
              <div className="text-2xl mb-2">🌐</div>
              <p className="font-semibold text-blue-700 dark:text-blue-300">Web Development</p>
              <p className="text-xs text-muted-foreground mt-1">
                {languages.filter(l => l.domain === 'web').length} languages
              </p>
            </div>
            <div className="p-4 rounded-lg bg-purple-50 dark:bg-purple-950/20 border-2 border-purple-200 dark:border-purple-800 text-center">
              <div className="text-2xl mb-2">📱</div>
              <p className="font-semibold text-purple-700 dark:text-purple-300">Mobile Apps</p>
              <p className="text-xs text-muted-foreground mt-1">
                {languages.filter(l => l.domain === 'mobile').length} languages
              </p>
            </div>
            <div className="p-4 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border-2 border-emerald-200 dark:border-emerald-800 text-center">
              <div className="text-2xl mb-2">🤖</div>
              <p className="font-semibold text-emerald-700 dark:text-emerald-300">AI & Data</p>
              <p className="text-xs text-muted-foreground mt-1">
                {languages.filter(l => l.domain === 'ai').length} language
              </p>
            </div>
            <div className="p-4 rounded-lg bg-orange-50 dark:bg-orange-950/20 border-2 border-orange-200 dark:border-orange-800 text-center">
              <div className="text-2xl mb-2">⚙️</div>
              <p className="font-semibold text-orange-700 dark:text-orange-300">Systems</p>
              <p className="text-xs text-muted-foreground mt-1">
                {languages.filter(l => l.domain === 'system').length} languages
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Languages Grid */}
      <section id="languages" className="container py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Explore the Top 10 Languages
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Click on any language card to dive deep into its applications, advantages, 
            salary insights, and career opportunities.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {languages.map((language) => (
            <LanguageCard key={language.id} language={language} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-16 border-t">
        <div className="max-w-3xl mx-auto text-center space-y-6 p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/20 border-2">
          <TrendingUp className="w-12 h-12 mx-auto text-primary" />
          <h2 className="text-3xl font-bold">Ready to Plan Your Career Path?</h2>
          <p className="text-muted-foreground">
            Explore our interactive career path flowchart to see how different languages 
            map to various tech careers and find your perfect trajectory.
          </p>
          <Link href="/career-paths">
            <Button size="lg" className="gap-2">
              View Career Paths
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}