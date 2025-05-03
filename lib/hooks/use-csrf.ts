"use client"

import { useState, useEffect } from "react"

interface CsrfState {
  csrfToken: string | null
  isLoading: boolean
  error: string | null
  validateToken: (token: string) => Promise<boolean>
  retry: () => void
}

export function useCsrf(): CsrfState {
  const [state, setState] = useState<Omit<CsrfState, 'validateToken' | 'retry'>>({
    csrfToken: null,
    isLoading: true,
    error: null,
  })

  const fetchCsrfToken = async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      const response = await fetch("/api/csrf", {
        headers: {
          'Accept': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.csrfToken) {
        throw new Error('No CSRF token in response');
      }

      setState({
        csrfToken: data.csrfToken,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      console.error("Error fetching CSRF token:", error);
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to load security token',
      }));
    }
  };

  useEffect(() => {
    fetchCsrfToken();
  }, []);

  const validateToken = async (token: string): Promise<boolean> => {
    try {
      const response = await fetch("/api/csrf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "X-CSRF-Token": token,
        },
        credentials: 'include',
        body: JSON.stringify({ token }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.valid === true;
    } catch (error) {
      console.error("Error validating CSRF token:", error);
      return false;
    }
  };

  const retry = () => {
    fetchCsrfToken();
  };

  return {
    ...state,
    validateToken,
    retry,
  };
} 