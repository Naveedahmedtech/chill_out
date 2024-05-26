import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('universal')
export class UniversalController {
  @Get('csrf-token')
  getToken(@Res() response: Response) {
    // Assuming csurf middleware has already added csrfToken to response.locals
    if (response.locals.csrfToken) {
      console.log('CSRF Token:', response.locals.csrfToken);
      response.json({ csrfToken: response.locals.csrfToken });
    } else {
      console.log('CSRF Token not found');
      response.status(500).json({ error: 'CSRF token not found' });
    }
  }
}
