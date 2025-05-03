import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import crypto from 'crypto'

const CSRF_SECRET = process.env.CSRF_SECRET || 'your-super-secret-key-change-this'

// Simple CSRF token implementation
function generateToken(): string {
  return crypto.randomBytes(32).toString('hex')
}

function validateToken(token: string): boolean {
  // In a real implementation, you'd validate against session storage/database
  // This is a simplified version
  return !!token && token.length === 64
}

export async function csrfMiddleware(request: NextRequest) {
  // Skip CSRF check for GET, HEAD, OPTIONS requests
  if (['GET', 'HEAD', 'OPTIONS'].includes(request.method)) {
    return NextResponse.next()
  }

  // Skip CSRF check for API routes that need to be public (like webhooks)
  if (request.nextUrl.pathname.startsWith('/api/webhooks')) {
    return NextResponse.next()
  }

  try {
    const csrfToken = request.headers.get('x-csrf-token')
    
    if (!csrfToken) {
      return new NextResponse('Missing CSRF token', { status: 403 })
    }

    const isValid = await validateToken(csrfToken)
    if (!isValid) {
      return new NextResponse('Invalid CSRF token', { status: 403 })
    }

    return NextResponse.next()
  } catch (error) {
    console.error('CSRF validation error:', error)
    return new NextResponse('CSRF validation failed', { status: 403 })
  }
}

export async function generateCSRFToken() {
  return generateToken()
} 