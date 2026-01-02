import { {{ Entity }} } from './{{ Entity }}';

/**
 * {{ Entity }} Repository interface
 * Defines the contract for {{ entity }} data access
 */
export interface {{ Entity }}Repository {
  findAll(): Promise<{{ Entity }}[]>;
  findById(id: string): Promise<{{ Entity }} | null>;
  save({{ entity }}: {{ Entity }}): Promise<{{ Entity }}>;
  delete(id: string): Promise<void>;
}
