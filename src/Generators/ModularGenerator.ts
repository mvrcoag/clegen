import { prompt } from "enquirer";
import * as fs from "fs/promises";
import * as path from "path";
import { Generator } from "../core/interfaces/Generator";
import { ModuleConfig } from "../core/types/ModuleConfig";
import {
  ModuleElement,
  GenerationContext,
  ConceptGroup,
} from "../core/types/GenerationContext";
import {
  frameworkPlugins,
  templateProviders,
  getFrameworkPlugin,
  getTemplateProvider,
} from "../config/plugins.config";
import { ParsedCliConfig } from "../core/types/CliOptions";
import { groupElementsByConcept } from "../core/types/ConceptMapping";
import { toCamelCase, toPascalCase } from "../core/utils/StringUtils";

/**
 * Modular generator with extensible plugin architecture
 *
 * Supports multiple frameworks and distribution patterns with CLI flags
 */
export class ModularGenerator implements Generator {
  constructor(private cliConfig?: ParsedCliConfig) { }

  async run(): Promise<void> {
    const config = await this.collectUserInput();
    await this.validateModuleNotExists(config.modulePath);
    await this.generateModule(config);
  }

  /**
   * Collect all user input following the specified flow
   * Uses CLI config if provided, otherwise prompts user
   */
  private async collectUserInput(): Promise<ModuleConfig> {
    // 1. Module name
    const moduleName = this.cliConfig?.name || (await this.askModuleName());

    // 2. Framework selection
    const framework = this.cliConfig?.framework || (await this.askFramework());

    // 3. Module elements
    const elements = this.cliConfig?.elements || (await this.askElements());

    // 4. Module path
    const modulePath =
      this.cliConfig?.path || (await this.askModulePath(moduleName));

    // 5. Implementation type (if needed)
    let implementationType: string | undefined = this.cliConfig?.implementation;
    if (!implementationType && elements.includes("implementation")) {
      implementationType = await this.askImplementationType();
    }

    return {
      moduleName,
      modulePath,
      framework,
      elements,
      implementationType,
    };
  }

  /**
   * Ask for module name
   */
  private async askModuleName(): Promise<string> {
    const { moduleName } = await prompt<{ moduleName: string }>({
      type: "input",
      name: "moduleName",
      message: "What is the name of the module? (e.g., User)",
      required: true,
      validate: (value: string) => {
        if (!value || value.trim().length === 0) {
          return "Module name is required";
        }
        if (!/^[A-Z][a-zA-Z0-9]*$/.test(value)) {
          return "Module name must start with uppercase and contain only alphanumeric characters";
        }
        return true;
      },
    });

    return moduleName.replace(/\s/g, "");
  }

  /**
   * Ask for framework selection
   */
  private async askFramework(): Promise<string> {
    const { framework } = await prompt<{ framework: string }>({
      type: "select",
      name: "framework",
      message: "Select backend framework:",
      choices: frameworkPlugins.map((plugin) => ({
        name: plugin.id,
        message: `${plugin.name} - ${plugin.description}`,
      })),
      required: true,
    });

    return framework;
  }

  /**
   * Ask for module elements to generate
   * Organized by concept groups
   */
  private async askElements(): Promise<ModuleElement[]> {
    const promptFn = prompt as unknown as (
      options: Record<string, unknown>,
    ) => Promise<{ elements: ModuleElement[] }>;

    const response = await promptFn({
      type: "multiselect",
      name: "elements",
      message:
        "Select elements to generate (use Space to select, Enter to confirm):",
      choices: [
        { role: "separator", message: "── Routes ──" },
        { name: "routes", message: "API Routes - HTTP endpoint handlers" },

        { role: "separator", message: "── Services ──" },
        { name: "service", message: "Service - Business logic layer" },

        { role: "separator", message: "── Domain ──" },
        { name: "entity", message: "Entity - Domain entity class" },
        { name: "types", message: "Types - TypeScript interfaces" },
        { name: "repository", message: "Repository - Data access interface" },

        { role: "separator", message: "── Infrastructure ──" },
        {
          name: "implementation",
          message: "Implementation - Repository implementation",
        },
        { name: "schema", message: "Schemas - Zod validation schemas" },

        { role: "separator", message: "── Components ──" },
        { name: "component", message: "React Component - UI component" },
        { name: "hook", message: "React Hook - Custom hook" },

        { role: "separator", message: "── Styles ──" },
        { name: "styles", message: "Styles - CSS styles" },
        { name: "styles-native", message: "React Native Styles - StyleSheet" },

        { role: "separator", message: "── NestJS Core ──" },
        { name: "nestjs-module", message: "Module - NestJS module configuration" },
        { name: "nestjs-service", message: "Service - Injectable service with DI" },
        { name: "nestjs-dto", message: "DTOs (class-validator) - Data Transfer Objects" },
        { name: "nestjs-dto-zod", message: "DTOs (Zod) - Schema-based validation" },

        { role: "separator", message: "── NestJS Building Blocks ──" },
        { name: "nestjs-pipe", message: "Pipe - Validation & transformation" },
        { name: "nestjs-guard", message: "Guard - Authorization & roles" },
        { name: "nestjs-interceptor", message: "Interceptor - Response transform & logging" },
        { name: "nestjs-middleware", message: "Middleware - Request processing" },
        { name: "nestjs-decorator", message: "Decorator - Custom decorators" },
        { name: "nestjs-filter", message: "Filter - Exception handling" },

        { role: "separator", message: "── Utils ──" },
        { name: "utils", message: "Utils - Utility functions" },
      ],
      initial: [1, 3, 5, 6, 7, 9, 10, 12, 13, 15],
      required: true,
    });

    return response.elements;
  }

  /**
   * Ask for module path
   */
  private async askModulePath(moduleName: string): Promise<string> {
    const defaultPath = `./src/${moduleName}`;

    const { modulePath } = await prompt<{ modulePath: string }>({
      type: "input",
      name: "modulePath",
      message: `Where do you want to create the module?`,
      initial: defaultPath,
      required: true,
    });

    return modulePath.replace(/\s/g, "");
  }

  /**
   * Ask for implementation type
   */
  private async askImplementationType(): Promise<string> {
    const { implementationType } = await prompt<{ implementationType: string }>(
      {
        type: "input",
        name: "implementationType",
        message:
          "What is the implementation type? (e.g., MongoDB, PostgreSQL, InMemory)",
        required: true,
      },
    );

    return implementationType.replace(/\s/g, "");
  }

  /**
   * Validate that module doesn't already exist
   */
  private async validateModuleNotExists(modulePath: string): Promise<void> {
    const exists = await fs
      .access(modulePath)
      .then(() => true)
      .catch(() => false);

    if (exists) {
      console.error(`\n❌ Error: Module already exists at ${modulePath}`);
      process.exit(1);
    }
  }

  /**
   * Generate the complete module
   */
  private async generateModule(config: ModuleConfig): Promise<void> {
    // Create base directory structure
    await this.createDirectoryStructure(config);

    // Generate files based on selected elements
    await this.generateFiles(config);
  }

  /**
   * Create directory structure based on concept groups
   */
  private async createDirectoryStructure(config: ModuleConfig): Promise<void> {
    const { modulePath, elements } = config;

    // Create base directory
    await fs.mkdir(modulePath, { recursive: true });

    // Group elements by concept
    const grouped = groupElementsByConcept(elements);

    // Create subdirectories for each concept group
    for (const group of grouped.keys()) {
      await fs.mkdir(path.join(modulePath, group), { recursive: true });
    }
  }

  /**
   * Generate all selected files
   */
  private async generateFiles(config: ModuleConfig): Promise<void> {
    const context = this.buildGenerationContext(config);

    // Generate routes if selected
    if (config.elements.includes("routes")) {
      await this.generateRoute(config, context);
    }

    // Generate other elements
    for (const element of config.elements) {
      if (element === "routes") continue; // Already handled

      const provider = getTemplateProvider(element);
      if (provider) {
        await this.generateFromTemplate(config, context, provider);
      }
    }
  }

  /**
   * Generate route file using framework plugin
   */
  private async generateRoute(
    config: ModuleConfig,
    context: GenerationContext,
  ): Promise<void> {
    const plugin = getFrameworkPlugin(config.framework);
    if (!plugin) {
      console.warn(
        `⚠️  Framework plugin '${config.framework}' not found. Skipping routes.`,
      );
      return;
    }

    // Add group to context
    const contextWithGroup: GenerationContext = {
      ...context,
      currentGroup: "routes",
    };

    const output = await plugin.generate(contextWithGroup);
    const filePath = path.join(
      config.modulePath,
      "routes",
      output.relativePath,
    );

    await fs.writeFile(filePath, output.content, "utf-8");
    console.log(`  ✓ Generated ${path.relative(process.cwd(), filePath)}`);
  }

  /**
   * Generate file from template provider
   */
  private async generateFromTemplate(
    config: ModuleConfig,
    context: GenerationContext,
    provider: any,
  ): Promise<void> {
    const group = this.getGroupForElement(provider.id as ModuleElement);

    // Add group to context
    const contextWithGroup: GenerationContext = {
      ...context,
      currentGroup: group,
    };

    const output = await provider.generate(contextWithGroup);
    const filePath = path.join(config.modulePath, group, output.relativePath);

    await fs.writeFile(filePath, output.content, "utf-8");
    console.log(`  ✓ Generated ${path.relative(process.cwd(), filePath)}`);
  }

  /**
   * Build generation context from config
   */
  private buildGenerationContext(config: ModuleConfig): GenerationContext {
    return {
      moduleName: config.moduleName,
      entityName: toPascalCase(config.moduleName),
      entityNameLowercase: toCamelCase(config.moduleName),
      framework: config.framework,
      implementationType: config.implementationType,
    };
  }

  /**
   * Get concept group for a module element
   */
  private getGroupForElement(element: ModuleElement): ConceptGroup {
    const { ELEMENT_TO_GROUP } = require("../core/types/ConceptMapping");
    return ELEMENT_TO_GROUP[element];
  }
}
