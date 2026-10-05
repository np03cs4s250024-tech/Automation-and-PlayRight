// A single shared connection pool for the whole API.
import { Pool } from 'pg';
import dotenv from 'dotenv';

// Load values from the .env file into process.env
dotenv.config();

// The pool reads PGHOST, PGPORT, PGUSER, PGPASSWORD and PGDATABASE automatically
export const pool = new Pool();

// A tiny helper so routes can run a query in one line
export function query(text: string, params?: unknown[]) {
  return pool.query(text, params);
}
