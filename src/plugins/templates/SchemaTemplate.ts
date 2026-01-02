import { TemplateProvider } from '../../core/interfaces/TemplateProvider';
import { GenerationContext, FileOutput } from '../../core/types/GenerationContext';
import { TemplateReader } from '../../core/base/TemplateReader';

/**
 * Schema template provider
 * Generates Zod validation schemas
 */
export class SchemaTemplate extends TemplateReader implements TemplateProvider {
  readonly id = 'schema' as const;
  readonly name = 'Zod Schemas';
  readonly category = 'infrastructure' as const;
  readonly description = 'Zod validation schemas for data validation';

  async generate(context: GenerationContext): Promise<FileOutput> {
    const content = await this.readTemplate('common/schema.md', context);

    return {
      relativePath: `${context.entityName}Schemas.ts`,
      content,
    };
  }
}
