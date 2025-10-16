import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import ResponsiveLayout from '@/components/Responsive';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Top 10 Programming Languages 2026",
  description: "Discover the top 10 programming languages to learn in 2026 with detailed insights, salary ranges, and career paths.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ResponsiveLayout>
            <main className="min-h-screen">
              {children}
            </main>
          </ResponsiveLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
