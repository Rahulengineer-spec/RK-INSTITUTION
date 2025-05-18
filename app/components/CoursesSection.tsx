'use client';

import { useState, useEffect } from 'react';
import { CourseCard } from './Course/CourseCard';
import { LoadingSpinner } from './LoadingSpinner';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import ErrorBoundary from '@/components/ui/error-boundary';
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog';

const SAMPLE_COURSES = [
  {
    id: '1',
    title: 'Complete Web Development Bootcamp',
    description: 'Learn full-stack web development from scratch. Master HTML, CSS, JavaScript, React, Node.js, and more.',
    instructor: 'Dr. Sarah Johnson',
    duration: '12 weeks',
    students: 15420,
    rating: 4.8,
    image: '/courses/web-dev.jpg',
    price: 499.99,
  },
  {
    id: '2',
    title: 'Data Science and Machine Learning',
    description: 'Comprehensive course covering data analysis, visualization, machine learning algorithms, and AI applications.',
    instructor: 'Prof. Michael Chen',
    duration: '16 weeks',
    students: 12350,
    rating: 4.9,
    image: '/courses/data-science.jpg',
    price: 599.99,
  },
  {
    id: '3',
    title: 'UI/UX Design Masterclass',
    description: 'Master the art of user interface and experience design. Learn industry-standard tools and methodologies.',
    instructor: 'Emily Parker',
    duration: '8 weeks',
    students: 8750,
    rating: 4.7,
    image: '/courses/ui-ux.jpg',
    price: 399.99,
  },
];

export const CoursesSection = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [courses, setCourses] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;
    const fetchCourses = () => {
      setIsLoading(true);
      fetch(`/api/courses`)
        .then(res => res.json())
        .then(data => {
          if (isMounted) {
            setCourses(data.courses || []);
            setIsLoading(false);
          }
        })
        .catch(() => {
          if (isMounted) {
            setError('Failed to load courses.');
            setIsLoading(false);
          }
        });
    };
    fetchCourses();
    const interval = setInterval(fetchCourses, 60000); // Refetch every 60 seconds
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const filteredCourses = courses.filter((course: any) =>
    (course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (category ? course.category === category : true)
  );

  return (
    <ErrorBoundary>
      <section className="py-16 bg-background" aria-label="Courses Section" role="main">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
            <div>
              <h2 className="text-4xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
                Find Your Perfect Course
              </h2>
              <p className="text-lg text-foreground/90">
                Explore our most popular and highly-rated courses
              </p>
            </div>
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="relative flex-1 md:flex-initial">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/70" />
                <Input
                  type="text"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full md:w-[300px] pl-9 pr-4 py-2 h-11 rounded-full bg-card text-foreground placeholder:text-muted-foreground/70 border-input hover:border-primary/70 focus:border-primary ring-offset-background focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 transition-all"
                  aria-label="Search courses"
                />
              </div>
              <Dialog open={filterOpen} onOpenChange={setFilterOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-11 w-11 rounded-full border-input hover:bg-primary/10 hover:text-primary hover:border-primary/50"
                    aria-label="Filter courses"
                  >
                    <Filter className="w-5 h-5" />
                    <span className="sr-only">Filter courses</span>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <h3 className="text-lg font-semibold mb-4">Filter by Category</h3>
                  <select
                    value={category}
                    onChange={e => {
                      setCategory(e.target.value);
                      setFilterOpen(false);
                    }}
                    className="w-full border rounded p-2"
                    aria-label="Select category"
                  >
                    <option value="">All</option>
                    <option value="Development">Development</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Design">Design</option>
                  </select>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          {error && (
            <div className="text-center py-12 text-red-500">{error}</div>
          )}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-64 w-full rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course: any) => (
                <CourseCard
                  key={course.id}
                  id={course.id}
                  title={course.title}
                  description={course.description}
                  image={course.image}
                  price={course.price}
                  slug={course.id.toString()}
                />
              ))}
            </div>
          )}
          {!isLoading && filteredCourses.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-foreground/90">
                No courses found matching your search criteria.
              </p>
            </div>
          )}
        </div>
      </section>
    </ErrorBoundary>
  );
}; 