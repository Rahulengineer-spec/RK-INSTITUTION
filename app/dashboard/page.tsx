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
import { GuidedTour } from '@/components/ui/guided-tour'
import StudentDashboard from './student/page'
import AnalyticsPage from './analytics/page'
import { Skeleton } from '@/components/ui/skeleton'

export default function DashboardPage() {
  const { supabase, session } = useSupabase()
  const [loading, setLoading] = useState(true)
  const [role, setRole] = useState<string | null>(null)
  const [stats, setStats] = useState({
    totalCourses: 0,
    completedCourses: 0,
    totalFees: 0,
    paidFees: 0,
  })
  const [showTour, setShowTour] = useState(true)
  const steps = [
    { target: '.dashboard-nav', content: 'This is your main navigation.' },
    { target: '.profile-widget', content: 'Access your profile here.' },
    { target: '.courses-section', content: 'Browse your courses here.' },
  ]

  useEffect(() => {
    async function fetchRole() {
      if (!session?.user.id) return;
      const { data } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single();
      setRole(data?.role || null);
      setLoading(false);
    }
    fetchRole();
  }, [session, supabase]);

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
    return <Skeleton className="h-8 w-full" />;
  }

  return (
    <>
      {showTour && <GuidedTour steps={steps} run={showTour} onClose={() => setShowTour(false)} />}
      {role === 'student' && <StudentDashboard />}
      {(role === 'instructor' || role === 'admin') && <AnalyticsPage />}
      {!role && <div className="text-center text-muted-foreground">Unknown role. Please contact support.</div>}
    </>
  )
}