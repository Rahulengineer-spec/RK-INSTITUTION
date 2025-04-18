import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { SiteHeader } from '@/components/site-header';
import SupabaseProvider from '@/components/providers/supabase-provider';
import { Suspense } from 'react';
import Loading from '@/components/ui/loading';
import ErrorBoundary from '@/components/ui/error-boundary';
import { Footer } from '@/components/footer';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://rkinstitution.com'),
  title: {
    default: 'RK INSTITUTION - Online Learning Platform',
    template: '%s | RK INSTITUTION'
  },
  description: 'Learn from the best instructors with our comprehensive online courses. Join thousands of students in their learning journey.',
  keywords: ['online learning', 'education', 'courses', 'e-learning', 'online courses'],
  authors: [{ name: 'RK INSTITUTION Team' }],
  creator: 'RK INSTITUTION',
  publisher: 'RK INSTITUTION',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://rkinstitution.com',
    siteName: 'RK INSTITUTION',
    title: 'RK INSTITUTION - Online Learning Platform',
    description: 'Learn from the best instructors with our comprehensive online courses.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'RK INSTITUTION Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RK INSTITUTION - Online Learning Platform',
    description: 'Learn from the best instructors with our comprehensive online courses.',
    images: ['/twitter-image.jpg'],
    creator: '@rkinstitution',
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
    google: 'your-google-site-verification',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={cn(
        inter.className,
        "min-h-screen bg-background antialiased"
      )}>
        <ErrorBoundary>
          <Suspense fallback={<Loading />}>
            <SupabaseProvider>
              <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                <div className="relative flex min-h-screen flex-col">
                  <SiteHeader />
                  <main className="flex-1">
                    <div className="relative">
                      <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-slate-950">
                        <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-y-[30%] translate-x-[20%] rounded-full bg-primary/10 blur-[80px] dark:bg-primary/20" />
                        <div className="absolute bottom-0 left-0 right-auto top-auto h-[500px] w-[500px] -translate-y-[30%] -translate-x-[20%] rounded-full bg-primary/10 blur-[80px] dark:bg-primary/20" />
                      </div>
                      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
                        {children}
                      </div>
                    </div>
                  </main>
                  <Footer />
                </div>
              </ThemeProvider>
            </SupabaseProvider>
          </Suspense>
          <Toaster />
        </ErrorBoundary>
      </body>
    </html>
  );
}