import { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/breadcrumbs'; // Assuming you have a Breadcrumbs component

export const metadata: Metadata = {
  title: 'Sitemap - RK INSTITUTION',
  description: 'Explore the structure of the RK INSTITUTION website.',
};

export default function SitemapPage() {
  const links = [
    { href: '/', label: 'Home' },
    { href: '/courses', label: 'Courses' },
    { href: '/blog', label: 'Blog' },
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
    { href: '/faq', label: 'FAQ' },
    { href: '/support', label: 'Support Center' },
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
    { href: '/login', label: 'Login' },
    { href: '/signup', label: 'Sign Up' },
    { href: '/sitemap', label: 'Sitemap' },
    { href: '/accessibility', label: 'Accessibility' },
    // Add other important pages/sections here
  ];

  return (
    <main className="container mx-auto px-4 py-12 md:py-16">
      <Breadcrumbs />
      <h1 className="text-3xl md:text-4xl font-bold mb-8 mt-4">Sitemap</h1>
      <p className="mb-8 text-lg text-muted-foreground">
        Navigate through the main sections of the RK INSTITUTION website.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="block p-4 border rounded-lg hover:bg-muted transition-colors"
          >
            <span className="text-lg font-medium text-primary">{link.label}</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
