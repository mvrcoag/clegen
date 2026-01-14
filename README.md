<div align="center">
  <br>
  <h1>Clegen 🧩</h1>
  <strong>Clean Architecture Module Generator for TypeScript Projects</strong>
  <br><br>
  
  [![npm version](https://img.shields.io/npm/v/clegen.svg)](https://www.npmjs.com/package/clegen)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  
</div>

---

## Table of Contents

- [What is Clegen?](#what-is-clegen)
- [Features](#features)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Usage](#usage)
  - [Interactive Mode](#interactive-mode)
  - [CLI Flags Mode](#cli-flags-mode)
  - [Available Options](#available-options)
- [Project Structure](#project-structure)
- [Supported Frameworks](#supported-frameworks)
- [Module Elements](#module-elements)
- [Examples](#examples)
- [Extending Clegen](#extending-clegen)
  - [Adding a New Framework](#adding-a-new-framework)
  - [Adding a New Template](#adding-a-new-template)
  - [Adding Custom Elements](#adding-custom-elements)
- [Contributing](#contributing)
- [License](#license)

---

## What is Clegen?

**Clegen** (Clean Generator) is a powerful command-line tool designed to scaffold clean architecture modules in TypeScript projects. It helps you maintain consistent code structure, enforces separation of concerns, and speeds up development by generating boilerplate code following best practices.

### Why Clegen?

- ✅ **Consistent Architecture**: Generates modules following Clean Architecture principles
- ✅ **Framework Agnostic**: Supports Express, Hono, Next.js, and easily extensible
- ✅ **Concept-Based Organization**: Files organized by concept (routes, services, domain, etc.)
- ✅ **Type-Safe**: Full TypeScript support with proper imports
- ✅ **Extensible**: Plugin architecture allows adding new frameworks and templates
- ✅ **React & React Native**: Built-in support for React components and React Native styles
- ✅ **Time-Saving**: Generate complete modules in seconds

---

## Features

- 🎯 **Concept-Based File Organization**: Files grouped by their purpose (routes, services, domain, infrastructure, etc.)
- 🔌 **Multiple Backend Frameworks**: Express, Hono, Next.js, NestJS (Express & Fastify)
- ⚛️ **React & React Native Support**: Components, hooks, and platform-specific styles
- 🏗️ **Clean Architecture Layers**: Domain, Services, Infrastructure separation
- 📦 **Modular Templates**: Repository pattern, service layer, entities, types
- 🎨 **Style Support**: CSS and React Native StyleSheet
- 🚀 **CLI or Interactive**: Use flags for automation or interactive prompts for flexibility
- 🧩 **Plugin Architecture**: Easy to extend with new frameworks and templates

---

## Installation

### NPX (Recommended)

Use Clegen directly without installation:

```bash
npx clegen@latest
```

### Global Installation

```bash
npm install -g clegen
```

### Local Development

```bash
npm install clegen --save-dev
```

---

## Quick Start

Generate a complete module in seconds:

```bash
# Interactive mode
npx clegen@latest

# With CLI flags (Express)
npx clegen@latest --name User --framework express --elements routes,service,types,repository

# With NestJS
npx clegen@latest --name User --framework nestjs-express --elements routes,nestjs-module,nestjs-service,nestjs-dto
```

---

## Usage

### Interactive Mode

Simply run `clegen` and follow the prompts:

```bash
npx clegen@latest
```

The tool will ask you:

1. **Module name** (e.g., User, Product, Order)
2. **Framework** (Express, Hono, Next.js)
3. **Elements to generate** (routes, services, components, etc.)
4. **Module path** (where to create the module)
5. **Implementation type** (optional, e.g., MongoDB, PostgreSQL)

### CLI Flags Mode

Skip prompts by providing configuration via flags:

```bash
npx clegen@latest \
  --name User \
  --framework express \
  --elements routes,service,types,repository \
  --path ./src/modules/User \
  --implementation MongoDB
```

### Available Options

| Flag | Shorthand | Description | Example |
|------|-----------|-------------|---------|
| `--name` | `-n` | Module name (PascalCase) | `User`, `Product` |
| `--framework` | `-f` | Backend framework | `express`, `hono`, `nextjs`, `nestjs-express`, `nestjs-fastify` |
| `--elements` | `-e` | Comma-separated elements | `routes,service,types` |
| `--path` | `-p` | Module output path | `./src/modules/User` |
| `--implementation` | `-i` | Implementation type | `MongoDB`, `PostgreSQL` |
| `--help` | `-h` | Show help message | - |

---

## Project Structure

Clegen organizes files by **concept**, not by layer. This makes related code easier to find:

```
User/
├── routes/              # API endpoint handlers
│   └── UserRouter.ts
├── services/            # Business logic layer
│   └── UserService.ts
├── components/          # React components and hooks
│   ├── User.tsx
│   └── useUser.tsx
├── styles/              # CSS and React Native styles
│   ├── User.css
│   └── User.styles.ts
├── domain/              # Entities, types, repositories
│   ├── User.ts
│   ├── UserTypes.ts
│   └── UserRepository.ts
├── infrastructure/      # Schemas, implementations
│   ├── UserSchemas.ts
│   └── MongoDBUserRepository.ts
└── utils/               # Utility functions
    └── UserUtils.ts
```

### Concept Groups

| Group | Purpose | Contains |
|-------|---------|----------|
| **routes/** | HTTP handlers | API route definitions |
| **services/** | Business logic | Service classes with domain logic |
| **components/** | UI layer | React components and custom hooks |
| **styles/** | Presentation | CSS and React Native StyleSheet |
| **domain/** | Core domain | Entities, types, repository interfaces |
| **infrastructure/** | External concerns | DB schemas, repository implementations |
| **utils/** | Helpers | Utility functions |

---

## Supported Frameworks

### Backend Frameworks

| Framework | Template | Example |
|-----------|----------|---------|
| **Express** | REST API routes | `Router()` with service integration |
| **Hono** | Lightweight routes | `Hono()` app with handlers |
| **Next.js** | API routes | Next.js API route handlers |
| **NestJS (Express)** | Full-featured controllers | `@Controller()` with decorators |
| **NestJS (Fastify)** | High-performance controllers | NestJS with Fastify adapter |

### Frontend

| Framework | Template | Example |
|-----------|----------|---------|
| **React** | Components, Hooks | Functional components with TypeScript |
| **React Native** | Native styles | `StyleSheet.create()` |

---

## Module Elements

Clegen can generate the following elements:

| Element | Description | Group | File Example |
|---------|-------------|-------|--------------|
| `routes` | API endpoint handlers | routes | `UserRouter.ts` |
| `service` | Business logic layer | services | `UserService.ts` |
| `component` | React component | components | `User.tsx` |
| `hook` | React custom hook | components | `useUser.tsx` |
| `styles` | CSS styles | styles | `User.css` |
| `styles-native` | React Native styles | styles | `User.styles.ts` |
| `types` | TypeScript types/interfaces | domain | `UserTypes.ts` |
| `entity` | Domain entity | domain | `User.ts` |
| `repository` | Repository interface | domain | `UserRepository.ts` |
| `schema` | Validation schemas (Zod) | infrastructure | `UserSchemas.ts` |
| `implementation` | Repository implementation | infrastructure | `MongoDBUserRepository.ts` |
| `utils` | Utility functions | utils | `UserUtils.ts` |
| **NestJS Elements** | | | |
| `nestjs-module` | NestJS module | infrastructure | `user.module.ts` |
| `nestjs-service` | NestJS service | services | `user.service.ts` |
| `nestjs-dto` | class-validator DTOs | infrastructure | `user.dto.ts` |
| `nestjs-dto-zod` | Zod schema DTOs | infrastructure | `user.schema.ts` |
| `nestjs-pipe` | Custom validation pipes | infrastructure | `user-validation.pipe.ts` |
| `nestjs-guard` | Authorization guards | infrastructure | `user.guard.ts` |
| `nestjs-interceptor` | Request/response interceptors | infrastructure | `user.interceptor.ts` |
| `nestjs-middleware` | Middleware functions | infrastructure | `user.middleware.ts` |
| `nestjs-decorator` | Custom decorators | infrastructure | `user.decorator.ts` |
| `nestjs-filter` | Exception filters | infrastructure | `user-exception.filter.ts` |

---

## Examples

### Example 1: Express API Module

```bash
npx clegen@latest \
  --name Product \
  --framework express \
  --elements routes,service,types,repository,implementation \
  --implementation MongoDB
```

**Generated files:**

```
Product/
├── routes/UserRouter.ts              # Express router
├── services/ProductService.ts        # Business logic
├── domain/ProductTypes.ts            # TypeScript types
├── domain/ProductRepository.ts       # Repository interface
└── infrastructure/MongoDBProductRepository.ts  # MongoDB implementation
```

### Example 2: React Component with Styles

```bash
npx clegen@latest \
  --name UserProfile \
  --elements component,hook,styles,types
```

**Generated files:**

```
UserProfile/
├── components/UserProfile.tsx        # React component
├── components/useUserProfile.tsx     # Custom hook
├── styles/UserProfile.css            # CSS styles
└── domain/UserProfileTypes.ts        # TypeScript types
```

### Example 3: React Native Module

```bash
npx clegen@latest \
  --name Profile \
  --elements component,hook,styles-native,types
```

**Generated files:**

```
Profile/
├── components/Profile.tsx            # React component
├── components/useProfile.tsx         # Custom hook
├── styles/Profile.styles.ts          # React Native StyleSheet
└── domain/ProfileTypes.ts            # TypeScript types
```

### Example 4: Full-Stack Module

```bash
npx clegen@latest \
  --name Order \
  --framework hono \
  --elements routes,service,component,hook,styles,types,entity,repository,schema,implementation \
  --implementation PostgreSQL
```

**Generated files:**

```
Order/
├── routes/OrderRoutes.ts             # Hono routes
├── services/OrderService.ts          # Business logic
├── components/Order.tsx              # React component
├── components/useOrder.tsx           # Custom hook
├── styles/Order.css                  # CSS styles
├── domain/Order.ts                   # Entity
├── domain/OrderTypes.ts              # Types
├── domain/OrderRepository.ts         # Repository interface
├── infrastructure/OrderSchemas.ts    # Zod schemas
└── infrastructure/PostgreSQLOrderRepository.ts  # PostgreSQL implementation
```

### Example 5: NestJS Full Module

```bash
npx clegen@latest \
  --name Product \
  --framework nestjs-express \
  --elements routes,nestjs-module,nestjs-service,nestjs-dto-zod,nestjs-pipe,nestjs-guard,nestjs-interceptor
```

**Generated files:**

```
Product/
├── routes/product.controller.ts              # NestJS controller with decorators
├── services/product.service.ts               # Injectable service
├── infrastructure/product.schema.ts          # Zod validation schemas
├── infrastructure/product.module.ts          # NestJS module definition
├── infrastructure/product-validation.pipe.ts # Custom validation pipe
├── infrastructure/product.guard.ts           # Authorization guard
└── infrastructure/product.interceptor.ts     # Response interceptor
```

**Key Features:**

- Kebab-case file naming (e.g., `product.controller.ts`)
- PascalCase class names (e.g., `ProductController`)
- Full NestJS decorator support (`@Controller`, `@Injectable`, etc.)
- Zod schema-based validation
- Custom pipes, guards, and interceptors
- Clean separation of concerns

### Example 6: NestJS with Fastify Adapter

```bash
npx clegen@latest \
  --name User \
  --framework nestjs-fastify \
  --elements routes,nestjs-module,nestjs-service,nestjs-dto,nestjs-middleware,nestjs-filter
```

**Generated files:**

```
User/
├── routes/user.controller.ts             # High-performance Fastify controller
├── services/user.service.ts              # Business logic service
├── infrastructure/user.dto.ts            # class-validator DTOs with Swagger
├── infrastructure/user.module.ts         # Module with Fastify configuration
├── infrastructure/user.middleware.ts     # Custom middleware
└── infrastructure/user-exception.filter.ts # Exception filter
```

---

## Extending Clegen

Clegen is designed to be **easily extensible**. You can add new frameworks, templates, and elements.

### Adding a New Framework

1. **Create a framework plugin** in `src/plugins/frameworks/`:

```typescript
// src/plugins/frameworks/FastifyPlugin.ts
import { FrameworkPlugin } from '../../core/types/FrameworkPlugin';
import { GenerationContext, FileOutput } from '../../core/types/GenerationContext';
import { TemplateReader } from '../../core/base/TemplateReader';

export class FastifyPlugin extends TemplateReader implements FrameworkPlugin {
  readonly id = 'fastify' as const;
  readonly name = 'Fastify';

  async generate(context: GenerationContext): Promise<FileOutput> {
    const content = await this.readTemplate('routes/fastify.md', context);
    return {
      relativePath: `${context.entityName}Routes.ts`,
      content,
    };
  }
}
```

2. **Create the template** in `src/fixtures/templates/routes/`:

```markdown
<!-- src/fixtures/templates/routes/fastify.md -->
import { FastifyInstance } from 'fastify';
import { {{ entity }}Service } from './{{ Entity }}Service';

export async function {{ entity }}Routes(fastify: FastifyInstance) {
  fastify.get('/{{ entity }}', async (request, reply) => {
    const items = await {{ entity }}Service.getAll();
    return items;
  });

  fastify.get('/{{ entity }}/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const item = await {{ entity }}Service.getById(id);
    return item;
  });

  fastify.post('/{{ entity }}', async (request, reply) => {
    const item = await {{ entity }}Service.create(request.body);
    return item;
  });
}
```

3. **Register the plugin** in `src/plugins/plugins.config.ts`:

```typescript
import { FastifyPlugin } from './frameworks/FastifyPlugin';

export const FRAMEWORK_PLUGINS = {
  express: new ExpressPlugin(),
  hono: new HonoPlugin(),
  nextjs: new NextJsPlugin(),
  fastify: new FastifyPlugin(), // Add your plugin
};
```

### Adding a New Template

1. **Create a template provider** in `src/plugins/templates/`:

```typescript
// src/plugins/templates/GraphQLResolverTemplate.ts
import { TemplateProvider } from '../../core/types/TemplateProvider';
import { GenerationContext, FileOutput } from '../../core/types/GenerationContext';
import { TemplateReader } from '../../core/base/TemplateReader';

export class GraphQLResolverTemplate extends TemplateReader implements TemplateProvider {
  readonly id = 'resolver' as const;
  readonly name = 'GraphQL Resolver';
  readonly category = 'api' as const;

  async generate(context: GenerationContext): Promise<FileOutput> {
    const content = await this.readTemplate('graphql/resolver.md', context);
    return {
      relativePath: `${context.entityName}Resolver.ts`,
      content,
    };
  }
}
```

2. **Create the template file**:

```markdown
<!-- src/fixtures/templates/graphql/resolver.md -->
import { {{ entity }}Service } from '../services/{{ Entity }}Service';

export const {{ entity }}Resolvers = {
  Query: {
    {{ entity }}: async (_: any, { id }: { id: string }) => {
      return await {{ entity }}Service.getById(id);
    },
    {{ entity }}s: async () => {
      return await {{ entity }}Service.getAll();
    },
  },
  Mutation: {
    create{{ Entity }}: async (_: any, { input }: { input: any }) => {
      return await {{ entity }}Service.create(input);
    },
  },
};
```

3. **Register in plugins.config.ts**:

```typescript
import { GraphQLResolverTemplate } from './templates/GraphQLResolverTemplate';

export const TEMPLATE_PROVIDERS = {
  // ... existing templates
  resolver: new GraphQLResolverTemplate(),
};
```

### Adding Custom Elements

1. **Add to `ModuleElement` type** in `src/core/types/GenerationContext.ts`:

```typescript
export type ModuleElement =
  | "routes"
  | "service"
  // ... existing elements
  | "resolver"      // Add your new element
  | "graphql-schema";
```

2. **Map to concept group** in `src/core/types/ConceptMapping.ts`:

```typescript
export const ELEMENT_TO_GROUP: Record<ModuleElement, ConceptGroup> = {
  // ... existing mappings
  resolver: 'routes',
  'graphql-schema': 'infrastructure',
};
```

3. **Add to multiselect** in `src/Generators/ModularGenerator.ts`:

```typescript
const { elements } = await prompt<{ elements: ModuleElement[] }>({
  type: "multiselect",
  name: "elements",
  choices: [
    // ... existing choices
    { role: "separator", message: "── GraphQL ──" },
    { name: "resolver", message: "GraphQL Resolver - Query/Mutation handlers" },
    { name: "graphql-schema", message: "GraphQL Schema - Type definitions" },
  ],
});
```

---

## Contributing

Contributions are welcome! Here's how you can help:

### Development Setup

1. **Fork and clone the repository**:

```bash
git clone https://github.com/mvrcoag/clegen.git
cd clegen
```

2. **Install dependencies**:

```bash
npm install
```

3. **Build the project**:

```bash
npm run prepare
```

4. **Link for local testing**:

```bash
npm link
```

5. **Test your changes**:

```bash
clegen --name Test --framework express --elements routes,service
```

### Project Structure

```
clegen/
├── src/
│   ├── core/                    # Core types and base classes
│   │   ├── types/               # TypeScript types and interfaces
│   │   └── base/                # Base classes (TemplateReader, CliParser)
│   ├── plugins/                 # Framework and template plugins
│   │   ├── frameworks/          # Framework plugins (Express, Hono, etc.)
│   │   ├── templates/           # Template providers
│   │   └── plugins.config.ts    # Plugin registry
│   ├── Generators/              # Generator classes
│   │   └── ModularGenerator.ts  # Main generator
│   ├── fixtures/                # Template files
│   │   └── templates/           # Markdown templates
│   └── index.ts                 # CLI entry point
├── dist/                        # Compiled output
└── scripts/                     # Build scripts
```

### Guidelines

- **TypeScript**: Use strict typing, avoid `any`
- **Templates**: Use Markdown files with `{{ placeholders }}`
- **Imports**: Ensure cross-group imports use correct relative paths
- **Tests**: Add tests for new features (when test suite is available)
- **Documentation**: Update README for new features

### Submitting Changes

1. Create a feature branch: `git checkout -b feature/my-feature`
2. Make your changes
3. Build and test: `npm run prepare && clegen --name Test ...`
4. Commit: `git commit -m "feat: add my feature"`
5. Push: `git push origin feature/my-feature`
6. Open a Pull Request

---

## License

This project is licensed under the **MIT License**.

---

<div align="center">
  <strong>Made with ❤️ by <a href="https://github.com/mvrcoag">@mvrcoag</a></strong>
  <br><br>
  <a href="https://github.com/mvrcoag/clegen/issues">Report Bug</a> •
  <a href="https://github.com/mvrcoag/clegen/issues">Request Feature</a>
</div>
