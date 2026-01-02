/**
 * Base interface for all generators
 *
 * Implement this interface to create new generator types
 */
export interface Generator {
  /**
   * Execute the generation process
   */
  run(): Promise<void>;
}
