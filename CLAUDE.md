# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Clegen is a CLI tool that generates clean architecture modules for TypeScript projects. It uses a plugin-based architecture to support multiple frameworks (Express, Hono, Next.js) and generates concept-based file structures (routes, services, domain, infrastructure, etc.).

## Build and Development Commands

```bash
# Build the project (compile TypeScript, copy templates, make executable)
npm run prepare

# Run tests
npm test

# Start the CLI (after building)
npm start

# Run locally during development
npm link        # Link globally
clegen          # Run from anywhere

# Publish to npm
npm run upload
```

## Architecture

### Plugin System

The codebase uses a **plugin architecture** with two types of plugins:

1. **Framework Plugins** (`src/plugins/frameworks/`): Generate framework-specific route handlers
   - Implement `FrameworkPlugin` interface
   - Each plugin has an `id`, `name`, `description`, and `generate()` method
   - Registered in `src/config/plugins.config.ts`

2. **Template Providers** (`src/plugins/templates/`): Generate specific file types (services, components, etc.)
   - Implement `TemplateProvider` interface
   - Each has an `id` (ModuleElement), `name`, `category`, `description`, and `generate()` method
   - Registered in `src/config/plugins.config.ts`

### Concept-Based File Organization

Generated modules are organized by **concept groups**, not architectural layers:

- `routes/` - API endpoint handlers
- `services/` - Business logic
- `components/` - React components and hooks
- `styles/` - CSS and React Native styles
- `domain/` - Entities, types, repository interfaces
- `infrastructure/` - Schemas, repository implementations
- `utils/` - Utility functions

The mapping from module elements to concept groups is defined in `src/core/types/ConceptMapping.ts`.

### Template System

Templates are Markdown files in `src/fixtures/templates/` with placeholder replacements:

- `{{ Entity }}` - PascalCase entity name (e.g., "User")
- `{{ entity }}` - camelCase entity name (e.g., "user")
- `{{ Module }}` - Module name
- `{{ module }}` - Lowercase module name
- `{{ Impl }}` - Implementation type (e.g., "MongoDB")

The `TemplateReader` base class (`src/core/base/TemplateReader.ts`) handles:
- Reading template files
- Applying placeholder replacements
- Fixing import paths based on concept groups (e.g., converting `./UserService` to `../services/UserService`)

### Key Files

- `src/index.ts` - CLI entry point with ASCII banner
- `src/generators/ModularGenerator.ts` - Main generator orchestrating the flow
- `src/generators/GeneratorSelector.ts` - Selects which generator to use
- `src/core/base/CliParser.ts` - Parses CLI arguments
- `src/config/plugins.config.ts` - Plugin registry (framework and template)
- `src/core/types/GenerationContext.ts` - Core types and interfaces
- `src/core/types/ConceptMapping.ts` - Element-to-group mapping

### Generation Flow

1. Parse CLI args or prompt user (name, framework, elements, path, implementation)
2. Validate module doesn't already exist
3. Create directory structure based on selected concept groups
4. Generate files:
   - Routes use framework plugins
   - Other elements use template providers
5. Each generated file is placed in its concept group directory

## Adding New Features

### Add a New Framework

1. Create plugin class in `src/plugins/frameworks/` implementing `FrameworkPlugin`
2. Create template file in `src/fixtures/templates/routes/`
3. Register in `src/config/plugins.config.ts` frameworkPlugins array
4. Rebuild with `npm run prepare`

### Add a New Template Type

1. Add element to `ModuleElement` type in `src/core/types/GenerationContext.ts`
2. Map element to concept group in `src/core/types/ConceptMapping.ts`
3. Create template class in `src/plugins/templates/` implementing `TemplateProvider`
4. Create template file in `src/fixtures/templates/common/`
5. Register in `src/config/plugins.config.ts` templateProviders array
6. Add to multiselect in `src/generators/ModularGenerator.ts` askElements() method
7. Rebuild with `npm run prepare`

## Important Notes

- Templates are copied to `dist/fixtures/templates/` during build via `scripts/copy.js`
- The build process (`npm run prepare`) must run before testing changes
- Import path fixing in TemplateReader ensures cross-group imports use correct relative paths
- TypeScript is compiled with `strict: false` in tsconfig.json
- The CLI binary is at `dist/index.js` with shebang for execution
