import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesCustomerSegmentsService } from './companies-customer-segments.service';

describe('CompaniesCustomerSegmentsService', () => {
  let service: CompaniesCustomerSegmentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompaniesCustomerSegmentsService],
    }).compile();

    service = module.get<CompaniesCustomerSegmentsService>(CompaniesCustomerSegmentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
