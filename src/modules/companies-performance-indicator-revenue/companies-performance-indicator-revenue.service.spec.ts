import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesPerformanceIndicatorRevenueService } from './companies-performance-indicator-revenue.service';

describe('CompaniesPerformanceIndicatorRevenueService', () => {
  let service: CompaniesPerformanceIndicatorRevenueService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompaniesPerformanceIndicatorRevenueService],
    }).compile();

    service = module.get<CompaniesPerformanceIndicatorRevenueService>(CompaniesPerformanceIndicatorRevenueService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
