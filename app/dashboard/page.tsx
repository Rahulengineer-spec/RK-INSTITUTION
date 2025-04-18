"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useSupabase } from "@/components/providers/supabase-provider"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

export default function DashboardPage() {
  const { supabase, session } = useSupabase()
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalCourses: 0,
    completedCourses: 0,
    totalFees: 0,
    paidFees: 0,
  })

  useEffect(() => {
    async function loadStats() {
      if (!session?.user.id) return

      const [enrollments, payments] = await Promise.all([
        supabase
          .from("enrollments")
          .select("*")
          .eq("student_id", session.user.id),
        supabase
          .from("payments")
          .select("*")
          .eq("student_id", session.user.id),
      ])

      setStats({
        totalCourses: enrollments.data?.length || 0,
        completedCourses: enrollments.data?.filter(e => e.progress === 100).length || 0,
        totalFees: payments.data?.reduce((acc, p) => acc + Number(p.amount), 0) || 0,
        paidFees: payments.data?.filter(p => p.status === "paid")
          .reduce((acc, p) => acc + Number(p.amount), 0) || 0,
      })
      setLoading(false)
    }

    loadStats()
  }, [session, supabase])

  const progressData = [
    { name: "Week 1", progress: 20 },
    { name: "Week 2", progress: 40 },
    { name: "Week 3", progress: 55 },
    { name: "Week 4", progress: 75 },
    { name: "Week 5", progress: 90 },
  ]

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCourses}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completedCourses}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Fees</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalFees}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Paid Fees</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.paidFees}</div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Course Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="progress"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}