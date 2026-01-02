import { z } from 'zod';

/**
 * {{ Entity }} validation schema
 */
export const {{ Entity }}Schema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

/**
 * Create {{ Entity }} validation schema
 */
export const Create{{ Entity }}Schema = {{ Entity }}Schema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

/**
 * Update {{ Entity }} validation schema
 */
export const Update{{ Entity }}Schema = {{ Entity }}Schema.partial().omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type {{ Entity }}Input = z.infer<typeof {{ Entity }}Schema>;
export type Create{{ Entity }}Input = z.infer<typeof Create{{ Entity }}Schema>;
export type Update{{ Entity }}Input = z.infer<typeof Update{{ Entity }}Schema>;
