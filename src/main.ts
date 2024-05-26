import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MyLogger } from './common/logger/logger.service';
import { setupSecurity } from './utils/app/setupSecurity';
import { ApiKeyGuard } from './common/guards/api-key.guard';
import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = await app.resolve(MyLogger);
  app.useGlobalGuards(new ApiKeyGuard(app.get(ConfigService)));
  app.useGlobalPipes(new ValidationPipe());
  app.useLogger(logger);

  setupSecurity(app);

  await handleExceptions(app);
  await app.listen(process.env.PORT || 8080);
}

async function handleExceptions(app) {
  const logger = await app.resolve(MyLogger);

  process.on('unhandledRejection', async (reason) => {
    const message =
      reason instanceof Error ? reason.stack || reason.message : String(reason);
    logger.error('Unhandled Rejection at:', message, 'Bootstrap');
  });

  process.on('uncaughtException', async (error) => {
    const errorStack = error.stack || String(error);
    logger.error('Uncaught Exception thrown:', errorStack, 'Bootstrap');
  });
}

bootstrap().catch((error) => {
  console.error('Failed to start application:', error);
});
