import { notFound } from 'next/navigation';
import Link from 'next/link';
import { languages, domainColors } from '@/data/languages';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Breadcrumbs from '@/components/Breadcrumbs';
import SalaryVisualization from '@/components/SalaryVisualization';
import { CheckCircle2, ArrowLeft, ArrowRight, Briefcase, GraduationCap } from 'lucide-react';

export function generateStaticParams() {
  return languages.map((lang) => ({
    id: lang.id,
  }));
}

export default function LanguagePage({ params }: { params: { id: string } }) {
  const language = languages.find((l) => l.id === params.id);

  if (!language) {
    notFound();
  }

  const colors = domainColors[language.domain];
  const currentIndex = languages.findIndex((l) => l.id === params.id);
  const prevLanguage = currentIndex > 0 ? languages[currentIndex - 1] : null;
  const nextLanguage = currentIndex < languages.length - 1 ? languages[currentIndex + 1] : null;

  return (
    <div className="bg-background">
      <div className="container py-8">
        <Breadcrumbs 
          items={[
            { label: 'Home', href: '/' },
            { label: language.name }
          ]} 
        />

        {/* Hero Section */}
        <div className={`rounded-2xl p-8 md:p-12 mb-8 border-2 ${colors.border} ${colors.bg}`}>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="text-7xl md:text-8xl">{language.icon}</div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h1 className="text-4xl md:text-5xl font-bold">{language.name}</h1>
                <Badge className={colors.badge}>
                  {language.domain.toUpperCase()}
                </Badge>
              </div>
              <p className="text-xl text-muted-foreground mb-4">{language.tagline}</p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5" />
                  <span className="font-medium">{language.learningCurve} to Learn</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  <span className="font-medium">{language.popularity}% Popularity</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{language.overview}</p>
              </CardContent>
            </Card>

            {/* Applications */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Key Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {language.applications.map((app, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className={`w-5 h-5 mt-0.5 flex-shrink-0 ${colors.text}`} />
                      <span>{app}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Advantages */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Key Advantages</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {language.advantages.map((advantage, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className={`w-5 h-5 mt-0.5 flex-shrink-0 ${colors.text}`} />
                      <span>{advantage}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Career Relevance */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Career Relevance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{language.careerRelevance}</p>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Salary Range */}
            <Card>
              <CardHeader>
                <CardTitle>Salary Range (USD)</CardTitle>
              </CardHeader>
              <CardContent>
                <SalaryVisualization language={language} />
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Learning Difficulty</p>
                  <Badge variant="outline" className="text-base">
                    {language.learningCurve}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Popularity Score</p>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-3 bg-secondary rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${colors.text.replace('text-', 'bg-')}`}
                        style={{ width: `${language.popularity}%` }}
                      />
                    </div>
                    <span className="font-bold text-lg">{language.popularity}%</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Primary Domain</p>
                  <Badge className={colors.badge}>
                    {language.domain.toUpperCase()}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Compare CTA */}
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg">Compare Languages</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  See how {language.name} stacks up against other languages
                </p>
                <Link href="/compare">
                  <Button className="w-full">
                    Go to Comparison Tool
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t">
          {prevLanguage ? (
            <Link href={`/language/${prevLanguage.id}`}>
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Previous: </span>
                {prevLanguage.icon} {prevLanguage.name}
              </Button>
            </Link>
          ) : (
            <div />
          )}
          {nextLanguage ? (
            <Link href={`/language/${nextLanguage.id}`}>
              <Button variant="outline" className="gap-2">
                <span className="hidden sm:inline">Next: </span>
                {nextLanguage.icon} {nextLanguage.name}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
}
