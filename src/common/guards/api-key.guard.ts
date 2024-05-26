import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  private readonly expectedApiKey: string;

  constructor(private configService: ConfigService) {
    this.expectedApiKey = this.configService.get<string>('api_key');
  }

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['x-api-key'];


    if (!apiKey || apiKey !== this.expectedApiKey) {
      throw new UnauthorizedException('Invalid API key');
    }

    return true;
  }
}
