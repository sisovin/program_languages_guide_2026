import { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

export const defaultMetadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Top 10 Programming Languages 2026 | Comprehensive Guide',
    template: '%s | Top Programming Languages 2026',
  },
  description:
    'Discover the top 10 programming languages to learn in 2026. Get comprehensive guides, salary insights, career paths, and market trends to make informed decisions about your programming career.',
  keywords: [
    'programming languages',
    'top programming languages 2026',
    'learn programming',
    'developer salary',
    'tech career',
    'software development',
    'coding languages',
    'programming guide',
  ],
  authors: [{ name: 'Top Programs Guide' }],
  creator: 'Top Programs Guide',
  publisher: 'Top Programs Guide',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    siteName: 'Top Programming Languages 2026',
    title: 'Top 10 Programming Languages 2026',
    description:
      'Comprehensive guide to the top 10 programming languages with salary insights, career paths, and market trends.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Top 10 Programming Languages 2026',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Top 10 Programming Languages 2026',
    description:
      'Comprehensive guide to the top 10 programming languages with salary insights and career paths.',
    images: ['/og-image.png'],
    creator: '@topprogramsguide',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
};

export function generateLanguageMetadata(language: {
  name: string;
  description: string;
  logoUrl: string;
  salaryRange: { min: number; max: number; currency: string };
  popularityIndex: number;
}): Metadata {
  const title = `${language.name} Programming Language Guide`;
  const description = `Learn ${language.name}: ${language.description} Salary range: $${language.salaryRange.min.toLocaleString()} - $${language.salaryRange.max.toLocaleString()}. Popularity: ${language.popularityIndex}/100.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: language.logoUrl,
          width: 800,
          height: 600,
          alt: `${language.name} logo`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [language.logoUrl],
    },
  };
}
