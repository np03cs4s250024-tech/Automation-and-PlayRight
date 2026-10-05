// Authentication middleware: checks the Bearer token on protected routes.
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// We attach the signed-in user to the request so routes can read it
export interface AuthedRequest extends Request {
  user?: { id: number; username: string; role: string };
}

export function requireAuth(req: AuthedRequest, res: Response, next: NextFunction) {
  // The token arrives as "Authorization: Bearer <token>"
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';

  // No token means not signed in
  if (!token) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  try {
    // Verify the token against our secret
    const secret = process.env.JWT_SECRET as string;
    const payload = jwt.verify(token, secret) as AuthedRequest['user'];
    req.user = payload;
    next();
  } catch {
    // A bad or expired token
    return res.status(401).json({ error: 'Not authenticated' });
  }
}
