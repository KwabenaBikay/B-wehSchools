import { NextResponse } from 'next/server';
import { validateEnv } from '@/lib/env';
import { checkBwexusHealth } from '@/lib/bwexus-api';

/**
 * Health check endpoint
 * Returns system status and configuration
 */
export async function GET() {
  const envValidation = validateEnv();
  const bwexusHealth = await checkBwexusHealth();

  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: {
      nodeEnv: process.env.NODE_ENV || 'development',
      emailService: envValidation.config.emailService,
      bwexusEnabled: envValidation.config.bwexusEnabled,
      bwexusAvailable: bwexusHealth.available,
    },
    ...(process.env.NODE_ENV === 'development' && {
      config: {
        emailService: envValidation.config.emailService,
        bwexusEnabled: envValidation.config.bwexusEnabled,
      },
      validation: {
        valid: envValidation.valid,
        errors: envValidation.errors,
      },
    }),
  });
}

