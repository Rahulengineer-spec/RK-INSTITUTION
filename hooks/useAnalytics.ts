import { useCallback } from 'react';

interface AnalyticsEvent {
  name: string;
  properties?: Record<string, any>;
}

export function useAnalytics() {
  const trackPageView = useCallback(() => {
    // Implement your page view tracking logic here
    if (typeof window !== 'undefined') {
      // Example implementation
      console.log('Page view tracked');
    }
  }, []);

  const trackInteraction = useCallback((event: AnalyticsEvent) => {
    // Implement your interaction tracking logic here
    if (typeof window !== 'undefined') {
      // Example implementation
      console.log('Interaction tracked:', event);
    }
  }, []);

  return {
    trackPageView,
    trackInteraction,
  };
} 