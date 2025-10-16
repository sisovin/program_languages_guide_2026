export interface Language {
  id: string;
  name: string;
  tagline: string;
  icon: string;
  domain: 'mobile' | 'web' | 'ai' | 'system';
  overview: string;
  applications: string[];
  advantages: string[];
  salaryRange: {
    min: number;
    max: number;
    average: number;
  };
  careerRelevance: string;
  learningCurve: 'Easy' | 'Moderate' | 'Challenging';
  popularity: number;
}

export const languages: Language[] = [
  {
    id: 'python',
    name: 'Python',
    tagline: 'The Swiss Army Knife of Programming',
    icon: '🐍',
    domain: 'ai',
    overview: 'Python is a high-level, interpreted programming language known for its simplicity and readability. It has become the de facto language for AI, machine learning, data science, and automation.',
    applications: [
      'Machine Learning & AI Development',
      'Data Science & Analytics',
      'Web Development (Django, Flask)',
      'Automation & Scripting',
      'Scientific Computing'
    ],
    advantages: [
      'Easy to learn with clean syntax',
      'Extensive library ecosystem',
      'Strong community support',
      'Versatile across multiple domains',
      'High demand in AI/ML roles'
    ],
    salaryRange: { min: 85000, max: 175000, average: 125000 },
    careerRelevance: 'Essential for AI/ML engineers, data scientists, and backend developers. Python skills open doors to cutting-edge tech roles.',
    learningCurve: 'Easy',
    popularity: 98
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    tagline: 'The Language of the Web',
    icon: '⚡',
    domain: 'web',
    overview: 'JavaScript is the backbone of modern web development, enabling interactive and dynamic user experiences. With Node.js, it extends to server-side development.',
    applications: [
      'Frontend Web Development (React, Vue, Angular)',
      'Backend Development (Node.js)',
      'Mobile Apps (React Native)',
      'Desktop Applications (Electron)',
      'Game Development'
    ],
    advantages: [
      'Runs everywhere (browser, server, mobile)',
      'Massive ecosystem (npm)',
      'Full-stack capability',
      'Asynchronous programming support',
      'Constantly evolving with modern features'
    ],
    salaryRange: { min: 75000, max: 165000, average: 115000 },
    careerRelevance: 'Critical for full-stack developers, frontend specialists, and modern web applications. JavaScript is ubiquitous in tech.',
    learningCurve: 'Easy',
    popularity: 100
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    tagline: 'JavaScript with Superpowers',
    icon: '📘',
    domain: 'web',
    overview: 'TypeScript is a typed superset of JavaScript that compiles to plain JavaScript. It brings static typing and enhanced tooling to JavaScript development.',
    applications: [
      'Large-scale Web Applications',
      'Enterprise Software Development',
      'Frontend Frameworks (Angular, React)',
      'Backend Services (Node.js)',
      'API Development'
    ],
    advantages: [
      'Catches errors at compile time',
      'Better IDE support and autocomplete',
      'Improved code maintainability',
      'Scales well for large projects',
      'Growing industry adoption'
    ],
    salaryRange: { min: 85000, max: 175000, average: 130000 },
    careerRelevance: 'Increasingly preferred for enterprise applications. TypeScript developers are highly sought after for complex projects.',
    learningCurve: 'Moderate',
    popularity: 92
  },
  {
    id: 'rust',
    name: 'Rust',
    tagline: 'Performance Meets Safety',
    icon: '🦀',
    domain: 'system',
    overview: 'Rust is a systems programming language focused on safety, speed, and concurrency. It prevents memory errors without garbage collection.',
    applications: [
      'Systems Programming',
      'WebAssembly Development',
      'Blockchain & Cryptocurrency',
      'Game Engines',
      'Operating Systems'
    ],
    advantages: [
      'Memory safety without garbage collection',
      'Blazing fast performance',
      'Fearless concurrency',
      'Growing ecosystem',
      'Loved by developers'
    ],
    salaryRange: { min: 95000, max: 185000, average: 140000 },
    careerRelevance: 'High demand in blockchain, systems programming, and performance-critical applications. Premium salaries for Rust expertise.',
    learningCurve: 'Challenging',
    popularity: 78
  },
  {
    id: 'go',
    name: 'Go',
    tagline: 'Simple, Fast, Reliable',
    icon: '🔷',
    domain: 'system',
    overview: 'Go (Golang) is a statically typed, compiled language designed at Google. It excels at building scalable, concurrent systems.',
    applications: [
      'Cloud Infrastructure',
      'Microservices',
      'DevOps Tools',
      'Network Programming',
      'Distributed Systems'
    ],
    advantages: [
      'Fast compilation and execution',
      'Built-in concurrency (goroutines)',
      'Simple and clean syntax',
      'Strong standard library',
      'Excellent for cloud-native apps'
    ],
    salaryRange: { min: 90000, max: 180000, average: 135000 },
    careerRelevance: 'Essential for cloud engineers, DevOps, and backend infrastructure roles. Go powers major cloud platforms.',
    learningCurve: 'Easy',
    popularity: 85
  },
  {
    id: 'kotlin',
    name: 'Kotlin',
    tagline: 'Modern Android Development',
    icon: '📱',
    domain: 'mobile',
    overview: 'Kotlin is a modern, concise programming language that runs on the JVM. It\'s the preferred language for Android development.',
    applications: [
      'Android App Development',
      'Server-side Development',
      'Multiplatform Mobile Apps',
      'Web Development',
      'Desktop Applications'
    ],
    advantages: [
      'Official Android language',
      'Concise and expressive syntax',
      'Null safety built-in',
      'Java interoperability',
      'Growing multiplatform support'
    ],
    salaryRange: { min: 80000, max: 170000, average: 120000 },
    careerRelevance: 'Must-know for Android developers. Kotlin skills are essential in mobile development careers.',
    learningCurve: 'Moderate',
    popularity: 82
  },
  {
    id: 'swift',
    name: 'Swift',
    tagline: 'Power of iOS Development',
    icon: '🍎',
    domain: 'mobile',
    overview: 'Swift is Apple\'s modern programming language for iOS, macOS, watchOS, and tvOS development. It\'s fast, safe, and expressive.',
    applications: [
      'iOS App Development',
      'macOS Applications',
      'watchOS Apps',
      'tvOS Development',
      'Server-side Swift'
    ],
    advantages: [
      'Official Apple platform language',
      'Modern and safe syntax',
      'High performance',
      'Strong type system',
      'Growing beyond Apple ecosystem'
    ],
    salaryRange: { min: 85000, max: 175000, average: 125000 },
    careerRelevance: 'Critical for iOS/macOS developers. Apple\'s ecosystem offers lucrative career opportunities.',
    learningCurve: 'Moderate',
    popularity: 80
  },
  {
    id: 'java',
    name: 'Java',
    tagline: 'Enterprise Powerhouse',
    icon: '☕',
    domain: 'web',
    overview: 'Java is a class-based, object-oriented language that has been a cornerstone of enterprise development for decades.',
    applications: [
      'Enterprise Applications',
      'Android Development',
      'Web Applications (Spring)',
      'Big Data Processing',
      'Financial Systems'
    ],
    advantages: [
      'Platform independence (JVM)',
      'Mature ecosystem',
      'Strong enterprise support',
      'Robust performance',
      'Extensive job market'
    ],
    salaryRange: { min: 80000, max: 165000, average: 118000 },
    careerRelevance: 'Dominant in enterprise and financial sectors. Java developers have stable, long-term career prospects.',
    learningCurve: 'Moderate',
    popularity: 88
  },
  {
    id: 'csharp',
    name: 'C#',
    tagline: 'Microsoft\'s Versatile Language',
    icon: '🎮',
    domain: 'web',
    overview: 'C# is a modern, object-oriented language developed by Microsoft. It\'s the primary language for .NET development and Unity game development.',
    applications: [
      'Game Development (Unity)',
      'Web Applications (ASP.NET)',
      'Desktop Applications',
      'Mobile Apps (Xamarin)',
      'Cloud Services (Azure)'
    ],
    advantages: [
      'Excellent for game development',
      'Strong Microsoft ecosystem',
      'Modern language features',
      'Cross-platform with .NET Core',
      'Great tooling (Visual Studio)'
    ],
    salaryRange: { min: 80000, max: 170000, average: 120000 },
    careerRelevance: 'Essential for game developers and Microsoft stack developers. Strong demand in enterprise and gaming industries.',
    learningCurve: 'Moderate',
    popularity: 84
  },
  {
    id: 'sql',
    name: 'SQL',
    tagline: 'The Language of Data',
    icon: '🗄️',
    domain: 'web',
    overview: 'SQL (Structured Query Language) is the standard language for managing and querying relational databases. It\'s essential for any data-related role.',
    applications: [
      'Database Management',
      'Data Analysis',
      'Business Intelligence',
      'Backend Development',
      'Data Engineering'
    ],
    advantages: [
      'Universal database language',
      'Essential for data roles',
      'Declarative and powerful',
      'Standardized across platforms',
      'Complements other languages'
    ],
    salaryRange: { min: 70000, max: 150000, average: 105000 },
    careerRelevance: 'Fundamental skill for developers, data analysts, and database administrators. SQL knowledge is universally valuable.',
    learningCurve: 'Easy',
    popularity: 95
  }
];

export const domainColors = {
  mobile: {
    bg: 'bg-purple-50 dark:bg-purple-950/20',
    border: 'border-purple-200 dark:border-purple-800',
    text: 'text-purple-700 dark:text-purple-300',
    badge: 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300'
  },
  web: {
    bg: 'bg-blue-50 dark:bg-blue-950/20',
    border: 'border-blue-200 dark:border-blue-800',
    text: 'text-blue-700 dark:text-blue-300',
    badge: 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
  },
  ai: {
    bg: 'bg-emerald-50 dark:bg-emerald-950/20',
    border: 'border-emerald-200 dark:border-emerald-800',
    text: 'text-emerald-700 dark:text-emerald-300',
    badge: 'bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300'
  },
  system: {
    bg: 'bg-orange-50 dark:bg-orange-950/20',
    border: 'border-orange-200 dark:border-orange-800',
    text: 'text-orange-700 dark:text-orange-300',
    badge: 'bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300'
  }
};
