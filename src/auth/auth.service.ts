// src/auth/auth.service.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResponseHandler } from 'src/utils/common/response-handler';
import { CreateUserDto } from './dto/create-user.dto';
import { hashPassword } from 'src/utils/common/hash-password.util';
import { RecaptchaService } from './recaptcha/recaptcha.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private recaptchaService: RecaptchaService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const { recaptcha, email, password } = createUserDto;
    const isRecaptchaValid =
      await this.recaptchaService.verifyRecaptcha(recaptcha);
    if (!isRecaptchaValid) {
      throw new UnauthorizedException('Invalid reCAPTCHA token');
    }

    try {
      const hashedPassword = await hashPassword(password);

      const user = await this.prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          status: 'active',
        },
      });

      return ResponseHandler.success('User registered successfully', user, 201);
    } catch (error) {
      if (error.code === 'P2002') {
        // Prisma unique constraint error
        return ResponseHandler.error(
          'User registration failed: Duplicate entry',
          error,
          409,
        );
      }
      return ResponseHandler.error('User registration failed', error);
    }
  }
}
