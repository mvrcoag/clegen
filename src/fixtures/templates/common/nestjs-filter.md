import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

/**

* {{ Entity }} Error Response Interface
* Standard error response structure
 */
interface {{ Entity }}ErrorResponse {
  success: false;
  statusCode: number;
  message: string;
  error: string;
  timestamp: string;
  path: string;
  details?: Record<string, unknown>;
}

/**

* {{ Entity }} HTTP Exception Filter
*
* Catches and formats HTTP exceptions for {{ entity }} routes.
* Provides consistent error response structure.
*
* @file {{ entity }}-exception.filter.ts
* @description Exception filter for {{ entity }} module
*
* @example

* ```typescript
* @UseFilters({{ Entity }}HttpExceptionFilter)
* @Controller('{{ entity }}')
* export class {{ Entity }}Controller {}

* ```

 */
@Catch(HttpException)
export class {{ Entity }}HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger({{ Entity }}HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    // Extract message from exception response
    let message: string;
    let details: Record<string, unknown> | undefined;

    if (typeof exceptionResponse === 'string') {
      message = exceptionResponse;
    } else if (typeof exceptionResponse === 'object') {
      const responseObj = exceptionResponse as Record<string, unknown>;
      message = (responseObj.message as string) || exception.message;
      details = responseObj.errors as Record<string, unknown>;
    } else {
      message = exception.message;
    }

    const errorResponse: {{ Entity }}ErrorResponse = {
      success: false,
      statusCode: status,
      message,
      error: HttpStatus[status] || 'Unknown Error',
      timestamp: new Date().toISOString(),
      path: request.url,
      ...(details && { details }),
    };

    this.logger.warn(
      `[{{ Entity }}] HTTP Exception: ${status} ${message} - ${request.method} ${request.url}`,
    );

    response.status(status).json(errorResponse);
  }
}

/**

* {{ Entity }} All Exceptions Filter
*
* Catches all unhandled exceptions for {{ entity }} routes.
* Ensures no exception leaks without proper formatting.
*
* @example

* ```typescript
* // Apply globally in main.ts
* app.useGlobalFilters(new {{ Entity }}AllExceptionsFilter());

* ```

 */
@Catch()
export class {{ Entity }}AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger({{ Entity }}AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      message =
        typeof exceptionResponse === 'string'
          ? exceptionResponse
          : (exceptionResponse as Record<string, unknown>).message as string ||
            exception.message;
    } else if (exception instanceof Error) {
      message = exception.message;
      this.logger.error(
        `[{{ Entity }}] Unhandled Exception: ${exception.message}`,
        exception.stack,
      );
    }

    const errorResponse: {{ Entity }}ErrorResponse = {
      success: false,
      statusCode: status,
      message,
      error: HttpStatus[status] || 'Internal Server Error',
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    response.status(status).json(errorResponse);
  }
}

/**

* {{ Entity }} Validation Exception Filter
*
* Specialized filter for validation errors.
* Formats validation errors into a user-friendly structure.
 */
@Catch(HttpException)
export class {{ Entity }}ValidationExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger({{ Entity }}ValidationExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    // Only handle validation errors (400 Bad Request)
    if (status !== HttpStatus.BAD_REQUEST) {
      throw exception;
    }

    const exceptionResponse = exception.getResponse() as Record<string, unknown>;
    const validationErrors = exceptionResponse.message;

    const errorResponse = {
      success: false,
      statusCode: status,
      message: 'Validation failed',
      error: 'Bad Request',
      timestamp: new Date().toISOString(),
      path: request.url,
      validationErrors: Array.isArray(validationErrors)
        ? validationErrors
        : [validationErrors],
    };

    this.logger.warn(
      `[{{ Entity }}] Validation Error: ${JSON.stringify(validationErrors)} - ${request.method} ${request.url}`,
    );

    response.status(status).json(errorResponse);
  }
}

/**

* {{ Entity }} Not Found Exception Filter
*
* Specialized filter for 404 Not Found errors.
* Provides helpful error messages for missing resources.
 */
@Catch(HttpException)
export class {{ Entity }}NotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    if (status !== HttpStatus.NOT_FOUND) {
      throw exception;
    }

    const errorResponse: {{ Entity }}ErrorResponse = {
      success: false,
      statusCode: status,
      message: `{{ Entity }} not found`,
      error: 'Not Found',
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    response.status(status).json(errorResponse);
  }
}
