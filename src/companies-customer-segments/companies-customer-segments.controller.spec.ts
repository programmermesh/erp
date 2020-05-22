import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesCustomerSegmentsController } from './companies-customer-segments.controller';

describe('CompaniesCustomerSegments Controller', () => {
  let controller: CompaniesCustomerSegmentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompaniesCustomerSegmentsController],
    }).compile();

    controller = module.get<CompaniesCustomerSegmentsController>(CompaniesCustomerSegmentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
