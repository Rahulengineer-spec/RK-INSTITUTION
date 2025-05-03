'use client';

import { useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { BlogCard } from './BlogCard';
import { blogPosts } from '@/app/data/blog-posts';
import { BlogPost } from '@/lib/types/blog';
import { useSearchParams } from 'next/navigation';

const POSTS_PER_PAGE = 6;

export function BlogList() {
  const searchParams = useSearchParams();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [page, setPage] = useState(1);
  const [ref, inView] = useInView();

  const filterPosts = useCallback(() => {
    let filteredPosts = [...blogPosts];
    const category = searchParams.get('category');
    const query = searchParams.get('q');

    if (category) {
      filteredPosts = filteredPosts.filter(post => post.category === category);
    }    if (query) {
      const searchTerm = query.toLowerCase();
      filteredPosts = filteredPosts.filter(post =>
        post.title.toLowerCase().includes(searchTerm) ||
        (post.description?.toLowerCase().includes(searchTerm) ?? false) ||
        (post.content?.toLowerCase().includes(searchTerm) ?? false)
      );
    }

    return filteredPosts;
  }, [searchParams]);

  useEffect(() => {
    const filteredPosts = filterPosts();
    setPosts(filteredPosts.slice(0, POSTS_PER_PAGE));
    setPage(1);
  }, [filterPosts]);

  useEffect(() => {
    if (inView) {
      const filteredPosts = filterPosts();
      const nextPosts = filteredPosts.slice(
        0,
        Math.min((page + 1) * POSTS_PER_PAGE, filteredPosts.length)
      );
      
      if (nextPosts.length > posts.length) {
        setPosts(nextPosts);
        setPage(page + 1);
      }
    }
  }, [inView, filterPosts, page, posts.length]);

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-2xl font-semibold">No posts found</h3>
        <p className="text-muted-foreground mt-2">
          Try adjusting your search or filter to find what you're looking for.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post, index) => (
          <BlogCard
            key={post.id}
            post={post}
            priority={index < 3}
          />
        ))}
      </div>
      <div
        ref={ref}
        className="h-10 flex items-center justify-center"
      >
        {posts.length < filterPosts().length && (
          <div className="loading-spinner" />
        )}
      </div>
    </div>
  );
} 