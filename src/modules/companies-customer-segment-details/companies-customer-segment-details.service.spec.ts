import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesCustomerSegmentDetailsService } from './companies-customer-segment-details.service';

describe('CompaniesCustomerSegmentDetailsService', () => {
  let service: CompaniesCustomerSegmentDetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompaniesCustomerSegmentDetailsService],
    }).compile();

    service = module.get<CompaniesCustomerSegmentDetailsService>(CompaniesCustomerSegmentDetailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
