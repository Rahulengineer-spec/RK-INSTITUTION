// This is a proper Next.js route file that re-exports our blog page component
import { Metadata } from 'next';
import BlogPage from '@/app/components/blog/BlogPage';
import { metadata as blogMetadata } from '@/app/components/blog/metadata';

// Re-export the metadata
export const metadata: Metadata = blogMetadata;

// Export the component as the default page component
export default function Page() {
  return <BlogPage />;
}
