import { ModuleElement } from "./GenerationContext";

/**
 * Complete configuration for module generation
 */
export interface ModuleConfig {
  moduleName: string;
  modulePath: string;
  framework: string;
  elements: ModuleElement[];
  implementationType?: string;
}

/**
 * Framework configuration
 */
export interface FrameworkConfig {
  id: string;
  name: string;
  description: string;
  templatePath: string;
  fileExtension: ".ts" | ".js";
}
