import { useState, useEffect } from 'react';
import { useAnalytics } from '../hooks/useAnalytics';

export interface UseCsrfResult {
  csrfToken: string | null;
  loading: boolean;
  csrfLoading: boolean;
  error: Error | null;
  csrfError: Error | null;
  refreshToken: () => Promise<void>;
  validateToken: (token: string) => Promise<boolean>;
}

export function useCsrf(): UseCsrfResult {
  const [csrfToken, setCsrfToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const { trackPageView, trackInteraction } = useAnalytics();

  const fetchToken = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/csrf');
      
      if (!response.ok) {
        throw new Error('Failed to fetch CSRF token');
      }

      const data = await response.json();
      setCsrfToken(data.token);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch CSRF token'));
    } finally {
      setLoading(false);
    }
  };

  const validateToken = async (token: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/csrf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      if (!response.ok) {
        return false;
      }

      const data = await response.json();
      return data.valid;
    } catch (error) {
      console.error('Error validating CSRF token:', error);
      return false;
    }
  };

  useEffect(() => {
    fetchToken();
    trackPageView();
  }, []);
  return {
    csrfToken,
    loading,
    csrfLoading: loading,
    error,
    csrfError: error,
    refreshToken: fetchToken,
    validateToken
  };
}

// Helper function for direct token validation without the hook
export async function validateCsrfToken(token: string): Promise<boolean> {
  try {
    const response = await fetch('/api/csrf', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });

    if (!response.ok) {
      return false;
    }

    const data = await response.json();
    return data.valid;
  } catch (error) {
    console.error('Error validating CSRF token:', error);
    return false;
  }
}

// Add to lib/error-handling.ts
export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public isOperational = true
  ) {
    super(message)
    Object.setPrototypeOf(this, AppError.prototype)
  }
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js');
  });
}