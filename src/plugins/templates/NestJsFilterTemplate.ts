import { TemplateProvider } from '../../core/interfaces/TemplateProvider';
import { GenerationContext, FileOutput, TemplateCategory } from '../../core/types/GenerationContext';
import { TemplateReader } from '../../core/base/TemplateReader';

/**
 * NestJS Exception Filter template provider
 * Generates exception filters for error handling
 *
 * @description
 * Creates filter components including:
 * - HTTP exception filter
 * - All exceptions filter
 * - Validation exception filter
 * - Not found exception filter
 */
export class NestJsFilterTemplate extends TemplateReader implements TemplateProvider {
    readonly id = 'nestjs-filter' as const;
    readonly name = 'NestJS Exception Filter';
    readonly category: TemplateCategory = 'infrastructure';
    readonly description = 'NestJS exception filters for error handling';

    async generate(context: GenerationContext): Promise<FileOutput> {
        const content = await this.readTemplate('common/nestjs-filter.md', context);
        const fileName = this.toKebabCase(context.entityName);

        return {
            relativePath: `${fileName}-exception.filter.ts`,
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
