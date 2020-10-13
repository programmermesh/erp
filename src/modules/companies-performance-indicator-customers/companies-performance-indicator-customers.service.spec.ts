import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesPerformanceIndicatorCustomersService } from './companies-performance-indicator-customers.service';

describe('CompaniesPerformanceIndicatorCustomersService', () => {
  let service: CompaniesPerformanceIndicatorCustomersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompaniesPerformanceIndicatorCustomersService],
    }).compile();

    service = module.get<CompaniesPerformanceIndicatorCustomersService>(CompaniesPerformanceIndicatorCustomersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
