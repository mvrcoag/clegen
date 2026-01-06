import { {{ entity }}Service } from '../services/{{ Entity }}Service';

/**
 * {{ Entity }} route handlers
 * These are framework-agnostic handler functions
 */

/**
 * Get all {{ entity }} items
 */
export async function getAll{{ Entity }}s() {
  try {
    const items = await {{ entity }}Service.getAll();
    return { success: true, data: items };
  } catch (error) {
    return { success: false, error: 'Internal server error' };
  }
}

/**
 * Get {{ entity }} by id
 */
export async function get{{ Entity }}ById(id: string) {
  try {
    const item = await {{ entity }}Service.getById(id);

    if (!item) {
      return { success: false, error: '{{ Entity }} not found' };
    }

    return { success: true, data: item };
  } catch (error) {
    return { success: false, error: 'Internal server error' };
  }
}

/**
 * Create new {{ entity }}
 */
export async function create{{ Entity }}(data: any) {
  try {
    const item = await {{ entity }}Service.create(data);
    return { success: true, data: item };
  } catch (error) {
    return { success: false, error: 'Internal server error' };
  }
}

/**
 * Update {{ entity }} by id
 */
export async function update{{ Entity }}(id: string, data: any) {
  try {
    const item = await {{ entity }}Service.update(id, data);
    return { success: true, data: item };
  } catch (error) {
    return { success: false, error: 'Internal server error' };
  }
}

/**
 * Delete {{ entity }} by id
 */
export async function delete{{ Entity }}(id: string) {
  try {
    await {{ entity }}Service.delete(id);
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Internal server error' };
  }
}
