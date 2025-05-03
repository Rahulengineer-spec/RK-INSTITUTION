import { MetadataRoute } from 'next';
import { blogPosts } from '@/app/data/blog-posts';

// This is a utility function that will be used by the main sitemap.ts
// Not a route handler itself
export async function generateBlogSitemap(): Promise<MetadataRoute.Sitemap> {
  // Get all blog posts for sitemap
  const blogs = blogPosts.map((post) => ({
    url: `https://edutech-institute.com/components/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: post.featured ? 0.8 : 0.6,
  }));
  
  return [
    {
      url: 'https://edutech-institute.com/components/blog',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    ...blogs,
  ];
}
