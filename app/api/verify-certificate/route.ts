import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Create a new ratelimiter that allows 10 requests per 5 minutes
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "5 m"),
  analytics: true,
});

const verificationSchema = z.object({
  certificateNumber: z.string().min(6),
  fullName: z.string().min(2),
  fatherName: z.string().min(2),
  dateOfBirth: z.string(),
});

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const certificateId = searchParams.get("id");

  if (!certificateId) {
    return NextResponse.json(
      { error: "Certificate ID is required" },
      { status: 400 }
    );
  }

  try {
    // TODO: Implement actual certificate verification logic
    // This is a mock implementation
    const isValid = certificateId.length === 8; // Mock validation

    return NextResponse.json({
      valid: isValid,
      message: isValid
        ? "Certificate verified successfully"
        : "Invalid certificate ID",
    });
  } catch (error) {
    console.error("Certificate verification error:", error);
    return NextResponse.json(
      { error: "Failed to verify certificate" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    // Get IP for rate limiting
    const ip = req.headers.get("x-forwarded-for") || "anonymous";
    
    // Check rate limit
    const { success, limit, reset, remaining } = await ratelimit.limit(ip);
    
    if (!success) {
      return NextResponse.json(
        { 
          message: "Too many verification attempts. Please try again later.",
          reset: reset,
        },
        { 
          status: 429,
          headers: {
            "X-RateLimit-Limit": limit.toString(),
            "X-RateLimit-Remaining": remaining.toString(),
            "X-RateLimit-Reset": reset.toString(),
          }
        }
      );
    }

    const body = await req.json();
    const validatedData = verificationSchema.parse(body);

    // Query the certificates table in Supabase
    const { data: certificate, error } = await supabase
      .from("certificates")
      .select(`
        *,
        students (
          fullName,
          fatherName,
          dateOfBirth
        ),
        courses (
          name,
          duration
        )
      `)
      .eq("certificateNumber", validatedData.certificateNumber)
      .single();

    if (error) {
      console.error("Database error:", error);
      return NextResponse.json(
        { message: "Error accessing certificate database" },
        { status: 500 }
      );
    }

    if (!certificate) {
      return NextResponse.json({
        isValid: false,
        message: "Certificate not found in our records.",
      });
    }

    // Verify student details match
    const detailsMatch = 
      certificate.students.fullName.toLowerCase() === validatedData.fullName.toLowerCase() &&
      certificate.students.fatherName.toLowerCase() === validatedData.fatherName.toLowerCase() &&
      certificate.students.dateOfBirth === validatedData.dateOfBirth;

    if (!detailsMatch) {
      return NextResponse.json({
        isValid: false,
        message: "Provided details do not match our records.",
      });
    }

    // Log the verification attempt
    await supabase.from("verification_logs").insert({
      certificateNumber: validatedData.certificateNumber,
      verifiedAt: new Date().toISOString(),
      success: true,
      ipAddress: ip,
      remainingAttempts: remaining,
    });

    return NextResponse.json({
      isValid: true,
      studentDetails: {
        fullName: certificate.students.fullName,
        fatherName: certificate.students.fatherName,
        dateOfBirth: certificate.students.dateOfBirth,
        course: certificate.courses.name,
        issueDate: certificate.issuedAt,
        grade: certificate.grade,
      },
      message: "Certificate verified successfully!",
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Invalid request data", errors: error.errors },
        { status: 400 }
      );
    }

    console.error("Verification error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
} 