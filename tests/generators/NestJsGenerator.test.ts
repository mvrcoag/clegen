import { ModularGenerator } from '../../src/Generators/ModularGenerator';
import * as fs from 'fs/promises';
import { ParsedCliConfig } from '../../src/core/types/CliOptions';

jest.mock('fs/promises');

describe('NestJS Framework Integration', () => {
    const mockFs = fs as jest.Mocked<typeof fs>;

    beforeEach(() => {
        jest.clearAllMocks();
        mockFs.mkdir.mockResolvedValue(undefined);
        mockFs.writeFile.mockResolvedValue(undefined);
        mockFs.access.mockRejectedValue(new Error('ENOENT'));

        // Mock readFile to return appropriate NestJS template content
        mockFs.readFile.mockImplementation((filePath: any) => {
            const pathStr = filePath.toString();

            if (pathStr.includes('nestjs-express.md')) {
                return Promise.resolve(`import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';

@Controller('{{ entityKebab }}')
export class {{ Entity }}Controller {
  @Get()
  findAll() {}

  @Post()
  create(@Body() dto: any) {}
}`);
            }

            if (pathStr.includes('nestjs-fastify.md')) {
                return Promise.resolve(`import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';

@Controller('{{ entityKebab }}')
export class {{ Entity }}Controller {
  @Get()
  findAll() {}

  @Post()
  create(@Body() dto: any) {}
}`);
            }

            if (pathStr.includes('nestjs-module.md')) {
                return Promise.resolve(`import { Module } from '@nestjs/common';
import { {{ Entity }}Service } from '../services/{{ entityKebab }}.service';
import { {{ Entity }}Controller } from '../routes/{{ entityKebab }}.controller';

@Module({
  imports: [],
  controllers: [{{ Entity }}Controller],
  providers: [{{ Entity }}Service],
  exports: [{{ Entity }}Service]
})
export class {{ Entity }}Module {}`);
            }

            if (pathStr.includes('nestjs-service.md')) {
                return Promise.resolve(`import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class {{ Entity }}Service {
  async findAll() {
    return [];
  }

  async findOne(id: string) {
    throw new NotFoundException();
  }
}`);
            }

            if (pathStr.includes('nestjs-dto.md')) {
                return Promise.resolve(`import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class Create{{ Entity }}Dto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class Update{{ Entity }}Dto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  name?: string;
}

export class {{ Entity }}ResponseDto {
  @ApiProperty()
  id: string;
}`);
            }

            if (pathStr.includes('nestjs-dto-zod.md')) {
                return Promise.resolve(`import { z } from 'zod';

const {{ entityCamel }}BaseSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
});

const create{{ Entity }}Schema = {{ entityCamel }}BaseSchema;

const update{{ Entity }}Schema = {{ entityCamel }}BaseSchema.partial();

const {{ entityCamel }}ResponseSchema = {{ entityCamel }}BaseSchema.extend({
  id: z.string(),
  createdAt: z.date(),
});

export const {{ entityCamel }}Schemas = {
  base: {{ entityCamel }}BaseSchema,
  create: create{{ Entity }}Schema,
  update: update{{ Entity }}Schema,
  response: {{ entityCamel }}ResponseSchema,
};

export type Create{{ Entity }} = z.infer<typeof create{{ Entity }}Schema>;
export type Update{{ Entity }} = z.infer<typeof update{{ Entity }}Schema>;
export type {{ Entity }}Response = z.infer<typeof {{ entityCamel }}ResponseSchema>;`);
            }

            if (pathStr.includes('nestjs-pipe.md')) {
                return Promise.resolve(`import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { ZodSchema } from 'zod';

@Injectable()
export class {{ Entity }}ValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    try {
      return this.schema.parse(value);
    } catch (error) {
      throw new BadRequestException('Validation failed');
    }
  }
}`);
            }

            if (pathStr.includes('nestjs-guard.md')) {
                return Promise.resolve(`import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class {{ Entity }}Guard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    return true;
  }
}`);
            }

            if (pathStr.includes('nestjs-interceptor.md')) {
                return Promise.resolve(`import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class {{ Entity }}Interceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(data => ({ data, timestamp: new Date().toISOString() }))
    );
  }
}`);
            }

            if (pathStr.includes('nestjs-middleware.md')) {
                return Promise.resolve(`import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class {{ Entity }}Middleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    next();
  }
}`);
            }

            if (pathStr.includes('nestjs-decorator.md')) {
                return Promise.resolve(`import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Current{{ Entity }} = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  }
);`);
            }

            if (pathStr.includes('nestjs-filter.md')) {
                return Promise.resolve(`import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class {{ Entity }}ExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      message: exception.message,
    });
  }
}`);
            }

            return Promise.resolve('export interface {{ Entity }}Types {}');
        });
    });

    describe('NestJS Express Framework', () => {
        describe('Controller Generation', () => {
            it('should generate controller with kebab-case filename', async () => {
                const config: ParsedCliConfig = {
                    name: 'UserProfile',
                    path: 'src/modules/UserProfile',
                    elements: ['routes'],
                    framework: 'nestjs-express',
                };

                const generator = new ModularGenerator(config);
                await generator.run();

                const writeCalls = mockFs.writeFile.mock.calls;
                const controllerCall = writeCalls.find(call => call[0].toString().includes('controller.ts'));

                expect(controllerCall).toBeDefined();
                const normalizedPath = controllerCall![0].toString().replace(/\\/g, '/');
                expect(normalizedPath).toContain('routes/user-profile.controller.ts');
            });

            it('should generate controller with PascalCase class name', async () => {
                const config: ParsedCliConfig = {
                    name: 'UserProfile',
                    path: 'src/modules/UserProfile',
                    elements: ['routes'],
                    framework: 'nestjs-express',
                };

                const generator = new ModularGenerator(config);
                await generator.run();

                const writeCalls = mockFs.writeFile.mock.calls;
                const controllerCall = writeCalls.find(call => call[0].toString().includes('controller.ts'));
                const content = controllerCall![1] as string;

                expect(content).toContain('export class UserProfileController');
                expect(content).toContain('@Controller');
                expect(content).toContain('@Get()');
                expect(content).toContain('@Post()');
            });

            it('should handle hyphenated entity names correctly', async () => {
                const config: ParsedCliConfig = {
                    name: 'shopping-cart',
                    path: 'src/modules/shopping-cart',
                    elements: ['routes'],
                    framework: 'nestjs-express',
                };

                const generator = new ModularGenerator(config);
                await generator.run();

                const writeCalls = mockFs.writeFile.mock.calls;
                const controllerCall = writeCalls.find(call => call[0].toString().includes('controller.ts'));

                expect(controllerCall).toBeDefined();
                const normalizedPath = controllerCall![0].toString().replace(/\\/g, '/');
                expect(normalizedPath).toContain('routes/shopping-cart.controller.ts');

                const content = controllerCall![1] as string;
                expect(content).toContain('export class ShoppingCartController');
            });

            it('should handle single word entity names', async () => {
                const config: ParsedCliConfig = {
                    name: 'Product',
                    path: 'src/modules/Product',
                    elements: ['routes'],
                    framework: 'nestjs-express',
                };

                const generator = new ModularGenerator(config);
                await generator.run();

                const writeCalls = mockFs.writeFile.mock.calls;
                const controllerCall = writeCalls.find(call => call[0].toString().includes('controller.ts'));

                expect(controllerCall).toBeDefined();
                const normalizedPath = controllerCall![0].toString().replace(/\\/g, '/');
                expect(normalizedPath).toContain('routes/product.controller.ts');

                const content = controllerCall![1] as string;
                expect(content).toContain('export class ProductController');
            });
        });

        describe('Complete Module Generation', () => {
            it('should generate all core components with correct structure', async () => {
                const config: ParsedCliConfig = {
                    name: 'BlogPost',
                    path: 'src/modules/BlogPost',
                    elements: ['routes', 'nestjs-module', 'nestjs-service', 'nestjs-dto'],
                    framework: 'nestjs-express',
                };

                const generator = new ModularGenerator(config);
                await generator.run();

                const writeCalls = mockFs.writeFile.mock.calls;

                // Verify controller
                const controllerCall = writeCalls.find(call => call[0].toString().includes('controller.ts'));
                expect(controllerCall).toBeDefined();
                expect(controllerCall![0].toString().replace(/\\/g, '/')).toContain('routes/blog-post.controller.ts');

                // Verify module
                const moduleCall = writeCalls.find(call => call[0].toString().includes('module.ts'));
                expect(moduleCall).toBeDefined();
                expect(moduleCall![0].toString().replace(/\\/g, '/')).toContain('infrastructure/blog-post.module.ts');
                expect(moduleCall![1]).toContain('export class BlogPostModule');
                expect(moduleCall![1]).toContain('@Module');

                // Verify service
                const serviceCall = writeCalls.find(call => call[0].toString().includes('service.ts'));
                expect(serviceCall).toBeDefined();
                expect(serviceCall![0].toString().replace(/\\/g, '/')).toContain('services/blog-post.service.ts');
                expect(serviceCall![1]).toContain('export class BlogPostService');
                expect(serviceCall![1]).toContain('@Injectable');

                // Verify DTO
                const dtoCall = writeCalls.find(call => call[0].toString().includes('.dto.ts'));
                expect(dtoCall).toBeDefined();
                expect(dtoCall![0].toString().replace(/\\/g, '/')).toContain('domain/blog-post.dto.ts');
            });
        });

        describe('Building Blocks Generation', () => {
            it('should generate all building blocks with kebab-case naming', async () => {
                const config: ParsedCliConfig = {
                    name: 'OrderItem',
                    path: 'src/modules/OrderItem',
                    elements: [
                        'nestjs-pipe',
                        'nestjs-guard',
                        'nestjs-interceptor',
                        'nestjs-middleware',
                        'nestjs-decorator',
                        'nestjs-filter',
                    ],
                    framework: 'nestjs-express',
                };

                const generator = new ModularGenerator(config);
                await generator.run();

                const writeCalls = mockFs.writeFile.mock.calls;

                // Verify pipe
                const pipeCall = writeCalls.find(call => call[0].toString().includes('pipe.ts'));
                expect(pipeCall).toBeDefined();
                expect(pipeCall![0].toString().replace(/\\/g, '/')).toContain('infrastructure/order-item-validation.pipe.ts');
                expect(pipeCall![1]).toContain('export class OrderItemValidationPipe');

                // Verify guard
                const guardCall = writeCalls.find(call => call[0].toString().includes('guard.ts'));
                expect(guardCall).toBeDefined();
                expect(guardCall![0].toString().replace(/\\/g, '/')).toContain('infrastructure/order-item.guard.ts');
                expect(guardCall![1]).toContain('export class OrderItemGuard');

                // Verify interceptor
                const interceptorCall = writeCalls.find(call => call[0].toString().includes('interceptor.ts'));
                expect(interceptorCall).toBeDefined();
                expect(interceptorCall![0].toString().replace(/\\/g, '/')).toContain('infrastructure/order-item.interceptor.ts');
                expect(interceptorCall![1]).toContain('export class OrderItemInterceptor');

                // Verify middleware
                const middlewareCall = writeCalls.find(call => call[0].toString().includes('middleware.ts'));
                expect(middlewareCall).toBeDefined();
                expect(middlewareCall![0].toString().replace(/\\/g, '/')).toContain('infrastructure/order-item.middleware.ts');
                expect(middlewareCall![1]).toContain('export class OrderItemMiddleware');

                // Verify decorator
                const decoratorCall = writeCalls.find(call => call[0].toString().includes('decorator.ts'));
                expect(decoratorCall).toBeDefined();
                expect(decoratorCall![0].toString().replace(/\\/g, '/')).toContain('infrastructure/order-item.decorator.ts');
                expect(decoratorCall![1]).toContain('CurrentOrderItem');

                // Verify exception filter
                const filterCall = writeCalls.find(call => call[0].toString().includes('filter.ts'));
                expect(filterCall).toBeDefined();
                expect(filterCall![0].toString().replace(/\\/g, '/')).toContain('infrastructure/order-item-exception.filter.ts');
                expect(filterCall![1]).toContain('export class OrderItemExceptionFilter');
            });
        });

        describe('Validation Strategies', () => {
            it('should generate class-validator DTOs with decorators', async () => {
                const config: ParsedCliConfig = {
                    name: 'Payment',
                    path: 'src/modules/Payment',
                    elements: ['nestjs-dto'],
                    framework: 'nestjs-express',
                };

                const generator = new ModularGenerator(config);
                await generator.run();

                const writeCalls = mockFs.writeFile.mock.calls;
                const dtoCall = writeCalls.find(call => call[0].toString().includes('.dto.ts'));

                expect(dtoCall).toBeDefined();
                const content = dtoCall![1] as string;

                expect(content).toContain('class-validator');
                expect(content).toContain('@nestjs/swagger');
                expect(content).toContain('export class CreatePaymentDto');
                expect(content).toContain('export class UpdatePaymentDto');
                expect(content).toContain('export class PaymentResponseDto');
                expect(content).toContain('@ApiProperty');
            });

            it('should generate Zod schemas with type inference', async () => {
                const config: ParsedCliConfig = {
                    name: 'Invoice',
                    path: 'src/modules/Invoice',
                    elements: ['nestjs-dto-zod'],
                    framework: 'nestjs-express',
                };

                const generator = new ModularGenerator(config);
                await generator.run();

                const writeCalls = mockFs.writeFile.mock.calls;
                const schemaCall = writeCalls.find(call => call[0].toString().includes('.schema.ts'));

                expect(schemaCall).toBeDefined();
                const content = schemaCall![1] as string;

                expect(content).toContain('import { z } from \'zod\'');
                expect(content).toContain('BaseSchema');
                expect(content).toContain('Schema');
                expect(content).toContain('z.infer');
                expect(content).toContain('export type CreateInvoice');
                expect(content).toContain('export type UpdateInvoice');
            });
        });
    });

    describe('NestJS Fastify Framework', () => {
        describe('Controller Generation', () => {
            it('should generate controller with kebab-case filename', async () => {
                const config: ParsedCliConfig = {
                    name: 'ApiEndpoint',
                    path: 'src/modules/ApiEndpoint',
                    elements: ['routes'],
                    framework: 'nestjs-fastify',
                };

                const generator = new ModularGenerator(config);
                await generator.run();

                const writeCalls = mockFs.writeFile.mock.calls;
                const controllerCall = writeCalls.find(call => call[0].toString().includes('controller.ts'));

                expect(controllerCall).toBeDefined();
                const normalizedPath = controllerCall![0].toString().replace(/\\/g, '/');
                expect(normalizedPath).toContain('routes/api-endpoint.controller.ts');

                const content = controllerCall![1] as string;
                expect(content).toContain('export class ApiEndpointController');
                expect(content).toContain('@Controller');
            });

            it('should handle single word entity names', async () => {
                const config: ParsedCliConfig = {
                    name: 'User',
                    path: 'src/modules/User',
                    elements: ['routes'],
                    framework: 'nestjs-fastify',
                };

                const generator = new ModularGenerator(config);
                await generator.run();

                const writeCalls = mockFs.writeFile.mock.calls;
                const controllerCall = writeCalls.find(call => call[0].toString().includes('controller.ts'));

                expect(controllerCall).toBeDefined();
                const normalizedPath = controllerCall![0].toString().replace(/\\/g, '/');
                expect(normalizedPath).toContain('routes/user.controller.ts');

                const content = controllerCall![1] as string;
                expect(content).toContain('export class UserController');
            });
        });

        describe('Complete Module Generation', () => {
            it('should generate full module with all components', async () => {
                const config: ParsedCliConfig = {
                    name: 'WebhookEvent',
                    path: 'src/modules/WebhookEvent',
                    elements: ['routes', 'nestjs-module', 'nestjs-service', 'nestjs-dto-zod'],
                    framework: 'nestjs-fastify',
                };

                const generator = new ModularGenerator(config);
                await generator.run();

                const writeCalls = mockFs.writeFile.mock.calls;

                // Verify all components
                expect(writeCalls.find(call => call[0].toString().includes('controller.ts'))).toBeDefined();
                expect(writeCalls.find(call => call[0].toString().includes('module.ts'))).toBeDefined();
                expect(writeCalls.find(call => call[0].toString().includes('service.ts'))).toBeDefined();
                expect(writeCalls.find(call => call[0].toString().includes('.schema.ts'))).toBeDefined();

                // Verify kebab-case naming
                const controllerPath = writeCalls.find(call => call[0].toString().includes('controller.ts'))![0].toString();
                expect(controllerPath.replace(/\\/g, '/')).toContain('webhook-event.controller.ts');
            });
        });
    });

    describe('Cross-Framework Consistency', () => {
        it('should maintain consistent structure across Express and Fastify', async () => {
            const expressConfig: ParsedCliConfig = {
                name: 'Product',
                path: 'src/modules/express/Product',
                elements: ['routes', 'nestjs-service'],
                framework: 'nestjs-express',
            };

            const fastifyConfig: ParsedCliConfig = {
                name: 'Product',
                path: 'src/modules/fastify/Product',
                elements: ['routes', 'nestjs-service'],
                framework: 'nestjs-fastify',
            };

            const expressGenerator = new ModularGenerator(expressConfig);
            await expressGenerator.run();

            jest.clearAllMocks();
            mockFs.mkdir.mockResolvedValue(undefined);
            mockFs.writeFile.mockResolvedValue(undefined);

            const fastifyGenerator = new ModularGenerator(fastifyConfig);
            await fastifyGenerator.run();

            const expressCalls = mockFs.writeFile.mock.calls;
            const fastifyCalls = mockFs.writeFile.mock.calls;

            // Both should generate controller and service
            expect(expressCalls.some(call => call[0].toString().includes('controller.ts'))).toBe(true);
            expect(fastifyCalls.some(call => call[0].toString().includes('controller.ts'))).toBe(true);
            expect(expressCalls.some(call => call[0].toString().includes('service.ts'))).toBe(true);
            expect(fastifyCalls.some(call => call[0].toString().includes('service.ts'))).toBe(true);
        });
    });

    describe('Edge Cases', () => {
        it('should handle multi-word PascalCase entities', async () => {
            const config: ParsedCliConfig = {
                name: 'UserProfileSettings',
                path: 'src/modules/UserProfileSettings',
                elements: ['routes'],
                framework: 'nestjs-express',
            };

            const generator = new ModularGenerator(config);
            await generator.run();

            const writeCalls = mockFs.writeFile.mock.calls;
            const controllerCall = writeCalls.find(call => call[0].toString().includes('controller.ts'));

            expect(controllerCall).toBeDefined();
            const path = controllerCall![0].toString().replace(/\\/g, '/');
            expect(path).toContain('user-profile-settings.controller.ts');

            const content = controllerCall![1] as string;
            expect(content).toContain('export class UserProfileSettingsController');
        });

        it('should handle camelCase entity names', async () => {
            const config: ParsedCliConfig = {
                name: 'userAccount',
                path: 'src/modules/userAccount',
                elements: ['routes'],
                framework: 'nestjs-express',
            };

            const generator = new ModularGenerator(config);
            await generator.run();

            const writeCalls = mockFs.writeFile.mock.calls;
            const controllerCall = writeCalls.find(call => call[0].toString().includes('controller.ts'));

            expect(controllerCall).toBeDefined();
            const path = controllerCall![0].toString().replace(/\\/g, '/');
            expect(path).toContain('user-account.controller.ts');
        });

        it('should handle acronyms in entity names', async () => {
            const config: ParsedCliConfig = {
                name: 'APIKey',
                path: 'src/modules/APIKey',
                elements: ['routes'],
                framework: 'nestjs-express',
            };

            const generator = new ModularGenerator(config);
            await generator.run();

            const writeCalls = mockFs.writeFile.mock.calls;
            const controllerCall = writeCalls.find(call => call[0].toString().includes('controller.ts'));

            expect(controllerCall).toBeDefined();
            const content = controllerCall![1] as string;
            expect(content).toContain('export class APIKeyController');
        });
    });
});
