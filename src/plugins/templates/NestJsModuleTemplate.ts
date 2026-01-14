import { TemplateProvider } from '../../core/interfaces/TemplateProvider';
import { GenerationContext, FileOutput, TemplateCategory } from '../../core/types/GenerationContext';
import { TemplateReader } from '../../core/base/TemplateReader';

/**
 * NestJS Module template provider
 * Generates NestJS module files following clean architecture
 * 
 * @description
 * NestJS modules are the building blocks of NestJS applications.
 * They encapsulate controllers, services, and other providers.
 */
export class NestJsModuleTemplate extends TemplateReader implements TemplateProvider {
  readonly id = 'nestjs-module' as const;
  readonly name = 'NestJS Module';
  readonly category: TemplateCategory = 'infrastructure';
  readonly description = 'NestJS module for dependency injection and organization';

  async generate(context: GenerationContext): Promise<FileOutput> {
    const content = await this.readTemplate('common/nestjs-module.md', context);
    const fileName = this.toKebabCase(context.entityName);

    return {
      relativePath: `${fileName}.module.ts`,
      content,
    };
  }

  private toKebabCase(str: string): string {
    return str
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .replace(/[\s_]+/g, '-')
      .toLowerCase();
  }
}
