// The Qrius Lead Manager API entry point.

// Load .env FIRST, before importing routes or database code.
import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import { authRouter } from './routes/auth';
import { leadsRouter } from './routes/leads';

const app = express();

// Allow the React app (a different port) to call this API
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// A simple health check you can open in a browser
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'qrius-lead-manager'
  });
});

// Feature routes
app.use('/api/auth', authRouter);
app.use('/api/leads', leadsRouter);

// Start server
const port = Number(process.env.PORT) || 3000;

app.listen(port, () => {
  console.log(`Qrius API listening on http://localhost:${port}`);
});