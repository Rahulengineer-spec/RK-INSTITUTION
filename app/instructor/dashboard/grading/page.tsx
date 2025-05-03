import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, AlertCircle } from "lucide-react";

export default function GradingPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Automated Grading</h1>
        <div className="flex gap-4">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Assignment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Assignments</SelectItem>
              <SelectItem value="assignment1">Assignment 1</SelectItem>
              <SelectItem value="assignment2">Assignment 2</SelectItem>
              <SelectItem value="assignment3">Final Project</SelectItem>
            </SelectContent>
          </Select>
          <Button>Run Auto-Grader</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Grading</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">Submissions to grade</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Graded Today</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">Assignments graded</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Requires Review</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Manual review needed</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Submissions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Assignment</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Auto-Grade</TableHead>
                <TableHead>Final Grade</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                {
                  student: "John Doe",
                  assignment: "Assignment 1",
                  submitted: "2 hours ago",
                  status: "Graded",
                  autoGrade: "85%",
                  finalGrade: "88%",
                },
                {
                  student: "Jane Smith",
                  assignment: "Assignment 2",
                  submitted: "1 hour ago",
                  status: "Pending",
                  autoGrade: "Pending",
                  finalGrade: "-",
                },
                {
                  student: "Mike Johnson",
                  assignment: "Final Project",
                  submitted: "30 mins ago",
                  status: "Needs Review",
                  autoGrade: "72%",
                  finalGrade: "-",
                },
              ].map((submission, i) => (
                <TableRow key={i}>
                  <TableCell>{submission.student}</TableCell>
                  <TableCell>{submission.assignment}</TableCell>
                  <TableCell>{submission.submitted}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        submission.status === "Graded"
                          ? "secondary"
                          : submission.status === "Pending"
                          ? "outline"
                          : "destructive"
                      }
                    >
                      {submission.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{submission.autoGrade}</TableCell>
                  <TableCell>{submission.finalGrade}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">
                      Review
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Grading Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Common Issues</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-red-500"></span>
                    Missing test cases (15 instances)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-yellow-500"></span>
                    Incorrect function parameters (8 instances)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                    Code style violations (5 instances)
                  </li>
                </ul>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">Auto-Grader Accuracy</h3>
                <div className="text-2xl font-bold text-green-500">94%</div>
                <p className="text-sm text-gray-500">Based on manual reviews</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Grading Queue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  name: "Programming Assignment 2",
                  count: 15,
                  priority: "High",
                },
                {
                  name: "Mid-term Project",
                  count: 8,
                  priority: "Medium",
                },
                {
                  name: "Quiz 3",
                  count: 12,
                  priority: "Low",
                },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.count} submissions</p>
                  </div>
                  <Badge
                    variant={
                      item.priority === "High"
                        ? "destructive"
                        : item.priority === "Medium"
                        ? "secondary"
                        : "outline"
                    }
                  >
                    {item.priority}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 