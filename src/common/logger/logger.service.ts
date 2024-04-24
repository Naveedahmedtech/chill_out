import { Injectable, Logger, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class MyLogger extends Logger {
  constructor(context?: string) {
    // Allow setting context at instantiation
    super(context); // Pass context to the base Logger constructor
  }

  // Custom log method
  log(message: string, context?: string) {
    // Use provided context if available, otherwise use the context set during instantiation
    super.log(message, context || this.context);
  }

  // Custom error method
  error(message: string, trace?: string, context?: string) {
    super.error(message, trace, context || this.context);
  }

  // Custom warn method
  warn(message: string, context?: string) {
    super.warn(message, context || this.context);
  }

  // You can add more methods for different logging levels: debug, verbose, etc.
}
