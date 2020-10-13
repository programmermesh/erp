import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesPerformanceIndicatorRevenueController } from './companies-performance-indicator-revenue.controller';

describe('CompaniesPerformanceIndicatorRevenue Controller', () => {
  let controller: CompaniesPerformanceIndicatorRevenueController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompaniesPerformanceIndicatorRevenueController],
    }).compile();

    controller = module.get<CompaniesPerformanceIndicatorRevenueController>(CompaniesPerformanceIndicatorRevenueController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
