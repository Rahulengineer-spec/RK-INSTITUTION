"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface StatisticProps {
  value: number
  label: string
  suffix?: string
}

export function Statistic({ value, label, suffix = "+" }: StatisticProps) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const duration = 2000 // Animation duration in milliseconds
    const steps = 60 // Number of steps in the animation
    const increment = value / steps
    const interval = duration / steps

    let currentCount = 0
    const timer = setInterval(() => {
      currentCount += increment
      if (currentCount >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(currentCount))
      }
    }, interval)

    return () => clearInterval(timer)
  }, [value])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center p-4"
    >
      <div className="text-4xl font-bold text-white">
        {count.toLocaleString()}
        {suffix}
      </div>
      <div className="text-lg text-white/80">{label}</div>
    </motion.div>
  )
}

export function StatisticsCounter() {
  return (
    <div className="grid grid-cols-3 gap-4 mt-8">
      <Statistic value={5000} label="Students Enrolled" />
      <Statistic value={150} label="Expert Instructors" />
      <Statistic value={98} label="Success Rate" suffix="%" />
    </div>
  )
} 