import { Logger } from '@nestjs/common';

export class ResponseHandler {
  private static logger = new Logger(ResponseHandler.name);

  static success(
    message: string,
    result: any = null,
    statusCode: number = 200,
  ) {
    return {
      status: 'success',
      statusCode,
      message,
      result,
    };
  }

  static error(message: string, error: any = null, statusCode: number = 500) {
    // Log the error for debugging purposes
    this.logger.error(message, error);

    let errorMessage = 'An unexpected error occurred.';
    if (error instanceof Error) {
      errorMessage = error.message;
      // Check for specific Prisma errors
      if (error.message.includes('Unique constraint failed')) {
        const matches = error.message.match(
          /Unique constraint failed on the fields: \((.*)\)/,
        );
        if (matches && matches[1]) {
          const fields = matches[1].split(', ');
          errorMessage = `Unique constraint failed on the fields: ${fields.join(', ')}.`;
        } else {
          errorMessage = 'A unique constraint violation occurred.';
        }
      } else if (error.message.includes('Foreign key constraint failed')) {
        errorMessage = 'A foreign key constraint violation occurred.';
      } else if (error.message.includes('Record to delete does not exist')) {
        errorMessage = 'The record you are trying to delete does not exist.';
      } else if (error.message.includes('Record to update does not exist')) {
        errorMessage = 'The record you are trying to update does not exist.';
      }
    }

    return {
      status: 'error',
      statusCode,
      message,
      error: errorMessage,
    };
  }
}
