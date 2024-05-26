import { INestApplication } from '@nestjs/common';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import csurf from 'csurf';

export function setupSecurity(app: INestApplication) {
  app.use(cookieParser());

  // Conditional CSRF protection
  app.use((req, res, next) => {
    if (req.path.startsWith('/api/')) {
      csurf({
        cookie: {
          key: 'XSRF-TOKEN', 
          httpOnly: true,
        },
      })(req, res, next);
    } else {
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
