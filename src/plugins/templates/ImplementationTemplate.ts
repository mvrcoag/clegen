import { TemplateProvider } from '../../core/interfaces/TemplateProvider';
import { GenerationContext, FileOutput } from '../../core/types/GenerationContext';
import { TemplateReader } from '../../core/base/TemplateReader';

/**
 * Implementation template provider
 * Generates repository implementations (infrastructure layer)
 */
export class ImplementationTemplate extends TemplateReader implements TemplateProvider {
  readonly id = 'implementation' as const;
  readonly name = 'Implementation';
  readonly category = 'infrastructure' as const;
  readonly description = 'Repository implementation for specific data source';

  async generate(context: GenerationContext): Promise<FileOutput> {
    const content = await this.readTemplate('common/implementation.md', context);

    const implType = context.implementationType || 'Default';
    return {
      relativePath: `${implType}${context.entityName}Repository.ts`,
      content,
    };
  }
}
