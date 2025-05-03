'use client';

import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { blogPosts } from '@/app/data/blog-posts';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { ChevronLeft, ChevronRight, Calendar, Clock, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useEffect, useState } from 'react';

type Props = {
  params: {
    slug: string;
  };
};

// Export the metadata generation function for use by the Next.js route
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = blogPosts.find((post) => post.slug === params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }
  
  return {
    title: `${post.title} | EduTech Institute Blog`,
    description: post.description || post.excerpt || '',
    openGraph: {
      title: post.title,
      description: post.description || post.excerpt || '',
      type: 'article',
      url: `https://edutech-institute.com/components/blog/${post.slug}`,
      images: [
        {
          url: post.imageUrl || '/images/blog-placeholder.jpg',
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
  };
}

export default function BlogPostPage({ params }: Props) {
  const [mounted, setMounted] = useState(false);
  const post = blogPosts.find((post) => post.slug === params.slug);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!post) {
    notFound();
  }

  // Format the content paragraphs
  const contentParagraphs = post.content
    .trim()
    .split('\n\n')
    .filter(paragraph => paragraph.trim().length > 0);

  if (!mounted) {
    return null; // or a loading skeleton
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container px-4 py-8 md:px-6 md:py-12">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
              <BreadcrumbSeparator />
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink href="/components/blog">Blog</BreadcrumbLink>
              <BreadcrumbSeparator />
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbPage>{post.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        <article className="mx-auto max-w-3xl">
          {/* Post Header */}
          <div className="mb-8 text-center">
            <div className="inline-block rounded bg-primary px-3 py-1 text-sm font-medium text-primary-foreground mb-4">
              {post.category}
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">{post.title}</h1>
            <p className="text-xl text-muted-foreground mb-6">
              {post.description || post.excerpt}
            </p>
            <div className="flex items-center justify-center gap-4">
              <Avatar className="h-10 w-10 border">
                <AvatarImage src={post.author.avatar} alt={post.author.name} />
                <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="text-sm text-left">
                <p className="font-medium">{post.author.name}</p>
                <p className="text-muted-foreground">{post.author.role}</p>
              </div>
              <span className="text-muted-foreground">•</span>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <time dateTime={post.publishedAt.toISOString()}>
                  {format(new Date(post.publishedAt), 'MMM d, yyyy')}
                </time>
              </div>
              <span className="text-muted-foreground">•</span>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{post.readingTime || '5'} min read</span>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-lg mb-10">
            {mounted && (
              <Image
                src={post.imageUrl || '/images/blog-placeholder.jpg'}
                alt={post.title}
                fill
                className="object-cover w-full h-full"
                priority
                quality={100}
                sizes="(min-width: 1024px) 1024px, 100vw"
              />
            )}
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none dark:prose-invert">
            {contentParagraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <div
                  key={tag}
                  className="flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-sm"
                >
                  <Tag className="h-3 w-3" />
                  <span>{tag}</span>
                </div>
              ))}
            </div>
          )}

          {/* Navigation */}
          <div className="mt-16 flex items-center justify-between border-t pt-8">
            <Button variant="outline" size="sm" asChild>
              <Link href="/components/blog" className="flex items-center gap-2">
                <ChevronLeft className="h-4 w-4" />
                Back to Blog
              </Link>
            </Button>
            <div className="flex gap-4">
              <Button variant="ghost" size="sm">
                <span className="sr-only">Share on Twitter</span>
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </Button>
              <Button variant="ghost" size="sm">
                <span className="sr-only">Share on LinkedIn</span>
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
                </svg>
              </Button>
              <Button variant="ghost" size="sm">
                <span className="sr-only">Share on Facebook</span>
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </Button>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}
