export const defaultSEOConfig = {
  title: 'Learning Platform | Educational Resources and Courses',
  description: 'Discover high-quality educational resources, online courses, and learning materials. Join our community of learners and instructors.',
  canonical: 'https://www.example.com',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.example.com',
    site_name: 'Learning Platform',
    images: [
      {
        url: 'https://www.example.com/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Learning Platform',
      },
    ],
  },
  twitter: {
    handle: '@learningplatform',
    site: '@learningplatform',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      name: 'apple-mobile-web-app-capable',
      content: 'yes',
    },
    {
      name: 'theme-color',
      content: '#ffffff',
    },
  ],
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.ico',
    },
    {
      rel: 'apple-touch-icon',
      href: '/apple-touch-icon.png',
      sizes: '180x180',
    },
    {
      rel: 'manifest',
      href: '/manifest.json',
    },
  ],
};
