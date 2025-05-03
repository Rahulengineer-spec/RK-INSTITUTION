import { useCallback } from 'react';

interface AnalyticsEvent {
  eventName: string;
  properties?: Record<string, any>;
  timestamp?: number;
}

const useAnalytics = () => {
  const trackEvent = useCallback(async (event: AnalyticsEvent) => {
    try {
      const payload = {
        ...event,
        timestamp: event.timestamp || Date.now(),
        userAgent: navigator.userAgent,
        url: window.location.href,
      };

      // Send event to your analytics endpoint
      await fetch('/api/analytics/track', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
    } catch (error) {
      console.error('Failed to track analytics event:', error);
    }
  }, []);

  const trackPageView = useCallback(() => {
    trackEvent({
      eventName: 'page_view',
      properties: {
        path: window.location.pathname,
        title: document.title,
      },
    });
  }, [trackEvent]);

  const trackInteraction = useCallback((elementId: string, action: string) => {
    trackEvent({
      eventName: 'user_interaction',
      properties: {
        elementId,
        action,
      },
    });
  }, [trackEvent]);

  const trackError = useCallback((error: Error, componentName: string) => {
    trackEvent({
      eventName: 'error',
      properties: {
        message: error.message,
        stack: error.stack,
        componentName,
      },
    });
  }, [trackEvent]);

  return {
    trackEvent,
    trackPageView,
    trackInteraction,
    trackError,
  };
};

export default useAnalytics; 