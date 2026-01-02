import { TemplateProvider } from '../../core/interfaces/TemplateProvider';
import { GenerationContext, FileOutput } from '../../core/types/GenerationContext';
import { TemplateReader } from '../../core/base/TemplateReader';

/**
 * React component template provider
 * Generates React functional components
 */
export class ComponentTemplate extends TemplateReader implements TemplateProvider {
  readonly id = 'component' as const;
  readonly name = 'React Component';
  readonly category = 'presentation' as const;
  readonly description = 'React functional component';

  async generate(context: GenerationContext): Promise<FileOutput> {
    const content = await this.readTemplate('common/component.md', context);

    return {
      relativePath: `${context.entityName}.tsx`,
      content,
    };
  }
}
