type LogLevel = 'error' | 'warn' | 'info';

interface LogContext {
  [key: string]: any;
}

class MiddlewareLogger {
  private formatMessage(level: LogLevel, message: string, context?: LogContext) {
    return JSON.stringify({
      timestamp: new Date().toISOString(),
      level: level.toUpperCase(),
      message,
      ...context,
    });
  }

  error(message: string, error?: Error | unknown) {
    console.error(this.formatMessage('error', message, {
      error: error instanceof Error ? {
        message: error.message,
        name: error.name,
      } : error,
    }));
  }

  warn(message: string, context?: LogContext) {
    console.warn(this.formatMessage('warn', message, context));
  }

  info(message: string, context?: LogContext) {
    console.log(this.formatMessage('info', message, context));
  }
}

export const log = new MiddlewareLogger(); 