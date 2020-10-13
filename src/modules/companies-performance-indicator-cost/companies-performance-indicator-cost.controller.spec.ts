import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesPerformanceIndicatorCostController } from './companies-performance-indicator-cost.controller';

describe('CompaniesPerformanceIndicatorCost Controller', () => {
  let controller: CompaniesPerformanceIndicatorCostController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompaniesPerformanceIndicatorCostController],
    }).compile();

    controller = module.get<CompaniesPerformanceIndicatorCostController>(CompaniesPerformanceIndicatorCostController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
