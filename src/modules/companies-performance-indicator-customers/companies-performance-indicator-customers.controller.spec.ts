import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesPerformanceIndicatorCustomersController } from './companies-performance-indicator-customers.controller';

describe('CompaniesPerformanceIndicatorCustomers Controller', () => {
  let controller: CompaniesPerformanceIndicatorCustomersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompaniesPerformanceIndicatorCustomersController],
    }).compile();

    controller = module.get<CompaniesPerformanceIndicatorCustomersController>(CompaniesPerformanceIndicatorCustomersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
