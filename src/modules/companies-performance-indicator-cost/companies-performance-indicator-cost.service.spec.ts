import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesPerformanceIndicatorCostService } from './companies-performance-indicator-cost.service';

describe('CompaniesPerformanceIndicatorCostService', () => {
  let service: CompaniesPerformanceIndicatorCostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompaniesPerformanceIndicatorCostService],
    }).compile();

    service = module.get<CompaniesPerformanceIndicatorCostService>(CompaniesPerformanceIndicatorCostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
