import { NextRequest } from 'next/server';
import { GET, POST } from './route';
import { prisma } from '@/lib/prisma';
import { sessionStore } from '@/lib/session';

// Mock dependencies
jest.mock('@/lib/prisma', () => ({
  prisma: {
    course: {
      count: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
    },
  },
}));

jest.mock('@/lib/session', () => ({
  sessionStore: {
    getSession: jest.fn(),
  },
  getSessionFromRequest: jest.fn(),
}));

describe('Courses API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/courses', () => {
    it('should return unauthorized when no session exists', async () => {
      // Mock session
      (sessionStore.getSession as jest.Mock).mockResolvedValue(null);

      // Create request
      const req = new NextRequest('http://localhost:3000/api/courses');

      // Execute request
      const response = await GET(req);
      expect(response.status).toBe(401);
      
      const data = await response.json();
      expect(data.error.message).toBe('Unauthorized access');
    });

    it('should return courses with pagination', async () => {
      // Mock session
      (sessionStore.getSession as jest.Mock).mockResolvedValue({
        userId: '123',
        role: 'user',
      });

      // Mock prisma responses
      (prisma.course.count as jest.Mock).mockResolvedValue(20);
      (prisma.course.findMany as jest.Mock).mockResolvedValue([
        {
          id: '1',
          title: 'Test Course',
          description: 'Test Description',
          instructor: {
            id: '123',
            name: 'Test Instructor',
          },
          _count: {
            enrollments: 10,
            reviews: 5,
          },
        },
      ]);

      // Create request
      const req = new NextRequest('http://localhost:3000/api/courses?page=1&limit=10');

      // Execute request
      const response = await GET(req);
      expect(response.status).toBe(200);
      
      const data = await response.json();
      expect(data.courses).toHaveLength(1);
      expect(data.pagination).toEqual({
        total: 20,
        pages: 2,
        page: 1,
        limit: 10,
      });
    });

    it('should handle search and filters', async () => {
      // Mock session
      (sessionStore.getSession as jest.Mock).mockResolvedValue({
        userId: '123',
        role: 'user',
      });

      // Create request with filters
      const req = new NextRequest(
        'http://localhost:3000/api/courses?search=test&category=programming&level=beginner'
      );

      // Execute request
      await GET(req);

      // Assert prisma was called with correct filters
      expect(prisma.course.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            category: 'programming',
            level: 'beginner',
            OR: [
              { title: { contains: 'test', mode: 'insensitive' } },
              { description: { contains: 'test', mode: 'insensitive' } },
            ],
          }),
        })
      );
    });
  });

  describe('POST /api/courses', () => {
    it('should return unauthorized when no session exists', async () => {
      // Mock session
      (sessionStore.getSession as jest.Mock).mockResolvedValue(null);

      // Create request
      const req = new NextRequest('http://localhost:3000/api/courses', {
        method: 'POST',
        body: JSON.stringify({}),
      });

      // Execute request
      const response = await POST(req);
      expect(response.status).toBe(401);
      
      const data = await response.json();
      expect(data.error.message).toBe('Unauthorized access');
    });

    it('should return forbidden when user is not an instructor', async () => {
      // Mock session
      (sessionStore.getSession as jest.Mock).mockResolvedValue({
        userId: '123',
        role: 'user',
      });

      // Create request
      const req = new NextRequest('http://localhost:3000/api/courses', {
        method: 'POST',
        body: JSON.stringify({}),
      });

      // Execute request
      const response = await POST(req);
      expect(response.status).toBe(403);
      
      const data = await response.json();
      expect(data.error.message).toBe('Only instructors can create courses');
    });

    it('should create a course when valid data is provided', async () => {
      // Mock session
      (sessionStore.getSession as jest.Mock).mockResolvedValue({
        userId: '123',
        role: 'instructor',
      });

      // Mock course creation
      const mockCourse = {
        id: '1',
        title: 'New Course',
        description: 'Course Description',
        instructor: {
          id: '123',
          name: 'Test Instructor',
        },
      };
      (prisma.course.create as jest.Mock).mockResolvedValue(mockCourse);

      // Create request
      const courseData = {
        title: 'New Course',
        description: 'Course Description',
        price: 99.99,
        duration: 120,
        level: 'beginner',
        category: 'programming',
        tags: ['javascript', 'react'],
      };
      const req = new NextRequest('http://localhost:3000/api/courses', {
        method: 'POST',
        body: JSON.stringify(courseData),
      });

      // Execute request
      const response = await POST(req);
      expect(response.status).toBe(201);
      
      const data = await response.json();
      expect(data).toEqual(mockCourse);
      expect(prisma.course.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            ...courseData,
            instructorId: '123',
          }),
        })
      );
    });

    it('should validate course data', async () => {
      // Mock session
      (sessionStore.getSession as jest.Mock).mockResolvedValue({
        userId: '123',
        role: 'instructor',
      });

      // Create request with invalid data
      const req = new NextRequest('http://localhost:3000/api/courses', {
        method: 'POST',
        body: JSON.stringify({
          title: 'A', // Too short
          price: -10, // Invalid price
        }),
      });

      // Execute request
      const response = await POST(req);
      expect(response.status).toBe(400);
      
      const data = await response.json();
      expect(data.error.message).toBe('Validation failed');
      expect(data.error.details).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            message: expect.any(String),
          }),
        ])
      );
    });
  });
}); 