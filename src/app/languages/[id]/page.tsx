import { notFound } from 'next/navigation';
import Link from 'next/link';
import { api, Language } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, ArrowLeft, TrendingUp, DollarSign } from 'lucide-react';
import { generateLanguageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;

  try {
    const response = await api.getLanguageById(parseInt(id));
    return generateLanguageMetadata(response.data);
  } catch (error) {
    // Fallback metadata when API is unavailable
    return {
      title: 'Programming Language Guide',
      description: 'Comprehensive guide to programming languages, career paths, and development resources.',
    };
  }
}

export default async function LanguagePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let language: Language;
  try {
    // Check if id is numeric
    const numericId = parseInt(id);
    if (!isNaN(numericId) && numericId > 0) {
      // Use numeric ID
      const response = await api.getLanguageById(numericId);
      language = response.data;
    } else {
      // Try to find language by name (for backward compatibility or direct access)
      const allLanguagesResponse = await api.getLanguages({ limit: 100, sort: 'popularityIndex', order: 'desc' });
      const allLanguages = allLanguagesResponse.data;
      const foundLanguage = allLanguages.find(lang => lang.name.toLowerCase() === id.toLowerCase());
      if (foundLanguage) {
        language = foundLanguage;
      } else {
        notFound();
      }
    }
  } catch (error) {
    // During development or when API is unavailable, use fallback data
    console.warn('Failed to fetch language from API, using fallback data:', error);
    const fallbackLanguages: Record<string, Language> = {
      '1': {
        id: 1,
        name: 'Python',
        description: 'Versatile programming language known for its simplicity and readability.',
        useCases: ['Web Development', 'Data Science', 'AI/ML', 'Automation'],
        advantages: ['Easy to learn', 'Large community', 'Extensive libraries', 'Cross-platform'],
        salaryRange: { min: 70000, max: 150000, currency: 'USD' },
        popularityIndex: 95,
        releaseYear: 1991,
        logoUrl: '/logos/python.svg',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      '2': {
        id: 2,
        name: 'JavaScript',
        description: 'The language of the web, powering both frontend and backend development.',
        useCases: ['Web Development', 'Mobile Apps', 'Server-side Development', 'Game Development'],
        advantages: ['Ubiquitous', 'Fast execution', 'Rich ecosystem', 'Dynamic typing'],
        salaryRange: { min: 65000, max: 140000, currency: 'USD' },
        popularityIndex: 98,
        releaseYear: 1995,
        logoUrl: '/logos/javascript.svg',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      '3': {
        id: 3,
        name: 'TypeScript',
        description: 'JavaScript with static typing for better code quality and developer experience.',
        useCases: ['Large-scale applications', 'Enterprise software', 'Frontend frameworks', 'API Development'],
        advantages: ['Type safety', 'Better IDE support', 'Scalable', 'Maintainable'],
        salaryRange: { min: 75000, max: 160000, currency: 'USD' },
        popularityIndex: 90,
        releaseYear: 2012,
        logoUrl: '/logos/typescript.svg',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      'python': {
        id: 1,
        name: 'Python',
        description: 'Versatile programming language known for its simplicity and readability.',
        useCases: ['Web Development', 'Data Science', 'AI/ML', 'Automation'],
        advantages: ['Easy to learn', 'Large community', 'Extensive libraries', 'Cross-platform'],
        salaryRange: { min: 70000, max: 150000, currency: 'USD' },
        popularityIndex: 95,
        releaseYear: 1991,
        logoUrl: '/logos/python.svg',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      'javascript': {
        id: 2,
        name: 'JavaScript',
        description: 'The language of the web, powering both frontend and backend development.',
        useCases: ['Web Development', 'Mobile Apps', 'Server-side Development', 'Game Development'],
        advantages: ['Ubiquitous', 'Fast execution', 'Rich ecosystem', 'Dynamic typing'],
        salaryRange: { min: 65000, max: 140000, currency: 'USD' },
        popularityIndex: 98,
        releaseYear: 1995,
        logoUrl: '/logos/javascript.svg',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      'typescript': {
        id: 3,
        name: 'TypeScript',
        description: 'JavaScript with static typing for better code quality and developer experience.',
        useCases: ['Large-scale applications', 'Enterprise software', 'Frontend frameworks', 'API Development'],
        advantages: ['Type safety', 'Better IDE support', 'Scalable', 'Maintainable'],
        salaryRange: { min: 75000, max: 160000, currency: 'USD' },
        popularityIndex: 90,
        releaseYear: 2012,
        logoUrl: '/logos/typescript.svg',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    };

    // Try to find by ID first, then by name
    language = fallbackLanguages[id] || fallbackLanguages[id.toLowerCase()];
    if (!language) {
      notFound();
    }
  }

  // Fetch all languages to get prev/next navigation
  let allLanguages: Language[] = [];
  try {
    const allLanguagesResponse = await api.getLanguages({ limit: 100, sort: 'popularityIndex', order: 'desc' });
    allLanguages = allLanguagesResponse.data;
  } catch (error) {
    // Use fallback languages for navigation when API is unavailable
    console.warn('Failed to fetch all languages for navigation:', error);
    allLanguages = Object.values({
      '1': {
        id: 1,
        name: 'Python',
        description: 'Versatile programming language known for its simplicity and readability.',
        useCases: ['Web Development', 'Data Science', 'AI/ML', 'Automation'],
        advantages: ['Easy to learn', 'Large community', 'Extensive libraries', 'Cross-platform'],
        salaryRange: { min: 70000, max: 150000, currency: 'USD' },
        popularityIndex: 95,
        releaseYear: 1991,
        logoUrl: '/logos/python.svg',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      '2': {
        id: 2,
        name: 'JavaScript',
        description: 'The language of the web, powering both frontend and backend development.',
        useCases: ['Web Development', 'Mobile Apps', 'Server-side Development', 'Game Development'],
        advantages: ['Ubiquitous', 'Fast execution', 'Rich ecosystem', 'Dynamic typing'],
        salaryRange: { min: 65000, max: 140000, currency: 'USD' },
        popularityIndex: 98,
        releaseYear: 1995,
        logoUrl: '/logos/javascript.svg',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      '3': {
        id: 3,
        name: 'TypeScript',
        description: 'JavaScript with static typing for better code quality and developer experience.',
        useCases: ['Large-scale applications', 'Enterprise software', 'Frontend frameworks', 'API Development'],
        advantages: ['Type safety', 'Better IDE support', 'Scalable', 'Maintainable'],
        salaryRange: { min: 75000, max: 160000, currency: 'USD' },
        popularityIndex: 90,
        releaseYear: 2012,
        logoUrl: '/logos/typescript.svg',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    });
  }
  const currentIndex = allLanguages.findIndex((l) => l.id === language.id);
  const prevLanguage = currentIndex > 0 ? allLanguages[currentIndex - 1] : null;
  const nextLanguage = currentIndex < allLanguages.length - 1 ? allLanguages[currentIndex + 1] : null;

  return (
    <div className="bg-background min-h-screen">
      <div className="container py-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>/</span>
          <Link href="/languages" className="hover:text-foreground transition-colors">Languages</Link>
          <span>/</span>
          <span className="text-foreground">{language.name}</span>
        </nav>

        {/* Hero Section */}
        <div className="rounded-xl p-8 md:p-12 mb-8 bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {language.logoUrl && (
              <div className="w-24 h-24 relative">
                <img
                  src={language.logoUrl}
                  alt={`${language.name} logo`}
                  className="w-full h-full object-contain"
                />
              </div>
            )}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
                <h1 className="text-4xl md:text-5xl font-bold">{language.name}</h1>
                <Badge variant="secondary" className="w-fit">
                  Since {language.releaseYear}
                </Badge>
              </div>
              <p className="text-xl text-muted-foreground mb-4">{language.description}</p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" aria-hidden="true" />
                  <span className="font-medium">Popularity: {language.popularityIndex}/100</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-green-600" aria-hidden="true" />
                  <span className="font-medium">
                    ${language.salaryRange.min.toLocaleString()} - ${language.salaryRange.max.toLocaleString()} {language.salaryRange.currency}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Use Cases */}
            <Card>
              <CardHeader>
                <CardTitle>Use Cases</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {language.useCases.map((useCase: string, index: number) => (
                    <Badge key={index} variant="outline" className="text-sm">
                      {useCase}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Key Advantages */}
            <Card>
              <CardHeader>
                <CardTitle>Key Advantages</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {language.advantages.map((advantage: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" aria-hidden="true" />
                      <span>{advantage}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Salary Information */}
            <Card>
              <CardHeader>
                <CardTitle>Salary Range</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Minimum</span>
                      <span className="font-bold text-lg">${language.salaryRange.min.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Maximum</span>
                      <span className="font-bold text-lg">${language.salaryRange.max.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Currency</span>
                      <span className="font-medium">{language.salaryRange.currency}</span>
                    </div>
                    {language.salaryRange.experienceLevel && (
                      <div className="flex justify-between mt-2">
                        <span className="text-sm text-muted-foreground">Level</span>
                        <span className="font-medium capitalize">{language.salaryRange.experienceLevel}</span>
                      </div>
                    )}
                  </div>
                  <div className="h-2 bg-gradient-to-r from-blue-500 to-green-500 rounded-full" role="presentation"></div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Release Year</span>
                  <span className="font-bold">{language.releaseYear}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Popularity Index</span>
                  <span className="font-bold">{language.popularityIndex}/100</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Use Cases</span>
                  <span className="font-bold">{language.useCases.length}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex justify-between mt-12 pt-8 border-t" aria-label="Language navigation">
          {prevLanguage ? (
            <Link href={`/languages/${prevLanguage.id}`}>
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                {prevLanguage.name}
              </Button>
            </Link>
          ) : (
            <div></div>
          )}
          {nextLanguage ? (
            <Link href={`/languages/${nextLanguage.id}`}>
              <Button variant="outline" className="gap-2">
                {nextLanguage.name}
                <ArrowLeft className="w-4 h-4 rotate-180" aria-hidden="true" />
              </Button>
            </Link>
          ) : (
            <div></div>
          )}
        </nav>
      </div>
    </div>
  );
}
