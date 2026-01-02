import { GenerationContext, FileOutput } from '../types/GenerationContext';

/**
 * Plugin interface for framework-specific code generation
 *
 * Implement this interface to add support for new frameworks
 *
 * @example
 * ```typescript
 * export class FastifyPlugin implements FrameworkPlugin {
 *   readonly id = 'fastify';
 *   readonly name = 'Fastify';
 *   readonly description = 'Fast and low overhead web framework';
 *
 *   generate(context: GenerationContext): FileOutput {
 *     // Implementation
 *   }
 * }
 * ```
 */
export interface FrameworkPlugin {
  /**
   * Unique identifier for the framework
   */
  readonly id: string;

  /**
   * Display name of the framework
   */
  readonly name: string;

  /**
   * Description shown in CLI selection
   */
  readonly description: string;

  /**
   * Generate framework-specific code
   */
  generate(context: GenerationContext): Promise<FileOutput>;
}
