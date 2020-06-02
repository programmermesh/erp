import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesCustomerSegmentDetailsController } from './companies-customer-segment-details.controller';

describe('CompaniesCustomerSegmentDetails Controller', () => {
  let controller: CompaniesCustomerSegmentDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompaniesCustomerSegmentDetailsController],
    }).compile();

    controller = module.get<CompaniesCustomerSegmentDetailsController>(CompaniesCustomerSegmentDetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
