'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Users, BookOpen, Calendar } from "lucide-react";

export default function InstructorDashboard() {
  const stats = [
    {
      title: "Total Students",
      value: "150",
      icon: Users,
      description: "Active students in your courses",
    },
    {
      title: "Active Courses",
      value: "4",
      icon: BookOpen,
      description: "Courses you're currently teaching",
    },
    {
      title: "Office Hours",
      value: "8",
      icon: Calendar,
      description: "Upcoming sessions this week",
    },
    {
      title: "Course Completion",
      value: "85%",
      icon: BarChart3,
      description: "Average completion rate",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's an overview of your teaching activities.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
} 