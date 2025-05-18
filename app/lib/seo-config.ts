export const defaultSEOConfig = {
  defaultTitle: 'Rk Institution - Online Learning Platform',
  titleTemplate: '%s | Rk Institution',
  description: 'Discover the future of education with Rk Institution. Access high-quality courses, expert insights, and innovative learning resources.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://edutech-institute.com',
    siteName: 'Rk Institution',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Rk Institution',
      },
    ],
  },
  twitter: {
    handle: '@edutechinst',
    site: '@edutechinst',
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
      rel: 'manifest',
      href: '/manifest.json',
    },
  ],
}; 