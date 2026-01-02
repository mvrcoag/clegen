import { TemplateProvider } from '../../core/interfaces/TemplateProvider';
import { GenerationContext, FileOutput } from '../../core/types/GenerationContext';
import { TemplateReader } from '../../core/base/TemplateReader';

/**
 * React Native styles template provider
 * Generates StyleSheet for React Native components
 */
export class StylesNativeTemplate extends TemplateReader implements TemplateProvider {
  readonly id = 'styles-native' as const;
  readonly name = 'React Native Styles';
  readonly category = 'presentation' as const;
  readonly description = 'React Native StyleSheet';

  async generate(context: GenerationContext): Promise<FileOutput> {
    const content = await this.readTemplate('common/styles-native.md', context);

    return {
      relativePath: `${context.entityName}.styles.ts`,
      content,
    };
  }
}
