import { TemplateProvider } from '../../core/interfaces/TemplateProvider';
import { GenerationContext, FileOutput, TemplateCategory } from '../../core/types/GenerationContext';
import { TemplateReader } from '../../core/base/TemplateReader';

/**
 * NestJS Interceptor template provider
 * Generates interceptors for request/response transformation
 *
 * @description
 * Creates interceptor components including:
 * - Transform interceptor (response wrapping)
 * - Logging interceptor
 * - Error interceptor
 * - Timeout interceptor
 * - Cache interceptor
 */
export class NestJsInterceptorTemplate extends TemplateReader implements TemplateProvider {
    readonly id = 'nestjs-interceptor' as const;
    readonly name = 'NestJS Interceptor';
    readonly category: TemplateCategory = 'infrastructure';
    readonly description = 'NestJS interceptors (transform, logging, cache, timeout)';

    async generate(context: GenerationContext): Promise<FileOutput> {
        const content = await this.readTemplate('common/nestjs-interceptor.md', context);
        const fileName = this.toKebabCase(context.entityName);

        return {
            relativePath: `${fileName}.interceptor.ts`,
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
