import { NextRequest, NextResponse } from 'next/server';
import { createValidatedHandler } from '@/middleware/validate';
import { courseSchema } from '@/lib/validations';
import { prisma } from '@/lib/prisma';
import { createError } from '@/middleware/error-handler';
import { errorHandler } from '@/middleware/error-handler';
import { log } from '@/lib/logger';
import { getSessionFromRequest } from '@/lib/session';
import { z } from 'zod';
import { Prisma, Status, Level } from '@prisma/client';
import { rateLimit } from '@/middleware/rate-limit';
import { csrfMiddleware } from '@/middleware/csrf';

// Query parameters schema with stricter validation
const coursesQuerySchema = z.object({
  page: z.string()
    .regex(/^\d+$/)
    .transform(Number)
    .refine(val => val > 0, 'Page must be greater than 0')
    .optional()
    .default('1'),
  limit: z.string()
    .regex(/^\d+$/)
    .transform(Number)
    .refine(val => val >= 1 && val <= 100, 'Limit must be between 1 and 100')
    .optional()
    .default('10'),
  category: z.string().trim().min(1).optional(),
  level: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED']).optional(),
  search: z.string().trim().min(1).optional(),
  sort: z.enum(['recent', 'popular', 'rating']).optional().default('recent'),
});

// GET /api/courses
const getCourses = createValidatedHandler(
  { query: coursesQuerySchema },
  async (request: NextRequest) => {
    // Rate limiting
    const rateLimitResponse = await rateLimit(request);
    if (rateLimitResponse && rateLimitResponse.status === 429) return rateLimitResponse;

    const session = await getSessionFromRequest(request);
    if (!session) {
      throw createError.unauthorized();
    }

    try {
      const queryParams = Object.fromEntries(request.nextUrl.searchParams);
      const { 
        page = 1, 
        limit = 10, 
        category, 
        level, 
        search, 
        sort = 'recent' 
      } = coursesQuerySchema.parse(queryParams);

      // Build the where clause
      const where: Prisma.CourseWhereInput = {
        ...(category && { category }),
        ...(level && { level: level as Level }),
        ...(search && {
          OR: [
            { title: { contains: search, mode: Prisma.QueryMode.insensitive } },
            { description: { contains: search, mode: Prisma.QueryMode.insensitive } },
          ],
        }),
        status: Status.PUBLISHED,
        deletedAt: null,
      };

      // Determine sort order
      const orderBy: Prisma.CourseOrderByWithRelationInput[] = [];
      switch (sort) {
        case 'popular':
          orderBy.push({ students: 'desc' });
          break;
        case 'rating':
          orderBy.push({ rating: 'desc' });
          break;
        default:
          orderBy.push({ createdAt: 'desc' });
      }
      orderBy.push({ id: 'asc' }); // Ensure consistent ordering

      // Get total count for pagination
      const total = await prisma.course.count({ where });

      // Calculate pagination
      const totalPages = Math.ceil(total / Number(limit));
      const safePageNumber = Math.min(Math.max(1, Number(page)), totalPages || 1);
      const offset = (safePageNumber - 1) * Number(limit);

      // Get paginated results with optimized includes
      const courses = await prisma.course.findMany({
        where,
        include: {
          _count: {
            select: {
              enrollments: true,
              reviews: true,
            },
          },
        },
        skip: offset,
        take: Number(limit),
        orderBy,
      });

      // Cache the results if they're not user-specific
      const cacheControl = !session.userId ? 'public, max-age=300' : 'private, no-cache';

      log.info('Courses retrieved', {
        userId: session.userId,
        filters: { category, level, search, sort },
        results: courses.length,
        page: safePageNumber,
        totalPages,
      });

      const response = NextResponse.json({
        courses,
        pagination: {
          total,
          pages: totalPages,
          page: safePageNumber,
          limit,
          hasMore: safePageNumber < totalPages,
        },
      });

      response.headers.set('Cache-Control', cacheControl);
      return response;
    } catch (error) {
      log.error('Failed to retrieve courses', error as Error);
      
      if (error instanceof z.ZodError) {
        throw createError.validation('Invalid query parameters', error.errors);
      }
      
      if (error instanceof Error && error.name === 'PrismaClientKnownRequestError') {
        throw createError.internal('Database error occurred');
      }

      throw error;
    }
  }
);

// POST /api/courses
const createCourse = createValidatedHandler(
  { body: courseSchema },
  async (request: NextRequest) => {
    // CSRF protection
    const csrfResponse = await csrfMiddleware(request);
    if (csrfResponse && csrfResponse.status === 403) return csrfResponse;
    // Rate limiting
    const rateLimitResponse = await rateLimit(request);
    if (rateLimitResponse && rateLimitResponse.status === 429) return rateLimitResponse;

    const session = await getSessionFromRequest(request);
    if (!session) {
      throw createError.unauthorized();
    }

    if (!['admin', 'instructor'].includes(session.role)) {
      throw createError.forbidden('Only instructors or admins can create courses');
    }

    try {
      const body = await request.json();

      const course = await prisma.course.create({
        data: {
          ...body,
          instructorId: session.userId,
          createdBy: session.userId,
          updatedBy: session.userId,
        },
        include: {
          _count: {
            select: {
              enrollments: true,
              reviews: true,
            },
          },
        },
      });

      log.info('Course created', {
        userId: session.userId,
        courseId: course.id,
      });

      return NextResponse.json(course, { status: 201 });
    } catch (error) {
      log.error('Failed to create course', error as Error);

      if (error instanceof z.ZodError) {
        throw createError.validation('Invalid course data', error.errors);
      }

      if (error instanceof Error && error.name === 'PrismaClientKnownRequestError') {
        if ((error as any).code === 'P2002') {
          throw createError.conflict('A course with this title already exists');
        }
        throw createError.internal('Database error occurred');
      }

      throw error;
    }
  }
);

// Export the route handlers
export const GET = (req: NextRequest) => errorHandler(req, getCourses);
export const POST = (req: NextRequest) => errorHandler(req, createCourse); 