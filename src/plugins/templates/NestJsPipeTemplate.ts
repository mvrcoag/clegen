import { TemplateProvider } from '../../core/interfaces/TemplateProvider';
import { GenerationContext, FileOutput, TemplateCategory } from '../../core/types/GenerationContext';
import { TemplateReader } from '../../core/base/TemplateReader';

/**
 * NestJS Pipe template provider
 * Generates custom validation pipes for NestJS
 *
 * @description
 * Creates reusable validation pipes including:
 * - Zod validation pipe
 * - Entity-specific validation pipe
 * - ID parsing pipe
 */
export class NestJsPipeTemplate extends TemplateReader implements TemplateProvider {
  readonly id = 'nestjs-pipe' as const;
  readonly name = 'NestJS Pipe';
  readonly category: TemplateCategory = 'infrastructure';
  readonly description = 'NestJS custom validation pipes';

  async generate(context: GenerationContext): Promise<FileOutput> {
    const content = await this.readTemplate('common/nestjs-pipe.md', context);
    const fileName = this.toKebabCase(context.entityName);

    return {
      relativePath: `${fileName}-validation.pipe.ts`,
      content,
    };
  }

  private toKebabCase(str: string): string {
    return str
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .replace(/[\s_]+/g, '-')
      .toLowerCase();
  }
}
