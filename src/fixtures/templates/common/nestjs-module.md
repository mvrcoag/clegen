import { Module } from '@nestjs/common';
import { {{ Entity }}Controller } from '../routes/{{ Entity }}Controller';
import { {{ Entity }}Service } from '../services/{{ Entity }}Service';

/**

* {{ Entity }} Module
*
* NestJS module that encapsulates the {{ Entity }} feature.
* Following clean architecture and modular design principles.
*
* @description
* This module groups together:
* * Controller: HTTP endpoint handlers
* * Service: Business logic layer
* * Repository: Data access layer (if configured)
*
* Register this module in your AppModule:

* ```typescript
* @Module({
* imports: [{{ Entity }}Module],
* })
* export class AppModule {}

* ```

 */
@Module({
  imports: [],
  controllers: [{{ Entity }}Controller],
  providers: [{{ Entity }}Service],
  exports: [{{ Entity }}Service],
})
export class {{ Entity }}Module {}
