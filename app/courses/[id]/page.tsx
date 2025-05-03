'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ShoppingCart, Play, X } from 'lucide-react';

export default function CoursePreview({ params }: { params: { id: string } }) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // This would normally come from an API
  const course = {
    id: params.id,
    title: 'Complete Web Development Bootcamp',
    description: 'Learn full-stack web development from scratch. Master HTML, CSS, JavaScript, React, Node.js, and more.',
    fullDescription: `This comprehensive bootcamp will take you from absolute beginner to professional developer. 
    You'll learn everything you need to know to build modern web applications, including:
    
    • Front-end development with HTML, CSS, and JavaScript
    • Modern frameworks like React and Next.js
    • Back-end development with Node.js and Express
    • Database design and implementation
    • Authentication and security
    • Deployment and hosting
    `,
    instructor: 'Dr. Sarah Johnson',
    duration: '12 weeks',
    students: 15420,
    rating: 4.8,
    image: '/images/courses/web-dev.jpg',
    price: 499.99,
    previewVideo: 'https://www.youtube.com/embed/your-video-id'
  };

  return (
    <div className="min-h-screen bg-background dark:bg-gray-900/95">
      <div className="container mx-auto px-4 py-8">
        {/* Course Banner - Minimal size */}
        <div className="relative h-[180px] md:h-[240px] w-full rounded-lg overflow-hidden mb-8 bg-gray-100 dark:bg-gray-800">
          <Image
            src={course.image}
            alt={course.title}
            fill
            className="object-cover opacity-90 dark:opacity-80"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20 flex items-center justify-center">
            <Button
              size="default"
              variant="secondary"
              className="bg-white/20 hover:bg-white/30 text-white border-white/10"
              onClick={() => setIsPreviewOpen(true)}
            >
              <Play className="mr-2 h-4 w-4" />
              Watch Preview
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Course Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-4">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground dark:text-gray-100">
                {course.title}
              </h1>
              <p className="text-base md:text-lg text-muted-foreground dark:text-gray-300">
                {course.description}
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground dark:text-gray-100">
                Course Details
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="p-4 bg-card dark:bg-gray-800/90 border dark:border-gray-700">
                  <p className="text-sm text-muted-foreground dark:text-gray-400">Duration</p>
                  <p className="text-base font-semibold text-foreground dark:text-gray-100">
                    {course.duration}
                  </p>
                </Card>
                <Card className="p-4 bg-card dark:bg-gray-800/90 border dark:border-gray-700">
                  <p className="text-sm text-muted-foreground dark:text-gray-400">Students</p>
                  <p className="text-base font-semibold text-foreground dark:text-gray-100">
                    {course.students.toLocaleString()}
                  </p>
                </Card>
                <Card className="p-4 bg-card dark:bg-gray-800/90 border dark:border-gray-700">
                  <p className="text-sm text-muted-foreground dark:text-gray-400">Rating</p>
                  <p className="text-base font-semibold text-foreground dark:text-gray-100">
                    {course.rating}/5.0
                  </p>
                </Card>
                <Card className="p-4 bg-card dark:bg-gray-800/90 border dark:border-gray-700">
                  <p className="text-sm text-muted-foreground dark:text-gray-400">Instructor</p>
                  <p className="text-base font-semibold text-foreground dark:text-gray-100">
                    {course.instructor}
                  </p>
                </Card>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground dark:text-gray-100">
                Course Description
              </h2>
              <div className="prose dark:prose-invert max-w-none">
                {course.fullDescription.split('\n').map((paragraph, index) => (
                  <p key={index} className="text-muted-foreground dark:text-gray-300">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Purchase Card */}
          <div className="lg:col-span-1">
            <Card className="p-4 sticky top-24 bg-card dark:bg-gray-800/90 border dark:border-gray-700">
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground dark:text-gray-100">
                    ${course.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </p>
                </div>
                <Button 
                  className="w-full h-9 text-sm" 
                  variant="default"
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
                <p className="text-xs text-center text-muted-foreground dark:text-gray-400">
                  30-day money-back guarantee
                </p>
              </div>
            </Card>
          </div>
        </div>

        {/* Preview Modal */}
        {isPreviewOpen && (
          <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
            <div className="relative w-full max-w-2xl bg-card dark:bg-gray-800/95 rounded-lg overflow-hidden shadow-xl">
              <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-black/50 to-transparent z-10">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8 rounded-full bg-black/20 text-white hover:bg-black/40 hover:text-white"
                  onClick={() => setIsPreviewOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="aspect-video w-full bg-gray-900">
                <iframe
                  src={course.previewVideo}
                  className="w-full h-full"
                  style={{ maxHeight: '60vh' }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="p-4 bg-card dark:bg-gray-800/95 border-t dark:border-gray-700">
                <h3 className="text-base font-semibold dark:text-gray-100">What you&apos;ll learn</h3>
                <p className="text-sm text-muted-foreground dark:text-gray-300 mt-1">
                  {course.description}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 