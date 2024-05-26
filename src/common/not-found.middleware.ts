import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class NotFoundMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    res.status(404).json({
      statusCode: 404,
      timestamp: new Date().toISOString(),
      path: req.url,
      message: 'The requested resource was not found',
    });
  }
}
