import { Hono } from 'hono';
import { {{ entity }}Service } from './{{ Entity }}Service';

const {{ entity }}App = new Hono();

/**
 * GET /{{ entity }}
 * Get all {{ entity }} items
 */
{{ entity }}App.get('/', async (c) => {
  try {
    const items = await {{ entity }}Service.getAll();
    return c.json(items);
  } catch (error) {
    return c.json({ error: 'Internal server error' }, 500);
  }
});

/**
 * GET /{{ entity }}/:id
 * Get {{ entity }} by id
 */
{{ entity }}App.get('/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const item = await {{ entity }}Service.getById(id);
    
    if (!item) {
      return c.json({ error: '{{ Entity }} not found' }, 404);
    }
    
    return c.json(item);
  } catch (error) {
    return c.json({ error: 'Internal server error' }, 500);
  }
});

/**
 * POST /{{ entity }}
 * Create new {{ entity }}
 */
{{ entity }}App.post('/', async (c) => {
  try {
    const body = await c.req.json();
    const item = await {{ entity }}Service.create(body);
    return c.json(item, 201);
  } catch (error) {
    return c.json({ error: 'Internal server error' }, 500);
  }
});

/**
 * PUT /{{ entity }}/:id
 * Update {{ entity }} by id
 */
{{ entity }}App.put('/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const body = await c.req.json();
    const item = await {{ entity }}Service.update(id, body);
    return c.json(item);
  } catch (error) {
    return c.json({ error: 'Internal server error' }, 500);
  }
});

/**
 * DELETE /{{ entity }}/:id
 * Delete {{ entity }} by id
 */
{{ entity }}App.delete('/:id', async (c) => {
  try {
    const id = c.req.param('id');
    await {{ entity }}Service.delete(id);
    return c.body(null, 204);
  } catch (error) {
    return c.json({ error: 'Internal server error' }, 500);
  }
});

export default {{ entity }}App;
