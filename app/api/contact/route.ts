import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { rateLimit } from '@/lib/rateLimit';
import { sendEmail } from '@/lib/email';
import { sendToBwexus, type ContactSubmission } from '@/lib/bwexus-api';
import { logger } from '@/lib/logger';

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
  const startTime = Date.now();
  const ip = request.ip || 
             request.headers.get('x-forwarded-for')?.split(',')[0] || 
             request.headers.get('x-real-ip') || 
             'unknown';

  try {
    logger.info('Contact form submission attempt', { ip });

    // Rate limiting
    const rateLimitResult = await rateLimit(request);
    if (!rateLimitResult.success) {
      logger.warn('Rate limit exceeded', { ip });
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
      logger.warn('Validation failed', { 
        ip, 
        errors: validationResult.error.errors 
      });
      return NextResponse.json(
        { 
          error: 'Validation failed',
          details: validationResult.error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message,
          }))
        },
        { status: 400 }
      );
    }

    const { name, email, phone, message, website } = validationResult.data;

    // Honeypot check (if filled, it's likely a bot)
    if (website && website.length > 0) {
      logger.warn('Honeypot triggered - likely bot', { ip, email: email.substring(0, 5) + '***' });
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
    const recipientEmail = process.env.SMTP_TO || 
                          process.env.RESEND_TO_EMAIL || 
                          'bwehschools@gmail.com';
    
    const emailResult = await sendEmail({
      to: recipientEmail,
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
      const errorMessage = 'error' in emailResult ? 
        (emailResult.error instanceof Error ? emailResult.error.message : String(emailResult.error)) : 
        'Unknown error';
      logger.error(
        'Email sending failed',
        new Error(errorMessage),
        { ip, email: sanitizedData.email }
      );
      // Still return success to user, but log the error
    } else {
      logger.info('Email sent successfully', { ip, email: sanitizedData.email });
    }

    // Send to Bwexus platform if enabled (for future integration)
    const bwexusSubmission: ContactSubmission = {
      name: sanitizedData.name,
      email: sanitizedData.email,
      phone: sanitizedData.phone,
      message: sanitizedData.message,
      submittedAt: new Date(),
      source: 'website',
    };

    const bwexusResult = await sendToBwexus(bwexusSubmission);
    if (bwexusResult.success) {
      logger.info('Bwexus sync successful', { ip, email: sanitizedData.email });
    } else if (process.env.BWEXUS_API_ENABLED === 'true') {
      logger.warn('Bwexus integration failed (non-critical)', { 
        ip, 
        email: sanitizedData.email,
        error: bwexusResult.error 
      });
    }

    const duration = Date.now() - startTime;
    logger.info('Contact form submission completed', { 
      ip, 
      email: sanitizedData.email, 
      duration: `${duration}ms` 
    });

    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you for your message! We will get back to you soon.',
        // Include Bwexus sync status in development
        ...(process.env.NODE_ENV === 'development' && {
          bwexusSynced: bwexusResult.success,
        }),
      },
      { status: 200 }
    );

  } catch (error) {
    const duration = Date.now() - startTime;
    logger.error(
      'Contact form submission error',
      error instanceof Error ? error : new Error('Unknown error'),
      { ip, duration: `${duration}ms` }
    );
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

// OPTIONS handler for CORS (if needed)
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

