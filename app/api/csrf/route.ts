import { NextRequest, NextResponse } from "next/server"
import { generateToken, verifyToken, setCsrfCookie } from "@/lib/csrf"

export const runtime = 'nodejs'

// Helper to set common headers
function withCORS(response: Response) {
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, X-CSRF-Token');
  return response;
}

export async function GET(request: NextRequest) {
  try {
    // Generate token synchronously (no await needed)
    const token = generateToken();
    const response = new NextResponse(
      JSON.stringify({ csrfToken: token }),
      { 
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    
    // Set CSRF cookie and common headers
    setCsrfCookie(response, token);
    return withCORS(response);
  } catch (error) {
    console.error("Error generating CSRF token:", error);
    const errorResponse = new NextResponse(
      JSON.stringify({ error: "Failed to generate token" }),
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    return withCORS(errorResponse);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token } = body;
    
    if (!token) {
      const response = NextResponse.json(
        { error: "Token is required" },
        { status: 400 }
      );
      return withCORS(response);
    }

    const isValid = verifyToken(token);
    const response = NextResponse.json({ valid: isValid });
    return withCORS(response);
  } catch (error) {
    console.error("Error validating CSRF token:", error);
    const response = NextResponse.json(
      { error: "Token validation failed" },
      { status: 500 }
    );
    return withCORS(response);
  }
}

// Handle OPTIONS requests for CORS
export async function OPTIONS(request: NextRequest) {
  return withCORS(new NextResponse(null, { status: 204 }));
} 