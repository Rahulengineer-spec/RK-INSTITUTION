import { NextRequest, NextResponse } from "next/server"
import { verifyToken } from "@/lib/csrf"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { token } = body

    if (!token) {
      return new NextResponse(
        JSON.stringify({ error: "Token is required" }),
        { status: 400 }
      )
    }

    const isValid = await verifyToken(token)

    if (!isValid) {
      return new NextResponse(
        JSON.stringify({ error: "Invalid token" }),
        { status: 403 }
      )
    }

    return new NextResponse(
      JSON.stringify({ valid: true }),
      { status: 200 }
    )
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Invalid request" }),
      { status: 400 }
    )
  }
} 