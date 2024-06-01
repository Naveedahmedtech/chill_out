// src/recaptcha/recaptcha.service.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class RecaptchaService {
  private readonly RECAPTCHA_SECRET_KEY: string;

  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {
    this.RECAPTCHA_SECRET_KEY = this.configService.get<string>(
      'RECAPTCHA_SECRET_KEY',
    );
  }

  async verifyRecaptcha(token: string): Promise<boolean> {
    const response = await lastValueFrom(
      this.httpService.post(
        `https://www.google.com/recaptcha/api/siteverify`,
        null,
        {
          params: {
            secret: this.RECAPTCHA_SECRET_KEY,
            response: token,
          },
        },
      ),
    );
    const { success } = response.data;
    return success;
  }
}
