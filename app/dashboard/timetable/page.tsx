"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const scheduleData = [
  {
    id: 1,
    subject: "Mathematics",
    time: "09:00 AM - 10:30 AM",
    room: "Room 101",
    instructor: "Dr. Smith",
  },
  {
    id: 2,
    subject: "Physics",
    time: "11:00 AM - 12:30 PM",
    room: "Room 202",
    instructor: "Prof. Johnson",
  },
  {
    id: 3,
    subject: "Computer Science",
    time: "02:00 PM - 03:30 PM",
    room: "Lab 301",
    instructor: "Dr. Williams",
  },
]

export default function TimetablePage() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold tracking-tight">Class Schedule</h1>
      <div className="grid gap-8 md:grid-cols-[300px_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Daily Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {scheduleData.map((schedule) => (
                <div
                  key={schedule.id}
                  className="flex flex-col space-y-2 rounded-lg border p-4"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{schedule.subject}</h3>
                    <span className="text-sm text-muted-foreground">
                      {schedule.time}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <p>Room: {schedule.room}</p>
                    <p>Instructor: {schedule.instructor}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}