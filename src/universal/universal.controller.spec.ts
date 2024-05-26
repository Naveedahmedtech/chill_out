import { Test, TestingModule } from '@nestjs/testing';
import { UniversalController } from './universal.controller';

describe('UniversalController', () => {
  let controller: UniversalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UniversalController],
    }).compile();

    controller = module.get<UniversalController>(UniversalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
