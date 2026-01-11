import { ModuleElement, ConceptGroup } from './GenerationContext';

/**
 * Maps module elements to their concept groups
 */
export const ELEMENT_TO_GROUP: Record<ModuleElement, ConceptGroup> = {
  // Components group
  component: 'components',
  hook: 'components',

  // Styles group
  styles: 'styles',
  'styles-native': 'styles',

  // Services group
  service: 'services',
  'nestjs-service': 'services',

  // Routes group
  routes: 'routes',

  // Domain group
  entity: 'domain',
  types: 'domain',
  repository: 'domain',
  'nestjs-dto': 'domain',
  'nestjs-dto-zod': 'domain',

  // Infrastructure group
  implementation: 'infrastructure',
  schema: 'infrastructure',
  'nestjs-module': 'infrastructure',
  'nestjs-pipe': 'infrastructure',
  'nestjs-middleware': 'infrastructure',
  'nestjs-guard': 'infrastructure',
  'nestjs-interceptor': 'infrastructure',
  'nestjs-decorator': 'infrastructure',
  'nestjs-filter': 'infrastructure',

  // Utils group
  utils: 'utils',
};

/**
 * Get concept group for a module element
 */
export function getConceptGroup(element: ModuleElement): ConceptGroup {
  return ELEMENT_TO_GROUP[element];
}

/**
 * Group elements by concept
 */
export function groupElementsByConcept(elements: ModuleElement[]): Map<ConceptGroup, ModuleElement[]> {
  const grouped = new Map<ConceptGroup, ModuleElement[]>();

  elements.forEach(element => {
    const group = getConceptGroup(element);
    if (!grouped.has(group)) {
      grouped.set(group, []);
    }
    grouped.get(group)!.push(element);
  });

  return grouped;
}
