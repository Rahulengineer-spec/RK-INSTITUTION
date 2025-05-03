import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const analyticsEventSchema = z.object({
  eventName: z.string().trim().min(1),
  properties: z.record(z.any()).optional(),
  timestamp: z.string().or(z.date()),
  userAgent: z.string().trim().optional(),
  url: z.string().trim().url().optional(),
});

function withCORS(response: Response) {
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  return response;
}

export async function OPTIONS() {
  return withCORS(new Response(null, { status: 204 }));
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = analyticsEventSchema.safeParse(body);
    if (!parsed.success) {
      return withCORS(
        NextResponse.json(
          { error: 'Invalid analytics event', details: parsed.error.errors },
          { status: 400 }
        )
      );
    }
    const data = parsed.data;
    // Store analytics event in database
    await prisma.analyticsEvent.create({
      data: {
        eventName: data.eventName,
        properties: data.properties,
        timestamp: new Date(data.timestamp),
        userAgent: data.userAgent,
        url: data.url,
      },
    });
    return withCORS(NextResponse.json({ success: true }));
  } catch (error) {
    console.error('Failed to store analytics event:', error);
    return withCORS(
      NextResponse.json(
        { error: 'Failed to store analytics event' },
        { status: 500 }
      )
    );
  }
} 