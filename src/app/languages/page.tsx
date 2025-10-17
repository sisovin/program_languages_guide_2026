import { Metadata } from 'next';
import { api, Language } from '@/lib/api';
import LanguageCard from '@/components/LanguageCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Filter, SortAsc, SortDesc } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Programming Languages | Top 10 Languages',
  description: 'Browse and explore the top 10 programming languages with detailed guides, salary insights, and career paths.',
};

export default async function LanguagesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const search = typeof params.search === 'string' ? params.search : '';
  const sort = typeof params.sort === 'string' ? params.sort : 'popularityIndex';
  const order = typeof params.order === 'string' ? (params.order as 'asc' | 'desc') : 'desc';

  // Fetch languages from API
  const response = await api.getLanguages({
    limit: 50,
    search,
    sort,
    order,
  });

  const languages = response.data;

  // Group languages by category for filtering
  const categorizedLanguages = {
    all: languages,
    web: languages.filter((lang) =>
      lang.useCases.some((useCase) =>
        useCase.toLowerCase().includes('web')
      )
    ),
    mobile: languages.filter((lang) =>
      lang.useCases.some((useCase) =>
        useCase.toLowerCase().includes('mobile')
      )
    ),
    data: languages.filter((lang) =>
      lang.useCases.some((useCase) =>
        ['data science', 'machine learning', 'big data'].some((term) =>
          useCase.toLowerCase().includes(term)
        )
      )
    ),
    systems: languages.filter((lang) =>
      lang.useCases.some((useCase) =>
        ['system', 'embedded', 'operating'].some((term) =>
          useCase.toLowerCase().includes(term)
        )
      )
    ),
  };

  return (
    <div className="container mx-auto py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Programming Languages
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-3xl">
            Explore comprehensive guides for the top programming languages. Compare features, salaries, career paths, and make informed decisions about your learning journey.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="search"
              placeholder="Search languages..."
              className="pl-10"
              defaultValue={search}
              name="search"
            />
          </div>
        </div>

        {/* Filters & Tabs */}
        <Tabs defaultValue="all" className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <TabsList>
              <TabsTrigger value="all">All ({categorizedLanguages.all.length})</TabsTrigger>
              <TabsTrigger value="web">Web ({categorizedLanguages.web.length})</TabsTrigger>
              <TabsTrigger value="mobile">Mobile ({categorizedLanguages.mobile.length})</TabsTrigger>
              <TabsTrigger value="data">Data & AI ({categorizedLanguages.data.length})</TabsTrigger>
              <TabsTrigger value="systems">Systems ({categorizedLanguages.systems.length})</TabsTrigger>
            </TabsList>

            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                {order === 'desc' ? (
                  <SortDesc className="w-4 h-4 mr-2" />
                ) : (
                  <SortAsc className="w-4 h-4 mr-2" />
                )}
                Sort
              </Button>
            </div>
          </div>

          {/* All Languages */}
          <TabsContent value="all" className="space-y-8">
            {categorizedLanguages.all.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categorizedLanguages.all.map((lang: Language) => (
                    <LanguageCard key={lang.id} language={lang} />
                  ))}
                </div>

                {/* Pagination info */}
                {response.pagination && (
                  <div className="text-center text-sm text-muted-foreground">
                    Showing {categorizedLanguages.all.length} of {response.pagination.total} languages
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No languages found matching your criteria.</p>
              </div>
            )}
          </TabsContent>

          {/* Web Development */}
          <TabsContent value="web">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categorizedLanguages.web.map((lang: Language) => (
                <LanguageCard key={lang.id} language={lang} />
              ))}
            </div>
          </TabsContent>

          {/* Mobile Development */}
          <TabsContent value="mobile">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categorizedLanguages.mobile.map((lang: Language) => (
                <LanguageCard key={lang.id} language={lang} />
              ))}
            </div>
          </TabsContent>

          {/* Data & AI */}
          <TabsContent value="data">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categorizedLanguages.data.map((lang: Language) => (
                <LanguageCard key={lang.id} language={lang} />
              ))}
            </div>
          </TabsContent>

          {/* Systems Programming */}
          <TabsContent value="systems">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categorizedLanguages.systems.map((lang: Language) => (
                <LanguageCard key={lang.id} language={lang} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Stats Section */}
        <div className="mt-16 pt-16 border-t">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-4xl font-bold mb-2">{languages.length}</h3>
              <p className="text-muted-foreground">Programming Languages</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold mb-2">
                ${Math.round(
                  languages.reduce((sum, lang) => sum + (lang.salaryRange.min + lang.salaryRange.max) / 2, 0) /
                  languages.length /
                  1000
                )}K+
              </h3>
              <p className="text-muted-foreground">Average Salary</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold mb-2">
                {Math.round(
                  languages.reduce((sum, lang) => sum + lang.popularityIndex, 0) / languages.length
                )}%
              </h3>
              <p className="text-muted-foreground">Average Popularity</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
