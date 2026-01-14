import { FrameworkPlugin } from '../../core/interfaces/FrameworkPlugin';
import { GenerationContext, FileOutput } from '../../core/types/GenerationContext';
import { TemplateReader } from '../../core/base/TemplateReader';

/**
 * NestJS with Fastify adapter framework plugin
 * Generates NestJS controllers, modules, and DTOs following clean architecture
 * 
 * @description
 * NestJS is a progressive Node.js framework for building efficient and scalable
 * server-side applications. This plugin uses the Fastify adapter for improved
 * performance (~2x faster than Express).
 * 
 * Generated structure:
 * - Controller: HTTP endpoint handlers with decorators
 * - Module: NestJS module configuration  
 * - DTOs: Data Transfer Objects for request/response validation
 * 
 * Note: Requires @nestjs/platform-fastify package
 */
export class NestJsFastifyPlugin extends TemplateReader implements FrameworkPlugin {
    readonly id = 'nestjs-fastify';
    readonly name = 'NestJS (Fastify)';
    readonly description = 'Progressive Node.js framework with Fastify adapter (high performance)';

    async generate(context: GenerationContext): Promise<FileOutput> {
        const content = await this.readTemplate('routes/nestjs-fastify.md', context);
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
