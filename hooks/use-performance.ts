import { useEffect, useState } from 'react'

interface PerformanceMetrics {
  fcp: number | null
  lcp: number | null
  fid: number | null
  cls: number | null
  ttfb: number | null
}

export function usePerformance() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fcp: null,
    lcp: null,
    fid: null,
    cls: null,
    ttfb: null
  })

  useEffect(() => {
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      // First Contentful Paint
      const fcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries()
        const fcp = entries[0]?.startTime
        if (fcp) setMetrics(prev => ({ ...prev, fcp }))
      })
      fcpObserver.observe({ entryTypes: ['paint'] })

      // Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries()
        const lcp = entries[entries.length - 1]?.startTime
        if (lcp) setMetrics(prev => ({ ...prev, lcp }))
      })
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })

      // First Input Delay
      const fidObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries()
        const fid = entries[0]?.processingStart - entries[0]?.startTime
        if (fid) setMetrics(prev => ({ ...prev, fid }))
      })
      fidObserver.observe({ entryTypes: ['first-input'] })

      // Cumulative Layout Shift
      const clsObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries()
        const cls = entries.reduce((acc, entry) => acc + (entry as any).value, 0)
        if (cls) setMetrics(prev => ({ ...prev, cls }))
      })
      clsObserver.observe({ entryTypes: ['layout-shift'] })

      // Time to First Byte
      const ttfb = performance.timing.responseStart - performance.timing.requestStart
      if (ttfb) setMetrics(prev => ({ ...prev, ttfb }))

      return () => {
        fcpObserver.disconnect()
        lcpObserver.disconnect()
        fidObserver.disconnect()
        clsObserver.disconnect()
      }
    }
  }, [])

  return metrics
} 