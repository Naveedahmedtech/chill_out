import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { HttpModule } from '@nestjs/axios';
import { RecaptchaService } from './recaptcha/recaptcha.service';

@Module({
  imports: [HttpModule],
  controllers: [AuthController],
  providers: [AuthService, RecaptchaService],
})
export class AuthModule {}
