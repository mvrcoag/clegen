import { TemplateProvider } from '../../core/interfaces/TemplateProvider';
import { GenerationContext, FileOutput } from '../../core/types/GenerationContext';
import { TemplateReader } from '../../core/base/TemplateReader';

/**
 * Service template provider
 * Generates service classes with business logic
 */
export class ServiceTemplate extends TemplateReader implements TemplateProvider {
  readonly id = 'service' as const;
  readonly name = 'Service';
  readonly category = 'application' as const;
  readonly description = 'Business logic service layer';

  async generate(context: GenerationContext): Promise<FileOutput> {
    const content = await this.readTemplate('common/service.md', context);

    return {
      relativePath: `${context.entityName}Service.ts`,
      content,
    };
  }
}
