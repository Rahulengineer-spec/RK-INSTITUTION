import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { createTransport } from "nodemailer"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const testEmailSchema = z.object({
  email: z.string().email(),
})

function withCORS(response: Response) {
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return response;
}

export async function OPTIONS() {
  return withCORS(new Response(null, { status: 204 }));
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { email } = testEmailSchema.parse(body)

    // Get email settings
    const settings = await prisma.settings.findFirst()
    if (!settings?.email) {
      return NextResponse.json(
        { error: "Email settings not configured" },
        { status: 400 }
      )
    }

    const emailSettings = settings.email as any

    // Create transporter
    const transporter = createTransport({
      host: emailSettings.smtpHost,
      port: parseInt(emailSettings.smtpPort),
      secure: emailSettings.smtpEncryption === "ssl",
      auth: {
        user: emailSettings.smtpUsername,
        pass: emailSettings.smtpPassword,
      },
    })

    // Send test email
    await transporter.sendMail({
      from: `"${emailSettings.fromName}" <${emailSettings.fromEmail}>`,
      to: email,
      subject: "Test Email from Learning Platform",
      text: "This is a test email from your Learning Platform installation.",
      html: `
        <h1>Test Email</h1>
        <p>This is a test email from your Learning Platform installation.</p>
        <p>If you received this email, your email settings are configured correctly.</p>
      `,
    })

    return withCORS(NextResponse.json({ message: "Test email sent successfully" }))
  } catch (error) {
    if (error instanceof z.ZodError) {
      return withCORS(NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      ))
    }

    console.error("Error sending test email:", error)
    return withCORS(NextResponse.json(
      { error: "Failed to send test email" },
      { status: 500 }
    ))
  }
} 