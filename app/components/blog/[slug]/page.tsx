// This is a proper Next.js slug route file that re-exports our blog post component
import { Metadata, ResolvingMetadata } from 'next';
import BlogPostPage, { generateMetadata as generatePostMetadata } from '@/app/components/blog/BlogPostPage';

// Re-export the dynamic metadata generation function
export const generateMetadata = generatePostMetadata;

// Export the component as the default page component
export default function Page({ params }: { params: { slug: string } }) {
  return <BlogPostPage params={params} />;
}
