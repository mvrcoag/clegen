import { TemplateProvider } from '../../core/interfaces/TemplateProvider';
import { GenerationContext, FileOutput, TemplateCategory } from '../../core/types/GenerationContext';
import { TemplateReader } from '../../core/base/TemplateReader';

/**
 * NestJS Zod DTO template provider
 * Generates Data Transfer Objects using Zod for validation
 *
 * @description
 * Creates type-safe DTOs with Zod schemas for validation.
 * Provides automatic TypeScript type inference from schemas.
 * Alternative to class-validator for functional validation approach.
 */
export class NestJsDtoZodTemplate extends TemplateReader implements TemplateProvider {
    readonly id = 'nestjs-dto-zod' as const;
    readonly name = 'NestJS DTOs (Zod)';
    readonly category: TemplateCategory = 'infrastructure';
    readonly description = 'NestJS DTOs with Zod validation schemas';

    async generate(context: GenerationContext): Promise<FileOutput> {
        const content = await this.readTemplate('common/nestjs-dto-zod.md', context);
        // Use kebab-case for file naming convention
        const fileName = this.toKebabCase(context.entityName);

        return {
            relativePath: `${fileName}.schema.ts`,
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
