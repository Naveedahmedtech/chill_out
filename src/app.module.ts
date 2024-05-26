import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpExceptionFilter } from './common/filters/http-exception/http-exception.filter';
import { MyLogger } from './common/logger/logger.service';
import configuration from './config/configuration';
import { NotFoundMiddleware } from './common/not-found.middleware';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UniversalController } from './universal/universal.controller';
import { UniversalService } from './universal/universal.service';
import { UniversalModule } from './universal/universal.module';

@Module({
  imports: [
    ThrottlerModule.forRoot([{
      ttl: 60,
      limit: 10,
    }]),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
      load: [configuration],
    }),
    PrismaModule,
    AuthModule,
    UniversalModule,
  ],
  controllers: [AppController, UniversalController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    MyLogger,
    UniversalService,
  ],
  exports: [MyLogger],
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(NotFoundMiddleware)
  //     .forRoutes({ path: '*', method: RequestMethod.ALL });
  // }
}
