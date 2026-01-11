import { TemplateProvider } from '../../core/interfaces/TemplateProvider';
import { GenerationContext, FileOutput, TemplateCategory } from '../../core/types/GenerationContext';
import { TemplateReader } from '../../core/base/TemplateReader';

/**
 * NestJS Guard template provider
 * Generates authorization guards for NestJS
 *
 * @description
 * Creates guard components including:
 * - Auth guard
 * - Roles guard
 * - Owner guard
 */
export class NestJsGuardTemplate extends TemplateReader implements TemplateProvider {
    readonly id = 'nestjs-guard' as const;
    readonly name = 'NestJS Guard';
    readonly category: TemplateCategory = 'infrastructure';
    readonly description = 'NestJS authorization guards (auth, roles, ownership)';

    async generate(context: GenerationContext): Promise<FileOutput> {
        const content = await this.readTemplate('common/nestjs-guard.md', context);
        const fileName = this.toKebabCase(context.entityName);

        return {
            relativePath: `${fileName}.guard.ts`,
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
