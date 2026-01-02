import { ModuleElement } from "./GenerationContext";

/**
 * CLI options that can be passed as flags
 *
 * @example
 * ```bash
 * clegen --name User --framework express --elements routes,service,types
 * ```
 */
export interface CliOptions {
  name?: string;
  framework?: string;
  elements?: string;
  path?: string;
  implementation?: string;
  help?: boolean;
}

/**
 * Parsed and validated CLI configuration
 */
export interface ParsedCliConfig {
  name?: string;
  framework?: string;
  elements?: ModuleElement[];
  path?: string;
  implementation?: string;
}
