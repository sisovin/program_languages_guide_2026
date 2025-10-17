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
    return {
      title: 'Language Not Found',
      description: 'The requested programming language could not be found.',
    };
  }
}

export default async function LanguagePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let language: Language;
  try {
    const response = await api.getLanguageById(parseInt(id));
    language = response.data;
  } catch (error) {
    notFound();
  }

  // Fetch all languages to get prev/next navigation
  const allLanguagesResponse = await api.getLanguages({ limit: 100, sort: 'popularityIndex', order: 'desc' });
  const allLanguages = allLanguagesResponse.data;
  const currentIndex = allLanguages.findIndex((l) => l.id === language.id);
  const prevLanguage = currentIndex > 0 ? allLanguages[currentIndex - 1] : null;
  const nextLanguage = currentIndex < allLanguages.length - 1 ? allLanguages[currentIndex + 1] : null;


  return (
    <div className="bg-background min-h-screen">
      <div className="container py-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-foreground">Home</Link>
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
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <span className="font-medium">Popularity: {language.popularityIndex}/100</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-green-600" />
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
                  {language.useCases.map((useCase, index) => (
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
                  {language.advantages.map((advantage, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
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
                        <span className="font-medium">{language.salaryRange.experienceLevel}</span>
                      </div>
                    )}
                  </div>
                  <div className="h-2 bg-gradient-to-r from-blue-500 to-green-500 rounded-full"></div>
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
        <div className="flex justify-between mt-12 pt-8 border-t">
          {prevLanguage ? (
            <Link href={`/language/${prevLanguage.id}`}>
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                {prevLanguage.name}
              </Button>
            </Link>
          ) : (
            <div></div>
          )}
          {nextLanguage ? (
            <Link href={`/language/${nextLanguage.id}`}>
              <Button variant="outline" className="gap-2">
                {nextLanguage.name}
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </Button>
            </Link>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
}
