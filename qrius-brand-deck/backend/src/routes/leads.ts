// Lead routes: list, search, read one, create, update, delete.
// All of these require a signed-in user.
import { Router, Response } from 'express';
import { query } from '../db/pool';
import { requireAuth, AuthedRequest } from '../middleware';

export const leadsRouter = Router();

// Every route below this line needs a valid token
leadsRouter.use(requireAuth);

// GET /api/leads  and  GET /api/leads?search=term
leadsRouter.get('/', async (req: AuthedRequest, res: Response) => {
  const search = (req.query.search as string) || '';

  if (search) {
    // Match the search term against the lead name, email or company.
    const sql =
      'SELECT * FROM leads ' +
      'WHERE name ILIKE $1 ' +
      'ORDER BY id';
    const result = await query(sql, [`%${search}%`]);
    return res.json(result.rows);
  }

  // No search term, return everything
  const result = await query('SELECT * FROM leads ORDER BY id');
  return res.json(result.rows);
});

// GET /api/leads/:id
leadsRouter.get('/:id', async (req: AuthedRequest, res: Response) => {
  const result = await query('SELECT * FROM leads WHERE id = $1', [req.params.id]);
  const lead = result.rows[0];
  if (!lead) {
    return res.status(404).json({ error: 'Lead not found' });
  }
  return res.json(lead);
});

// POST /api/leads
leadsRouter.post('/', async (req: AuthedRequest, res: Response) => {
  const { name, email, company, status } = req.body || {};

  // Name, email and company are required
  if (!name || !email || !company) {
    return res.status(400).json({ error: 'Name, email and company are required' });
  }

  const result = await query(
    'INSERT INTO leads (name, email, company, status) VALUES ($1, $2, $3, $4) RETURNING *',
    [name, email, company, 'New']
  );
  return res.status(201).json(result.rows[0]);
});

// PUT /api/leads/:id
leadsRouter.put('/:id', async (req: AuthedRequest, res: Response) => {
  const { name, email, company, status } = req.body || {};

  // Make sure the lead exists first
  const existing = await query('SELECT * FROM leads WHERE id = $1', [req.params.id]);
  if (!existing.rows[0]) {
    return res.status(404).json({ error: 'Lead not found' });
  }

  const result = await query(
    'UPDATE leads SET name = $1, email = $2, company = $3, status = $4 WHERE id = $5 RETURNING *',
    [name, email, company, status, req.params.id]
  );
  return res.json(result.rows[0]);
});

// DELETE /api/leads/:id
leadsRouter.delete('/:id', async (req: AuthedRequest, res: Response) => {
  const existing = await query('SELECT * FROM leads WHERE id = $1', [req.params.id]);
  if (!existing.rows[0]) {
    return res.status(404).json({ error: 'Lead not found' });
  }
  await query('DELETE FROM leads WHERE id = $1', [req.params.id]);
  return res.status(204).send();
});
