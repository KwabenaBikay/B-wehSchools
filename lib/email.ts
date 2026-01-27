/**
 * Email utility for sending contact form notifications
 * 
 * Option 1: Using Resend (Recommended - easier setup)
 * Option 2: Using Nodemailer (SMTP)
 * 
 * See BACKEND_RECOMMENDATIONS.md for setup instructions
 */

// Option 1: Resend (Recommended)
export async function sendEmailResend({
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
    const { Resend } = await import('resend');
    
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured');
      return { success: false, error: 'Email service not configured' };
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    
    const result = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'noreply@bwehschools.com',
      to,
      subject,
      html,
      text,
    });

    if (result.error) {
      console.error('Resend API error:', result.error);
      return { success: false, error: result.error };
    }

    return { success: true, id: result.data?.id };
  } catch (error) {
    console.error('Email error:', error);
    return { success: false, error };
  }
}

// Option 2: Nodemailer (SMTP)
export async function sendEmailSMTP({
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
    const nodemailer = await import('nodemailer');
    
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.error('SMTP configuration is incomplete');
      return { success: false, error: 'SMTP not configured' };
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_PORT === '465',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
    
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to,
      subject,
      html,
      text,
    });

    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Email error:', error);
    return { success: false, error };
  }
}

// Main function - uses Resend by default, falls back to SMTP
export async function sendEmail(params: {
  to: string;
  subject: string;
  html: string;
  text: string;
}) {
  // Use Resend if API key is set, otherwise use SMTP
  if (process.env.RESEND_API_KEY) {
    return sendEmailResend(params);
  } else if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    return sendEmailSMTP(params);
  } else {
    // No email service configured - log warning but don't fail in development
    if (process.env.NODE_ENV === 'production') {
      console.error('No email service configured in production!');
      return { success: false, error: 'Email service not configured' };
    }
    console.warn('No email service configured. Email would be:', params);
    return { success: true }; // Return success in development so form still works
  }
}

