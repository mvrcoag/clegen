import { GenerationContext, FileOutput, TemplateCategory, ModuleElement } from '../types/GenerationContext';

/**
 * Provider interface for template-based code generation
 *
 * Implement this interface to add new types of files/modules
 *
 * @example
 * ```typescript
 * export class ControllerTemplate implements TemplateProvider {
 *   readonly id = 'controller';
 *   readonly name = 'Controller';
 *   readonly category = 'infrastructure';
 *
 *   generate(context: GenerationContext): FileOutput {
 *     // Implementation
 *   }
 * }
 * ```
 */
export interface TemplateProvider {
  /**
   * Unique identifier for the template
   */
  readonly id: ModuleElement;

  /**
   * Display name of the template
   */
  readonly name: string;

  /**
   * Category for organizing in architecture layers
   */
  readonly category: TemplateCategory;

  /**
   * Description shown in CLI selection
   */
  readonly description: string;

  /**
   * Generate code from template
   */
  generate(context: GenerationContext): Promise<FileOutput>;
}
