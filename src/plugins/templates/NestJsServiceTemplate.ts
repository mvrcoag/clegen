import { TemplateProvider } from '../../core/interfaces/TemplateProvider';
import { GenerationContext, FileOutput, TemplateCategory } from '../../core/types/GenerationContext';
import { TemplateReader } from '../../core/base/TemplateReader';

/**
 * NestJS Service template provider
 * Generates NestJS injectable service with dependency injection
 * 
 * @description
 * NestJS services are providers that can be injected into controllers
 * or other services. They handle business logic and are decorated
 * with @Injectable() for the DI system.
 */
export class NestJsServiceTemplate extends TemplateReader implements TemplateProvider {
  readonly id = 'nestjs-service' as const;
  readonly name = 'NestJS Service';
  readonly category: TemplateCategory = 'application';
  readonly description = 'NestJS injectable service with dependency injection';

  async generate(context: GenerationContext): Promise<FileOutput> {
    const content = await this.readTemplate('common/nestjs-service.md', context);
    const fileName = this.toKebabCase(context.entityName);

    return {
      relativePath: `${fileName}.service.ts`,
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
