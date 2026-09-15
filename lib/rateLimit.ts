import { NextRequest } from 'next/server';

// Simple in-memory rate limiting
// For production, consider using Upstash Redis (see BACKEND_RECOMMENDATIONS.md)
const requestCounts = new Map<string, { count: number; resetTime: number }>();

export async function rateLimit(request: NextRequest) {
  const ip = request.ip || 
             request.headers.get('x-forwarded-for')?.split(',')[0] || 
             request.headers.get('x-real-ip') || 
             'unknown';
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxRequests = 5; // 5 requests per 15 minutes

  const record = requestCounts.get(ip);

  if (!record || now > record.resetTime) {
    requestCounts.set(ip, { count: 1, resetTime: now + windowMs });
    return { success: true };
  }

  if (record.count >= maxRequests) {
    return { success: false };
  }

  record.count++;
  return { success: true };
}

