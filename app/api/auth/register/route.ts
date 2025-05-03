import { NextResponse } from "next/server"
import { hash } from "bcryptjs"
import { prisma } from "@/lib/prisma"
import { z } from "zod"
import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"
import { headers } from "next/headers"
import { sendVerificationEmail } from "@/lib/email"

// Create a new ratelimiter instance
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || "",
  token: process.env.UPSTASH_REDIS_REST_TOKEN || "",
})

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "10 m"), // 5 requests per 10 minutes
})

// Password strength regex patterns
const containsUppercase = /[A-Z]/
const containsLowercase = /[a-z]/
const containsNumber = /[0-9]/
const containsSpecial = /[^A-Za-z0-9]/

// Registration schema validation
const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .refine(
      (password) => containsUppercase.test(password),
      "Password must contain at least one uppercase letter"
    )
    .refine(
      (password) => containsLowercase.test(password),
      "Password must contain at least one lowercase letter"
    )
    .refine(
      (password) => containsNumber.test(password),
      "Password must contain at least one number"
    )
    .refine(
      (password) => containsSpecial.test(password),
      "Password must contain at least one special character"
    ),
  role: z.enum(["USER", "INSTRUCTOR"]).default("USER"),
  phoneNumber: z.string().optional(),
  country: z.string().optional(),
  bio: z.string().optional(),
})

export async function POST(req: Request) {
  try {
    // Rate limiting
    const headersList = headers()
    const ip = headersList.get("x-forwarded-for") || "127.0.0.1"
    const { success, reset } = await ratelimit.limit(ip)

    if (!success) {
      return NextResponse.json(
        { 
          error: "Too many registration attempts. Please try again later.",
          resetIn: reset
        },
        { 
          status: 429,
          headers: {
            "X-RateLimit-Reset": reset.toString()
          }
        }
      )
    }

    const json = await req.json()
    const body = registerSchema.parse(json)

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: body.email },
      select: { id: true },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await hash(body.password, 12)

    // Generate verification token
    const verificationToken = crypto.randomUUID()
    const verificationExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

    // Create user
    const user = await prisma.user.create({
      data: {
        email: body.email,
        name: body.name,
        phoneNumber: body.phoneNumber,
        password: hashedPassword,
        role: body.role === "INSTRUCTOR" ? "INSTRUCTOR" : "USER",
        country: body.country,
        bio: body.bio,
        verificationToken,
        verificationTokenExpiry: verificationExpiry,
        isVerified: false,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    })

    // Send verification email
    await sendVerificationEmail({
      to: user.email,
      name: user.name,
      token: verificationToken,
    })

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      message: "Verification email sent. Please check your inbox.",
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }

    console.error("Registration error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
} 