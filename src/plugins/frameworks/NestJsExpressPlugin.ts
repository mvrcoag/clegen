import { FrameworkPlugin } from '../../core/interfaces/FrameworkPlugin';
import { GenerationContext, FileOutput } from '../../core/types/GenerationContext';
import { TemplateReader } from '../../core/base/TemplateReader';

/**
 * NestJS with Express adapter framework plugin
 * Generates NestJS controllers, modules, and DTOs following clean architecture
 * 
 * @description
 * NestJS is a progressive Node.js framework for building efficient and scalable
 * server-side applications. This plugin uses the default Express adapter.
 * 
 * Generated structure:
 * - Controller: HTTP endpoint handlers with decorators
 * - Module: NestJS module configuration
 * - DTOs: Data Transfer Objects for request/response validation
 */
export class NestJsExpressPlugin extends TemplateReader implements FrameworkPlugin {
    readonly id = 'nestjs-express';
    readonly name = 'NestJS (Express)';
    readonly description = 'Progressive Node.js framework with Express adapter';

    async generate(context: GenerationContext): Promise<FileOutput> {
        const content = await this.readTemplate('routes/nestjs-express.md', context);
        const fileName = this.toKebabCase(context.entityName);

        return {
            relativePath: `${fileName}.controller.ts`,
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
