/**
 * Environment variable validation and configuration
 * Ensures all required environment variables are set in production
 */

interface EnvConfig {
  // Email configuration
  emailService: 'resend' | 'smtp' | 'none';
  resendApiKey?: string;
  resendFromEmail?: string;
  resendToEmail?: string;
  smtpHost?: string;
  smtpPort?: string;
  smtpUser?: string;
  smtpPass?: string;
  smtpFrom?: string;
  smtpTo?: string;

  // Bwexus integration
  bwexusEnabled: boolean;
  bwexusApiUrl?: string;
  bwexusApiKey?: string;

  // Environment
  nodeEnv: 'development' | 'production' | 'test';
}

export function validateEnv(): { valid: boolean; config: EnvConfig; errors: string[] } {
  const errors: string[] = [];
  const nodeEnv = (process.env.NODE_ENV || 'development') as 'development' | 'production' | 'test';

  // Determine email service
  let emailService: 'resend' | 'smtp' | 'none' = 'none';
  if (process.env.RESEND_API_KEY) {
    emailService = 'resend';
    if (!process.env.RESEND_FROM_EMAIL) {
      errors.push('RESEND_FROM_EMAIL is required when using Resend');
    }
    if (!process.env.RESEND_TO_EMAIL) {
      errors.push('RESEND_TO_EMAIL is required when using Resend');
    }
  } else if (process.env.SMTP_HOST) {
    emailService = 'smtp';
    if (!process.env.SMTP_USER) {
      errors.push('SMTP_USER is required when using SMTP');
    }
    if (!process.env.SMTP_PASS) {
      errors.push('SMTP_PASS is required when using SMTP');
    }
    if (!process.env.SMTP_TO) {
      errors.push('SMTP_TO is required when using SMTP');
    }
  }

  // In production, email service is required
  if (nodeEnv === 'production' && emailService === 'none') {
    errors.push('Email service (Resend or SMTP) must be configured in production');
  }

  // Bwexus configuration
  const bwexusEnabled = process.env.BWEXUS_API_ENABLED === 'true';
  if (bwexusEnabled) {
    if (!process.env.BWEXUS_API_URL) {
      errors.push('BWEXUS_API_URL is required when BWEXUS_API_ENABLED is true');
    }
    if (!process.env.BWEXUS_API_KEY) {
      errors.push('BWEXUS_API_KEY is required when BWEXUS_API_ENABLED is true');
    }
  }

  const config: EnvConfig = {
    emailService,
    resendApiKey: process.env.RESEND_API_KEY,
    resendFromEmail: process.env.RESEND_FROM_EMAIL,
    resendToEmail: process.env.RESEND_TO_EMAIL,
    smtpHost: process.env.SMTP_HOST,
    smtpPort: process.env.SMTP_PORT,
    smtpUser: process.env.SMTP_USER,
    smtpPass: process.env.SMTP_PASS,
    smtpFrom: process.env.SMTP_FROM,
    smtpTo: process.env.SMTP_TO,
    bwexusEnabled,
    bwexusApiUrl: process.env.BWEXUS_API_URL,
    bwexusApiKey: process.env.BWEXUS_API_KEY,
    nodeEnv,
  };

  return {
    valid: errors.length === 0,
    config,
    errors,
  };
}

// Validate on module load in production
if (process.env.NODE_ENV === 'production') {
  const validation = validateEnv();
  if (!validation.valid) {
    console.error('Environment validation failed:', validation.errors);
    // Don't throw in production to allow graceful degradation
  }
}

