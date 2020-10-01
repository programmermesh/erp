import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesSustainableGoalsService } from './companies-sustainable-goals.service';

describe('CompaniesSustainableGoalsService', () => {
  let service: CompaniesSustainableGoalsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompaniesSustainableGoalsService],
    }).compile();

    service = module.get<CompaniesSustainableGoalsService>(CompaniesSustainableGoalsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
