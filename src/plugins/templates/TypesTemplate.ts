import { TemplateProvider } from '../../core/interfaces/TemplateProvider';
import { GenerationContext, FileOutput } from '../../core/types/GenerationContext';
import { TemplateReader } from '../../core/base/TemplateReader';

/**
 * Types template provider
 * Generates TypeScript type definitions and interfaces
 */
export class TypesTemplate extends TemplateReader implements TemplateProvider {
  readonly id = 'types' as const;
  readonly name = 'Types';
  readonly category = 'domain' as const;
  readonly description = 'TypeScript interfaces and types';

  async generate(context: GenerationContext): Promise<FileOutput> {
    const content = await this.readTemplate('common/types.md', context);

    return {
      relativePath: `${context.entityName}Types.ts`,
      content,
    };
  }
}
