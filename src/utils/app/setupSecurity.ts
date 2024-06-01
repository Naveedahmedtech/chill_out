import { INestApplication } from '@nestjs/common';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import crypto from 'crypto';
import { isValidCsrfToken } from '../common/csrf-utils';
import { ResponseHandler } from '../common/response-handler';

export function setupSecurity(app: INestApplication) {
  app.use(cookieParser());

  // Custom CSRF token generation
  app.use((req, res, next) => {
    if (req.path === '/universal/csrf-token') {
      next();
    } else if (
      req.method === 'POST' ||
      req.method === 'PUT' ||
      req.method === 'PATCH' ||
      req.method === 'DELETE'
    ) {
      const token = req.cookies['XSRF-TOKEN'];
      if (!isValidCsrfToken(token)) {
        return res
          .status(403)
          .json(
            ResponseHandler.error(
              'Your session has expired. Please refresh the page and try again.',
              'Unauthorized',
              403,
            ),
          );
      }
      next();
    }
  });

  // Use Helmet for security headers
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", "'unsafe-inline'"],
          objectSrc: ["'none'"],
          upgradeInsecureRequests: [],
        },
      },
      frameguard: {
        action: 'deny',
      },
    }),
  );
}
