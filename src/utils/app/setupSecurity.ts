import csurf from 'csurf';
import helmet from 'helmet';

export function setupSecurity(app) {
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

  app.use(csurf({ cookie: true }));
}
