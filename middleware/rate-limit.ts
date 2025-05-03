import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// List of paths that should be rate limited
const RATE_LIMITED_PATHS = [
  '/api/auth',
  '/api/courses',
  '/api/payment',
  '/api/user',
];

// Simple in-memory store for development/testing
const rateLimitStore: Record<string, { count: number; lastRequest: number }> = {};
const WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS = 30; // 30 requests per minute per IP per endpoint

export async function rateLimit(request: NextRequest) {
  if (process.env.NODE_ENV === 'development') {
    // In-memory rate limiting for dev/testing
    const ip = request.headers.get('x-forwarded-for') || request.ip || 'local';
    const path = request.nextUrl.pathname;
    if (!RATE_LIMITED_PATHS.some(p => path.startsWith(p))) return;
    const key = `${ip}:${path}`;
    const now = Date.now();
    const entry = rateLimitStore[key] || { count: 0, lastRequest: now };
    if (now - entry.lastRequest > WINDOW_MS) {
      entry.count = 1;
      entry.lastRequest = now;
    } else {
      entry.count++;
      entry.lastRequest = now;
    }
    rateLimitStore[key] = entry;
    if (entry.count > MAX_REQUESTS) {
      return NextResponse.json({ error: { message: 'Too many requests. Please try again later.' } }, { status: 429 });
    }
    return NextResponse.next();
  }
  // TODO: Implement Redis-based rate limiting in production
  return NextResponse.next();
} 