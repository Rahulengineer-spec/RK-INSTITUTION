import type { Metadata } from 'next'

export const metadata: Metadata = {
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
} 