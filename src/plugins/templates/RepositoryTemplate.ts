import { TemplateProvider } from '../../core/interfaces/TemplateProvider';
import { GenerationContext, FileOutput } from '../../core/types/GenerationContext';
import { TemplateReader } from '../../core/base/TemplateReader';

/**
 * Repository template provider
 * Generates repository interfaces (domain layer)
 */
export class RepositoryTemplate extends TemplateReader implements TemplateProvider {
  readonly id = 'repository' as const;
  readonly name = 'Repository';
  readonly category = 'domain' as const;
  readonly description = 'Repository interface for data access';

  async generate(context: GenerationContext): Promise<FileOutput> {
    const content = await this.readTemplate('common/repository.md', context);

    return {
      relativePath: `${context.entityName}Repository.ts`,
      content,
    };
  }
}
