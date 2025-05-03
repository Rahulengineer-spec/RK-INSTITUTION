import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"
import { csrfMiddleware } from "@/lib/csrf"
import { rateLimit } from "@/middleware/rate-limit"
import { log } from "@/lib/middleware-logger"

export const runtime = 'experimental-edge'

// List of paths that require CSRF protection
const protectedPaths = [
  '/api/auth/signup',
  '/api/auth/reset-password',
  '/api/profile',
  '/api/blog',
  '/api/admin',
]

export async function middleware(request: NextRequest) {
  let response = NextResponse.next()
  try {
    // CORS headers
    if (request.method === "OPTIONS") {
      return new NextResponse(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization, x-csrf-token",
          // Security headers
          "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
          "X-Content-Type-Options": "nosniff",
          "X-Frame-Options": "SAMEORIGIN",
          "Referrer-Policy": "strict-origin-when-cross-origin",
        },
      })
    }

    // Apply rate limiting for API routes
    if (request.nextUrl.pathname.startsWith('/api')) {
      const rateLimitResponse = await rateLimit(request)
      if (rateLimitResponse && rateLimitResponse.status === 429) {
        log.warn('Rate limit exceeded', { path: request.nextUrl.pathname, ip: request.ip })
        return rateLimitResponse
      }
    }

    // Auth protection
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    })

    // CSRF protection for non-GET methods
    if (
      request.method !== 'GET' &&
      protectedPaths.some(path => request.nextUrl.pathname.startsWith(path))
    ) {
      const csrfError = await csrfMiddleware(request)
      if (csrfError) {
        log.warn('CSRF protection failed', { path: request.nextUrl.pathname, ip: request.ip })
        return csrfError
      }
    }

    // Helper: add security headers to all responses
    const addSecurityHeaders = (resp: NextResponse) => {
      resp.headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload")
      resp.headers.set("X-Content-Type-Options", "nosniff")
      resp.headers.set("X-Frame-Options", "SAMEORIGIN")
      resp.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")
      return resp
    }

    // Protect admin routes
    if (request.nextUrl.pathname.startsWith("/admin")) {
      if (!token || token.role !== "admin") {
        log.warn('Unauthorized admin access', { path: request.nextUrl.pathname, ip: request.ip, user: token?.email })
        if (request.nextUrl.pathname.startsWith('/api')) {
          return addSecurityHeaders(new NextResponse(JSON.stringify({ error: 'Forbidden' }), { status: 403, headers: { 'Content-Type': 'application/json' } }))
        }
        return addSecurityHeaders(NextResponse.redirect(new URL("/unauthorized", request.url)))
      }
    }

    // Protect instructor routes
    if (request.nextUrl.pathname.startsWith("/instructor")) {
      if (!token || (token.role !== "instructor" && token.role !== "admin")) {
        log.warn('Unauthorized instructor access', { path: request.nextUrl.pathname, ip: request.ip, user: token?.email })
        if (request.nextUrl.pathname.startsWith('/api')) {
          return addSecurityHeaders(new NextResponse(JSON.stringify({ error: 'Forbidden' }), { status: 403, headers: { 'Content-Type': 'application/json' } }))
        }
        return addSecurityHeaders(NextResponse.redirect(new URL("/unauthorized", request.url)))
      }
    }

    // Protect dashboard routes
    if (request.nextUrl.pathname.startsWith("/dashboard")) {
      if (!token) {
        log.warn('Unauthorized dashboard access', { path: request.nextUrl.pathname, ip: request.ip })
        if (request.nextUrl.pathname.startsWith('/api')) {
          return addSecurityHeaders(new NextResponse(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } }))
        }
        return addSecurityHeaders(NextResponse.redirect(new URL("/unauthorized", request.url)))
      }
    }

    // Add security headers to all responses
    response = addSecurityHeaders(response)
    return response
  } catch (err) {
    log.error('Middleware error', err instanceof Error ? err : new Error(String(err)))
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/instructor/:path*",
    "/dashboard/:path*",
    "/api/:path*",
    "/((?!api/csrf|_next/static|_next/image|favicon.ico|public).*)",
  ],
} 