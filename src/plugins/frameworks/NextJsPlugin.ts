import { FrameworkPlugin } from '../../core/interfaces/FrameworkPlugin';
import { GenerationContext, FileOutput } from '../../core/types/GenerationContext';
import { TemplateReader } from '../../core/base/TemplateReader';

/**
 * Next.js framework plugin
 * Generates API routes using Next.js App Router
 */
export class NextJsPlugin extends TemplateReader implements FrameworkPlugin {
  readonly id = 'nextjs';
  readonly name = 'Next.js';
  readonly description = 'React framework with API routes support';

  async generate(context: GenerationContext): Promise<FileOutput> {
    const content = await this.readTemplate('routes/nextjs.md', context);

    return {
      relativePath: `route.ts`,
      content,
    };
  }
}
