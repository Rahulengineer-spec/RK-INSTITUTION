import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { log } from "@/lib/logger"
import { createError } from "@/middleware/error-handler"
import { errorHandler } from "@/middleware/error-handler"

async function verifyEmail(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get("token")

  if (!token) {
    throw createError.badRequest("Verification token is required")
  }

  if (!process.env.NEXT_PUBLIC_APP_URL) {
    log.error("NEXT_PUBLIC_APP_URL environment variable is not set")
    throw createError.internal("Server configuration error")
  }

  try {
    // Find user with the verification token
    const user = await prisma.user.findFirst({
      where: {
        verificationToken: token,
        verificationTokenExpiry: {
          gt: new Date(),
        },
      },
    })

    if (!user) {
      throw createError.badRequest("Invalid or expired verification token")
    }

    // Update user as verified
    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: new Date(),
        isVerified: true,
        verificationToken: null,
        verificationTokenExpiry: null,
      },
    })

    log.info("Email verified successfully", { userId: user.id })

    // Redirect to login page with success message
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/login?verified=true`
    )
  } catch (error) {
    log.error("Email verification failed", error as Error)
    throw error
  }
}

export const GET = verifyEmail 
