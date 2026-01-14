import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
  BadGatewayException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { map, tap, catchError, timeout } from 'rxjs/operators';

/**

* {{ Entity }} Response Interface
* Standard API response structure
 */
interface {{ Entity }}ApiResponse<T> {
  success: boolean;
  data: T;
  timestamp: string;
  path: string;
}

/**

* {{ Entity }} Transform Interceptor
*
* Transforms all {{ entity }} responses into a standardized format.
* Wraps response data with metadata for consistent API responses.
*
* @file {{ entity }}.interceptor.ts
* @description Response transformation interceptor for {{ entity }} routes
*
* @example

* ```typescript
* @UseInterceptors({{ Entity }}TransformInterceptor)
* @Controller('{{ entity }}')
* export class {{ Entity }}Controller {}

* ```

 */
@Injectable()
export class {{ Entity }}TransformInterceptor<T>
  implements NestInterceptor<T, {{ Entity }}ApiResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<{{ Entity }}ApiResponse<T>> {
    const request = context.switchToHttp().getRequest();

    return next.handle().pipe(
      map((data) => ({
        success: true,
        data,
        timestamp: new Date().toISOString(),
        path: request.url,
      })),
    );
  }
}

/**

* {{ Entity }} Logging Interceptor
*
* Logs request/response details including execution time.
* Useful for debugging and performance monitoring.
*
* @example

* ```typescript
* @UseInterceptors({{ Entity }}LoggingInterceptor)
* @Get()
* findAll() {}

* ```

 */
@Injectable()
export class {{ Entity }}LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger({{ Entity }}LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, body } = request;
    const startTime = Date.now();

    this.logger.log(`[{{ Entity }}] Incoming ${method} ${url}`);

    if (Object.keys(body || {}).length > 0) {
      this.logger.debug(`[{{ Entity }}] Request body: ${JSON.stringify(body)}`);
    }

    return next.handle().pipe(
      tap((response) => {
        const duration = Date.now() - startTime;
        this.logger.log(`[{{ Entity }}] ${method} ${url} completed in ${duration}ms`);
      }),
    );
  }
}

/**

* {{ Entity }} Error Interceptor
*
* Catches and transforms errors for consistent error responses.
* Maps internal errors to appropriate HTTP exceptions.
*
* @example

* ```typescript
* @UseInterceptors({{ Entity }}ErrorInterceptor)
* @Controller('{{ entity }}')
* export class {{ Entity }}Controller {}

* ```

 */
@Injectable()
export class {{ Entity }}ErrorInterceptor implements NestInterceptor {
  private readonly logger = new Logger({{ Entity }}ErrorInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        this.logger.error(
          `[{{ Entity }}] Error occurred: ${error.message}`,
          error.stack,
        );

        // Transform to standardized error format
        return throwError(() => error);
      }),
    );
  }
}

/**

* {{ Entity }} Timeout Interceptor
*
* Applies timeout to {{ entity }} operations.
* Prevents long-running requests from blocking resources.
*
* @example

* ```typescript
* @UseInterceptors({{ Entity }}TimeoutInterceptor)
* @Get()
* findAll() {}

* ```

 */
@Injectable()
export class {{ Entity }}TimeoutInterceptor implements NestInterceptor {
  private readonly timeoutMs: number;

  constructor(timeoutMs: number = 30000) {
    this.timeoutMs = timeoutMs;
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      timeout(this.timeoutMs),
      catchError((error) => {
        if (error.name === 'TimeoutError') {
          throw new BadGatewayException(
            `{{ Entity }} operation timed out after ${this.timeoutMs}ms`,
          );
        }
        return throwError(() => error);
      }),
    );
  }
}

/**

* {{ Entity }} Cache Interceptor
*
* Simple in-memory caching for {{ entity }} GET requests.
* Reduces database load for frequently accessed resources.
 */
@Injectable()
export class {{ Entity }}CacheInterceptor implements NestInterceptor {
  private readonly cache = new Map<string, { data: any; expiry: number }>();
  private readonly ttlMs: number;

  constructor(ttlMs: number = 60000) {
    this.ttlMs = ttlMs;
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    // Only cache GET requests
    if (request.method !== 'GET') {
      return next.handle();
    }

    const cacheKey = `{{ entity }}:${request.url}`;
    const cached = this.cache.get(cacheKey);

    if (cached && cached.expiry > Date.now()) {
      return new Observable((observer) => {
        observer.next(cached.data);
        observer.complete();
      });
    }

    return next.handle().pipe(
      tap((data) => {
        this.cache.set(cacheKey, {
          data,
          expiry: Date.now() + this.ttlMs,
        });
      }),
    );
  }
}
