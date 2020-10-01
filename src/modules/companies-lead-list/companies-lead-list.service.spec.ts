import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesLeadListService } from './companies-lead-list.service';

describe('CompaniesLeadListService', () => {
  let service: CompaniesLeadListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompaniesLeadListService],
    }).compile();

    service = module.get<CompaniesLeadListService>(CompaniesLeadListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
