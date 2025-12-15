/**
 * Production-ready logging utility
 * Provides structured logging with different log levels
 */

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  data?: unknown;
  error?: {
    message: string;
    stack?: string;
  };
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development';

  private formatLog(level: LogLevel, message: string, data?: unknown, error?: Error): LogEntry {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
    };
    
    if (data) {
      entry.data = data;
    }
    
    if (error) {
      entry.error = { message: error.message, stack: error.stack };
    }
    
    return entry;
  }

  private log(level: LogLevel, message: string, data?: unknown, error?: Error): void {
    const logEntry = this.formatLog(level, message, data, error);

    if (this.isDevelopment) {
      // Pretty print in development
      const prefix = `[${logEntry.timestamp}] [${level.toUpperCase()}]`;
      console.log(prefix, message, data || '', error || '');
    } else {
      // JSON format in production (for log aggregation tools)
      console.log(JSON.stringify(logEntry));
    }
  }

  info(message: string, data?: unknown): void {
    this.log('info', message, data);
  }

  warn(message: string, data?: unknown): void {
    this.log('warn', message, data);
  }

  error(message: string, error?: Error, data?: unknown): void {
    this.log('error', message, data, error);
  }

  debug(message: string, data?: unknown): void {
    if (this.isDevelopment) {
      this.log('debug', message, data);
    }
  }
}

export const logger = new Logger();

