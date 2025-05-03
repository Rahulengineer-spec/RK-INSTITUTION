import { randomBytes, createHash } from 'crypto';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from "next/server";

const CSRF_SECRET = process.env.CSRF_SECRET || randomBytes(32).toString('hex');
const CSRF_SALT_LENGTH = 8;

// Generate a random salt using Node.js crypto
function generateSalt(): string {
  return randomBytes(CSRF_SALT_LENGTH).toString('hex');
}

// Create a hash using Node.js crypto
function createTokenHash(salt: string): string {
  return createHash('sha256')
    .update(salt + CSRF_SECRET)
    .digest('hex');
}

// Generate a new CSRF token
export function generateToken(): string {
  const salt = randomBytes(CSRF_SALT_LENGTH).toString('hex');
  const hash = createHash('sha256')
    .update(salt + CSRF_SECRET)
    .digest('hex');
  return `${salt}.${hash}`;
}

// Verify a CSRF token
export function verifyToken(token: string): boolean {
  const [salt, hash] = token.split('.');
  if (!salt || !hash) return false;
  
  const expectedHash = createHash('sha256')
    .update(salt + CSRF_SECRET)
    .digest('hex');
  return hash === expectedHash;
}

// Set CSRF cookie
export function setCsrfCookie(response: NextResponse, token: string) {
  response.cookies.set('csrf-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/'
  });
}

// CSRF middleware (optional, for API protection)
export function csrfMiddleware(request: NextRequest) {
  if (['GET', 'HEAD', 'OPTIONS'].includes(request.method)) {
    return null;
  }
  const csrfToken = request.headers.get('X-CSRF-Token');
  if (!csrfToken) {
    return new NextResponse(
      JSON.stringify({ error: 'Missing CSRF token' }),
      { status: 403, headers: { 'Content-Type': 'application/json' } }
    );
  }
  const isValid = verifyToken(csrfToken);
  if (!isValid) {
    return new NextResponse(
      JSON.stringify({ error: 'Invalid CSRF token' }),
      { status: 403, headers: { 'Content-Type': 'application/json' } }
    );
  }
  return null;
} 