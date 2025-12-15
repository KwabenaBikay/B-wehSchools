# Backend Implementation Recommendations
## B-Weh Schools Montessori Website

This document provides comprehensive recommendations and implementation examples for adding a secure backend to handle contact form submissions and other potential backend needs.

---

## Architecture Options

### Option 1: Next.js API Routes (Recommended for Start)
**Pros:**
- Built into Next.js, no additional infrastructure
- Serverless functions (Vercel, Netlify)
- Easy to deploy
- Good for small to medium traffic

**Cons:**
- Limited execution time (10s on Vercel free tier)
- May need external services for email/database

**Best For:** Contact forms, simple API endpoints

---

### Option 2: External API Service
**Pros:**
- More control over infrastructure
- Better for complex business logic
- Can use existing Laravel/PHP backend

**Cons:**
- Additional infrastructure to maintain
- CORS configuration needed
- More complex deployment

**Best For:** Integration with existing school management system

---

### Option 3: Serverless Functions (Vercel/Netlify Functions)
**Pros:**
- Auto-scaling
- Pay-per-use
- Integrated with Next.js

**Cons:**
- Vendor lock-in
- Cold start latency

**Best For:** Production-ready scalable solutions

---

## Recommended Implementation: Next.js API Routes

We'll implement a complete solution using Next.js API Routes with:
- ✅ Input validation (Zod)
- ✅ Rate limiting
- ✅ Email notifications
- ✅ Error handling
- ✅ Security best practices

---

## Step-by-Step Implementation

### Step 1: Install Required Dependencies

```bash
npm install zod nodemailer @upstash/ratelimit @upstash/redis
# OR for simpler rate limiting without Redis:
npm install zod nodemailer
```

**Alternative (Simpler):** Use a service like Formspree, SendGrid, or Resend for email handling.

---

### Step 2: Environment Variables

Create `.env.local` file:

```env
# Email Configuration (Option A: SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=noreply@bwehschools.com
SMTP_TO=info@bwehschools.com

# OR Email Configuration (Option B: Resend - Recommended)
RESEND_API_KEY=re_xxxxxxxxxxxxx
RESEND_FROM_EMAIL=noreply@bwehschools.com
RESEND_TO_EMAIL=info@bwehschools.com

# Rate Limiting (Optional - if using Upstash)
UPSTASH_REDIS_REST_URL=https://xxxxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=xxxxx

# Honeypot (for spam protection)
HONEYPOT_SECRET=your-random-secret-key
```

---

### Step 3: Create API Route Handler

**File:** `app/api/contact/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { rateLimit } from '@/lib/rateLimit';
import { sendEmail } from '@/lib/email';

// Validation schema
const contactSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Name contains invalid characters'),
  email: z.string()
    .email('Invalid email address')
    .max(255, 'Email is too long'),
  phone: z.string()
    .regex(/^\+?[\d\s()-]+$/, 'Invalid phone number format')
    .min(10, 'Phone number is too short')
    .max(20, 'Phone number is too long'),
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message must be less than 2000 characters'),
  // Honeypot field (hidden from users, bots will fill it)
  website: z.string().max(0).optional(),
});

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimitResult = await rateLimit(request);
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    
    // Validate input
    const validationResult = contactSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'Validation failed',
          details: validationResult.error.errors 
        },
        { status: 400 }
      );
    }

    const { name, email, phone, message, website } = validationResult.data;

    // Honeypot check (if filled, it's likely a bot)
    if (website && website.length > 0) {
      // Silently reject but return success to confuse bots
      return NextResponse.json(
        { success: true, message: 'Thank you for your message!' },
        { status: 200 }
      );
    }

    // Sanitize inputs (additional layer of security)
    const sanitizedData = {
      name: sanitizeInput(name),
      email: sanitizeInput(email),
      phone: sanitizeInput(phone),
      message: sanitizeInput(message),
    };

    // Send email notification
    const emailResult = await sendEmail({
      to: process.env.SMTP_TO || process.env.RESEND_TO_EMAIL || 'info@bwehschools.com',
      subject: `New Contact Form Submission from ${sanitizedData.name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${sanitizedData.name}</p>
        <p><strong>Email:</strong> ${sanitizedData.email}</p>
        <p><strong>Phone:</strong> ${sanitizedData.phone}</p>
        <p><strong>Message:</strong></p>
        <p>${sanitizedData.message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><small>Submitted at: ${new Date().toLocaleString()}</small></p>
      `,
      text: `
        New Contact Form Submission
        
        Name: ${sanitizedData.name}
        Email: ${sanitizedData.email}
        Phone: ${sanitizedData.phone}
        Message: ${sanitizedData.message}
        
        Submitted at: ${new Date().toLocaleString()}
      `,
    });

    if (!emailResult.success) {
      console.error('Email sending failed:', emailResult.error);
      // Still return success to user, but log the error
      // In production, you might want to store in database as backup
    }

    // Optional: Store in database
    // await saveToDatabase(sanitizedData);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you for your message! We will get back to you soon.' 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'An error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}

// Sanitize input to prevent XSS
function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .trim()
    .slice(0, 2000); // Max length
}

// OPTIONS handler for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
```

---

### Step 4: Rate Limiting Utility

**File:** `lib/rateLimit.ts`

**Option A: Simple In-Memory Rate Limiting (Development)**

```typescript
import { NextRequest } from 'next/server';

// Simple in-memory rate limiting (resets on server restart)
const requestCounts = new Map<string, { count: number; resetTime: number }>();

export async function rateLimit(request: NextRequest) {
  const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
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
```

**Option B: Upstash Redis Rate Limiting (Production - Recommended)**

```typescript
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { NextRequest } from 'next/server';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, '15 m'), // 5 requests per 15 minutes
  analytics: true,
});

export async function rateLimit(request: NextRequest) {
  const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
  const { success } = await ratelimit.limit(ip);
  return { success };
}
```

---

### Step 5: Email Service Utility

**File:** `lib/email.ts`

**Option A: Using Nodemailer (SMTP)**

```typescript
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendEmail({
  to,
  subject,
  html,
  text,
}: {
  to: string;
  subject: string;
  html: string;
  text: string;
}) {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to,
      subject,
      html,
      text,
    });
    return { success: true };
  } catch (error) {
    console.error('Email error:', error);
    return { success: false, error };
  }
}
```

**Option B: Using Resend (Recommended - Easier Setup)**

```typescript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({
  to,
  subject,
  html,
  text,
}: {
  to: string;
  subject: string;
  html: string;
  text: string;
}) {
  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'noreply@bwehschools.com',
      to,
      subject,
      html,
      text,
    });
    return { success: true };
  } catch (error) {
    console.error('Email error:', error);
    return { success: false, error };
  }
}
```

---

### Step 6: Update Contact Form Component

**File:** `app/contact/page.tsx` (Updated)

```typescript
'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitStatus({
          type: 'success',
          message: data.message || 'Thank you for your message! We will get back to you soon.',
        });
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setSubmitStatus({
          type: 'error',
          message: data.error || 'Something went wrong. Please try again.',
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Network error. Please check your connection and try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-white pt-40 pb-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
          Contact Us
        </h1>
        <p className="mt-3 text-sm text-slate-600 sm:text-base">
          We would love to hear from you. Reach out for enquiries, visits, or
          admissions.
        </p>

        <div className="mt-8 grid gap-10 md:grid-cols-2">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Status Messages */}
            {submitStatus.type && (
              <div
                className={`rounded-lg p-4 ${
                  submitStatus.type === 'success'
                    ? 'bg-green-50 text-green-800 border border-green-200'
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}
              >
                {submitStatus.message}
              </div>
            )}

            {/* Honeypot field (hidden from users) */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              style={{ position: 'absolute', left: '-9999px' }}
              aria-hidden="true"
            />

            <div>
              <label
                htmlFor="name"
                className="block text-xs font-medium text-slate-700"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                minLength={2}
                maxLength={100}
                disabled={isSubmitting}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-medium text-slate-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                maxLength={255}
                disabled={isSubmitting}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-xs font-medium text-slate-700"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                minLength={10}
                maxLength={20}
                disabled={isSubmitting}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-xs font-medium text-slate-700"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                required
                minLength={10}
                maxLength={2000}
                disabled={isSubmitting}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-full bg-violet-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>

          {/* Contact Info Section - unchanged */}
          <div className="space-y-6 text-sm text-slate-700">
            {/* ... existing contact info ... */}
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

## Alternative: Third-Party Services (Easier Setup)

### Option 1: Formspree
- **Pros:** Zero backend code, free tier available
- **Cons:** Limited customization
- **Setup:** Just change form action to Formspree URL

### Option 2: SendGrid
- **Pros:** Reliable, good free tier
- **Cons:** Requires API setup

### Option 3: Resend
- **Pros:** Developer-friendly, great for Next.js
- **Cons:** Paid service (but affordable)

---

## Database Storage (Optional)

If you want to store submissions in a database:

### Option A: PostgreSQL (Vercel Postgres, Supabase)
```typescript
// lib/db.ts
import { sql } from '@vercel/postgres';

export async function saveContactSubmission(data: {
  name: string;
  email: string;
  phone: string;
  message: string;
}) {
  await sql`
    INSERT INTO contact_submissions (name, email, phone, message, created_at)
    VALUES (${data.name}, ${data.email}, ${data.phone}, ${data.message}, NOW())
  `;
}
```

### Option B: MongoDB (MongoDB Atlas)
```typescript
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI!);

export async function saveContactSubmission(data: {
  name: string;
  email: string;
  phone: string;
  message: string;
}) {
  await client.connect();
  const db = client.db('bweh_schools');
  await db.collection('contact_submissions').insertOne({
    ...data,
    createdAt: new Date(),
  });
  await client.close();
}
```

---

## Security Best Practices Checklist

- ✅ Input validation (Zod schema)
- ✅ Rate limiting (prevent spam/DoS)
- ✅ Input sanitization (prevent XSS)
- ✅ Honeypot field (bot protection)
- ✅ Error handling (don't expose internals)
- ✅ CORS configuration (if needed)
- ✅ Environment variables (never commit secrets)
- ✅ HTTPS enforcement (handled by hosting)
- ✅ Content Security Policy (already configured)

---

## Testing Recommendations

1. **Test Rate Limiting:**
   ```bash
   # Send multiple rapid requests
   for i in {1..10}; do curl -X POST http://localhost:3000/api/contact -H "Content-Type: application/json" -d '{"name":"Test","email":"test@test.com","phone":"1234567890","message":"Test message"}'; done
   ```

2. **Test Validation:**
   - Submit empty form
   - Submit invalid email
   - Submit very long inputs
   - Submit special characters

3. **Test Honeypot:**
   - Submit form with honeypot field filled (should silently reject)

---

## Deployment Considerations

### Vercel (Recommended for Next.js)
- API routes work out of the box
- Environment variables in dashboard
- Automatic HTTPS
- Serverless functions

### Other Platforms
- Ensure Node.js runtime is supported
- Configure environment variables
- Set up email service credentials

---

## Cost Estimates

### Free Tier Options:
- **Vercel:** Free tier includes API routes
- **Resend:** 3,000 emails/month free
- **Upstash Redis:** 10,000 requests/day free
- **Formspree:** 50 submissions/month free

### Paid Options (if needed):
- **Resend:** $20/month for 50,000 emails
- **Upstash Redis:** ~$0.20 per 100K requests
- **Database:** Varies by provider

---

## Next Steps

1. ✅ Choose email service (Resend recommended)
2. ✅ Install dependencies (`npm install zod resend`)
3. ✅ Create API route (`app/api/contact/route.ts`)
4. ✅ Create email utility (`lib/email.ts`)
5. ✅ Create rate limiter (`lib/rateLimit.ts`)
6. ✅ Update contact form component
7. ✅ Set up environment variables
8. ✅ Test locally
9. ✅ Deploy and test in production

---

## Support & Resources

- **Next.js API Routes:** https://nextjs.org/docs/app/building-your-application/routing/route-handlers
- **Zod Validation:** https://zod.dev
- **Resend:** https://resend.com/docs
- **Upstash Rate Limiting:** https://upstash.com/docs/redis/features/ratelimiting

---

**Last Updated:** $(date)  
**Version:** 1.0

