import { FrameworkPlugin } from '../../core/interfaces/FrameworkPlugin';
import { GenerationContext, FileOutput } from '../../core/types/GenerationContext';
import { TemplateReader } from '../../core/base/TemplateReader';

/**
 * No framework plugin
 * Generates basic route handlers without any framework dependencies
 */
export class NoFrameworkPlugin extends TemplateReader implements FrameworkPlugin {
  readonly id = 'none';
  readonly name = 'No Framework';
  readonly description = 'Generate modules without framework-specific routes';

  async generate(context: GenerationContext): Promise<FileOutput> {
    const content = await this.readTemplate('routes/none.md', context);

    return {
      relativePath: `${context.entityName}Routes.ts`,
      content,
    };
  }
}
