import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { UniversalService } from './universal.service';
import { ResponseHandler } from 'src/utils/common/response-handler';

@Controller('universal')
export class UniversalController {
  constructor(private readonly universalService: UniversalService) {}

  @Get('csrf-token')
  async getToken(@Res() response: Response) {
    try {
      const csrfToken = await this.universalService.generateAndStoreCsrfToken();
      response.cookie('XSRF-TOKEN', csrfToken, { httpOnly: true });
      return response
        .status(HttpStatus.OK)
        .json(
          ResponseHandler.success('CSRF token generated successfully', {
            csrfToken,
          }),
        );
    } catch (error) {
      return ResponseHandler.error('Failed to generate CSRF token', error);
    }
  }
}
