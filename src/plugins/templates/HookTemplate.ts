import { TemplateProvider } from '../../core/interfaces/TemplateProvider';
import { GenerationContext, FileOutput } from '../../core/types/GenerationContext';
import { TemplateReader } from '../../core/base/TemplateReader';

/**
 * React hook template provider
 * Generates custom React hooks
 */
export class HookTemplate extends TemplateReader implements TemplateProvider {
  readonly id = 'hook' as const;
  readonly name = 'React Hook';
  readonly category = 'presentation' as const;
  readonly description = 'Custom React hook for state management';

  async generate(context: GenerationContext): Promise<FileOutput> {
    const content = await this.readTemplate('common/hook.md', context);

    return {
      relativePath: `use${context.entityName}.tsx`,
      content,
    };
  }
}
