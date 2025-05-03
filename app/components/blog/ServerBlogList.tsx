import { BlogCard } from './BlogCard';
import { blogPosts } from '@/app/data/blog-posts';
import { BlogPost } from '@/lib/types/blog';

interface ServerBlogListProps {
  category?: string | null;
  searchQuery?: string | null;
  limit?: number;
}

export function ServerBlogList({ 
  category = null, 
  searchQuery = null, 
  limit = 6 
}: ServerBlogListProps) {
  
  // Filter posts on the server
  let filteredPosts = [...blogPosts];
  
  if (category) {
    filteredPosts = filteredPosts.filter(post => post.category === category);
  }
  
  if (searchQuery) {
    const searchTerm = searchQuery.toLowerCase();
    filteredPosts = filteredPosts.filter(post =>
      post.title.toLowerCase().includes(searchTerm) ||
      (post.description?.toLowerCase().includes(searchTerm) ?? false) ||
      (post.content?.toLowerCase().includes(searchTerm) ?? false)
    );
  }
  
  // Limit the number of posts
  const postsToShow = filteredPosts.slice(0, limit);

  if (postsToShow.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-2xl font-semibold">No posts found</h3>
        <p className="text-muted-foreground mt-2">
          Try adjusting your search or filter to find what you&apos;re looking for.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
        {postsToShow.map((post, index) => (
          <BlogCard
            key={post.id}
            post={post}
            priority={index < 3}
          />
        ))}
      </div>
    </div>
  );
}
