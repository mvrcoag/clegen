import { TemplateProvider } from '../../core/interfaces/TemplateProvider';
import { GenerationContext, FileOutput } from '../../core/types/GenerationContext';
import { TemplateReader } from '../../core/base/TemplateReader';

/**
 * Styles template provider
 * Generates CSS/SCSS style files
 */
export class StylesTemplate extends TemplateReader implements TemplateProvider {
  readonly id = 'styles' as const;
  readonly name = 'Styles';
  readonly category = 'presentation' as const;
  readonly description = 'CSS styles for components';

  async generate(context: GenerationContext): Promise<FileOutput> {
    const content = await this.readTemplate('common/styles.md', context);

    return {
      relativePath: `${context.entityName}.css`,
      content,
    };
  }
}
