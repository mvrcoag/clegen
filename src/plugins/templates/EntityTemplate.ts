import { TemplateProvider } from "../../core/interfaces/TemplateProvider";
import {
  GenerationContext,
  FileOutput,
} from "../../core/types/GenerationContext";
import { TemplateReader } from "../../core/base/TemplateReader";

/**
 * Entity template provider
 * Generates domain entity classes
 */
export class EntityTemplate extends TemplateReader implements TemplateProvider {
  readonly id = "entity" as const;
  readonly name = "Entity";
  readonly category = "domain" as const;
  readonly description = "Domain entity class";

  async generate(context: GenerationContext): Promise<FileOutput> {
    const content = await this.readTemplate("common/entity.md", context);

    return {
      relativePath: `${context.entityName}.ts`,
      content,
    };
  }
}
