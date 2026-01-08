import * as fs from "fs/promises";
import * as path from "path";
import { GenerationContext } from "../types/GenerationContext";
import { toCamelCase, toPascalCase } from "../utils/StringUtils";

/**
 * Base class for reading and processing template files
 *
 * Provides utility methods for template replacement and file reading
 */
export class TemplateReader {
  private readonly templatesBasePath: string;

  constructor() {
    this.templatesBasePath = path.resolve(
      __dirname,
      "../../fixtures/templates",
    );
  }

  /**
   * Read template file and apply replacements
   */
  protected async readTemplate(
    templatePath: string,
    context: GenerationContext,
  ): Promise<string> {
    const fullPath = path.join(this.templatesBasePath, templatePath);
    const content = await fs.readFile(fullPath, "utf-8");

    return this.applyReplacements(content, context);
  }

  /**
   * Apply context-based replacements to template content
   */
  protected applyReplacements(
    content: string,
    context: GenerationContext,
  ): string {
    let processedContent = content;

    // Standard replacements
    const replacements: Record<string, string> = {
      "{{ Entity }}": context.entityName,
      "{{ entity }}": context.entityNameLowercase,
      "{{ Module }}": context.moduleName,
      "{{ module }}": context.moduleName.toLowerCase(),
    };

    // Add implementation type if provided
    if (context.implementationType) {
      replacements["{{ Impl }}"] = context.implementationType;
    }

    // Add custom replacements
    if (context.customReplacements) {
      Object.assign(replacements, context.customReplacements);
    }

    // Apply all replacements
    Object.entries(replacements).forEach(([placeholder, value]) => {
      processedContent = processedContent.replace(
        new RegExp(placeholder, "g"),
        value,
      );
    });

    // Fix imports based on concept groups
    processedContent = this.fixImports(processedContent, context);

    return processedContent;
  }

  /**
   * Fix import paths based on concept groups
   */
  private fixImports(content: string, context: GenerationContext): string {
    const { currentGroup } = context;
    let processedContent = content;

    // Pattern: import { X } from './YService' - adjust to correct group
    const sameGroupImportRegex =
      /from ['"]\.\/([A-Z][a-zA-Z0-9]+)(Service|Types|Repository)['"]/g;

    processedContent = processedContent.replace(
      sameGroupImportRegex,
      (match, entityName, suffix) => {
        const targetGroup = this.getGroupForSuffix(suffix);
        if (!targetGroup || currentGroup === targetGroup) {
          return match; // Keep same if same group or no target group found
        }
        return `from '../${targetGroup}/${entityName}${suffix}'`;
      },
    );

    return processedContent;
  }

  /**
   * Get concept group based on file suffix
   */
  private getGroupForSuffix(suffix: string): string {
    if (suffix === "Repository") return "domain";
    if (suffix === "Service") return "services";
    if (suffix === "Types") return "domain";
    return "domain";
  }

  /**
   * Build generation context from module name
   */
  protected buildContext(
    moduleName: string,
    additionalContext?: Partial<GenerationContext>,
  ): GenerationContext {
    return {
      moduleName,
      entityName: toPascalCase(moduleName),
      entityNameLowercase: toCamelCase(moduleName),
      ...additionalContext,
    };
  }
}
