import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { log } from '@/lib/logger';

export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500,
    public code?: string,
    public details?: any
  ) {
    super(message);
    this.name = 'AppError';5
  }
}

interface ErrorResponse {
  error: {
    message: string;
    code?: string;
    details?: any;
  };
  status: number;
}

export function handleError(error: Error | AppError, req: NextRequest): NextResponse<ErrorResponse> {
  // Default error values
  let statusCode = 500;
  let errorCode = 'INTERNAL_SERVER_ERROR';
  let details = undefined;

  // Handle known errors
  if (error instanceof AppError) {
    statusCode = error.statusCode;
    errorCode = error.code || errorCode;
    details = error.details;
  }

  // Convert Headers to Record for logging
  const headers: Record<string, string> = {};
  req.headers.forEach((value, key) => {
    headers[key] = value;
  });

  // Log the error with converted request format
  log.error('Request failed', error, {
    url: req.url,
    method: req.method,
    headers,
    query: Object.fromEntries(req.nextUrl.searchParams),
  });

  // Prepare the error response
  const errorResponse: ErrorResponse = {
    error: {
      message: process.env.NODE_ENV === 'production' 
        ? 'An error occurred while processing your request'
        : error.message,
      code: errorCode,
      ...(details && { details }),
    },
    status: statusCode,
  };

  // Return error response
  return NextResponse.json(errorResponse, { status: statusCode });
}

// Common error factory methods
export const createError = {
  badRequest: (message: string, details?: any) => {
    return new AppError(message, 400, 'BAD_REQUEST', details);
  },

  unauthorized: (message: string = 'Unauthorized access') => {
    return new AppError(message, 401, 'UNAUTHORIZED');
  },

  forbidden: (message: string = 'Access forbidden') => {
    return new AppError(message, 403, 'FORBIDDEN');
  },

  notFound: (message: string = 'Resource not found') => {
    return new AppError(message, 404, 'NOT_FOUND');
  },

  conflict: (message: string, details?: any) => {
    return new AppError(message, 409, 'CONFLICT', details);
  },

  validation: (message: string, details?: any) => {
    return new AppError(message, 422, 'VALIDATION_ERROR', details);
  },

  internal: (message: string = 'Internal server error') => {
    return new AppError(message, 500, 'INTERNAL_SERVER_ERROR');
  },
};

// Error handler middleware
export async function errorHandler(
  request: NextRequest,
  handler: (req: NextRequest) => Promise<NextResponse>
): Promise<NextResponse> {
  try {
    return await handler(request);
  } catch (error) {
    return handleError(error instanceof Error ? error : new Error('Unknown error'), request);
  }
} 