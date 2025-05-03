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
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function OfficeHoursPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Office Hours</h1>
        <Button>
          Schedule New Session
        </Button>
      </div>

      <Tabs defaultValue="calendar" className="space-y-4">
        <TabsList>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="requests">Student Requests</TabsTrigger>
        </TabsList>

        <TabsContent value="calendar" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-[300px_1fr]">
            <Card>
              <CardHeader>
                <CardTitle>Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar mode="single" className="rounded-md border" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Scheduled Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      time: "9:00 AM - 10:00 AM",
                      students: 3,
                      topic: "Project Discussion",
                      status: "Upcoming",
                    },
                    {
                      time: "2:00 PM - 3:00 PM",
                      students: 2,
                      topic: "Assignment Help",
                      status: "Upcoming",
                    },
                    {
                      time: "4:00 PM - 5:00 PM",
                      students: 1,
                      topic: "General Questions",
                      status: "Available",
                    },
                  ].map((session, i) => (
                    <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <p className="font-medium">{session.time}</p>
                        <p className="text-sm text-gray-500">{session.topic}</p>
                        <p className="text-sm text-gray-500">{session.students} students booked</p>
                      </div>
                      <div className="space-y-2">
                        <Badge variant={session.status === "Available" ? "outline" : "secondary"}>
                          {session.status}
                        </Badge>
                        <Button variant="outline" size="sm" className="w-full">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle>All Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Topic</TableHead>
                    <TableHead>Students</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      date: "2024-02-20",
                      time: "9:00 AM - 10:00 AM",
                      topic: "Project Discussion",
                      students: 3,
                      status: "Scheduled",
                    },
                    {
                      date: "2024-02-20",
                      time: "2:00 PM - 3:00 PM",
                      topic: "Assignment Help",
                      students: 2,
                      status: "Scheduled",
                    },
                    {
                      date: "2024-02-21",
                      time: "4:00 PM - 5:00 PM",
                      topic: "General Questions",
                      students: 0,
                      status: "Available",
                    },
                  ].map((session, i) => (
                    <TableRow key={i}>
                      <TableCell>{session.date}</TableCell>
                      <TableCell>{session.time}</TableCell>
                      <TableCell>{session.topic}</TableCell>
                      <TableCell>{session.students}</TableCell>
                      <TableCell>
                        <Badge variant={session.status === "Available" ? "outline" : "secondary"}>
                          {session.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">
                          Manage
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="requests">
          <Card>
            <CardHeader>
              <CardTitle>Student Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    student: "Alice Johnson",
                    topic: "Project Guidance",
                    preferredTime: "Morning",
                    urgency: "High",
                  },
                  {
                    student: "Bob Smith",
                    topic: "Assignment Clarification",
                    preferredTime: "Afternoon",
                    urgency: "Medium",
                  },
                  {
                    student: "Carol White",
                    topic: "Course Material Discussion",
                    preferredTime: "Evening",
                    urgency: "Low",
                  },
                ].map((request, i) => (
                  <div key={i} className="p-4 border rounded-lg space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{request.student}</h3>
                        <p className="text-sm text-gray-500">{request.topic}</p>
                        <p className="text-sm text-gray-500">Preferred Time: {request.preferredTime}</p>
                      </div>
                      <Badge
                        variant={
                          request.urgency === "High"
                            ? "destructive"
                            : request.urgency === "Medium"
                            ? "secondary"
                            : "outline"
                        }
                      >
                        {request.urgency}
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Schedule</Button>
                      <Button variant="ghost" size="sm">Message</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 