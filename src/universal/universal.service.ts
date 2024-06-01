import { Injectable } from '@nestjs/common';
import { generateCsrfToken, storeCsrfToken } from 'src/utils/common/csrf-utils';

@Injectable()
export class UniversalService {
  async generateAndStoreCsrfToken(): Promise<string> {
    const csrfToken = generateCsrfToken();
    await storeCsrfToken(csrfToken);
    return csrfToken;
  }
}
