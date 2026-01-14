import { TemplateProvider } from '../../core/interfaces/TemplateProvider';
import { GenerationContext, FileOutput, TemplateCategory } from '../../core/types/GenerationContext';
import { TemplateReader } from '../../core/base/TemplateReader';

/**
 * NestJS DTO template provider
 * Generates Data Transfer Objects with validation decorators
 * 
 * @description
 * DTOs define the shape of data being sent over the network.
 * They include class-validator decorators for automatic validation
 * and @nestjs/swagger decorators for OpenAPI documentation.
 */
export class NestJsDtoTemplate extends TemplateReader implements TemplateProvider {
    readonly id = 'nestjs-dto' as const;
    readonly name = 'NestJS DTOs';
    readonly category: TemplateCategory = 'infrastructure';
    readonly description = 'NestJS Data Transfer Objects with validation';

    async generate(context: GenerationContext): Promise<FileOutput> {
        const content = await this.readTemplate('common/nestjs-dto.md', context);
        const fileName = this.toKebabCase(context.entityName);

        return {
            relativePath: `${fileName}.dto.ts`,
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
