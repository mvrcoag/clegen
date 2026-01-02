import { {{ Entity }}Repository } from '../domain/{{ Entity }}Repository';
import { {{ Entity }} } from '../domain/{{ Entity }}';

/**
 * {{ Impl }} implementation of {{ Entity }}Repository
 */
export class {{ Impl }}{{ Entity }}Repository implements {{ Entity }}Repository {
  /**
   * Find all {{ entity }} items
   */
  async findAll(): Promise<{{ Entity }}[]> {
    // TODO: Implement {{ Impl }} find all logic
    return [];
  }

  /**
   * Find {{ entity }} by id
   */
  async findById(id: string): Promise<{{ Entity }} | null> {
    // TODO: Implement {{ Impl }} find by id logic
    return null;
  }

  /**
   * Save {{ entity }}
   */
  async save({{ entity }}: {{ Entity }}): Promise<{{ Entity }}> {
    // TODO: Implement {{ Impl }} save logic
    return {{ entity }};
  }

  /**
   * Delete {{ entity }} by id
   */
  async delete(id: string): Promise<void> {
    // TODO: Implement {{ Impl }} delete logic
  }
}
