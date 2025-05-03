'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { Trophy, Clock, Target, TrendingUp, Award } from "lucide-react";

const timeSpentData = [
  { name: 'Week 1', hours: 12 },
  { name: 'Week 2', hours: 15 },
  { name: 'Week 3', hours: 10 },
  { name: 'Week 4', hours: 18 },
  { name: 'Week 5', hours: 14 },
  { name: 'Week 6', hours: 16 },
];

const learningPatternData = [
  { name: 'Morning', sessions: 45 },
  { name: 'Afternoon', sessions: 30 },
  { name: 'Evening', sessions: 60 },
  { name: 'Night', sessions: 25 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Course Analytics</h1>
          <p className="text-gray-500 mt-1">Track student progress and engagement</p>
        </div>
        <div className="flex gap-4">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Course" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Courses</SelectItem>
              <SelectItem value="course1">Web Development</SelectItem>
              <SelectItem value="course2">Data Science</SelectItem>
              <SelectItem value="course3">Mobile Development</SelectItem>
            </SelectContent>
          </Select>
          <Button>Export Report</Button>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Course Progress</CardTitle>
            <Target className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <div className="mt-2 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full" style={{ width: "85%" }} />
            </div>
            <p className="text-xs text-muted-foreground mt-2">15% remaining to complete</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Time Spent</CardTitle>
            <Clock className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85h</div>
            <p className="text-xs text-green-500">↑ 12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Achievements</CardTitle>
            <Trophy className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-yellow-500">3 new this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Learning Streak</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7 days</div>
            <p className="text-xs text-purple-500">Personal best!</p>
          </CardContent>
        </Card>
      </div>

      {/* Learning Patterns */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Time Spent Learning</CardTitle>
            <CardDescription>Weekly learning activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timeSpentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="hours" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Learning Pattern Distribution</CardTitle>
            <CardDescription>When you learn best</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={learningPatternData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="sessions"
                  >
                    {learningPatternData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-4 mt-4">
                {learningPatternData.map((entry, index) => (
                  <div key={entry.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                    <span className="text-sm">{entry.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Achievements and Badges */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Achievements</CardTitle>
          <CardDescription>Your learning milestones</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Quick Learner",
                description: "Completed 5 lessons in one day",
                icon: "🚀",
                date: "Today",
                color: "bg-blue-100",
              },
              {
                title: "Perfect Score",
                description: "100% on Advanced Topics Quiz",
                icon: "🎯",
                date: "Yesterday",
                color: "bg-green-100",
              },
              {
                title: "Helper",
                description: "Assisted 10 peers in discussions",
                icon: "🤝",
                date: "2 days ago",
                color: "bg-yellow-100",
              },
            ].map((achievement) => (
              <div key={achievement.title} className={`p-4 rounded-lg ${achievement.color}`}>
                <div className="text-2xl mb-2">{achievement.icon}</div>
                <h3 className="font-semibold">{achievement.title}</h3>
                <p className="text-sm text-gray-600">{achievement.description}</p>
                <p className="text-xs text-gray-500 mt-2">{achievement.date}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Personalized Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Personalized Learning Recommendations</CardTitle>
          <CardDescription>Based on your performance and interests</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                title: "Advanced JavaScript Concepts",
                type: "Course",
                reason: "Based on your strong performance in Basic JavaScript",
                priority: "High",
              },
              {
                title: "Database Design Principles",
                type: "Workshop",
                reason: "Complements your current backend development progress",
                priority: "Medium",
              },
              {
                title: "API Security Best Practices",
                type: "Resource",
                reason: "Area for improvement based on recent assessments",
                priority: "Low",
              },
            ].map((recommendation) => (
              <div key={recommendation.title} className="flex items-start space-x-4 p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{recommendation.title}</h3>
                    <Badge variant="outline">{recommendation.type}</Badge>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{recommendation.reason}</p>
                </div>
                <Badge
                  variant={
                    recommendation.priority === "High"
                      ? "destructive"
                      : recommendation.priority === "Medium"
                      ? "secondary"
                      : "outline"
                  }
                >
                  {recommendation.priority} Priority
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 