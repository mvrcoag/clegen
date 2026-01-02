import { FrameworkPlugin } from '../../core/interfaces/FrameworkPlugin';
import { GenerationContext, FileOutput } from '../../core/types/GenerationContext';
import { TemplateReader } from '../../core/base/TemplateReader';

/**
 * Express framework plugin
 * Generates REST API routes using Express Router
 */
export class ExpressPlugin extends TemplateReader implements FrameworkPlugin {
  readonly id = 'express';
  readonly name = 'Express';
  readonly description = 'Fast, unopinionated web framework for Node.js';

  async generate(context: GenerationContext): Promise<FileOutput> {
    const content = await this.readTemplate('routes/express.md', context);

    return {
      relativePath: `${context.entityName}Router.ts`,
      content,
    };
  }
}
