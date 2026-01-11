import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

/**

* {{ Entity }} Logger Middleware
*
* Logs incoming requests for {{ entity }} routes with timing information.
* Provides detailed request/response logging for debugging and monitoring.
*
* @file {{ entity }}.middleware.ts
* @description Request logging middleware for {{ entity }} routes
*
* @example

* ```typescript
* // In your module
* export class {{ Entity }}Module implements NestModule {
* configure(consumer: MiddlewareConsumer) {
*     consumer
*       .apply({{ Entity }}LoggerMiddleware)
*       .forRoutes({{ Entity }}Controller);
* }
* }

* ```

 */
@Injectable()
export class {{ Entity }}LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('{{ Entity }}Middleware');

  /**

* Process incoming request
* @param req - Express request object
* @param res - Express response object
* @param next - Next function to call
   */
  use(req: Request, res: Response, next: NextFunction): void {
    const { method, originalUrl, ip } = req;
    const userAgent = req.get('user-agent') || '';
    const startTime = Date.now();

    // Log request start
    this.logger.log(
      `[{{ Entity }}] ${method} ${originalUrl} - ${ip} - ${userAgent}`,
    );

    // Log response when finished
    res.on('finish', () => {
      const { statusCode } = res;
      const contentLength = res.get('content-length') || 0;
      const duration = Date.now() - startTime;

      const logMessage = `[{{ Entity }}] ${method} ${originalUrl} ${statusCode} ${contentLength} - ${duration}ms`;

      if (statusCode >= 400) {
        this.logger.warn(logMessage);
      } else {
        this.logger.log(logMessage);
      }
    });

    next();
  }
}

/**

* {{ Entity }} Auth Middleware
*
* Validates authentication tokens for {{ entity }} routes.
* Attaches user information to the request object.
*
* @example

* ```typescript
* consumer
* .apply({{ Entity }}AuthMiddleware)
* .forRoutes({ path: '{{ entity }}', method: RequestMethod.ALL });

* ```

 */
@Injectable()
export class {{ Entity }}AuthMiddleware implements NestMiddleware {
  private readonly logger = new Logger('{{ Entity }}AuthMiddleware');

  use(req: Request, res: Response, next: NextFunction): void {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      this.logger.warn('No authorization header provided');
      // Continue without auth - let guards handle authorization
      return next();
    }

    try {
      // Extract token from "Bearer <token>" format
      const [type, token] = authHeader.split(' ');

      if (type !== 'Bearer' || !token) {
        this.logger.warn('Invalid authorization header format');
        return next();
      }

      // TODO: Validate token and extract user info
      // const user = await this.authService.validateToken(token);
      // req['user'] = user;

      next();
    } catch (error) {
      this.logger.error('Token validation failed', error);
      next();
    }
  }
}

/**

* {{ Entity }} Rate Limit Middleware
*
* Basic rate limiting for {{ entity }} routes.
* Prevents abuse by limiting requests per IP.
 */
@Injectable()
export class {{ Entity }}RateLimitMiddleware implements NestMiddleware {
  private readonly logger = new Logger('{{ Entity }}RateLimitMiddleware');
  private readonly requestCounts = new Map<string, { count: number; resetTime: number }>();
  private readonly maxRequests = 100;
  private readonly windowMs = 60000; // 1 minute

  use(req: Request, res: Response, next: NextFunction): void {
    const ip = req.ip || req.connection.remoteAddress || 'unknown';
    const now = Date.now();

    const record = this.requestCounts.get(ip);

    if (!record || now > record.resetTime) {
      this.requestCounts.set(ip, { count: 1, resetTime: now + this.windowMs });
      return next();
    }

    if (record.count >= this.maxRequests) {
      this.logger.warn(`Rate limit exceeded for IP: ${ip}`);
      res.status(429).json({
        statusCode: 429,
        message: 'Too many requests. Please try again later.',
      });
      return;
    }

    record.count++;
    next();
  }
}
