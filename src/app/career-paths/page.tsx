import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Breadcrumbs from '@/components/Breadcrumbs';
import { languages } from '@/data/languages';
import { ArrowRight, Briefcase, Code2, Database, Smartphone, Brain, Cpu } from 'lucide-react';

export default function CareerPathsPage() {
  const careerPaths = [
    {
      title: 'Web Development',
      icon: Code2,
      color: 'blue',
      description: 'Build modern web applications and services',
      languages: languages.filter(l => ['javascript', 'typescript', 'python', 'java', 'csharp'].includes(l.id)),
      roles: ['Frontend Developer', 'Backend Developer', 'Full-Stack Developer', 'Web Architect'],
      salaryRange: '$75K - $175K'
    },
    {
      title: 'Mobile Development',
      icon: Smartphone,
      color: 'purple',
      description: 'Create native and cross-platform mobile apps',
      languages: languages.filter(l => ['kotlin', 'swift', 'javascript'].includes(l.id)),
      roles: ['iOS Developer', 'Android Developer', 'Mobile Architect', 'React Native Developer'],
      salaryRange: '$80K - $175K'
    },
    {
      title: 'AI & Machine Learning',
      icon: Brain,
      color: 'emerald',
      description: 'Develop intelligent systems and data solutions',
      languages: languages.filter(l => ['python', 'sql'].includes(l.id)),
      roles: ['ML Engineer', 'Data Scientist', 'AI Researcher', 'NLP Engineer'],
      salaryRange: '$90K - $185K'
    },
    {
      title: 'Systems & Infrastructure',
      icon: Cpu,
      color: 'orange',
      description: 'Build high-performance systems and tools',
      languages: languages.filter(l => ['rust', 'go', 'java'].includes(l.id)),
      roles: ['Systems Engineer', 'DevOps Engineer', 'Cloud Architect', 'Site Reliability Engineer'],
      salaryRange: '$90K - $185K'
    },
    {
      title: 'Data Engineering',
      icon: Database,
      color: 'indigo',
      description: 'Design and maintain data pipelines',
      languages: languages.filter(l => ['python', 'sql', 'java', 'go'].includes(l.id)),
      roles: ['Data Engineer', 'Database Administrator', 'ETL Developer', 'Big Data Engineer'],
      salaryRange: '$85K - $170K'
    },
    {
      title: 'Game Development',
      icon: Briefcase,
      color: 'pink',
      description: 'Create interactive gaming experiences',
      languages: languages.filter(l => ['csharp', 'javascript', 'rust'].includes(l.id)),
      roles: ['Game Developer', 'Unity Developer', 'Graphics Engineer', 'Gameplay Programmer'],
      salaryRange: '$70K - $160K'
    }
  ];

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
          {careerPaths.map((path) => {
            const colors = colorClasses[path.color];
            const Icon = path.icon;
            
            return (
              <Card key={path.title} className={`border-2 ${colors.border} ${colors.bg} hover:shadow-lg transition-all`}>
                <CardHeader>
                  <div className="flex items-start justify-between mb-3">
                    <Icon className={`w-10 h-10 ${colors.text}`} />
                    <Badge className={colors.badge}>{path.salaryRange}</Badge>
                  </div>
                  <CardTitle className="text-2xl">{path.title}</CardTitle>
                  <p className="text-muted-foreground">{path.description}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Key Languages</h4>
                    <div className="flex flex-wrap gap-2">
                      {path.languages.map((lang) => (
                        <Link key={lang.id} href={`/language/${lang.id}`}>
                          <Badge variant="outline" className="hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                            {lang.icon} {lang.name}
                          </Badge>
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Common Roles</h4>
                    <div className="flex flex-wrap gap-2">
                      {path.roles.map((role) => (
                        <Badge key={role} variant="secondary" className="text-xs">
                          {role}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
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
