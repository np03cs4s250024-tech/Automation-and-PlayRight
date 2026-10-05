// Authentication routes: sign in and return a token.
import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { query } from '../db/pool';

export const authRouter = Router();

// POST /api/auth/login
authRouter.post('/login', async (req, res) => {
  const { username, password } = req.body || {};

  // Both fields are required
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  // Find the user by username
  const result = await query('SELECT * FROM users WHERE username = $1', [username]);
  const user = result.rows[0];

  // No such user, or the password does not match the stored hash
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  // Build a token that lasts for the session
  const secret = process.env.JWT_SECRET as string;
  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    secret,
    { expiresIn: '8h' }
  );

  // Send back the token and the basic profile
  return res.json({
    token,
    user: { id: user.id, username: user.username, role: user.role },
  });
});
