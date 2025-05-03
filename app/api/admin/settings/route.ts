import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

// Validation schemas
const generalSettingsSchema = z.object({
  siteName: z.string().min(1),
  siteDescription: z.string(),
  siteUrl: z.string().url(),
  timezone: z.string(),
  defaultLanguage: z.string(),
  maintenanceMode: z.boolean(),
  allowRegistration: z.boolean(),
  defaultCurrency: z.string(),
  logoUrl: z.string().url(),
  faviconUrl: z.string().url(),
})

const paymentSettingsSchema = z.object({
  stripeEnabled: z.boolean(),
  stripePublishableKey: z.string().optional(),
  stripeSecretKey: z.string().optional(),
  paypalEnabled: z.boolean(),
  paypalClientId: z.string().optional(),
  paypalSecretKey: z.string().optional(),
  defaultCurrency: z.string(),
  transactionFee: z.string(),
  platformFee: z.string(),
  minimumPayout: z.string(),
  automaticPayouts: z.boolean(),
  payoutSchedule: z.string(),
  refundWindow: z.string(),
  allowPartialRefunds: z.boolean(),
  taxEnabled: z.boolean(),
  taxRate: z.string(),
})

const emailSettingsSchema = z.object({
  provider: z.string(),
  smtpHost: z.string(),
  smtpPort: z.string(),
  smtpUsername: z.string(),
  smtpPassword: z.string(),
  smtpEncryption: z.string(),
  fromName: z.string(),
  fromEmail: z.string().email(),
  replyToEmail: z.string().email(),
  enableEmailQueue: z.boolean(),
})

function withCORS(response: Response) {
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, PUT, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return response;
}

export async function OPTIONS() {
  return withCORS(new Response(null, { status: 204 }));
}

export async function GET() {
  try {
    const session = await getServerSession()
    if (!session) {
      return withCORS(NextResponse.json({ error: "Unauthorized" }, { status: 401 }))
    }

    const settings = await prisma.settings.findFirst()
    if (!settings) {
      return withCORS(NextResponse.json({ error: "Settings not found" }, { status: 404 }))
    }

    return withCORS(NextResponse.json(settings))
  } catch (error) {
    console.error("Error fetching settings:", error)
    return withCORS(NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    ))
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession()
    if (!session) {
      return withCORS(NextResponse.json({ error: "Unauthorized" }, { status: 401 }))
    }

    const body = await request.json()
    
    // Validate request body based on section
    const { section } = body
    let validatedData

    switch (section) {
      case "general":
        validatedData = generalSettingsSchema.parse(body.data)
        break
      case "payment":
        validatedData = paymentSettingsSchema.parse(body.data)
        break
      case "email":
        validatedData = emailSettingsSchema.parse(body.data)
        break
      default:
        return withCORS(NextResponse.json(
          { error: "Invalid settings section" },
          { status: 400 }
        ))
    }

    // Update settings in database
    const settings = await prisma.settings.upsert({
      where: { id: "1" }, // Assuming single settings record
      update: {
        [section]: validatedData,
      },
      create: {
        id: "1",
        [section]: validatedData,
      },
    })

    return withCORS(NextResponse.json(settings))
  } catch (error) {
    if (error instanceof z.ZodError) {
      return withCORS(NextResponse.json(
        { error: "Validation error", details: error.errors },
        { status: 400 }
      ))
    }

    console.error("Error updating settings:", error)
    return withCORS(NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    ))
  }
} 