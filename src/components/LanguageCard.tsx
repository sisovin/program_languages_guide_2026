import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Language } from '@/lib/api';
import { formatForScreenReader } from '@/lib/accessibility';

interface LanguageCardProps {
  language: Language;
}

export default function LanguageCard({ language }: LanguageCardProps) {
  const { id, name, description, useCases, salaryRange, popularityIndex, releaseYear, logoUrl } = language;

  // Format salary for screen readers
  const salaryMin = formatForScreenReader(salaryRange.min, 'currency');
  const salaryMax = formatForScreenReader(salaryRange.max, 'currency');

  return (
    <Card
      className="flex flex-col h-full hover:shadow-lg transition-shadow"
      role="article"
      aria-labelledby={`language-${id}-title`}
    >
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          {logoUrl && (
            <div className="w-12 h-12 relative" aria-hidden="true">
              <img
                src={logoUrl}
                alt=""
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </div>
          )}
          <div className="flex-1">
            <CardTitle id={`language-${id}-title`} className="text-2xl">
              {name}
            </CardTitle>
            <CardDescription className="text-sm">
              <span aria-label={`Released in ${releaseYear}, popularity score ${popularityIndex} out of 100`}>
                Since {releaseYear} • Popularity: {popularityIndex}/100
              </span>
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
          {description}
        </p>

        <div className="space-y-3">
          <div>
            <h4 className="text-xs font-semibold mb-2 text-muted-foreground">Use Cases</h4>
            <div className="flex flex-wrap gap-1" aria-label={`${name} use cases`}>
              {useCases.slice(0, 3).map((useCase: string, index: number) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {useCase}
                </Badge>
              ))}
              {useCases.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  <span aria-label={`${useCases.length - 3} additional use cases`}>
                    +{useCases.length - 3} more
                  </span>
                </Badge>
              )}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold mb-1 text-muted-foreground">Salary Range</h4>
            <p
              className="text-sm font-medium"
              aria-label={`Salary range from ${salaryMin} to ${salaryMax}`}
            >
              ${salaryRange.min.toLocaleString()} - ${salaryRange.max.toLocaleString()} {salaryRange.currency}
            </p>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Link
          href={`/languages/${id}`}
          className="w-full focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-md"
          aria-label={`View detailed information about ${name}`}
        >
          <Button className="w-full">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
