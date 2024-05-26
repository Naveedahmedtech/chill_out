import { Request, Response, NextFunction } from 'express';
import csurf from 'csurf';

const csrfProtection = csurf({ cookie: true });

export function conditionalCsrfProtection(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (req.path.startsWith('/api/')) {
    csrfProtection(req, res, next);
  }
  return next();
}
