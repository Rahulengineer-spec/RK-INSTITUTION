import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import { Suspense } from 'react';
import Loading from '@/components/ui/loading';
import ErrorBoundary from '@/components/ui/error-boundary';
import { cn } from '@/lib/utils';
import { defaultSEOConfig } from '@/lib/seo-config';
import { RootProvider } from '@/components/providers/root-provider';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
});

export const metadata: Metadata = {
  ...defaultSEOConfig,
  metadataBase: new URL('https://edutech-institute.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
    },
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <link
          rel="preconnect"
          href="https://imagecdn.app"
          crossOrigin="anonymous"
        />
        <link
          rel="dns-prefetch"
          href="https://imagecdn.app"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#0f172a" />
        <meta name="msapplication-tap-highlight" content="no" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={cn(
        inter.className,
        "min-h-screen bg-gradient-to-b from-background to-background/80 dark:from-background dark:to-background/80"
      )}>
        <ErrorBoundary children={
          <RootProvider>{children}</RootProvider>
        } />
        <Toaster />
      </body>
    </html>
  );
}