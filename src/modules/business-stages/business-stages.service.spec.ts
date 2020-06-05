import { Test, TestingModule } from '@nestjs/testing';
import { BusinessStagesService } from './business-stages.service';

describe('BusinessStagesService', () => {
  let service: BusinessStagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusinessStagesService],
    }).compile();

    service = module.get<BusinessStagesService>(BusinessStagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
