import { z } from 'zod';

/**

* {{ Entity }} Zod Schemas
*
* Schema definitions for {{ Entity }} validation using Zod.
* Provides type-safe validation with automatic TypeScript inference.
*
* @file {{ entity }}.schema.ts
* @description Zod schemas for {{ entity }} validation
 */

/**

* Base {{ Entity }} Schema
* Core fields shared across create/update operations
 */
const {{ entity }}BaseSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must not exceed 100 characters')
    .trim(),
  description: z
    .string()
    .max(500, 'Description must not exceed 500 characters')
    .optional(),
});

/**

* Create {{ Entity }} Schema
* Used for validating new {{ entity }} creation requests
 */
export const create{{ Entity }}Schema = {{ entity }}BaseSchema.extend({
  // Add additional required fields for creation here
});

/**

* Update {{ Entity }} Schema
* All fields are optional for partial updates
 */
export const update{{ Entity }}Schema = {{ entity }}BaseSchema.partial();

/**

* {{ Entity }} Response Schema
* Full {{ entity }} object with all fields
 */
export const {{ entity }}ResponseSchema = {{ entity }}BaseSchema.extend({
  id: z.string().uuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

/**

* {{ Entity }} Query Schema
* For filtering and pagination
 */
export const {{ entity }}QuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
  search: z.string().optional(),
  sortBy: z.enum(['createdAt', 'updatedAt', 'name']).default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

/**

* Inferred TypeScript Types
* Auto-generated from Zod schemas for type safety
 */
export type Create{{ Entity }}Dto = z.infer<typeof create{{ Entity }}Schema>;
export type Update{{ Entity }}Dto = z.infer<typeof update{{ Entity }}Schema>;
export type {{ Entity }}ResponseDto = z.infer<typeof {{ entity }}ResponseSchema>;
export type {{ Entity }}QueryDto = z.infer<typeof {{ entity }}QuerySchema>;

/**

* Schema exports for use with ZodValidationPipe
 */
export const {{ Entity }}Schemas = {
  create: create{{ Entity }}Schema,
  update: update{{ Entity }}Schema,
  response: {{ entity }}ResponseSchema,
  query: {{ entity }}QuerySchema,
} as const;
