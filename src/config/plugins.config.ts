import { FrameworkPlugin } from "../core/interfaces/FrameworkPlugin";
import { TemplateProvider } from "../core/interfaces/TemplateProvider";

// Framework plugins
import { ExpressPlugin } from "../plugins/frameworks/ExpressPlugin";
import { HonoPlugin } from "../plugins/frameworks/HonoPlugin";
import { NextJsPlugin } from "../plugins/frameworks/NextJsPlugin";
import { NoFrameworkPlugin } from "../plugins/frameworks/NoFrameworkPlugin";
import { NestJsExpressPlugin } from "../plugins/frameworks/NestJsExpressPlugin";
import { NestJsFastifyPlugin } from "../plugins/frameworks/NestJsFastifyPlugin";

// Template providers
import { ServiceTemplate } from "../plugins/templates/ServiceTemplate";
import { SchemaTemplate } from "../plugins/templates/SchemaTemplate";
import { ComponentTemplate } from "../plugins/templates/ComponentTemplate";
import { HookTemplate } from "../plugins/templates/HookTemplate";
import { UtilsTemplate } from "../plugins/templates/UtilsTemplate";
import { StylesTemplate } from "../plugins/templates/StylesTemplate";
import { StylesNativeTemplate } from "../plugins/templates/StylesNativeTemplate";
import { TypesTemplate } from "../plugins/templates/TypesTemplate";
import { RepositoryTemplate } from "../plugins/templates/RepositoryTemplate";
import { ImplementationTemplate } from "../plugins/templates/ImplementationTemplate";
import { EntityTemplate } from "../plugins/templates/EntityTemplate";
import { NestJsModuleTemplate } from "../plugins/templates/NestJsModuleTemplate";
import { NestJsDtoTemplate } from "../plugins/templates/NestJsDtoTemplate";
import { NestJsDtoZodTemplate } from "../plugins/templates/NestJsDtoZodTemplate";
import { NestJsServiceTemplate } from "../plugins/templates/NestJsServiceTemplate";
import { NestJsPipeTemplate } from "../plugins/templates/NestJsPipeTemplate";
import { NestJsMiddlewareTemplate } from "../plugins/templates/NestJsMiddlewareTemplate";
import { NestJsGuardTemplate } from "../plugins/templates/NestJsGuardTemplate";
import { NestJsInterceptorTemplate } from "../plugins/templates/NestJsInterceptorTemplate";
import { NestJsDecoratorTemplate } from "../plugins/templates/NestJsDecoratorTemplate";
import { NestJsFilterTemplate } from "../plugins/templates/NestJsFilterTemplate";

/**
 * Registry of available framework plugins
 *
 * To add a new framework:
 * 1. Create a new plugin class implementing FrameworkPlugin
 * 2. Import it above
 * 3. Add it to this array
 */
export const frameworkPlugins: FrameworkPlugin[] = [
  new NoFrameworkPlugin(),
  new ExpressPlugin(),
  new HonoPlugin(),
  new NextJsPlugin(),
  new NestJsExpressPlugin(),
  new NestJsFastifyPlugin(),
];

/**
 * Registry of available template providers
 *
 * To add a new template type:
 * 1. Create a new template class implementing TemplateProvider
 * 2. Import it above
 * 3. Add it to this array
 */
export const templateProviders: TemplateProvider[] = [
  new ServiceTemplate(),
  new SchemaTemplate(),
  new ComponentTemplate(),
  new HookTemplate(),
  new UtilsTemplate(),
  new StylesTemplate(),
  new StylesNativeTemplate(),
  new TypesTemplate(),
  new RepositoryTemplate(),
  new ImplementationTemplate(),
  new EntityTemplate(),
  new NestJsModuleTemplate(),
  new NestJsDtoTemplate(),
  new NestJsDtoZodTemplate(),
  new NestJsServiceTemplate(),
  new NestJsPipeTemplate(),
  new NestJsMiddlewareTemplate(),
  new NestJsGuardTemplate(),
  new NestJsInterceptorTemplate(),
  new NestJsDecoratorTemplate(),
  new NestJsFilterTemplate(),
];

/**
 * Get framework plugin by id
 */
export function getFrameworkPlugin(id: string): FrameworkPlugin | undefined {
  return frameworkPlugins.find((plugin) => plugin.id === id);
}

/**
 * Get template provider by id
 */
export function getTemplateProvider(id: string): TemplateProvider | undefined {
  return templateProviders.find((provider) => provider.id === id);
}
