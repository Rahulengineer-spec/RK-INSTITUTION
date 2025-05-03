'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import { 
  BookOpen, 
  Clock, 
  Calendar as CalendarIcon, 
  Users, 
  Bell,
  Trophy,
  ArrowRight,
  Plus
} from "lucide-react";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';

// Sample data for charts
const peerComparisonData = [
  { subject: 'Quiz Scores', yourScore: 85, averageScore: 78 },
  { subject: 'Assignments', yourScore: 92, averageScore: 85 },
  { subject: 'Participation', yourScore: 88, averageScore: 80 },
  { subject: 'Projects', yourScore: 95, averageScore: 82 },
];

const weeklyProgressData = [
  { day: 'Mon', hours: 2.5 },
  { day: 'Tue', hours: 3.0 },
  { day: 'Wed', hours: 1.5 },
  { day: 'Thu', hours: 4.0 },
  { day: 'Fri', hours: 2.0 },
  { day: 'Sat', hours: 3.5 },
  { day: 'Sun', hours: 1.0 },
];

export default function StudentDashboard() {
  const [notifOpen, setNotifOpen] = useState(false);
  const router = useRouter();
  return (
    <div className="space-y-6" aria-label="Student Dashboard" role="main">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Student Dashboard</h1>
          <p className="text-gray-500 mt-1">Track your progress and manage your studies</p>
        </div>
        <DropdownMenu open={notifOpen} onOpenChange={setNotifOpen}>
          <DropdownMenuTrigger asChild>
            <Button aria-label="Open notifications">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>No new notifications</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Continue Learning Section */}
      <div className="space-y-4" aria-label="Continue Learning">
        <h2 className="text-xl font-semibold">Continue Learning</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Advanced Web Development",
              progress: 65,
              lastAccessed: "2 hours ago",
              nextLesson: "React Hooks",
              route: "/courses/1"
            },
            {
              title: "Data Structures",
              progress: 42,
              lastAccessed: "Yesterday",
              nextLesson: "Binary Trees",
              route: "/courses/2"
            },
            {
              title: "UI/UX Design",
              progress: 89,
              lastAccessed: "3 days ago",
              nextLesson: "User Research",
              route: "/courses/3"
            },
          ].map((course) => (
            <Card key={course.title} tabIndex={0} aria-label={course.title} role="region">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{course.title}</CardTitle>
                <CardDescription>{course.nextLesson}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Progress value={course.progress} className="h-2" />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>{course.progress}% complete</span>
                    <span>{course.lastAccessed}</span>
                  </div>
                  <Button className="w-full mt-2" variant="outline" onClick={() => router.push(course.route)}>
                    Continue <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Study Planner and Deadlines */}
      <div className="grid gap-4 md:grid-cols-[350px_1fr]" aria-label="Study Planner and Deadlines">
        <Card tabIndex={0} aria-label="Study Calendar" role="region">
          <CardHeader>
            <CardTitle>Study Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar className="rounded-md border" />
            <Button className="w-full mt-4" onClick={() => alert('Open add study session modal')}>
              <Plus className="w-4 h-4 mr-2" />
              Add Study Session
            </Button>
          </CardContent>
        </Card>

        <Card tabIndex={0} aria-label="Upcoming Deadlines" role="region">
          <CardHeader>
            <CardTitle>Upcoming Deadlines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  title: "Project Submission",
                  course: "Advanced Web Development",
                  deadline: "Tomorrow, 11:59 PM",
                  priority: "high",
                },
                {
                  title: "Quiz",
                  course: "Data Structures",
                  deadline: "In 3 days",
                  priority: "medium",
                },
                {
                  title: "Group Presentation",
                  course: "UI/UX Design",
                  deadline: "Next week",
                  priority: "low",
                },
              ].map((task) => (
                <div key={task.title} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <h3 className="font-semibold">{task.title}</h3>
                    <p className="text-sm text-gray-500">{task.course}</p>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-500">{task.deadline}</span>
                    </div>
                  </div>
                  <Badge variant={
                    task.priority === "high" ? "error" :
                    task.priority === "medium" ? "warning" :
                    "default"
                  }>
                    {task.priority}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Peer Comparison and Progress */}
      <div className="grid gap-4 md:grid-cols-2" aria-label="Peer Comparison and Progress">
        <Card tabIndex={0} aria-label="Performance Comparison" role="region">
          <CardHeader>
            <CardTitle>Performance Comparison</CardTitle>
            <CardDescription>Your performance relative to class average</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={peerComparisonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="subject" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="yourScore" fill="#8884d8" name="Your Score" />
                  <Bar dataKey="averageScore" fill="#82ca9d" name="Class Average" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card tabIndex={0} aria-label="Weekly Study Progress" role="region">
          <CardHeader>
            <CardTitle>Weekly Study Progress</CardTitle>
            <CardDescription>Hours spent studying this week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyProgressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="hours" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Study Groups and Collaboration */}
      <Card tabIndex={0} aria-label="Study Groups" role="region">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Study Groups</CardTitle>
              <CardDescription>Join or create study groups</CardDescription>
            </div>
            <Button onClick={() => alert('Open create group modal')}>
              <Plus className="w-4 h-4 mr-2" />
              Create Group
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                name: "Web Dev Warriors",
                members: 5,
                course: "Advanced Web Development",
                nextMeeting: "Today, 4:00 PM",
                status: "active",
              },
              {
                name: "Algorithm Study Group",
                members: 4,
                course: "Data Structures",
                nextMeeting: "Tomorrow, 2:00 PM",
                status: "open",
              },
              {
                name: "Design Thinkers",
                members: 6,
                course: "UI/UX Design",
                nextMeeting: "Wednesday, 3:00 PM",
                status: "active",
              },
            ].map((group) => (
              <Card key={group.name} tabIndex={0} aria-label={group.name} role="region">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{group.name}</CardTitle>
                  <CardDescription>{group.course}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-500">{group.members} members</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-500">{group.nextMeeting}</span>
                    </div>
                    <Button className="w-full mt-2" variant={group.status === "active" ? "outline" : "default"} onClick={() => alert(group.status === "active" ? 'View group' : 'Join group')}>
                      {group.status === "active" ? "View Group" : "Join Group"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 