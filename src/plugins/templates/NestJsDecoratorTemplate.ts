import { TemplateProvider } from '../../core/interfaces/TemplateProvider';
import { GenerationContext, FileOutput, TemplateCategory } from '../../core/types/GenerationContext';
import { TemplateReader } from '../../core/base/TemplateReader';

/**
 * NestJS Decorator template provider
 * Generates custom decorators for NestJS
 *
 * @description
 * Creates reusable decorator components including:
 * - CurrentUser decorator
 * - Roles decorator
 * - Public decorator
 * - EntityId decorator
 * - Pagination decorator
 */
export class NestJsDecoratorTemplate extends TemplateReader implements TemplateProvider {
    readonly id = 'nestjs-decorator' as const;
    readonly name = 'NestJS Decorator';
    readonly category: TemplateCategory = 'infrastructure';
    readonly description = 'NestJS custom decorators (user, roles, public, pagination)';

    async generate(context: GenerationContext): Promise<FileOutput> {
        const content = await this.readTemplate('common/nestjs-decorator.md', context);
        const fileName = this.toKebabCase(context.entityName);

        return {
            relativePath: `${fileName}.decorator.ts`,
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
