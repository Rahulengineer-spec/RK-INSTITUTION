'use client'

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { BlogPost } from '@/lib/types/blog';
import { shimmer, toBase64 } from '@/lib/utils/image-optimization';

interface BlogCardProps {
  post: BlogPost;
  priority?: boolean;
}

export function BlogCard({ post, priority = false }: BlogCardProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // or a loading skeleton
  }

  return (
    <article className="group relative flex flex-col space-y-3 glass-card-improved transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] p-4 border-0">
      <Link 
        href={`/components/blog/${post.slug}`}
        className="relative aspect-[16/9] overflow-hidden rounded-lg block"
      >
        <Image
          src={post.imageUrl || '/images/blog-placeholder.jpg'}
          alt={post.title || 'Blog post'}
          fill
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          sizes="(min-width: 1024px) 384px, (min-width: 768px) 288px, 100vw"
          priority={priority}
          quality={85}
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
        />
        {post.featured && (
          <div className="absolute top-2 right-2 bg-gradient-to-r from-primary to-accent text-white px-3 py-1 rounded-full font-semibold text-xs shadow-lg">
            Featured
          </div>
        )}
      </Link>
      <div className="flex flex-col space-y-1">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground dark:text-gray-400">
          <time dateTime={post.publishedAt.toString()}>
            {format(new Date(post.publishedAt), 'MMM d, yyyy')}
          </time>
          <span>•</span>
          <span>{post.readingTime || '5 min read'}</span>
        </div>
        <Link href={`/components/blog/${post.slug}`}>
          <h2 className="line-clamp-2 text-2xl font-bold gradient-text tracking-tight hover:underline">
            {post.title}
          </h2>
        </Link>
        <p className="line-clamp-3 text-muted-foreground dark:text-gray-300">
          {post.description}
        </p>
        <div className="flex items-center space-x-2 pt-2">
          {mounted && (
            <Image
              src={post.author.avatar || '/images/avatar-placeholder.jpg'}
              alt={post.author.name || 'Author'}
              width={24}
              height={24}
              className="rounded-full"
            />
          )}
          <span className="text-sm font-medium">{post.author.name}</span>
        </div>
      </div>
    </article>
  );
} 