import { Test, TestingModule } from '@nestjs/testing';
import { UniversalService } from './universal.service';

describe('UniversalService', () => {
  let service: UniversalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UniversalService],
    }).compile();

    service = module.get<UniversalService>(UniversalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
