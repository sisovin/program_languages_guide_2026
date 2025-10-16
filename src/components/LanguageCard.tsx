import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { Language, domainColors } from '@/data/languages';

interface LanguageCardProps {
  language: Language;
}

export default function LanguageCard({ language }: LanguageCardProps) {
  const colors = domainColors[language.domain];

  return (
    <Card className={`group hover:shadow-lg transition-all duration-300 border-2 ${colors.border} ${colors.bg} overflow-hidden`}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="text-5xl mb-3">{language.icon}</div>
          <Badge className={colors.badge}>
            {language.domain.toUpperCase()}
          </Badge>
        </div>
        <CardTitle className="text-2xl group-hover:text-primary transition-colors">
          {language.name}
        </CardTitle>
        <CardDescription className="text-base">
          {language.tagline}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Popularity</span>
            <div className="flex items-center gap-2">
              <div className="w-24 h-2 bg-secondary rounded-full overflow-hidden">
                <div 
                  className={`h-full ${colors.text.replace('text-', 'bg-')}`}
                  style={{ width: `${language.popularity}%` }}
                />
              </div>
              <span className="font-semibold">{language.popularity}%</span>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Learning Curve</span>
            <Badge variant="outline">{language.learningCurve}</Badge>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span className="font-semibold">
              ${(language.salaryRange.average / 1000).toFixed(0)}K avg
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/language/${language.id}`} className="w-full">
          <Button className="w-full group-hover:translate-x-1 transition-transform" variant="default">
            Learn More
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
