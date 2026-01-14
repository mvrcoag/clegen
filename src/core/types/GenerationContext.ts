/**
 * Context containing all information needed for file generation
 */
export interface GenerationContext {
  moduleName: string;
  entityName: string;
  entityNameLowercase: string;
  framework?: string;
  implementationType?: string;
  currentGroup?: ConceptGroup;
  customReplacements?: Record<string, string>;
}

/**
 * Output of a file generation
 */
export interface FileOutput {
  relativePath: string;
  content: string;
}

/**
 * Concept groups for organizing generated files
 */
export type ConceptGroup =
  | "components"
  | "styles"
  | "services"
  | "routes"
  | "domain"
  | "infrastructure"
  | "utils";

/**
 * Style framework type
 */
export type StyleFramework = "css" | "react-native";

/**
 * Module element types that can be generated
 */
export type ModuleElement =
  | "routes"
  | "service"
  | "schema"
  | "component"
  | "hook"
  | "utils"
  | "styles"
  | "styles-native"
  | "types"
  | "entity"
  | "repository"
  | "implementation"
  | "nestjs-module"
  | "nestjs-dto"
  | "nestjs-dto-zod"
  | "nestjs-service"
  | "nestjs-pipe"
  | "nestjs-middleware"
  | "nestjs-guard"
  | "nestjs-interceptor"
  | "nestjs-decorator"
  | "nestjs-filter";

/**
 * Category for template classification
 */
export type TemplateCategory =
  | "domain"
  | "application"
  | "infrastructure"
  | "presentation";
