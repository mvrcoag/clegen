import { TemplateProvider } from '../../core/interfaces/TemplateProvider';
import { GenerationContext, FileOutput } from '../../core/types/GenerationContext';
import { TemplateReader } from '../../core/base/TemplateReader';

/**
 * Utils template provider
 * Generates utility functions
 */
export class UtilsTemplate extends TemplateReader implements TemplateProvider {
  readonly id = 'utils' as const;
  readonly name = 'Utils';
  readonly category = 'infrastructure' as const;
  readonly description = 'Utility functions and helpers';

  async generate(context: GenerationContext): Promise<FileOutput> {
    const content = await this.readTemplate('common/utils.md', context);

    return {
      relativePath: `${context.entityName}Utils.ts`,
      content,
    };
  }
}
