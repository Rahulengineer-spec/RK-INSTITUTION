import pino from 'pino';
import pretty from 'pino-pretty';

// Configure log levels
const levels = {
  error: 50,
  warn: 40,
  info: 30,
  debug: 20,
  trace: 10,
};

// Create a pretty print stream for development
const prettyStream = pretty({
  colorize: true,
  levelFirst: true,
  translateTime: 'yyyy-mm-dd HH:MM:ss',
});

// Create the logger instance
const logger = pino(
  {
    level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
    customLevels: levels,
    useOnlyCustomLevels: true,
    formatters: {
      level: (label: string) => {
        return { level: label.toUpperCase() };
      },
    },
    timestamp: () => `,"time":"${new Date().toISOString()}"`,
  },
  process.env.NODE_ENV === 'development' ? prettyStream : undefined
);

interface LogContext {
  [key: string]: any;
}

interface RequestContext {
  url?: string;
  method?: string;
  headers?: Record<string, string | string[] | undefined>;
  query?: Record<string, string | string[]>;
  body?: any;
}

interface ResponseContext {
  statusCode?: number;
  headers?: Record<string, string | string[] | undefined>;
}

type LogLevel = 'error' | 'warn' | 'info' | 'debug' | 'trace';

class EdgeLogger {
  private isDevelopment = process.env.NODE_ENV === 'development';

  private formatMessage(level: LogLevel, message: string, context?: LogContext) {
    const timestamp = new Date().toISOString();
    return {
      timestamp,
      level: level.toUpperCase(),
      message,
      ...context,
    };
  }

  private log(level: LogLevel, message: string, context?: LogContext) {
    const formattedMessage = this.formatMessage(level, message, context);
    console.log(JSON.stringify(formattedMessage));
  }

  error(message: string, error?: Error, req?: RequestContext) {
    this.log('error', message, {
      ...(error && { 
        error: {
          message: error.message,
          name: error.name,
          stack: this.isDevelopment ? error.stack : undefined,
        }
      }),
      ...(req && { request: this.formatRequest(req) }),
    });
  }

  warn(message: string, context?: any, req?: RequestContext) {
    this.log('warn', message, {
      ...(context && { context }),
      ...(req && { request: this.formatRequest(req) }),
    });
  }

  info(message: string, context?: any, req?: RequestContext) {
    this.log('info', message, {
      ...(context && { context }),
      ...(req && { request: this.formatRequest(req) }),
    });
  }

  debug(message: string, context?: any, req?: RequestContext) {
    if (this.isDevelopment) {
      this.log('debug', message, {
        ...(context && { context }),
        ...(req && { request: this.formatRequest(req) }),
      });
    }
  }

  trace(message: string, context?: any, req?: RequestContext) {
    if (this.isDevelopment) {
      this.log('trace', message, {
        ...(context && { context }),
        ...(req && { request: this.formatRequest(req) }),
      });
    }
  }

  private formatRequest(req: RequestContext) {
    return {
      url: req.url,
      method: req.method,
      headers: req.headers,
      query: req.query,
      body: this.isDevelopment ? req.body : undefined,
    };
  }

  apiRequest(req: RequestContext, duration?: number) {
    this.info('API Request', {
      request: this.formatRequest(req),
      ...(duration && { duration: `${duration}ms` }),
    });
  }

  apiResponse(req: RequestContext, res: ResponseContext, duration: number) {
    this.info('API Response', {
      request: this.formatRequest(req),
      response: {
        statusCode: res.statusCode,
        headers: res.headers,
      },
      duration: `${duration}ms`,
    });
  }

  dbOperation(operation: string, model: string, duration: number, error?: Error) {
    const context = {
      operation,
      model,
      duration: `${duration}ms`,
      ...(error && {
        error: {
          message: error.message,
          name: error.name,
          stack: this.isDevelopment ? error.stack : undefined,
        }
      }),
    };

    if (error) {
      this.error('Database Operation Failed', error, undefined);
    } else {
      this.debug('Database Operation', context);
    }
  }

  auth(event: string, userId?: string, error?: Error) {
    const context = {
      event,
      ...(userId && { userId }),
      ...(error && {
        error: {
          message: error.message,
          name: error.name,
          stack: this.isDevelopment ? error.stack : undefined,
        }
      }),
    };

    if (error) {
      this.error('Authentication Failed', error, undefined);
    } else {
      this.info('Authentication Event', context);
    }
  }
}

const edgeLogger = new EdgeLogger();
export const log = edgeLogger;
export default edgeLogger; 