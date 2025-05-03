import { prisma } from '@/lib/prisma';

export type EventType = 'COURSE_VIEW' | 'LESSON_COMPLETE' | 'COURSE_ENROLL' | 'COURSE_COMPLETE' | 'QUIZ_ATTEMPT' | 'QUIZ_COMPLETE';
type PaymentStatus = 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';

export class AnalyticsService {
  // Track user activity
  static async trackActivity(
    userId: string, 
    courseId: string, 
    eventType: EventType, 
    metadata?: Record<string, unknown>, 
    duration?: number
  ) {
    return await prisma.$queryRaw`
      INSERT INTO "UserActivity" ("id", "userId", "courseId", "eventType", "metadata", "duration", "createdAt")
      VALUES (gen_random_uuid(), ${userId}, ${courseId}, ${eventType}, ${metadata}, ${duration}, NOW())
      RETURNING *
    `;
  }

  // Update learning progress
  static async updateProgress(
    userId: string, 
    courseId: string, 
    completedUnits: number, 
    totalUnits: number
  ) {
    const progress = await prisma.$queryRaw`
      INSERT INTO "LearningProgress" ("id", "userId", "courseId", "completedUnits", "totalUnits", "lastAccessed", "completedAt")
      VALUES (
        gen_random_uuid(),
        ${userId},
        ${courseId},
        ${completedUnits},
        ${totalUnits},
        NOW(),
        ${completedUnits === totalUnits ? new Date() : null}
      )
      ON CONFLICT ("userId", "courseId")
      DO UPDATE SET
        "completedUnits" = ${completedUnits},
        "totalUnits" = ${totalUnits},
        "lastAccessed" = NOW(),
        "completedAt" = ${completedUnits === totalUnits ? new Date() : null}
      RETURNING *
    `;

    // Update engagement metrics
    await this.updateEngagementMetrics(courseId);
    
    return progress;
  }

  // Record revenue transaction
  static async recordTransaction(
    userId: string,
    courseId: string,
    amount: number,
    currency: string,
    provider: string,
    status: PaymentStatus,
    metadata?: Record<string, unknown>
  ) {
    const transaction = await prisma.$queryRaw`
      INSERT INTO "RevenueTransaction" (
        "id", "userId", "courseId", "amount", "currency", "provider", "status", "metadata", "createdAt"
      )
      VALUES (
        gen_random_uuid(),
        ${userId},
        ${courseId},
        ${amount},
        ${currency},
        ${provider},
        ${status},
        ${metadata},
        NOW()
      )
      RETURNING *
    `;

    // Update engagement metrics with new revenue
    if (status === 'COMPLETED') {
      await this.updateEngagementMetrics(courseId);
    }

    return transaction;
  }

  // Update engagement metrics for a course
  static async updateEngagementMetrics(courseId: string) {
    const [enrollments, activeUsers, completions, revenue, ratings] = await Promise.all([
      prisma.$queryRaw<[{ count: number }]>`
        SELECT COUNT(*) as count FROM "Enrollment" WHERE "courseId" = ${courseId}
      `,
      prisma.$queryRaw<[{ count: number }]>`
        SELECT COUNT(DISTINCT "userId") as count
        FROM "UserActivity"
        WHERE "courseId" = ${courseId}
        AND "createdAt" >= NOW() - INTERVAL '30 days'
      `,
      prisma.$queryRaw<[{ count: number }]>`
        SELECT COUNT(*) as count
        FROM "LearningProgress"
        WHERE "courseId" = ${courseId} AND "completedAt" IS NOT NULL
      `,
      prisma.$queryRaw<[{ sum: number }]>`
        SELECT COALESCE(SUM("amount"), 0) as sum
        FROM "RevenueTransaction"
        WHERE "courseId" = ${courseId} AND "status" = 'COMPLETED'
      `,
      prisma.$queryRaw<[{ avg: number }]>`
        SELECT COALESCE(AVG("rating"), 0) as avg
        FROM "Review"
        WHERE "courseId" = ${courseId}
      `,
    ]);

    return await prisma.$queryRaw`
      INSERT INTO "EngagementMetric" (
        "id",
        "courseId",
        "totalEnrollments",
        "activeUsers",
        "completionRate",
        "averageRating",
        "totalRevenue",
        "updatedAt"
      )
      VALUES (
        gen_random_uuid(),
        ${courseId},
        ${enrollments[0].count},
        ${activeUsers[0].count},
        ${enrollments[0].count > 0 ? (completions[0].count / enrollments[0].count) * 100 : 0},
        ${ratings[0].avg},
        ${revenue[0].sum},
        NOW()
      )
      ON CONFLICT ("courseId")
      DO UPDATE SET
        "totalEnrollments" = ${enrollments[0].count},
        "activeUsers" = ${activeUsers[0].count},
        "completionRate" = ${enrollments[0].count > 0 ? (completions[0].count / enrollments[0].count) * 100 : 0},
        "averageRating" = ${ratings[0].avg},
        "totalRevenue" = ${revenue[0].sum},
        "updatedAt" = NOW()
      RETURNING *
    `;
  }

  // Get analytics dashboard data
  static async getDashboardMetrics(courseId?: string): Promise<{
    recentActivity: Array<{
      id: string;
      userId: string;
      courseId: string;
      eventType: EventType;
      metadata: any;
      duration: number | null;
      createdAt: Date;
      userName: string;
      userEmail: string;
      courseTitle: string;
    }>;
    progressStats: Array<{
      courseId: string;
      avgCompletedUnits: number;
      totalCount: number;
    }>;
    revenueStats: Array<{
      courseId: string;
      totalAmount: number;
      createdAt: Date;
    }>;
    topCourses: Array<{
      id: string;
      courseId: string;
      totalEnrollments: number;
      activeUsers: number;
      completionRate: number;
      averageRating: number;
      totalRevenue: number;
      courseTitle: string;
    }>;
  }> {
    const [recentActivity, progressStats, revenueStats, topCourses] = await Promise.all([
      prisma.$queryRaw`
        SELECT
          ua.*,
          u.name as "userName",
          u.email as "userEmail",
          c.title as "courseTitle"
        FROM "UserActivity" ua
        JOIN "User" u ON ua."userId" = u.id
        JOIN "Course" c ON ua."courseId" = c.id
        ${courseId ? `WHERE ua."courseId" = ${courseId}` : ''}
        ORDER BY ua."createdAt" DESC
        LIMIT 10
      ` as Promise<Array<{
        id: string;
        userId: string;
        courseId: string;
        eventType: EventType;
        metadata: any;
        duration: number | null;
        createdAt: Date;
        userName: string;
        userEmail: string;
        courseTitle: string;
      }>>,
      prisma.$queryRaw`
        SELECT
          "courseId",
          AVG("completedUnits") as "avgCompletedUnits",
          COUNT(*) as "totalCount"
        FROM "LearningProgress"
        ${courseId ? `WHERE "courseId" = ${courseId}` : ''}
        GROUP BY "courseId"
      ` as Promise<Array<{
        courseId: string;
        avgCompletedUnits: number;
        totalCount: number;
      }>>,
      prisma.$queryRaw`
        SELECT
          "courseId",
          SUM(amount) as "totalAmount",
          MAX(createdAt) as "createdAt"
        FROM "RevenueTransaction"
        WHERE status = 'COMPLETED'
        ${courseId ? `AND "courseId" = ${courseId}` : ''}
        GROUP BY "courseId"
      ` as Promise<Array<{
        courseId: string;
        totalAmount: number;
        createdAt: Date;
      }>>,
      prisma.$queryRaw`
        SELECT
          em.*,
          c.title as "courseTitle"
        FROM "EngagementMetric" em
        JOIN "Course" c ON em."courseId" = c.id
        ${courseId ? `WHERE em."courseId" = ${courseId}` : ''}
        ORDER BY em."totalRevenue" DESC
        LIMIT 5
      ` as Promise<Array<{
        id: string;
        courseId: string;
        totalEnrollments: number;
        activeUsers: number;
        completionRate: number;
        averageRating: number;
        totalRevenue: number;
        courseTitle: string;
      }>>,
    ]);

    return {
      recentActivity,
      progressStats,
      revenueStats,
      topCourses,
    };
  }
}