import { TemplateProvider } from '../../core/interfaces/TemplateProvider';
import { GenerationContext, FileOutput, TemplateCategory } from '../../core/types/GenerationContext';
import { TemplateReader } from '../../core/base/TemplateReader';

/**
 * NestJS Middleware template provider
 * Generates middleware for request processing
 *
 * @description
 * Creates middleware components including:
 * - Logger middleware
 * - Auth middleware
 * - Rate limiting middleware
 */
export class NestJsMiddlewareTemplate extends TemplateReader implements TemplateProvider {
    readonly id = 'nestjs-middleware' as const;
    readonly name = 'NestJS Middleware';
    readonly category: TemplateCategory = 'infrastructure';
    readonly description = 'NestJS request middleware (logging, auth, rate-limit)';

    async generate(context: GenerationContext): Promise<FileOutput> {
        const content = await this.readTemplate('common/nestjs-middleware.md', context);
        const fileName = this.toKebabCase(context.entityName);

        return {
            relativePath: `${fileName}.middleware.ts`,
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
