import { Router } from 'express';
import { {{ entity }}Service } from './{{ Entity }}Service';

const {{ entity }}Router = Router();

/**
 * GET /{{ entity }}
 * Get all {{ entity }} items
 */
{{ entity }}Router.get('/', async (req, res) => {
  try {
    const items = await {{ entity }}Service.getAll();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * GET /{{ entity }}/:id
 * Get {{ entity }} by id
 */
{{ entity }}Router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const item = await {{ entity }}Service.getById(id);
    
    if (!item) {
      return res.status(404).json({ error: '{{ Entity }} not found' });
    }
    
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * POST /{{ entity }}
 * Create new {{ entity }}
 */
{{ entity }}Router.post('/', async (req, res) => {
  try {
    const item = await {{ entity }}Service.create(req.body);
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * PUT /{{ entity }}/:id
 * Update {{ entity }} by id
 */
{{ entity }}Router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const item = await {{ entity }}Service.update(id, req.body);
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * DELETE /{{ entity }}/:id
 * Delete {{ entity }} by id
 */
{{ entity }}Router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await {{ entity }}Service.delete(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default {{ entity }}Router;
