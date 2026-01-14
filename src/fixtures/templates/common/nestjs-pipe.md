import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ZodSchema, ZodError } from 'zod';

/**

* {{ Entity }} Zod Validation Pipe
*
* Custom validation pipe using Zod schemas for type-safe validation.
* Provides detailed error messages and automatic data transformation.
*
* @file {{ entity }}-validation.pipe.ts
* @description Validation pipe for {{ entity }} DTOs
*
* @example

* ```typescript
* @Post()
* @UsePipes(new {{ Entity }}ValidationPipe(create{{ Entity }}Schema))
* async create(@Body() dto: Create{{ Entity }}Dto) {
* return this.{{ entity }}Service.create(dto);
* }

* ```

 */
@Injectable()
export class {{ Entity }}ValidationPipe<T> implements PipeTransform<unknown, T> {
  constructor(private readonly schema: ZodSchema<T>) {}

  /**

* Transform and validate incoming data
* @param value - Raw input value
* @param metadata - Argument metadata
* @returns Validated and transformed data
* @throws BadRequestException if validation fails
   */
  transform(value: unknown, metadata: ArgumentMetadata): T {
    try {
      return this.schema.parse(value);
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors = this.formatZodErrors(error);
        throw new BadRequestException({
          message: 'Validation failed',
          errors: formattedErrors,
          statusCode: 400,
        });
      }
      throw new BadRequestException('Validation failed');
    }
  }

  /**

* Format Zod errors into a readable structure
* @param error - ZodError instance
* @returns Formatted error object
   */
  private formatZodErrors(error: ZodError): Record<string, string[]> {
    const formattedErrors: Record<string, string[]> = {};

    error.errors.forEach((err) => {
      const path = err.path.join('.') || 'value';
      if (!formattedErrors[path]) {
        formattedErrors[path] = [];
      }
      formattedErrors[path].push(err.message);
    });

    return formattedErrors;
  }
}

/**

* Generic Zod Validation Pipe
*
* Reusable validation pipe that accepts any Zod schema.
* Can be instantiated per-route with different schemas.
 */
@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private readonly schema: ZodSchema) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    try {
      return this.schema.parse(value);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException({
          message: 'Validation failed',
          errors: error.flatten().fieldErrors,
          statusCode: 400,
        });
      }
      throw new BadRequestException('Validation failed');
    }
  }
}

/**

* Parse{{ Entity }}IdPipe
*
* Validates and parses {{ entity }} ID parameters.
* Ensures the ID is a valid UUID format.
 */
@Injectable()
export class Parse{{ Entity }}IdPipe implements PipeTransform<string, string> {
  private readonly uuidSchema = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  transform(value: string, metadata: ArgumentMetadata): string {
    if (!this.uuidSchema.test(value)) {
      throw new BadRequestException(`Invalid {{ Entity }} ID format: ${value}`);
    }
    return value;
  }
}
