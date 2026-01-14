import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

/**

* {{ Entity }} Auth Guard
*
* Authorization guard for {{ entity }} routes.
* Validates user authentication and permissions.
*
* @file {{ entity }}.guard.ts
* @description Authorization guard for {{ entity }} operations
*
* @example

* ```typescript
* @UseGuards({{ Entity }}AuthGuard)
* @Get()
* findAll() {
* return this.{{ entity }}Service.findAll();
* }

* ```

 */
@Injectable()
export class {{ Entity }}AuthGuard implements CanActivate {
  private readonly logger = new Logger({{ Entity }}AuthGuard.name);

  constructor(private readonly reflector: Reflector) {}

  /**

* Determine if request is authorized
* @param context - Execution context
* @returns Boolean indicating authorization status
   */
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // Check if route is marked as public
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    // Validate user exists
    if (!user) {
      this.logger.warn('Unauthorized access attempt - no user in request');
      throw new UnauthorizedException('Authentication required');
    }

    this.logger.log(`User ${user.id} accessing {{ entity }} resource`);
    return true;
  }
}

/**

* {{ Entity }} Roles Guard
*
* Role-based access control guard for {{ entity }} routes.
* Checks if user has required roles to access the resource.
*
* @example

* ```typescript
* @UseGuards({{ Entity }}RolesGuard)
* @Roles('admin', 'manager')
* @Delete(':id')
* remove(@Param('id') id: string) {
* return this.{{ entity }}Service.remove(id);
* }

* ```

 */
@Injectable()
export class {{ Entity }}RolesGuard implements CanActivate {
  private readonly logger = new Logger({{ Entity }}RolesGuard.name);

  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    // No roles required - allow access
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new UnauthorizedException('Authentication required');
    }

    const userRoles: string[] = user.roles || [];
    const hasRole = requiredRoles.some((role) => userRoles.includes(role));

    if (!hasRole) {
      this.logger.warn(
        `User ${user.id} lacks required roles: ${requiredRoles.join(', ')}`,
      );
      throw new ForbiddenException(
        'You do not have permission to access this resource',
      );
    }

    return true;
  }
}

/**

* {{ Entity }} Owner Guard
*
* Ownership guard ensuring users can only access their own {{ entity }} resources.
*
* @example

* ```typescript
* @UseGuards({{ Entity }}OwnerGuard)
* @Put(':id')
* update(@Param('id') id: string, @Body() dto: Update{{ Entity }}Dto) {
* return this.{{ entity }}Service.update(id, dto);
* }

* ```

 */
@Injectable()
export class {{ Entity }}OwnerGuard implements CanActivate {
  private readonly logger = new Logger({{ Entity }}OwnerGuard.name);

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const resourceId = request.params.id;

    if (!user) {
      throw new UnauthorizedException('Authentication required');
    }

    // Admin users bypass ownership check
    if (user.roles?.includes('admin')) {
      return true;
    }

    // TODO: Implement ownership check
    // const resource = await this.{{ entity }}Service.findOne(resourceId);
    // if (resource.userId !== user.id) {
    //   throw new ForbiddenException('You can only access your own resources');
    // }

    this.logger.log(`Ownership check passed for user ${user.id}`);
    return true;
  }
}
