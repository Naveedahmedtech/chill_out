import helmet from 'helmet';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MyLogger } from './common/logger/logger.service';
import * as csurf from 'csurf';

async function bootstrap() {
  const logger = new MyLogger('Bootstrap');
  try {
    const app = await NestFactory.create(AppModule, {
      logger: logger, 
    });
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

    process.on('unhandledRejection', (reason, promise) => {
      const message =
        reason instanceof Error
          ? reason.stack || reason.message
          : String(reason);
      logger.error('Unhandled Rejection at:', message, 'Bootstrap');
    });

    process.on('uncaughtException', (error) => {
      const errorStack = error.stack || String(error); 
      logger.error('Uncaught Exception thrown:', errorStack, 'Bootstrap');
    });

    await app.listen(3000);
    logger.log('Application is running on: http://localhost:3000');
  } catch (error) {
    const errorInfo = error.stack || error.message || String(error);
    logger.error('Nest application failed to start', errorInfo, 'Bootstrap');
    process.exit(1); // Exit the process with an error code (1) if the app fails to start
  }
}
  
bootstrap();
