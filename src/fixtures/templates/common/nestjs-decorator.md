import {
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
  applyDecorators,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiSecurity, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

/**

* {{ Entity }} Custom Decorators
*
* Reusable decorators for {{ entity }} routes and handlers.
* Provides clean, declarative API for common patterns.
*
* @file {{ entity }}.decorator.ts
* @description Custom decorators for {{ entity }} module
 */

/**

* Current User Decorator
*
* Extracts the current authenticated user from the request.
* Optionally extracts a specific property from the user object.
*
* @example

* ```typescript
* @Get('profile')
* getProfile(@CurrentUser() user: User) {
* return user;
* }
*
* @Get('profile')
* getProfile(@CurrentUser('id') userId: string) {
* return this.{{ entity }}Service.findByUser(userId);
* }

* ```

 */
export const CurrentUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      return null;
    }

    return data ? user[data] : user;
  },
);

/**

* Roles Decorator
*
* Sets required roles metadata for role-based access control.
* Used with RolesGuard for authorization.
*
* @example

* ```typescript
* @Roles('admin', 'manager')
* @Delete(':id')
* remove(@Param('id') id: string) {}

* ```

 */
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);

/**

* Public Decorator
*
* Marks a route as publicly accessible (no authentication required).
*
* @example

* ```typescript
* @Public()
* @Get()
* findAll() {}

* ```

 */
export const Public = () => SetMetadata('isPublic', true);

/**

* {{ Entity }}Id Decorator
*
* Extracts and validates {{ entity }} ID from route parameters.
*
* @example

* ```typescript
* @Get(':id')
* findOne(@{{ Entity }}Id() id: string) {
* return this.{{ entity }}Service.findOne(id);
* }

* ```

 */
export const {{ Entity }}Id = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest();
    const id = request.params.id;

    if (!id) {
      throw new Error('{{ Entity }} ID not found in request params');
    }

    return id;
  },
);

/**

* Request IP Decorator
*
* Extracts the client IP address from the request.
*
* @example

* ```typescript
* @Post()
* create(@Body() dto: Create{{ Entity }}Dto, @RequestIp() ip: string) {
* return this.{{ entity }}Service.create(dto, ip);
* }

* ```

 */
export const RequestIp = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest();
    return request.ip || request.connection.remoteAddress || 'unknown';
  },
);

/**

* User Agent Decorator
*
* Extracts the User-Agent header from the request.
*
* @example

* ```typescript
* @Post('login')
* login(@Body() dto: LoginDto, @UserAgent() userAgent: string) {
* return this.authService.login(dto, userAgent);
* }

* ```

 */
export const UserAgent = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest();
    return request.get('user-agent') || 'unknown';
  },
);

/**

* {{ Entity }} Operation Decorator
*
* Combines common decorators for {{ entity }} operations.
* Includes Swagger documentation and auth requirements.
*
* @example

* ```typescript
* @{{ Entity }}Operation('Create new {{ entity }}')
* @Post()
* create(@Body() dto: Create{{ Entity }}Dto) {}

* ```

 */
export const {{ Entity }}Operation = (summary: string) => {
  return applyDecorators(
    ApiOperation({ summary }),
    ApiBearerAuth(),
  );
};

/**

* {{ Entity }} Admin Only Decorator
*
* Combines admin role requirement with documentation.
*
* @example

* ```typescript
* @{{ Entity }}AdminOnly()
* @Delete(':id')
* remove(@Param('id') id: string) {}

* ```

 */
export const {{ Entity }}AdminOnly = () => {
  return applyDecorators(
    Roles('admin'),
    ApiOperation({ summary: '[Admin Only]' }),
    ApiSecurity('admin'),
  );
};

/**

* Pagination Params Decorator
*
* Extracts pagination parameters from query string.
*
* @example

* ```typescript
* @Get()
* findAll(@PaginationParams() pagination: { page: number; limit: number }) {
* return this.{{ entity }}Service.findAll(pagination);
* }

* ```

 */
export const PaginationParams = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const query = request.query;

    return {
      page: parseInt(query.page, 10) || 1,
      limit: Math.min(parseInt(query.limit, 10) || 10, 100),
    };
  },
);
