'use client';

import { useState } from 'react';
import Link from 'next/link';
import { languages, domainColors } from '@/data/languages';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Breadcrumbs from '@/components/Breadcrumbs';
import { CheckCircle2, XCircle, ArrowRight } from 'lucide-react';

export default function ComparePage() {
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  const toggleLanguage = (id: string) => {
    if (selectedLanguages.includes(id)) {
      setSelectedLanguages(selectedLanguages.filter((l) => l !== id));
    } else if (selectedLanguages.length < 3) {
      setSelectedLanguages([...selectedLanguages, id]);
    }
  };

  const comparedLanguages = languages.filter((l) => selectedLanguages.includes(l.id));

  return (
    <div className="bg-background">
      <div className="container py-8">
        <Breadcrumbs 
          items={[
            { label: 'Home', href: '/' },
            { label: 'Compare Languages' }
          ]} 
        />

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Compare Programming Languages</h1>
          <p className="text-muted-foreground text-lg">
            Select 2-3 languages to compare their features, salaries, and career prospects side-by-side.
          </p>
        </div>

        {/* Language Selection */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>
              Select Languages to Compare ({selectedLanguages.length}/3)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {languages.map((lang) => {
                const isSelected = selectedLanguages.includes(lang.id);
                const colors = domainColors[lang.domain];
                
                return (
                  <button
                    key={lang.id}
                    onClick={() => toggleLanguage(lang.id)}
                    disabled={!isSelected && selectedLanguages.length >= 3}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      isSelected
                        ? `${colors.border} ${colors.bg} ring-2 ring-primary`
                        : 'border-border hover:border-primary/50'
                    } ${
                      !isSelected && selectedLanguages.length >= 3
                        ? 'opacity-50 cursor-not-allowed'
                        : 'cursor-pointer'
                    }`}
                  >
                    <div className="text-3xl mb-2">{lang.icon}</div>
                    <p className="font-semibold text-sm">{lang.name}</p>
                    {isSelected && (
                      <CheckCircle2 className="w-4 h-4 mx-auto mt-2 text-primary" />
                    )}
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Comparison Table */}
        {comparedLanguages.length >= 2 ? (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Comparison Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-4 font-semibold">Feature</th>
                        {comparedLanguages.map((lang) => (
                          <th key={lang.id} className="text-center p-4">
                            <div className="flex flex-col items-center gap-2">
                              <span className="text-3xl">{lang.icon}</span>
                              <span className="font-semibold">{lang.name}</span>
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-4 font-medium">Domain</td>
                        {comparedLanguages.map((lang) => {
                          const colors = domainColors[lang.domain];
                          return (
                            <td key={lang.id} className="text-center p-4">
                              <Badge className={colors.badge}>
                                {lang.domain.toUpperCase()}
                              </Badge>
                            </td>
                          );
                        })}
                      </tr>
                      <tr className="border-b">
                        <td className="p-4 font-medium">Learning Curve</td>
                        {comparedLanguages.map((lang) => (
                          <td key={lang.id} className="text-center p-4">
                            <Badge variant="outline">{lang.learningCurve}</Badge>
                          </td>
                        ))}
                      </tr>
                      <tr className="border-b">
                        <td className="p-4 font-medium">Popularity</td>
                        {comparedLanguages.map((lang) => (
                          <td key={lang.id} className="text-center p-4">
                            <div className="flex flex-col items-center gap-2">
                              <span className="font-bold text-lg">{lang.popularity}%</span>
                              <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-primary"
                                  style={{ width: `${lang.popularity}%` }}
                                />
                              </div>
                            </div>
                          </td>
                        ))}
                      </tr>
                      <tr className="border-b">
                        <td className="p-4 font-medium">Avg Salary</td>
                        {comparedLanguages.map((lang) => (
                          <td key={lang.id} className="text-center p-4">
                            <span className="font-bold text-lg text-green-600">
                              ${(lang.salaryRange.average / 1000).toFixed(0)}K
                            </span>
                          </td>
                        ))}
                      </tr>
                      <tr className="border-b">
                        <td className="p-4 font-medium">Salary Range</td>
                        {comparedLanguages.map((lang) => (
                          <td key={lang.id} className="text-center p-4">
                            <div className="text-sm">
                              ${(lang.salaryRange.min / 1000).toFixed(0)}K - ${(lang.salaryRange.max / 1000).toFixed(0)}K
                            </div>
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {comparedLanguages.map((lang) => {
                const colors = domainColors[lang.domain];
                return (
                  <Card key={lang.id} className={`border-2 ${colors.border}`}>
                    <CardHeader className={colors.bg}>
                      <div className="text-4xl mb-2">{lang.icon}</div>
                      <CardTitle>{lang.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{lang.tagline}</p>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2 text-sm">Top Applications</h4>
                        <ul className="space-y-1">
                          {lang.applications.slice(0, 3).map((app, idx) => (
                            <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                              <CheckCircle2 className={`w-4 h-4 mt-0.5 flex-shrink-0 ${colors.text}`} />
                              {app}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 text-sm">Key Advantages</h4>
                        <ul className="space-y-1">
                          {lang.advantages.slice(0, 3).map((adv, idx) => (
                            <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                              <CheckCircle2 className={`w-4 h-4 mt-0.5 flex-shrink-0 ${colors.text}`} />
                              {adv}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <Link href={`/language/${lang.id}`}>
                        <Button variant="outline" className="w-full gap-2">
                          View Full Details
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        ) : (
          <Card className="p-12">
            <div className="text-center space-y-4">
              <XCircle className="w-16 h-16 mx-auto text-muted-foreground" />
              <h3 className="text-xl font-semibold">Select at least 2 languages to compare</h3>
              <p className="text-muted-foreground">
                Choose languages from the grid above to see a detailed side-by-side comparison.
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
