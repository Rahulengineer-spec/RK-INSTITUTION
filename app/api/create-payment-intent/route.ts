import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { z } from "zod"
import { getSessionFromRequest } from "@/lib/session"
import { log } from "@/lib/logger"
import { createError } from "@/middleware/error-handler"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
})

// Validation schema for the request body
const paymentSchema = z.object({
  amount: z.number().positive().min(0.5).max(999999),
  currency: z.enum(["usd"]).default("usd"),
})

export async function POST(req: NextRequest) {
  try {
    // Verify authentication
    const session = await getSessionFromRequest(req);
    if (!session) {
      throw createError.unauthorized();
    }

    // Validate request body
    const body = await req.json()
    const { amount, currency } = paymentSchema.parse(body)

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents and ensure integer
      currency,
      metadata: {
        userId: session.userId,
      },
    })

    log.info("Payment intent created", {
      userId: session.userId,
      amount,
      currency,
      paymentIntentId: paymentIntent.id,
    })

    return NextResponse.json({ clientSecret: paymentIntent.client_secret })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid payment details", details: error.errors },
        { status: 400 }
      )
    }

    log.error("Error creating payment intent:", error as Error)
    return NextResponse.json(
      { error: "Failed to create payment intent" },
      { status: 500 }
    )
  }
}