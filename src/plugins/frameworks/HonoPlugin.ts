import { FrameworkPlugin } from '../../core/interfaces/FrameworkPlugin';
import { GenerationContext, FileOutput } from '../../core/types/GenerationContext';
import { TemplateReader } from '../../core/base/TemplateReader';

/**
 * Hono framework plugin
 * Generates API routes using Hono app
 */
export class HonoPlugin extends TemplateReader implements FrameworkPlugin {
  readonly id = 'hono';
  readonly name = 'Hono';
  readonly description = 'Ultrafast web framework for the Edge';

  async generate(context: GenerationContext): Promise<FileOutput> {
    const content = await this.readTemplate('routes/hono.md', context);

    return {
      relativePath: `${context.entityName}Routes.ts`,
      content,
    };
  }
}
