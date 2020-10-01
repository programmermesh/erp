import { Test, TestingModule } from '@nestjs/testing';
import { SustainableGoalsService } from './sustainable-goals.service';

describe('SustainableGoalsService', () => {
  let service: SustainableGoalsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SustainableGoalsService],
    }).compile();

    service = module.get<SustainableGoalsService>(SustainableGoalsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
