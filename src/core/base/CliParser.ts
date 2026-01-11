import { CliOptions, ParsedCliConfig } from "../types/CliOptions";
import { ModuleElement } from "../types/GenerationContext";

/**
 * CLI argument parser
 *
 * Extensible parser for command-line arguments
 *
 * @example
 * ```typescript
 * const parser = new CliParser();
 * const config = parser.parse(process.argv.slice(2));
 * ```
 */
export class CliParser {
  /**
   * Parse command-line arguments
   */
  parse(args: string[]): ParsedCliConfig {
    const options: CliOptions = {};

    for (let i = 0; i < args.length; i++) {
      const arg = args[i];

      switch (arg) {
        case "--name":
        case "-n":
          options.name = args[++i];
          break;

        case "--framework":
        case "-f":
          options.framework = args[++i];
          break;

        case "--elements":
        case "-e":
          options.elements = args[++i];
          break;

        case "--path":
        case "-p":
          options.path = args[++i];
          break;

        case "--implementation":
        case "-i":
          options.implementation = args[++i];
          break;

        case "--help":
        case "-h":
          options.help = true;
          break;
      }
    }

    return this.validateAndTransform(options);
  }

  /**
   * Validate and transform CLI options
   */
  private validateAndTransform(options: CliOptions): ParsedCliConfig {
    const config: ParsedCliConfig = {};

    if (options.name) {
      config.name = options.name.trim();
    }

    if (options.framework) {
      config.framework = options.framework.trim().toLowerCase();
    }

    if (options.elements) {
      config.elements = options.elements
        .split(",")
        .map((e) => e.trim())
        .filter((e) => e.length > 0) as ModuleElement[];
    }

    if (options.path) {
      config.path = options.path.trim();
    }

    if (options.implementation) {
      config.implementation = options.implementation.trim();
    }

    return config;
  }

  /**
   * Display help message
   */
  showHelp(): void {
    console.log(`
╔════════════════════════════════════════════════════════╗
║                   CLEGEN - HELP                        ║
╚════════════════════════════════════════════════════════╝

Usage:
  clegen [options]

Options:
  -n, --name <name>              Module name (e.g., User)
  -f, --framework <framework>    Backend framework (see frameworks below)
  -e, --elements <elements>      Comma-separated elements to generate
  -p, --path <path>              Module path (default: ./src/<name>)
  -i, --implementation <type>    Implementation type (e.g., MongoDB, PostgreSQL)
  -h, --help                     Show this help message

Frameworks:
  none           No framework (plain TypeScript)
  express        Express.js REST API
  hono           Hono ultrafast web framework
  nextjs         Next.js API routes
  nestjs-express NestJS with Express adapter
  nestjs-fastify NestJS with Fastify adapter (high performance)

Elements:
  General:
    routes, service, schema, component, hook, utils, styles,
    styles-native, types, entity, repository, implementation

  NestJS (follows kebab-case file naming):
    nestjs-module      Module configuration (@Module)
    nestjs-service     Injectable service with DI (@Injectable)
    nestjs-dto         DTOs with class-validator decorators
    nestjs-dto-zod     DTOs with Zod schema validation
    nestjs-pipe        Custom validation pipes
    nestjs-guard       Authorization guards (auth, roles)
    nestjs-interceptor Response transform & logging
    nestjs-middleware  Request processing middleware
    nestjs-decorator   Custom parameter decorators
    nestjs-filter      Exception filters for error handling

Concept Groups:
  Files are organized by concept:
    - routes/         → API endpoint handlers
    - services/       → Business logic layer
    - components/     → React components and hooks
    - styles/         → CSS and React Native styles
    - domain/         → Entities, types, repositories, DTOs
    - infrastructure/ → Schemas, modules, guards, pipes, etc.
    - utils/          → Utility functions

Examples:
  # Interactive mode (default)
  clegen

  # Generate with all options
  clegen --name User --framework express \\
    --elements routes,service,types,repository

  # Quick generation with defaults
  clegen -n Product -f hono -e routes,service

  # Generate with implementation
  clegen -n User -f express \\
    -e routes,service,repository,implementation -i MongoDB

  # Full NestJS module with class-validator
  clegen -n User -f nestjs-express \\
    -e routes,nestjs-service,nestjs-module,nestjs-dto,nestjs-guard,nestjs-pipe

  # Full NestJS module with Zod validation
  clegen -n Product -f nestjs-fastify \\
    -e routes,nestjs-service,nestjs-module,nestjs-dto-zod,nestjs-pipe

  # NestJS with all building blocks
  clegen -n Order -f nestjs-express \\
    -e routes,nestjs-service,nestjs-module,nestjs-dto,nestjs-guard,\\
       nestjs-interceptor,nestjs-middleware,nestjs-decorator,nestjs-filter

  # React Native module with styles
  clegen -n Profile -e component,hook,styles-native
`);
  }
}
