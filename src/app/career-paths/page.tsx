import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Breadcrumbs from '@/components/Breadcrumbs';
import { api } from '@/lib/api';
import { ArrowRight, Briefcase, Code2, Database, Smartphone, Brain, Cpu, DollarSign, Clock } from 'lucide-react';

interface CareerPath {
  id: number;
  title: string;
  description: string;
  salaryRange: {
    min: number;
    max: number;
    currency: string;
    experienceLevel?: string;
  };
  experienceRequired: string;
  language: {
    id: number;
    name: string;
    logoUrl: string;
    popularityIndex: number;
  };
}

interface CareerCategory {
  title: string;
  icon: any;
  color: string;
  description: string;
  careerPaths: CareerPath[];
  roles: string[];
  salaryRange: string;
}

export default async function CareerPathsPage() {
  let careerPaths: CareerPath[] = [];
  let careerCategories: CareerCategory[] = [];

  try {
    // Fetch career paths from API
    const response = await api.getCareerPaths({ limit: 100 });
    careerPaths = response.data;

    // Group career paths by categories
    const categoryMap: Record<string, CareerPath[]> = {};

    careerPaths.forEach(path => {
      let category = '';

      // Categorize based on job title keywords
      if (path.title.toLowerCase().includes('frontend') || path.title.toLowerCase().includes('backend') || path.title.toLowerCase().includes('full') || path.title.toLowerCase().includes('web')) {
        category = 'Web Development';
      } else if (path.title.toLowerCase().includes('mobile') || path.title.toLowerCase().includes('ios') || path.title.toLowerCase().includes('android')) {
        category = 'Mobile Development';
      } else if (path.title.toLowerCase().includes('data') || path.title.toLowerCase().includes('machine') || path.title.toLowerCase().includes('ai') || path.title.toLowerCase().includes('ml')) {
        category = 'AI & Machine Learning';
      } else if (path.title.toLowerCase().includes('system') || path.title.toLowerCase().includes('devops') || path.title.toLowerCase().includes('infrastructure')) {
        category = 'Systems & Infrastructure';
      } else if (path.title.toLowerCase().includes('game') || path.title.toLowerCase().includes('unity')) {
        category = 'Game Development';
      } else {
        category = 'Data Engineering';
      }

      if (!categoryMap[category]) {
        categoryMap[category] = [];
      }
      categoryMap[category].push(path);
    });

    // Convert to career categories
    careerCategories = Object.entries(categoryMap).map(([title, paths]) => {
      const categoryConfig: Record<string, any> = {
        'Web Development': {
          icon: Code2,
          color: 'blue',
          description: 'Build modern web applications and services',
          roles: ['Frontend Developer', 'Backend Developer', 'Full-Stack Developer', 'Web Architect']
        },
        'Mobile Development': {
          icon: Smartphone,
          color: 'purple',
          description: 'Create native and cross-platform mobile apps',
          roles: ['iOS Developer', 'Android Developer', 'Mobile Architect', 'React Native Developer']
        },
        'AI & Machine Learning': {
          icon: Brain,
          color: 'emerald',
          description: 'Develop intelligent systems and data solutions',
          roles: ['ML Engineer', 'Data Scientist', 'AI Researcher', 'NLP Engineer']
        },
        'Systems & Infrastructure': {
          icon: Cpu,
          color: 'orange',
          description: 'Build high-performance systems and tools',
          roles: ['Systems Engineer', 'DevOps Engineer', 'Cloud Architect', 'Site Reliability Engineer']
        },
        'Data Engineering': {
          icon: Database,
          color: 'indigo',
          description: 'Design and maintain data pipelines',
          roles: ['Data Engineer', 'Database Administrator', 'ETL Developer', 'Big Data Engineer']
        },
        'Game Development': {
          icon: Briefcase,
          color: 'pink',
          description: 'Create interactive gaming experiences',
          roles: ['Game Developer', 'Unity Developer', 'Graphics Engineer', 'Gameplay Programmer']
        }
      };

      const config = categoryConfig[title] || categoryConfig['Web Development'];

      // Calculate salary range for category
      const salaries = paths.map(p => p.salaryRange.min);
      const maxSalaries = paths.map(p => p.salaryRange.max);
      const minSalary = Math.min(...salaries);
      const maxSalary = Math.max(...maxSalaries);

      return {
        title,
        icon: config.icon,
        color: config.color,
        description: config.description,
        careerPaths: paths,
        roles: config.roles,
        salaryRange: `$${minSalary.toLocaleString()} - $${maxSalary.toLocaleString()}`
      };
    });

  } catch (error) {
    // Fallback data when API is unavailable
    console.warn('Failed to fetch career paths from API, using fallback data:', error);

    careerCategories = [
      {
        title: 'Web Development',
        icon: Code2,
        color: 'blue',
        description: 'Build modern web applications and services',
        careerPaths: [
          {
            id: 1,
            title: 'Frontend Developer',
            description: 'Create interactive user interfaces using React, Vue, or Angular frameworks.',
            salaryRange: { min: 75000, max: 130000, currency: 'USD', experienceLevel: 'mid' },
            experienceRequired: '2-4 years',
            language: { id: 2, name: 'JavaScript', logoUrl: '', popularityIndex: 1 }
          },
          {
            id: 2,
            title: 'Backend Developer',
            description: 'Build scalable web applications and APIs using various frameworks.',
            salaryRange: { min: 85000, max: 140000, currency: 'USD', experienceLevel: 'mid' },
            experienceRequired: '2-4 years',
            language: { id: 1, name: 'Python', logoUrl: '', popularityIndex: 2 }
          }
        ],
        roles: ['Frontend Developer', 'Backend Developer', 'Full-Stack Developer', 'Web Architect'],
        salaryRange: '$75K - $175K'
      },
      {
        title: 'Mobile Development',
        icon: Smartphone,
        color: 'purple',
        description: 'Create native and cross-platform mobile apps',
        careerPaths: [
          {
            id: 3,
            title: 'Android Developer',
            description: 'Create native Android applications using modern development practices.',
            salaryRange: { min: 85000, max: 150000, currency: 'USD', experienceLevel: 'mid' },
            experienceRequired: '2-4 years',
            language: { id: 3, name: 'Java', logoUrl: '', popularityIndex: 3 }
          },
          {
            id: 4,
            title: 'iOS Developer',
            description: 'Develop native iOS applications with Swift and modern frameworks.',
            salaryRange: { min: 90000, max: 160000, currency: 'USD', experienceLevel: 'mid' },
            experienceRequired: '2-4 years',
            language: { id: 4, name: 'Swift', logoUrl: '', popularityIndex: 4 }
          }
        ],
        roles: ['iOS Developer', 'Android Developer', 'Mobile Architect', 'React Native Developer'],
        salaryRange: '$80K - $175K'
      },
      {
        title: 'AI & Machine Learning',
        icon: Brain,
        color: 'emerald',
        description: 'Develop intelligent systems and data solutions',
        careerPaths: [
          {
            id: 5,
            title: 'Data Scientist',
            description: 'Analyze complex datasets to extract insights and build predictive models.',
            salaryRange: { min: 95000, max: 160000, currency: 'USD', experienceLevel: 'mid' },
            experienceRequired: '3-5 years',
            language: { id: 1, name: 'Python', logoUrl: '', popularityIndex: 2 }
          },
          {
            id: 6,
            title: 'Machine Learning Engineer',
            description: 'Design and implement ML algorithms and systems.',
            salaryRange: { min: 110000, max: 180000, currency: 'USD', experienceLevel: 'senior' },
            experienceRequired: '4-7 years',
            language: { id: 1, name: 'Python', logoUrl: '', popularityIndex: 2 }
          }
        ],
        roles: ['ML Engineer', 'Data Scientist', 'AI Researcher', 'NLP Engineer'],
        salaryRange: '$90K - $185K'
      },
      {
        title: 'Systems & Infrastructure',
        icon: Cpu,
        color: 'orange',
        description: 'Build high-performance systems and tools',
        careerPaths: [
          {
            id: 7,
            title: 'DevOps Engineer',
            description: 'Automate deployment and manage cloud infrastructure.',
            salaryRange: { min: 95000, max: 160000, currency: 'USD', experienceLevel: 'mid' },
            experienceRequired: '3-5 years',
            language: { id: 5, name: 'Go', logoUrl: '', popularityIndex: 5 }
          }
        ],
        roles: ['Systems Engineer', 'DevOps Engineer', 'Cloud Architect', 'Site Reliability Engineer'],
        salaryRange: '$90K - $185K'
      },
      {
        title: 'Data Engineering',
        icon: Database,
        color: 'indigo',
        description: 'Design and maintain data pipelines',
        careerPaths: [
          {
            id: 8,
            title: 'Data Engineer',
            description: 'Build and maintain scalable data processing systems.',
            salaryRange: { min: 95000, max: 165000, currency: 'USD', experienceLevel: 'mid' },
            experienceRequired: '3-5 years',
            language: { id: 1, name: 'Python', logoUrl: '', popularityIndex: 2 }
          }
        ],
        roles: ['Data Engineer', 'Database Administrator', 'ETL Developer', 'Big Data Engineer'],
        salaryRange: '$85K - $170K'
      },
      {
        title: 'Game Development',
        icon: Briefcase,
        color: 'pink',
        description: 'Create interactive gaming experiences',
        careerPaths: [
          {
            id: 9,
            title: 'Game Developer',
            description: 'Develop interactive games and gaming systems.',
            salaryRange: { min: 70000, max: 140000, currency: 'USD', experienceLevel: 'mid' },
            experienceRequired: '2-4 years',
            language: { id: 6, name: 'C++', logoUrl: '', popularityIndex: 6 }
          }
        ],
        roles: ['Game Developer', 'Unity Developer', 'Graphics Engineer', 'Gameplay Programmer'],
        salaryRange: '$70K - $160K'
      }
    ];
  }

  const colorClasses: Record<string, { bg: string; border: string; text: string; badge: string }> = {
    blue: {
      bg: 'bg-blue-50 dark:bg-blue-950/20',
      border: 'border-blue-200 dark:border-blue-800',
      text: 'text-blue-700 dark:text-blue-300',
      badge: 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
    },
    purple: {
      bg: 'bg-purple-50 dark:bg-purple-950/20',
      border: 'border-purple-200 dark:border-purple-800',
      text: 'text-purple-700 dark:text-purple-300',
      badge: 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300'
    },
    emerald: {
      bg: 'bg-emerald-50 dark:bg-emerald-950/20',
      border: 'border-emerald-200 dark:border-emerald-800',
      text: 'text-emerald-700 dark:text-emerald-300',
      badge: 'bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300'
    },
    orange: {
      bg: 'bg-orange-50 dark:bg-orange-950/20',
      border: 'border-orange-200 dark:border-orange-800',
      text: 'text-orange-700 dark:text-orange-300',
      badge: 'bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300'
    },
    indigo: {
      bg: 'bg-indigo-50 dark:bg-indigo-950/20',
      border: 'border-indigo-200 dark:border-indigo-800',
      text: 'text-indigo-700 dark:text-indigo-300',
      badge: 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300'
    },
    pink: {
      bg: 'bg-pink-50 dark:bg-pink-950/20',
      border: 'border-pink-200 dark:border-pink-800',
      text: 'text-pink-700 dark:text-pink-300',
      badge: 'bg-pink-100 dark:bg-pink-900 text-pink-700 dark:text-pink-300'
    }
  };

  return (
    <div className="bg-background">
      <div className="container py-8">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Career Paths' }
          ]}
        />

        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Tech Career Paths</h1>
          <p className="text-muted-foreground text-lg max-w-3xl">
            Explore different career trajectories in tech and discover which programming languages
            align with your career goals. Each path offers unique opportunities and challenges.
          </p>
        </div>

        {/* Career Path Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {careerCategories.map((category) => {
            const colors = colorClasses[category.color];
            const Icon = category.icon;

            return category.careerPaths.map((path) => (
              <Card key={path.title} className={`border-2 ${colors.border} ${colors.bg} hover:shadow-lg transition-all`}>
                <CardHeader>
                  <div className="flex items-start justify-between mb-3">
                    <Icon className={`w-10 h-10 ${colors.text}`} />
                    <Badge className={colors.badge}>
                      ${path.salaryRange.min / 1000}K - ${path.salaryRange.max / 1000}K
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl">{path.title}</CardTitle>
                  <p className="text-muted-foreground">{path.description}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Language</h4>
                    <div className="flex flex-wrap gap-2">
                      <Link href={`/language/${path.language.id}`}>
                        <Badge variant="outline" className="hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                          {path.language.name}
                        </Badge>
                      </Link>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Experience Required</h4>
                    <Badge variant="secondary" className="text-xs">
                      {path.experienceRequired}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ));
          })}
        </div>

        {/* Career Flowchart */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Career Progression Flowchart</CardTitle>
            <p className="text-muted-foreground">
              Typical career progression paths in software development
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {/* Entry Level */}
              <div className="text-center">
                <Badge className="mb-4 text-base px-4 py-2">Entry Level (0-2 years)</Badge>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-secondary rounded-lg">
                    <p className="font-semibold">Junior Developer</p>
                    <p className="text-xs text-muted-foreground mt-1">$70K - $90K</p>
                  </div>
                  <div className="p-4 bg-secondary rounded-lg">
                    <p className="font-semibold">Associate Engineer</p>
                    <p className="text-xs text-muted-foreground mt-1">$75K - $95K</p>
                  </div>
                  <div className="p-4 bg-secondary rounded-lg">
                    <p className="font-semibold">QA Engineer</p>
                    <p className="text-xs text-muted-foreground mt-1">$65K - $85K</p>
                  </div>
                  <div className="p-4 bg-secondary rounded-lg">
                    <p className="font-semibold">Data Analyst</p>
                    <p className="text-xs text-muted-foreground mt-1">$70K - $90K</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <ArrowRight className="w-8 h-8 rotate-90 text-muted-foreground" />
              </div>

              {/* Mid Level */}
              <div className="text-center">
                <Badge className="mb-4 text-base px-4 py-2 bg-primary">Mid Level (3-5 years)</Badge>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                    <p className="font-semibold">Software Engineer</p>
                    <p className="text-xs text-muted-foreground mt-1">$100K - $140K</p>
                  </div>
                  <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                    <p className="font-semibold">Full-Stack Developer</p>
                    <p className="text-xs text-muted-foreground mt-1">$105K - $145K</p>
                  </div>
                  <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                    <p className="font-semibold">DevOps Engineer</p>
                    <p className="text-xs text-muted-foreground mt-1">$110K - $150K</p>
                  </div>
                  <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                    <p className="font-semibold">Data Engineer</p>
                    <p className="text-xs text-muted-foreground mt-1">$105K - $145K</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <ArrowRight className="w-8 h-8 rotate-90 text-muted-foreground" />
              </div>

              {/* Senior Level */}
              <div className="text-center">
                <Badge className="mb-4 text-base px-4 py-2 bg-emerald-600">Senior Level (6+ years)</Badge>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 rounded-lg border-2 border-emerald-200 dark:border-emerald-800">
                    <p className="font-semibold">Senior Engineer</p>
                    <p className="text-xs text-muted-foreground mt-1">$140K - $180K</p>
                  </div>
                  <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 rounded-lg border-2 border-emerald-200 dark:border-emerald-800">
                    <p className="font-semibold">Tech Lead</p>
                    <p className="text-xs text-muted-foreground mt-1">$150K - $200K</p>
                  </div>
                  <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 rounded-lg border-2 border-emerald-200 dark:border-emerald-800">
                    <p className="font-semibold">Staff Engineer</p>
                    <p className="text-xs text-muted-foreground mt-1">$160K - $220K</p>
                  </div>
                  <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 rounded-lg border-2 border-emerald-200 dark:border-emerald-800">
                    <p className="font-semibold">Engineering Manager</p>
                    <p className="text-xs text-muted-foreground mt-1">$150K - $210K</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <Card className="bg-gradient-to-br from-primary/10 to-secondary/20 border-2">
          <CardContent className="p-8 text-center space-y-4">
            <h3 className="text-2xl font-bold">Ready to Start Your Journey?</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our language guides to find the perfect starting point for your career path.
            </p>
            <Link href="/">
              <Button size="lg" className="gap-2">
                Explore Languages
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
