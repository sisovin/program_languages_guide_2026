import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Language } from '@/lib/api';

interface LanguageCardProps {
  language: Language;
}

export function LanguageCard({ language }: LanguageCardProps) {
  const { id, name, description, useCases, salaryRange, popularityIndex, releaseYear, logoUrl } = language;

  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          {logoUrl && (
            <div className="w-12 h-12 relative">
              <img
                src={logoUrl}
                alt={`${name} logo`}
                className="w-full h-full object-contain"
              />
            </div>
          )}
          <div className="flex-1">
            <CardTitle className="text-2xl">{name}</CardTitle>
            <CardDescription className="text-sm">
              Since {releaseYear} • Popularity: {popularityIndex}/100
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
            <div className="flex flex-wrap gap-1">
              {useCases.slice(0, 3).map((useCase, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {useCase}
                </Badge>
              ))}
              {useCases.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{useCases.length - 3} more
                </Badge>
              )}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold mb-1 text-muted-foreground">Salary Range</h4>
            <p className="text-sm font-medium">
              ${salaryRange.min.toLocaleString()} - ${salaryRange.max.toLocaleString()} {salaryRange.currency}
            </p>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Link href={`/languages/${id}`} className="w-full">
          <Button className="w-full">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
