import { ServerBlogList } from './ServerBlogList';
import { ServerBlogHero } from './ServerBlogHero';
import { Skeleton } from '@/components/ui/skeleton';
import { ClientNoSSR } from './ClientNoSSR'; // Using local copy of the component
import { BlogClientInitializer } from './BlogClientInitializer';
import { Container } from '@/components/ui/container';

export default function BlogPage() {
  return (
    <>
      <main className="min-h-screen bg-background">
        {/* Hero Section - Server Component */}
        <ServerBlogHero />

        <Container size="large" className="py-8 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Sidebar */}
            <aside className="lg:col-span-3 space-y-6">
              <ClientNoSSR fallback={<div className="space-y-4">
                <Skeleton className="h-[100px] w-full" />
                <Skeleton className="h-[200px] w-full" />
              </div>}>
                {/* Import dynamically to prevent SSR hydration issues */}
                <div className="space-y-6 blog-sidebar">
                  {/* These components will be loaded by BlogClientWrapper */}
                </div>
              </ClientNoSSR>
            </aside>

            {/* Main Content */}
            <div className="lg:col-span-9">
              {/* Initial Server-Rendered Content */}
              <div className="blog-server-content">
                <ServerBlogList limit={6} />
              </div>

              {/* Client-side interactive content that takes over after hydration */}
              <ClientNoSSR>
                <div className="blog-client-content" style={{ display: 'none' }}>
                  {/* This will be revealed by JavaScript after hydration */}
                </div>
              </ClientNoSSR>
            </div>
          </div>
        </Container>
      </main>

      {/* Client-side components loaded after hydration */}
      <ClientNoSSR>
        <BlogClientInitializer />
      </ClientNoSSR>
    </>
  );
}
