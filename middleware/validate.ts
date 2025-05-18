import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createError } from './error-handler';
import { log } from '@/lib/logger';

export interface ValidationConfig {
  body?: z.Schema;
  query?: z.Schema;
  params?: z.Schema;
}

export function validateMiddleware(config: ValidationConfig) {
  return async function validate(
    request: NextRequest,
    next: (request: NextRequest) => Promise<NextResponse>
  ) {
    try {
      // Validate query parameters
      if (config.query) {
        const queryParams = Object.fromEntries(request.nextUrl.searchParams);
        await config.query.parseAsync(queryParams);
      }

      // Validate request body
      if (config.body && request.body) {
        let body;
        const contentType = request.headers.get('content-type');

        if (contentType?.includes('application/json')) {
          const text = await request.text();
          try {
            body = JSON.parse(text);
          } catch (err) {
            log.warn('Invalid JSON in request body', { error: err, path: request.nextUrl.pathname });
            return NextResponse.json(
              {
                error: {
                  message: 'Invalid JSON in request body',
                },
              },
              { status: 400 }
            );
          }
        } else if (contentType?.includes('multipart/form-data')) {
          const formData = await request.formData();
          body = Object.fromEntries(formData);
        } else {
          throw createError.badRequest('Unsupported content type');
        }

        await config.body.parseAsync(body);

        // Create a new request with validated body
        const newRequest = new Request(request.url, {
          method: request.method,
          headers: request.headers,
          body: JSON.stringify(body),
        });

        // Copy over the rest of the properties
        Object.defineProperties(newRequest, {
          nextUrl: { value: request.nextUrl },
          cookies: { value: request.cookies },
          ip: { value: request.ip },
        });

        return next(newRequest as NextRequest);
      }

      // If no body validation is needed, proceed with original request
      return next(request);
    } catch (error) {
      if (error instanceof z.ZodError) {
        log.warn('Validation failed', {
          errors: error.errors,
          path: request.nextUrl.pathname,
        });

        return NextResponse.json(
          {
            error: {
              message: 'Validation failed',
              details: error.errors.map((e) => ({
                path: e.path.join('.'),
                message: e.message,
              })),
            },
          },
          { status: 400 }
        );
      }

      // Handle other errors
      log.error('Validation middleware error', error as Error);
      throw error;
    }
  };
}

// Helper function to create a validated API route handler
export function createValidatedHandler(
  config: ValidationConfig,
  handler: (request: NextRequest) => Promise<NextResponse>
) {
  const validateRequest = validateMiddleware(config);
  
  return async function validatedHandler(request: NextRequest) {
    return validateRequest(request, handler);
  };
} 