export function measurePerformance(metricName: string): () => void {
  if (typeof performance === 'undefined') return () => {};

  const start = performance.now();
  return () => {
    const end = performance.now();
    const duration = end - start;

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`${metricName}: ${duration.toFixed(2)}ms`);
    }

    // Report to analytics in production
    if (process.env.NODE_ENV === 'production') {
      reportToAnalytics(metricName, duration);
    }
  };
}

export function measureLCP(): void {
  if (typeof window === 'undefined') return;

  new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
      if (entry.entryType === 'largest-contentful-paint') {
        console.log('LCP:', entry.startTime);
        reportToAnalytics('LCP', entry.startTime);
      }
    }
  }).observe({ entryTypes: ['largest-contentful-paint'] });
}

export function measureFID(): void {
  if (typeof window === 'undefined') return;

  new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
      if (entry.entryType === 'first-input') {
        console.log('FID:', entry.processingStart - entry.startTime);
        reportToAnalytics('FID', entry.processingStart - entry.startTime);
      }
    }
  }).observe({ entryTypes: ['first-input'] });
}

export function measureCLS(): void {
  if (typeof window === 'undefined') return;

  let clsValue = 0;
  let clsEntries: any[] = [];

  new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
      if (!entry.hadRecentInput) {
        const firstSessionEntry = clsEntries[0];
        const lastSessionEntry = clsEntries[clsEntries.length - 1];

        if (firstSessionEntry && entry.startTime - lastSessionEntry.startTime < 1000 && entry.startTime - firstSessionEntry.startTime < 5000) {
          clsValue += entry.value;
          clsEntries.push(entry);
        } else {
          clsEntries = [entry];
          clsValue = entry.value;
        }
      }
    }
  }).observe({ entryTypes: ['layout-shift'] });
}

function reportToAnalytics(metric: string, value: number): void {
  // Implement your analytics reporting here
  // Example: Send to Google Analytics, custom analytics, etc.
  console.log(`[Analytics] ${metric}: ${value}`);
} 