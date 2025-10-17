import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import ResponsiveLayout from '@/components/Responsive';
import { defaultMetadata } from '@/lib/metadata';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { SkipToContent } from '@/components/SkipToContent';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <SkipToContent />
        <ErrorBoundary>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <ResponsiveLayout>
              {children}
            </ResponsiveLayout>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
