// Optional helper to reseed from the command line instead of pgAdmin.
// Most students use pgAdmin and never need this, but it is here if you
// want to reset the data quickly with: npm run seed
import fs from 'fs';
import path from 'path';
import { pool } from './pool';

async function run() {
  const file = path.join(__dirname, '..', '..', 'sql', '02_schema_and_seed.sql');
  const sql = fs.readFileSync(file, 'utf-8');
  await pool.query(sql);
  console.log('Database reset and seeded.');
  await pool.end();
}

run().catch((err) => {
  console.error('Seed failed:', err.message);
  process.exit(1);
});
