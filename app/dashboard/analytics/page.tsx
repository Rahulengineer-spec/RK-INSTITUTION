import { Suspense } from 'react';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { AnalyticsService } from '@/lib/analytics';
import type { EventType } from '@/lib/analytics';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Download, Printer } from "lucide-react"
import { Icons } from "@/components/icons"
import { formatDistance } from 'date-fns';

// Dynamically import charts for better initial load time
const BarChart = dynamic(() => import('@/components/ui/charts').then(mod => mod.BarChart), {
  ssr: false,
  loading: () => (
    <div className="h-[300px] flex items-center justify-center" aria-label="Loading chart">
      Loading chart...
    </div>
  )
});

const LineChart = dynamic(() => import('@/components/ui/charts').then(mod => mod.LineChart), {
  ssr: false,
  loading: () => (
    <div className="h-[300px] flex items-center justify-center" aria-label="Loading chart">
      Loading chart...
    </div>
  )
});

// Add metadata for SEO
export const metadata: Metadata = {
  title: 'Analytics Dashboard | Your Platform Name',
  description: 'Comprehensive analytics dashboard showing course performance, revenue metrics, and user engagement statistics.',
  openGraph: {
    title: 'Analytics Dashboard | Your Platform Name',
    description: 'Track your course performance and user engagement metrics in real-time.',
    type: 'website',
  },
};

// Data export functions
const exportToCSV = (data: any[], filename: string) => {
  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => headers.map(header => JSON.stringify(row[header])).join(','))
  ].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${filename}.csv`;
  link.click();
};

// Prefetch data for common paths
export const generateStaticParams = async () => {
  await AnalyticsService.getDashboardMetrics();
  return [];
};

// Loading component for better UX
function LoadingState() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 animate-pulse">
      {[...Array(4)].map((_, i) => (
        <Card key={i}>
          <CardHeader>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2 mt-2"></div>
          </CardHeader>
          <CardContent>
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

interface User {
  name: string;
  email: string;
}

interface Course {
  title: string;
}

interface ExtendedUserActivity {
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
}

interface ExtendedEngagementMetric {
  id: string;
  courseId: string;
  totalEnrollments: number;
  activeUsers: number;
  completionRate: number;
  averageRating: number;
  totalRevenue: number;
  courseTitle: string;
}

interface DashboardMetrics {
  recentActivity: ExtendedUserActivity[];
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
  topCourses: ExtendedEngagementMetric[];
}

async function AnalyticsDashboard() {
  const metrics: DashboardMetrics = await AnalyticsService.getDashboardMetrics();

  const totalRevenue = metrics.revenueStats.reduce(
    (acc, stat) => acc + (stat.totalAmount ?? 0),
    0
  );

  const totalActiveUsers = metrics.topCourses.reduce(
    (acc, course) => acc + course.activeUsers,
    0
  );

  const averageCompletionRate = metrics.topCourses.length
    ? metrics.topCourses.reduce((acc, course) => acc + course.completionRate, 0) /
      metrics.topCourses.length
    : 0;

  const totalEnrollments = metrics.topCourses.reduce(
    (acc, course) => acc + course.totalEnrollments,
    0
  );

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <div className="col-span-full flex justify-end gap-2 mb-4">
        <Button
          onClick={() => exportToCSV(metrics.topCourses, 'course-analytics')}
          className="flex items-center gap-2"
          aria-label="Export data as CSV"
        >
          <Download className="w-4 h-4" />
          Export CSV
        </Button>
        <Button
          onClick={() => window.print()}
          className="flex items-center gap-2"
          aria-label="Print dashboard"
        >
          <Printer className="w-4 h-4" />
          Print
        </Button>
      </div>

      {/* Overview Cards */}
      <Card role="region" aria-label="Total Revenue Statistics">
        <CardHeader>
          <CardTitle>Total Revenue</CardTitle>
          <CardDescription>Across all courses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold" aria-live="polite">
            ${totalRevenue.toFixed(2)}
          </div>
        </CardContent>
      </Card>

      <Card role="region" aria-label="Active Users Statistics">
        <CardHeader>
          <CardTitle>Active Users</CardTitle>
          <CardDescription>Last 30 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold" aria-live="polite">
            {totalActiveUsers}
          </div>
        </CardContent>
      </Card>

      <Card role="region" aria-label="Average Completion Statistics">
        <CardHeader>
          <CardTitle>Average Completion</CardTitle>
          <CardDescription>Across all courses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold" aria-live="polite">
            {averageCompletionRate.toFixed(1)}%
          </div>
        </CardContent>
      </Card>

      <Card role="region" aria-label="Total Enrollments Statistics">
        <CardHeader>
          <CardTitle>Total Enrollments</CardTitle>
          <CardDescription>All time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold" aria-live="polite">
            {totalEnrollments}
          </div>
        </CardContent>
      </Card>

      {/* Charts */}
      <Card className="col-span-2" role="region" aria-label="Revenue Over Time Chart">
        <CardHeader>
          <CardTitle>Revenue Over Time</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <LineChart
            data={metrics.revenueStats.map((stat) => ({
              date: new Date(stat.createdAt),
              amount: stat.totalAmount ?? 0
            }))}
            xField="date"
            yField="amount"
            aria-label="Line chart showing revenue trends over time"
          />
        </CardContent>
      </Card>

      <Card className="col-span-2" role="region" aria-label="Course Completion Rates Chart">
        <CardHeader>
          <CardTitle>Course Completion Rates</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <BarChart
            data={metrics.topCourses.map(course => ({
              course: course.courseTitle,
              rate: course.completionRate
            }))}
            xField="course"
            yField="rate"
            aria-label="Bar chart showing completion rates by course"
          />
        </CardContent>
      </Card>

      {/* Recent Activity Table */}
      <Card className="col-span-4" role="region" aria-label="Recent Activity Table">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Activity</CardTitle>
          <Button
            onClick={() => exportToCSV(metrics.recentActivity, 'recent-activity')}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
            aria-label="Export recent activity data"
          >
            <Download className="w-4 h-4" />
            Export
          </Button>
        </CardHeader>
        <CardContent>
          <Table aria-label="Recent user activity">
            <TableHeader>
              <TableRow>
                <TableHead scope="col">User</TableHead>
                <TableHead scope="col">Course</TableHead>
                <TableHead scope="col">Activity</TableHead>
                <TableHead scope="col">Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {metrics.recentActivity.map((activity) => (
                <TableRow key={activity.id}>
                  <TableCell>{activity.userName}</TableCell>
                  <TableCell>{activity.courseTitle}</TableCell>
                  <TableCell>{activity.eventType}</TableCell>
                  <TableCell>
                    {formatDistance(new Date(activity.createdAt), new Date(), { addSuffix: true })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Top Performing Courses */}
      <Card className="col-span-4" role="region" aria-label="Top Performing Courses Table">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Top Performing Courses</CardTitle>
          <Button
            onClick={() => exportToCSV(metrics.topCourses, 'top-courses')}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
            aria-label="Export top courses data"
          >
            <Download className="w-4 h-4" />
            Export
          </Button>
        </CardHeader>
        <CardContent>
          <Table aria-label="Top performing courses">
            <TableHeader>
              <TableRow>
                <TableHead scope="col">Course</TableHead>
                <TableHead scope="col">Revenue</TableHead>
                <TableHead scope="col">Enrollments</TableHead>
                <TableHead scope="col">Completion Rate</TableHead>
                <TableHead scope="col">Rating</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {metrics.topCourses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell>{course.courseTitle}</TableCell>
                  <TableCell>${(course.totalRevenue ?? 0).toFixed(2)}</TableCell>
                  <TableCell>{course.totalEnrollments}</TableCell>
                  <TableCell>{course.completionRate.toFixed(1)}%</TableCell>
                  <TableCell>{course.averageRating.toFixed(1)}/5</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export default function AnalyticsPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8" tabIndex={0}>Analytics Dashboard</h1>
      <Suspense fallback={<LoadingState />}>
        <AnalyticsDashboard />
      </Suspense>
    </div>
  );
} 